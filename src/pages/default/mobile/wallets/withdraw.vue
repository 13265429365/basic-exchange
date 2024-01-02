<template>
  <div class="column full-height full-width">
    <div v-if="accountList.length <= 0" class="q-pa-md">
      <q-banner rounded class="bg-red text-white q-mt-sm">
        {{ $t('accountBeEmpty') }}
        <template v-slot:action>
          <q-btn @click="$router.push({ name: 'WalletsAccountIndex' })" flat no-caps color="white"
            :label="$t('accountManage')" />
        </template>
      </q-banner>
    </div>

    <div v-else class="q-pa-md full-width column q-gutter-xl">
      <div class="col full-width">
        <div class="text-body2 text-weight-medium q-pb-xs">{{ $t('withdrawAccount') }}</div>
        <!-- 卡类型选择 -->
        <q-scroll-area style="height: 80px; width: 100%;" :thumb-style="{ display: 'none' }" :visible="false">
          <div class="row no-wrap">
            <div v-for="(account, accountIndex) in accountList" :key="accountIndex" :style="{
              width: '200px', height: '50px', borderRadius: '8px', background: '#F5F6FA',
              border: accountIndex == ActiveAccountIndex ? '1px solid #01AC66' : '',
            }" class="q-pa-sm row justify-center cursor-pointer relative-position q-mr-sm"
              @click="switchAccount(accountIndex)">
              <q-img class="self-center q-mr-sm" :src="imageSrc(account.icon)" width="32px" height="32px" />
              <div class="self-center">{{ account.name }}</div>
              <q-img v-if="accountIndex == ActiveAccountIndex" class="absolute" src="/images/select.png" width="30px"
                height="30px" style="bottom: 0;right: 0;"></q-img>
            </div>
          </div>
        </q-scroll-area>

        <div>
          <div class="text-body2 text-weight-medium q-pb-xs">{{ $t('withdrawAmount') }}</div>
          <q-input dense type="number" outlined v-model="params.money" class="q-mb-sm">
            <template v-slot:append>
              <div @click="params.money = Total" style="font-size: 14px" class="text-primary">{{ $t('withdrawAllAmount')
              }}
              </div>
            </template>
          </q-input>
          <div class="text-grey-7">{{ $t('balance') }}：￥{{ Total }}</div>
        </div>
      </div>

      <!-- 提现按钮 -->
      <q-btn unelevated rounded color="primary" :label="$t('withdraw')" class="full-width q-my-md" no-caps
        @click="withdraw" />
    </div>

    <!-- 安全密码 -->
    <q-dialog v-model="showSecurityKey">
      <q-card style="width: 380px;">
        <q-card-section style="padding: 20px;">
          <div class="text-center text-weight-bold">
            {{ $t('enterSecretKey') }}
          </div>
          <div class="q-mt-lg">
            <q-form>
              <q-input outlined dense class="q-mb-md" type="password" v-model="params.securityKey"
                :placeholder="$t('enterSecretKey')">
              </q-input>
              <div class="row justify-center q-mt-lg">
                <q-btn class="q-mr-md col-4" unelevated rounded no-caps @click="showSecurityKey = false"
                  style="background: #F3F5F5" :label="$t('cancel')"></q-btn>
                <q-btn class="col-4" @click="subWithdraw" unelevated rounded no-caps color="primary"
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
  setup(props: any, context: any) {
    const { t } = useI18n()
    const $router = useRouter()
    const $userStore = UserStore()
    const $initStore = InitStore()

    const state = reactive({
      walletsSetting: $initStore.config.settings.wallets,
      showSecurityKey: false,

      // 账户余额
      Total: $userStore.userInfo.money,
      params: {} as any,

      // 选中卡片类型
      ActiveAccountIndex: 0,

      // 卡片类型
      accountList: [] as any,
    });

    context.emit('update', {
      title: t('withdraw'),
    })

    onMounted(() => {
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

    // 切换卡片类型
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
