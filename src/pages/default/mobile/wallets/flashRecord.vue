<template>
  <div class="q-px-md q-pt-lg q-gutter-y-sm">
    <q-card v-for="(flash, flashIndex) in flashList" :key="flashIndex" flat bordered style="border-radius: 8px;">
      <q-card-section>
        <div>
          <div>
            <span>{{ flash.money }} {{ flash.assetsName == '' ? $t('currency') : flash.assetsName }}</span>
            <q-icon name="east" color="primary" class="q-mx-sm"></q-icon>
            <span>{{ flash.nums }} {{ flash.symbolAssetsName }}</span>
          </div>
          <div class="text-grey">{{ date.formatDate(flash.createdAt * 1000, 'YYYY-MM-DD HH:mm:ss') }}</div>
        </div>
      </q-card-section>
    </q-card>
    <!-- 没有数据 -->
    <div v-if="flashList.length <= 0" class="full-width column items-center justify-center q-my-xl q-py-xl">
      <q-img width="100px" height="82px" src="/images/icons/no-data.png" no-spinner alt="" />
      <div class="text-accent">
        {{ $t('noData') }}
      </div>
    </div>
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
  setup(props: any, context: any) {
    const { t } = useI18n()
    const $route = useRoute()
    context.emit('update',
      {
        title: $route.query.type == '2' ? t('flashHistory') : t('transferHistory'),
        rightBtn: { icon: '' },
      }
    )
    const state = reactive({
      flashList: [] as any,

      params: {
        pagination: {
          sortBy: 'id',
          descending: true,
          page: 1,
          rowsPerPage: 999,
        },
        dateTime: {
          from: '',
          to: ''
        },
        // 1:划转  2:闪兑
        type: $route.query.type ?? 1,
      } as any
    });

    onMounted(() => {
      // 获取划转列表
      state.params.type = Number(state.params.type)
      walletsTransfeIndexAPI(state.params).then((res: any) => {
        if (res.items.length <= 0) {
          return false
        }
        state.flashList = res.items
        console.log(state.flashList);
      })
    })

    return {
      date,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped></style>
