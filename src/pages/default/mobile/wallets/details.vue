<template>
    <div class="column full-width" style="min-height: 100vh;">
        <div class="col page_bg q-pa-md full-width">
            <div v-if="billDetailList.length <= 0" class="text-center text-grey q-mt-lg">
                {{ $t('noData') }}
            </div>
            <!-- 明细列表 -->
            <div v-for="(bill, i) in billDetailList" :key="i" class="rounded-borders bg-white q-pa-md  q-mb-md">
                <div class="row justify-between">
                    <div class="">
                        <div class="text-weight-bold">{{ bill.name }}</div>
                        <div class="text-grey-6 text-caption">{{ date.formatDate(Number(bill.updatedAt *
                            1000), 'YYYY/MM/DD HH:mm:ss') }}</div>
                    </div>
                    <div>
                        <div class="text-body1 text-weight-bold text-right">
                            {{ (bill.type == 1 ? '+' : '-') }}{{ $t('currency') }}{{ bill.money }}
                        </div>
                        <div class="text-weight-medium text-grey-7 text-right text-caption">
                            {{ $t('balance') }}:{{ bill.fee }}
                        </div>
                    </div>
                </div>
                <div v-if="bill.status == -1" class="text-red text-caption">Failure Reason：This is the reason for the
                    failure
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { walletsBillIndexAPI } from 'src/apis/wallets';
import { date } from 'quasar'
import { useI18n } from 'vue-i18n';

export default defineComponent({
    name: 'WalletsDetail',
    setup(props: any, context: any) {
        const { t } = useI18n()

        const state = reactive({
            params: {
                types: [0],
                createdAt: {
                    from: date.formatDate(Date.now(), 'YYYY/MM/DD'),
                    to: date.formatDate(Date.now(), 'YYYY/MM/DD'),
                },
                pagination: {
                    rowsPerPage: 999, //  n条/一页
                    page: 1, //  当前页数
                    descending: true,
                    sortBy: 'created_at',
                },
            },

            // 账单
            billDetailList: [] as any,
        });

        context.emit('update', {
            title: t('myWallet'),
            // rightBtn: {
            //     icon: '筛选',
            //     callback() {},
            // },
        })

        onMounted(() => {
            walletsBillIndexAPI(state.params).then((res: any) => {
                state.billDetailList = res.items
                console.log(res);

            })
        })

        return {
            date,
            ...toRefs(state),
        }
    }
});
</script>
  