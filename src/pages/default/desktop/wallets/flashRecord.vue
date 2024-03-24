<template>
  <div style="padding: 48px 100px;">
    <!-- 账单、订单部分 -->
    <q-card flat bordered class="q-mt-lg">
      <q-card-section>
        <div class="row justify-between">
          <q-tabs v-model="tab" narrow-indicator class="q-mb-lg" @update:model-value="changeTabFunc">
            <q-tab class="text-primary rounded-borders" no-caps name="flash" :label="$t('flash')" />
            <q-tab class="text-primary rounded-borders" no-caps name="transfer" :label="$t('transfer')" />
          </q-tabs>
        </div>
      </q-card-section>
      <q-card-section>
        <div v-for="(flash, orderIndex) in flashList" :key="orderIndex" class="q-px-md">
          <q-expansion-item default-opened :expand-icon-class="flash.status != -1 ? 'text-transparent' : ''"
            :header-style="{ borderRadius: '4px', height: '68px', lineHeight: '54px' }">
            <template v-slot:header>
              <q-item-section>
                <div>
                  <div v-if="flash.type == 2" class="text-primary">
                    {{ $t('flash') }}
                  </div>
                  <div v-else class="text-primary">
                    {{ $t('transfer') }}
                  </div>
                </div>
              </q-item-section>
              <q-item-section>
                <div class="col">
                  <div>
                    <span>{{ flash.money }} {{ flash.assetsName == '' ? $t('currency') : flash.assetsName }}</span>
                    <q-icon name="east" color="primary" class="q-mx-sm"></q-icon>
                    <span>{{ flash.nums }} {{ flash.symbolAssetsName }}</span>
                  </div>
                </div>
              </q-item-section>
              <q-item-section>
                <div class="text-grey text-right">{{ date.formatDate(flash.createdAt * 1000, 'YYYY-MM-DD HH:mm:ss') }}
                </div>
              </q-item-section>
            </template>
            <div v-if="flash.status == -1" class="text-red text-caption q-pa-md bg-grey-1">
              {{ flash.data }}
            </div>
          </q-expansion-item>
          <q-separator />
        </div>

        <!-- 分页 -->
        <div class="row justify-center q-mt-md" v-if="flashList.length > 0">
          <q-pagination v-model="params.pagination.page" :max="pagination.countPage"
            @update:modelValue="changePagination" input input-class="primary" color="grey">
          </q-pagination>
        </div>

        <div v-if="flashList.length <= 0">
          <div class="text-center q-my-lg text-grey">
            {{ $t('noData') }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { date } from 'quasar';
import { walletsTransfeIndexAPI } from 'src/apis/wallets'
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'FlashExchangeRecord',
  setup() {
    const initPagination = {
      rowsPerPage: 20, //  每页显示条数
      page: 1, //  当前页数
      descending: true,
      sortBy: 'created_at',
    }
    const state = reactive({
      tab: 'flash',
      flashList: [] as any,

      params: {
        pagination: initPagination,
        dateTime: {
          from: '',
          to: ''
        },
        // 1:划转  2:闪兑
        type: 2,
      } as any,

      // 分页
      pagination: {
        total: 0,
        countPage: 1,
      },
    });

    onMounted(() => {
      // 获取划转列表
      walletsTransfeIndexFunc(state.params.type)
    })

    const walletsTransfeIndexFunc = (type: any) => {
      state.params.type = type
      walletsTransfeIndexAPI(state.params).then((res: any) => {
        if (res.items.length <= 0) {
          return false
        }
        state.flashList = res.items
        console.log(state.flashList);
      })
    }

    const changeTabFunc = () => {
      state.flashList = []
      state.params.pagination = initPagination
      if (state.tab == 'flash') {
        walletsTransfeIndexFunc(2)
      } else {
        walletsTransfeIndexFunc(1)
      }
    }

    // 监听加减页
    const changePagination = (val: number) => {
      state.params.pagination.page = Number(val)
      walletsTransfeIndexFunc(state.params.type)
    }

    return {
      date,
      ...toRefs(state),
      changePagination,
      changeTabFunc,
    }
  }
});
</script>
<style lang="scss" scoped></style>
