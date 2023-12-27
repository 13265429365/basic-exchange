<template>
  <div class="column" style="padding: 48px 244px;background: #F8F9FC;">
    <div class="col column justify-between bg-white rounded-borders">

      <!-- 大标题 -->
      <div class="q-py-md q-px-lg row items-center no-wrap size20 text-weight-medium"
        style="background: linear-gradient(275deg, rgba(19,140,91,0.1) 0%, rgba(1,172,102,0.04) 100%);border-radius: 8px 8px 0 0;">
        <q-img :src="imageSrc('')" width="40PX" height="40px"></q-img>
        <div class="q-ml-md">{{ $t('withdraw') }}</div>
      </div>

      <!--  -->
      <div class="col full-width q-pa-lg">
        <div class="text-color-3 text-subtitle1 text-weight-medium q-py-sm q-px-md"
          style="border-radius: 2px;background: #F8F9FC;">
          Withdrawal account
        </div>

        <!-- 卡类型选择 -->
        <div class="row q-mt-md">
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

        <!-- 提现 -->
        <div class="q-mt-lg">
          <div class="row no-wrap items-center q-mb-md">
            <div class="text-weight-medium q-mr-xs">
              {{ $t('balance') }}：
            </div>
            <div class="text-weight-medium size16" style="color: #F45E0C;">{{ '$' + Total }}</div>
          </div>

          <div class="row no-wrap items-center q-mb-lg">
            <div class="text-color-3 text-weight-medium q-mr-xs">{{ $t('withdrawAmount') }}：</div>
            <q-input type="number" outlined v-model="form.money" />
            <div @click="form.money = Total" class="text-primary q-ml-sm cursor-pointer">{{ $t('withdrawAllAmount') }}
            </div>
          </div>

        </div>
        <!-- 添加按钮 -->
        <q-btn unelevated rounded color="primary" :label="$t('submit')" class="q-my-md" no-caps
          style="height: 40px;width: 207px;" @click="Withdraw" />
      </div>


    </div>

    <!-- 成功-->
    <q-dialog v-model="alertPass">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <div class="bg-white q-pt-sm q-pa-xl  justify-between" style="width:475px">
          <div class="row justify-center">
            <q-img src="/images/pc/recharge/success.png" width="120px" height="120px" />

          </div>
          <div class="row justify-center">
            <div class="text-color-3 text-h6 text-weight-medium q-mt-md">Submitted successfully</div>
          </div>
          <div class="text-color-9 text-body2 text-center q-mt-sm">
            Please be patient and keep an eye on the progress at any time
          </div>
          <div class="row justify-center">
            <q-btn unelevated rounded color="primary" label="OK" style="width: 260px;" class="q-mt-xl" no-caps
              @click="alertPass = !alertPass" />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';
import { NotifyPositive } from 'src/utils/notify';
import { imageSrc } from 'src/utils/index';
import { userGetCard, userWithdraw } from 'src/apis/wallets';
import { UserStore } from 'src/stores/user';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

export default {
  name: 'withdrawalIndex',
  setup() {
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

    onMounted(async () => {
      getCard()
    })

    // 获取卡片列表
    const getCard = () => {
      userGetCard().then((res: any) => {
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
      userWithdraw(params).then((res: any) => {
        NotifyPositive(t('submittedSuccess'))
        console.log('提现成功', res);
        $router.push({ name: 'AccountCard' })
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
