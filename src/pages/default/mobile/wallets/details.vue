<template>
    <div class="column full-width" style="min-height: 100vh;">
        <div class="col page_bg q-pa-md full-width">
            <div v-if="billDetailList.length <= 0" class="text-center text-grey q-mt-lg">
                {{ $t('noData') }}
            </div>
            <!-- 明细列表 -->
            <div v-for="(bill, i) in billDetailList" :key="i" class="rounded-borders bg-white q-pa-md  q-mb-md">
                <div class="row justify-between">
                    <div>
                        <div class="text-weight-bold q-mb-xs">{{ bill.name }}</div>
                        <div class="text-grey-6 text-caption">{{ date.formatDate(Number(bill.createdAt *
                            1000), 'YYYY/MM/DD HH:mm:ss') }}</div>
                    </div>
                    <div>
                        <div class="text-body1 text-weight-bold text-right q-mb-xs">
                            {{ bill.money }}
                        </div>
                        <div class="text-weight-medium text-grey-7 text-right text-caption">
                            {{ $t('balance') }}:{{ bill.balance.toFixed(2) }}
                        </div>
                    </div>
                </div>
                <div v-if="bill.status == -1" class="text-red text-caption">Failure Reason：This is the reason for the
                    failure
                </div>
            </div>
        </div>
    </div>

    <!-- 筛选类型 -->
    <q-dialog v-model="billSelectDialog" :maximized="true" position="right" full-height class="q-pa-none">
        <q-card style="width: 320px" class="column justify-between">
            <q-card-section>
                <div class="text-weight-bold q-mb-md">{{ $t('filter') }}</div>
                <div class="text-weight-medium q-mb-sm">{{ $t('type') }}</div>
                <!-- 类型列表 -->
                <div class="row q-mb-md">
                    <div v-for="(billType, billTypeIndex) in billFilterParams.typeList" :key="billTypeIndex" class="col-4">
                        <div class="q-ma-xs">
                            <q-btn outline rounded
                                :class="params.types.indexOf(billType.value) > -1 ? 'bg-primary text-white' : 'text-grey'"
                                @click="selectBillTypeFunc(billType.value)" class="full-width ellipsis "
                                :label="billType.label"></q-btn>
                        </div>
                    </div>
                </div>

                <!-- 时间范围 -->
                <div class="text-weight-medium q-mb-sm q-mt-xl">{{ $t('betweenTime') }}</div>
                <div class="row no-wrap justify-between items-center">
                    <q-btn class="bg-grey-1 rounded-borders col-5" unelevated no-caps
                        style="border: 1px solid #DDDDDD;height: 32px;">
                        <div class="row items-center">
                            <div class="q-mr-xs text-caption">{{ billFilterParams.dateTime.from }}</div>
                        </div>
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="billFilterParams.dateTime" range>
                                <div class="row items-center justify-end q-gutter-sm">
                                    <q-btn :label="$t('cancel')" color="primary" flat v-close-popup />
                                    <q-btn @click="walletBillFilterFunc" :label="$t('confirm')" color="primary" flat
                                        v-close-popup />
                                </div>
                            </q-date>
                        </q-popup-proxy>
                    </q-btn>
                    <q-separator style="width: 11px;" />
                    <q-btn class="bg-grey-1 rounded-borders col-5" unelevated no-caps rounded
                        style="border: 1px solid #DDDDDD;height: 32px;">
                        <div class="row items-center">
                            <div class="q-mr-xs text-caption">{{ billFilterParams.dateTime.to }}</div>
                        </div>
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="billFilterParams.dateTime" range>
                                <div class="row items-center justify-end q-gutter-sm">
                                    <q-btn :label="$t('cancel')" color="primary" flat v-close-popup />
                                    <q-btn @click="walletBillFilterFunc" :label="$t('confirm')" color="primary" flat
                                        v-close-popup />
                                </div>
                            </q-date>
                        </q-popup-proxy>
                    </q-btn>
                </div>
            </q-card-section>
            <q-card-section>
                <div class="row justify-between no-wrap">
                    <q-btn @click="billSelectDialog = false" class="bg-grey-2" unelevated rounded no-caps
                        style="height: 44px;width: 140px;" :label="$t('cancel')" />
                    <q-btn @click="walletBillFilterFunc" unelevated rounded no-caps style="height: 44px;width: 140px;"
                        color="primary" :label="$t('confirm')" />
                </div>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>
  
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { walletsBillIndexAPI, walletsBillOptionsAPI } from 'src/apis/wallets';
import { date } from 'quasar'
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

export default defineComponent({
    name: 'WalletsAccountDetails',
    emits: ['update'],
    setup(props: any, context: any) {
        const { t } = useI18n()
        const $route = useRoute()
        const WalletBillAccountType = -1
        const WalletBillAssetsType = -2
        const initPagination = {
            rowsPerPage: 20, //  每页显示条数
            page: 1, //  当前页数
            descending: true,
            sortBy: 'created_at',
        }
        const state = reactive({
            params: {
                types: [$route.query.type ? WalletBillAssetsType : WalletBillAccountType],
                pagination: initPagination,
            } as any,

            // 账单
            billDetailList: [] as any,

            billFilterParams: {
                typeList: [] as any,
                dateTime: {
                    from: date.formatDate(Date.now(), 'YYYY/MM/DD'),
                    to: date.formatDate(Date.now(), 'YYYY/MM/DD'),
                },
            },

            // 筛选账单弹窗
            billSelectDialog: false,
        });

        context.emit('update', {
            title: t('myWallet'),
            rightBtn: {
                icon: '筛选',
                size: true,
                callback() {
                    state.billSelectDialog = true
                },
            },
        })

        onMounted(() => {
            getWalletsBillList()
            // 获取钱包账单Options
            // 如果route.query存在assets获取-2类型账单
            walletsBillOptionsAPI({ type: $route.query.type ? WalletBillAssetsType : WalletBillAccountType }).then((res: any) => {
                state.billFilterParams.typeList = res
            })
        })

        // 获取用户账单列表
        const getWalletsBillList = () => {
            if (state.params.types.length == 0) {
                state.params.types = [$route.query.type ? WalletBillAssetsType : WalletBillAccountType]
            }
            walletsBillIndexAPI(state.params).then((res: any) => {
                state.billDetailList = res.items
            })
        }

        // 选择账单类型
        const selectBillTypeFunc = (billType: number) => {
            const typesIndex = state.params.types.indexOf(billType)
            if (typesIndex > -1) {
                state.params.types.splice(typesIndex, 1)
                return
            }
            state.params.types.push(billType)
        }

        // 钱包账单筛选确定方法
        const walletBillFilterFunc = () => {
            state.params.pagination = initPagination
            state.params.createdAt = state.billFilterParams.dateTime
            getWalletsBillList()
            state.billSelectDialog = false
        }

        return {
            date,
            ...toRefs(state),
            walletBillFilterFunc,
            selectBillTypeFunc,
        }
    }
});
</script>
  