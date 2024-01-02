<template>
  <div class="column window-height" style="padding: 48px 244px;background: #F8F9FC;">
    <q-banner v-if="accountList.length <= 0" rounded class="bg-red text-white">
      {{ $t('accountBeEmpty') }}
      <template v-slot:action>
        <q-btn @click="$router.push({ name: 'WalletsAccountIndex' })" flat no-caps color="white"
          :label="$t('accountManage')" />
      </template>
    </q-banner>
    <div v-else class="col column justify-between bg-white rounded-borders">
      <!-- 标题 -->
      <div class="q-py-md q-px-lg row items-center no-wrap text-body1 text-weight-medium"
        style="background: linear-gradient(275deg, rgba(19,140,91,0.1) 0%, rgba(1,172,102,0.04) 100%);border-radius: 8px 8px 0 0;">
        <q-img src="/images/withdraw.png" width="40PX" height="28px"></q-img>
        <div class="q-ml-md">{{ $t('withdraw') }}</div>
      </div>

      <div class="col full-width q-pa-lg">
        <div class="rounded-borders text-subtitle1 text-weight-medium q-py-xs q-px-md" style="background: #F8F9FC;">
          {{ $t('withdrawAccount') }}
        </div>

        <!-- 卡类型选择 -->
        <div class="row q-mt-md q-gutter-md">
          <div v-for="(account, accountIndex) in accountList" :key="accountIndex" :style="{
            width: '220px', height: '50px', borderRadius: '8px', background: '#F8F9FC',
            border: accountIndex == ActiveAccountIndex ? '1px solid #01AC66' : '',
          }" class="q-pa-sm row justify-center cursor-pointer relative-position" @click="switchAccount(accountIndex)">
            <q-img class="self-center q-mr-sm" :src="imageSrc(account.icon)" width="32px" height="32px" />
            <div style="font-size: 16px;" class=" text-weight-bold self-center">{{ account.name }}</div>
            <q-img v-if="accountIndex == ActiveAccountIndex" class="absolute" src="/images/select.png" width="30PX"
              height="30px" style="bottom: 0;right: 0;"></q-img>
          </div>
        </div>

        <!-- 提现 -->
        <div class="column q-gutter-md q-mt-lg" style="width: 60%;">
          <div class="row items-center">
            <div>{{ $t('withdrawAmount') }}</div>
            <q-input class="q-ml-sm" type="number" dense outlined v-model="params.money" />
            <div @click="params.money = total" class="text-primary q-ml-sm cursor-pointer">{{ $t('withdrawAllAmount') }}
            </div>
          </div>

          <div class="row items-center">
            <div class="">
              {{ $t('balance') }}
            </div>
            <div class="q-ml-sm text-weight-medium text-body1" style="color: #F45E0C;">{{ $t('currency') }}{{ total }}
            </div>
          </div>

          <div class="q-mt-lg text-right">
            <q-btn unelevated rounded color="primary" :label="$t('submit')" class="q-my-md" no-caps
              style="min-width: 100px;" @click="withdraw" />
          </div>
        </div>
      </div>
    </div>


    <!-- 输入密码 -->
    <q-dialog v-model="showSecurityKey">
      <q-card style="width: 340px">
        <q-card-section>
          <div class="text-center text-h6">{{ $t('enterSecretKey') }}</div>
        </q-card-section>

        <q-card-section>
          <div class="q-mt-md">
            <q-input outlined v-model="params.securityKey" type="password" :label="$t('enterSecretKey')"></q-input>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('cancel')" v-close-popup color="grey"></q-btn>
          <q-btn flat :label="$t('confirm')" @click="subWithdraw" color="primary"></q-btn>
        </q-card-actions>
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
      walletsSetting: $initStore.config.settings.wallets,
      showSecurityKey: false,
      // 账户余额
      total: '',
      params: {} as any,

      // 选中卡片类型
      ActiveAccountIndex: 0,

      // 银行卡列表
      accountList: [] as any,
    });

    onMounted(() => {
      state.total = $userStore.userInfo.money
      walletsAccountIndexAPI().then((res: any) => {
        state.accountList = res
      })
    })

    const withdraw = () => {
      if (state.walletsSetting.showSecurityPass) {
        state.showSecurityKey = true
      } else {
        subWithdraw()
      }
    }

    // 提现
    const subWithdraw = () => {
      state.params.accountId = state.accountList[state.ActiveAccountIndex].id
      state.params.money = Number(state.params.money)

      // 关闭密码弹窗
      state.showSecurityKey = false
      walletsWithdrawCreateAPI(state.params).then((res: any) => {
        NotifyPositive(t('submittedSuccess'))
        // 提现后是否跳转客服页面
        if ($initStore.config.settings.online.withdrawLink) {
          $router.push({ name: 'WalletsAccountIndex' })
        } else {
          $router.push({ name: 'WalletsAccountIndex' })
        }

        state.params.securityKey = ''
      })
    }

    // 切换卡片
    const switchAccount = (accountIndex: any) => {
      state.ActiveAccountIndex = accountIndex

    }

    return {
      imageSrc,
      ...toRefs(state),
      switchAccount,
      withdraw,
      subWithdraw,
    }
  }
};
</script>

<style lang="scss" scoped></style>
