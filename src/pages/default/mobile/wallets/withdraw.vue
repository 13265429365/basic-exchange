<template>
  <div class="column full-height full-width">
    <q-separator style="background: #F4F5FD;" />
    <div class="col q-pa-md full-width column justify-between">
      <div class="col full-width">
        <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-xs">{{ $t('withdraw') }}</div>
        <!-- 卡类型选择 -->
        <q-scroll-area style="height: 80px; width: 100%;" :visible="false">
          <div class="row no-wrap q-mt-md">
            <div v-for="(typeI, typeIndex) in cardList" :key="typeIndex"
              style="width: 214px;height: 50px;border-radius: 9px;background: #F8F9FC;"
              :class="`q-pa-sm row q-mr-md q-mb-md justify-center cursor-pointer relative-position ${typeIndex == ActiveCardIndex ? 'select' : ''}`"
              @click="selectType(typeIndex)">
              <q-img class="self-center q-mr-sm" :src="imageSrc(typeI.icon)" width="32px" height="32px" />
              <div style="font-size: 16px;" class="text-color-3 text-weight-bold self-center">{{ typeI.name }}</div>
              <q-img v-if="typeIndex == ActiveCardIndex" class="absolute" src="/images/select.png" width="30PX"
                height="30px" style="bottom: 0;right: 0;"></q-img>
            </div>
          </div>
        </q-scroll-area>

        <div>
          <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-xs">{{ $t('withdrawAmount') }}</div>
          <q-input prefix="￥" type="number" standout v-model="form.money" class="q-mb-sm">
            <template v-slot:append>
              <div @click="form.money = Total" style="font-size: 14px" class="text-primary">{{ $t('withdrawAllAmount') }}
              </div>
            </template>
          </q-input>
          <div class="text-color-6">{{ $t('balance') }}：￥{{ Total }}</div>
        </div>
      </div>

      <!-- 添加按钮 -->
      <q-btn unelevated rounded color="primary" :label="$t('withdraw')" class="full-width q-my-md" no-caps
        style="height: 44px;" @click="Withdraw" />
    </div>

    <!-- 安全密码 -->
    <q-dialog v-model="alertPass">
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';
import { NotifyPositive } from 'src/utils/notify';
import { imageSrc } from 'src/utils/index';
import { walletsAccountIndexAPI, walletsWithdrawCreateAPI } from 'src/apis/wallets';
import { UserStore } from 'src/stores/user';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

export default {
  name: 'withdrawalIndex',
  setup(props: any, context: any) {
    const { t } = useI18n()
    const $router = useRouter()
    const $userStore = UserStore()

    const state = reactive({
      alertPass: false,
      text: '' as any,
      password: '',
      money: '',
      Total: $userStore.userInfo.money,

      form: {} as any,

      // 选中卡片类型
      ActiveCardIndex: 0,

      // 卡片类型
      cardList: [] as any,
    });

    context.emit('update', {
      title: t('withdraw'),
    })

    onMounted(async () => {
      getCard()
    })

    // 获取卡片列表
    const getCard = () => {
      walletsAccountIndexAPI().then((res: any) => {
        console.log(res);
        state.cardList = res
      })
    }

    // 提现
    const Withdraw = () => {
      const params = {
        accountId: state.cardList[state.ActiveCardIndex].id,
        money: Number(state.form.money),
        securityKey: '',
      }
      walletsWithdrawCreateAPI(params).then((res: any) => {
        NotifyPositive(t('submittedSuccess'))
        console.log('提现成功', res);
        $router.push({ name: 'AccountCard' })
      })
    }

    // 切换卡片类型
    const selectType = (typeIndex: any) => {
      state.ActiveCardIndex = typeIndex
    }

    const yesFun = (router: any) => {
      state.alertPass = false;
      // 密码正确
      router.push({
        name: 'showMessage',
        state: {
          params: JSON.stringify({
            navTitle: 'withdrawal',
            title: 'Submitted successfully',
            content: 'Please be patient and keep an eye on the progress at any time',
            yesBtn: 'OK',
            logo: '/images/default/wait.png',
            backUrl: '/info'
          })
        }
      })
    };



    return {
      imageSrc,
      ...toRefs(state),
      yesFun,
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

:deep .q-field .q-field__append {
  color: #01AC66 !important;
}

:deep .q-field .q-field__control:hover:before {
  opacity: 0;
}

:deep(.q-scrollarea__thumb) {
  display: none !important;
}
</style>
