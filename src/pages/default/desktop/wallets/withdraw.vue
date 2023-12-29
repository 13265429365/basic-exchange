<template>
  <div class="column window-height" style="padding: 48px 244px;background: #F8F9FC;">
    <div class="col column justify-between bg-white rounded-borders">

      <!-- 标题 -->
      <div class="q-py-md q-px-lg row items-center no-wrap size20 text-weight-medium"
        style="background: linear-gradient(275deg, rgba(19,140,91,0.1) 0%, rgba(1,172,102,0.04) 100%);border-radius: 8px 8px 0 0;">
        <q-img :src="imageSrc('')" width="40PX" height="40px"></q-img>
        <div class="q-ml-md">{{ $t('withdraw') }}</div>
      </div>

      <!--  -->
      <div class="col full-width q-pa-lg">
        <div class=" text-subtitle1 text-weight-medium q-py-sm q-px-md" style="border-radius: 2px;background: #F8F9FC;">
          {{ $t('withdrawAccount') }}
        </div>

        <!-- 卡类型选择 -->
        <div class="row q-mt-md">
          <div v-for="(typeI, typeIndex) in cardList" :key="typeIndex"
            style="width: 214px;height: 50px;border-radius: 9px;background: #F8F9FC;"
            :class="`q-pa-sm row q-mr-md q-mb-md justify-center cursor-pointer relative-position ${typeIndex == ActiveCardIndex ? 'select' : ''}`"
            @click="selectType(typeIndex)">
            <q-img class="self-center q-mr-sm" :src="imageSrc(typeI.icon)" width="32px" height="32px" />
            <div style="font-size: 16px;" class=" text-weight-bold self-center">{{ typeI.name }}</div>
            <q-img v-if="typeIndex == ActiveCardIndex" class="absolute" src="/images/select.png" width="30PX"
              height="30px" style="bottom: 0;right: 0;"></q-img>
          </div>
        </div>

        <!-- 提现 -->
        <div class="q-mt-xl">
          <div class="row no-wrap items-center q-mb-md">
            <div class="text-weight-medium q-mr-xs">
              {{ $t('balance') }}：
            </div>
            <div class="text-weight-medium text-body1" style="color: #F45E0C;">{{ '$' + Total }}</div>
          </div>

          <div class="row no-wrap items-center q-mb-lg">
            <div class="text-weight-medium q-mr-xs">{{ $t('withdrawAmount') }}：</div>
            <q-input type="number" dense outlined v-model="params.money" />
            <div @click="params.money = Total" class="text-primary q-ml-sm cursor-pointer">{{ $t('withdrawAllAmount') }}
            </div>
          </div>

        </div>
        <!-- 添加按钮 -->
        <q-btn unelevated rounded color="primary" :label="$t('submit')" class="q-my-md" no-caps
          style="height: 40px;width: 207px;" @click="alertPass = true" />
      </div>


    </div>

    <!-- 输入密码 -->
    <q-dialog v-model="alertPass">
      <q-card style="width: 380px;">
        <q-card-section style="padding: 20px;">
          <div class="row no-wrap">
            <div class="text-weight-bold">
              {{ $t('enterSecretKey') }}
            </div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </div>
          <div class="q-mt-lg">
            <q-form>
              <q-input outlined dense class="q-mb-md" type="password" v-model="params.securityKey"
                :placeholder="$t('enterSecretKey')">
              </q-input>
              <div class="row justify-center q-mt-lg">
                <q-btn class="q-mr-md" unelevated rounded no-caps @click="alertPass = false"
                  style="background: #F3F5F5;height: 40px;width: 160px;" :label="$t('cancel')"></q-btn>
                <q-btn @click="Withdraw" unelevated rounded no-caps style="height: 40px;width: 160px;" color="primary"
                  :label="$t('confirm')" />
              </div>
            </q-form>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';
import { NotifyPositive } from 'src/utils/notify';
import { imageSrc } from 'src/utils/index';
import { walletsAccountIndexAPI, walletsWithdrawCreateAPI } from 'src/apis/wallets';
import { UserStore } from 'src/stores/user';
import { InitStore } from 'src/stores/init';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

export default {
  name: 'withdrawalIndex',
  setup() {
    const { t } = useI18n()
    const $router = useRouter()
    const $userStore = UserStore()
    const $initStore = InitStore()

    const state = reactive({
      alertPass: false,

      // 账户余额
      Total: $userStore.userInfo.money,

      params: {} as any,

      // 选中卡片类型
      ActiveCardIndex: 0,

      // 银行卡列表
      cardList: [] as any,
    });

    onMounted(() => {
      getCard()
    })

    // 获取卡片列表
    const getCard = () => {
      walletsAccountIndexAPI().then((res: any) => {
        state.cardList = res
      })
    }

    // 提现
    const Withdraw = () => {
      state.params.accountId = state.cardList[state.ActiveCardIndex].id
      state.params.money = Number(state.params.money)

      // 关闭密码弹窗
      state.alertPass = false

      walletsWithdrawCreateAPI(state.params).then((res: any) => {
        NotifyPositive(t('submittedSuccess'))
        // 提现后是否跳转客服页面
        if ($initStore.config.settings.online.withdrawLink) {
          $router.push({ name: 'WalletsAccountIndex' })
        } else {
          $router.push({ name: 'WalletsAccountIndex' })
        }
      })
    }


    // 切换卡片类型
    const selectType = (typeIndex: any) => {
      state.ActiveCardIndex = typeIndex
    }

    return {
      imageSrc,
      ...toRefs(state),
      selectType,
      Withdraw,
    }
  }
};
</script>

<style lang="scss" scoped>
.select {
  background-color: rgba(241, 250, 246, 1) !important;
  border: 1px solid $primary;
}
</style>
