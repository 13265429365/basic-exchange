<template>
  <div class="column full-height full-width">
    <q-separator style="background: #F4F5FD;" />
    <div class="col q-pa-md full-width column justify-between">
      <div class="col full-width">
        <div class="text-body2 text-weight-medium q-pb-xs">{{ $t('withdrawAccount') }}</div>
        <!-- 卡类型选择 -->
        <q-scroll-area style="height: 80px; width: 100%;" :thumb-style="{ display: 'none' }" :visible="false">
          <div class="row no-wrap">
            <div v-for="(typeI, typeIndex) in cardList" :key="typeIndex"
              style="width: 214px;height: 50px;border-radius: 9px;background: #F8F9FC;"
              :class="`q-pa-sm row q-mr-md q-mb-md justify-center cursor-pointer relative-position ${typeIndex == ActiveCardIndex ? 'select' : ''}`"
              @click="selectType(typeIndex)">
              <q-img class="self-center q-mr-sm" :src="imageSrc(typeI.icon)" width="32px" height="32px" />
              <div class="text-weight-bold self-center">{{ typeI.name }}</div>
              <q-img v-if="typeIndex == ActiveCardIndex" class="absolute" src="/images/select.png" width="30PX"
                height="30px" style="bottom: 0;right: 0;"></q-img>
            </div>
          </div>
        </q-scroll-area>

        <div>
          <div class="text-body2 text-weight-medium q-pb-xs">{{ $t('withdrawAmount') }}</div>
          <q-input type="number" standout v-model="params.money" class="q-mb-sm">
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
        style="height: 44px;" @click="alertPass = true" />
    </div>

    <!-- 安全密码 -->
    <q-dialog v-model="alertPass">
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
                <q-btn class="q-mr-md col-4" unelevated rounded no-caps @click="alertPass = false"
                  style="background: #F3F5F5" :label="$t('cancel')"></q-btn>
                <q-btn class="col-4" @click="Withdraw" unelevated rounded no-caps color="primary"
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
      alertPass: false,

      // 账户余额
      Total: $userStore.userInfo.money,

      params: {} as any,

      // 选中卡片类型
      ActiveCardIndex: 0,

      // 卡片类型
      cardList: [] as any,
    });

    context.emit('update', {
      title: t('withdraw'),
    })

    onMounted(() => {
      walletsAccountIndexAPI().then((res: any) => {
        state.cardList = res
      })
    })

    // 提现
    const Withdraw = () => {
      state.params.accountId = state.cardList[state.ActiveCardIndex].id
      state.params.money = Number(state.params.money)

      // 关闭密码弹窗
      state.alertPass = false

      walletsWithdrawCreateAPI(state.params).then((res: any) => {
        NotifyPositive(t('submittedSuccess'))
        console.log('提现成功', res);

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
