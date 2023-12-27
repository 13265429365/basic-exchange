<template>
  <div class="column full-width" style="min-height: 100vh;">
    <div class="col page_bg q-pa-md full-width">

      <div style="height: 112px;background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);padding: 0 20px;"
        class="row justify-between rounded-borders q-mb-md">
        <div class="column justify-center">
          <div class="row items-center">
            <div class="text-white">{{ $t('totalAssets') }}</div>
            <q-icon @click="moneyShow = !moneyShow" :name="!moneyShow ? 'o_visibility' : 'o_visibility_off'"
              class="q-ml-sm cursor-pointer text-white" size="18px"></q-icon>
          </div>
          <!-- 点击显示、隐藏金额 -->
          <div v-if="moneyShow" class="text-white row items-center">
            <span class="q-mr-sm text-weight-bold" style="font-size: 22px;">${{ form.moneySum }}</span>
            <span>≈￥{{ form.moneyRateSum }} </span>
          </div>
          <div v-else class="text-white text-weight-bold " style="font-size: 22px;">**** </div>
        </div>
      </div>

      <div class="row justify-between q-mb-xs btn">
        <q-btn @click="$router.push(quickMenu.route)" v-for="(quickMenu, quickMenuIndex) in quickMenuList"
          :key="quickMenuIndex" style="width: 47%;" class="bg-white q-py-sm rounded-borders" no-caps unelevated>
          <div class="row justify-start items-center">
            <q-img class="q-mr-sm" :src="imageSrc(quickMenu.icon)" width="42px" height="42px" />
            <div>{{ $t(quickMenu.name) }}</div>
          </div>
        </q-btn>
      </div>

      <div class="q-py-md row">
        <div class="text-color-3 text-subtitle1 text-weight-bolder column col-3">
          <span>Transactions</span>
          <q-separator style="height: 4px;width: 20px;border-radius: 2px;" class="bg-primary self-center" />
        </div>
      </div>

      <!-- 明细列表 -->
      <div v-for="(item, i) in rows" :key="i" class="rounded-borders bg-white q-pa-md  q-mb-sm">
        <div class="row justify-between">
          <div class="">
            <div class="text-weight-bold">{{ item.name }}</div>
            <div class="text-grey-6 text-weight-medium text-caption">{{ date.formatDate(Number(item.createdAt *
              1000), 'YYYY-MM-DD HH:mm:ss') }}</div>
          </div>
          <div>
            <div
              :class="['text-body1 text-weight-bold text-center', { 'text-red': item.name.indexOf('提现') > -1, 'text-primary': item.name.indexOf('充值') > -1 }]">
              {{ item.name.indexOf('提现') > -1 ? '-' + item.money : '+' + item.money }}</div>
          </div>
        </div>
      </div>
    </div>



    <!-- 筛选对话框 -->
    <q-dialog v-model="dialog" :maximized="true" position="right" full-height style="padding: 0;">
      <q-card style="width: 320px">
        <q-card-section class="relative-position full-height">

          <div class="text-weight-bold q-mb-md size15">{{ $t('filter') }}</div>
          <div class="text-weight-bold q-mb-sm size15">{{ $t('type') }}</div>
          <div class="q-gutter-sm q-mb-md">
            <q-btn @click="type = item.name" v-for="(item, i) in typeList" :key="i"
              :class="[{ 'text-white': item.name == type, 'bg-primary': item.name == type, 'text-grey-8': item.name != type, 'page_bg': item.name != type, }]"
              style="width: 90px;height: 36px;" unelevated rounded no-caps>
              {{ item.name }}
            </q-btn>
          </div>

          <div class="text-weight-bold q-mb-sm size15">{{ $t('betweenTime') }}</div>
          <div>
            <div class="row no-wrap items-center">
              <q-input placeholder="开始时间" style="height: 34px;" standout v-model="dates.from" mask="date"></q-input>
              <div class="q-mx-sm" style="width: 15px;height: 1px;border: 1px solid #EDEDED;"></div>
              <q-input placeholder="结束时间" style="height: 34px;" standout v-model="dates.to" mask="date"></q-input>
            </div>

            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="dates" range>
                <div class="row items-center justify-end q-gutter-sm">
                  <q-btn :label="$t('cancel')" color="primary" flat v-close-popup />
                  <q-btn :label="$t('confirm')" color="primary" flat v-close-popup />
                </div>
              </q-date>
            </q-popup-proxy>
          </div>

          <div class="row justify-between no-wrap absolute">
            <q-btn @click="dialog = false" class="bg-grey-2" unelevated rounded no-caps style="height: 44px;width: 140px;"
              :label="$t('cancel')" />
            <q-btn @click="getBill" unelevated rounded no-caps style="height: 44px;width: 140px;" color="primary"
              :label="$t('confirm')" />
          </div>

        </q-card-section>
      </q-card>
    </q-dialog>

  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { imageSrc } from 'src/utils/index';
import { UserStore } from 'src/stores/user';
import { InitStore } from 'src/stores/init';
import { walletsUserAssetsIndexAPI, walletsBillIndexAPI } from 'src/apis/wallets';
import { date } from 'quasar'
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'walletIndex',
  setup(props: any, context: any) {
    const $initStore = InitStore()
    const $userStore = UserStore()
    const { t } = useI18n()

    const state = reactive({
      // 筛选
      dialog: false,

      typeList: [
        { name: '全部' },
        { name: '体现' },
        { name: '充值' },
      ],
      type: '全部',



      // 资产数据
      form: {
        moneySum: '',
        moneyRateSum: '',
      } as any,

      //选择开始结束日期
      dates: {
        from: '',
        to: '',
      },

      // 点击显示、隐藏金额
      moneyShow: true,

      // 快捷菜单
      quickMenuList: [] as any,

      // 分页
      pagination: {
        rowsPerPage: 999, //  n条/一页
        page: 1, //  当前页数
        descending: true,
        sortBy: 'created_at',
      },

      // 账单
      rows: [] as any,
    });

    context.emit('update', {
      title: t('myAssets'),
      rightBtn: {
        icon: 'o_calendar_today',
        callback: () => {
          state.dialog = true
        },
      },
    })

    onMounted(() => {
      state.dates.from = date.formatDate(Date.now() - 86400000, 'YYYY-MM-DD')

      state.dates.to = date.formatDate(Date.now(), 'YYYY-MM-DD')

      state.quickMenuList = $initStore.quickMenu;

      getAssets()
      getBill()
    })

    // 获取用户资产列表
    const getAssets = () => {
      walletsUserAssetsIndexAPI({ id: Number($userStore.userInfo.id) }).then((res: any) => {
        console.log('资产列表', res)
        state.form = res
      })
    }


    // 获取用户账单列表
    const getBill = () => {
      const params = {
        createdAt: {
          from: date.formatDate(state.dates.from, 'x'),
          to: date.formatDate(state.dates.to, 'x'),
        },
        types: [],
        pagination: {
          rowsPerPage: Number(state.pagination.rowsPerPage), //  n条/一页
          page: Number(state.pagination.page), //  当前页数
          descending: state.pagination.descending,
          sortBy: state.pagination.sortBy,
        },
      }
      console.log(params);

      walletsBillIndexAPI(params).then((res: any) => {
        state.rows = []
        console.log('账单列表', res)
        res.items.forEach((element: any) => {
          state.rows.push(element)
        });
      })
      state.dialog = false
    }


    return {
      imageSrc,
      date,
      ...toRefs(state),
      getBill,
    }
  }
});
</script>
<style lang="scss" scoped>
.absolute {
  position: absolute;
  left: 15px;
  right: 15px;
  bottom: 44px;
}

:deep(.q-field .q-field__control) {
  background: #f5f6fa !important;
  border-radius: 10px !important;
  height: 34px !important;
  min-height: 34px !important;

  .q-field__native {
    text-align: center;
  }
}

:deep(.q-field .q-field__marginal) {
  height: 34px !important;
}

:deep(.q-field .q-field__append) {
  height: 34px !important;
}

// 取消手机版input高亮
:deep(.q-field__control:before) {
  background: #f5f6fa !important;
}
</style>
