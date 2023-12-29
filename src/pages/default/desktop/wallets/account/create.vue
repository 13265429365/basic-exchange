<template>
  <div class="column bg-grey-2" style="padding: 48px 244px;background: #F8F9FC;">
    <div class="col column justify-between bg-white rounded-borders">
      <!-- 大标题 -->
      <div class="q-py-md q-px-lg row items-center no-wrap text-body1 text-weight-medium"
        style="background: linear-gradient(275deg, rgba(19,140,91,0.1) 0%, rgba(1,172,102,0.04) 100%);border-radius: 8px 8px 0 0;">
        <q-img :src="imageSrc('')" width="40PX" height="28px"></q-img>
        <div class="q-ml-md"> {{ $route.query.type == 'add' ? $t('create') : $t('edit') }}</div>
      </div>

      <div class="col full-width q-pa-lg">
        <!-- 类型选择 -->
        <div class="rounded-borders text-subtitle1 text-weight-medium q-py-xs q-px-md" style="background: #F8F9FC;">
          {{ $t('type') }}
        </div>

        <!-- 卡类型选择 -->
        <div class="row q-mt-md">
          <div v-for="(typeI, typeIndex) in cardType" :key="typeIndex"
            style="width: 214px;height: 50px;border-radius: 9px;background: #F8F9FC;"
            :class="`q-pa-sm row q-mr-md q-mb-md justify-center cursor-pointer relative-position ${typeIndex == ActiveCardIndex ? 'select' : ''}`"
            @click="selectType(typeIndex)">
            <q-img class="self-center q-mr-sm" :src="imageSrc(typeI.icon)" width="32px" height="32px" />
            <div style="font-size: 16px;" class=" text-weight-bold self-center">{{ typeI.name }}</div>
            <q-img v-if="typeIndex == ActiveCardIndex" class="absolute" src="/images/select.png" width="30PX"
              height="30px" style="bottom: 0;right: 0;"></q-img>
          </div>
        </div>

        <div class="text-subtitle1 text-weight-medium q-py-xs q-mt-lg q-px-md"
          style="border-radius: 2px;background: #F8F9FC;">
          {{ $t('depositAccountInfo') }}
        </div>

        <!-- 卡片信息 -->
        <div class="q-mt-lg q-pa-md">
          <div class="q-gutter-lg" style="width:40%;">
            <!-- 银行名称 -->
            <div
              v-if="cardType[ActiveCardIndex] && cardType[ActiveCardIndex].items && cardType[ActiveCardIndex].items.length > 0">
              <div class=" text-weight-medium q-mb-xs">{{ $t('bankName') }}：</div>
              <div class="row justify-between q-px-md q-mb-md q-py-sm rounded-borders"
                style="border:1px solid rgba(0, 0, 0, 0.24)">
                <div class="self-center row">
                  <q-img :src="imageSrc(cardType[ActiveCardIndex].items[ActiveBankIndex].icon)" width="26px"
                    height="26px" />
                  <div class="self-center q-ml-sm">{{ cardType[ActiveCardIndex].items[ActiveBankIndex].name }}</div>
                </div>
                <q-icon class="self-center" name="expand_more" size="24px"></q-icon>
                <!-- 下拉 -->
                <q-menu auto-close transition-show="jump-down" transition-hide="jump-up">
                  <q-list style="min-width: 268px" class="q-py-sm">
                    <q-item @click="ActiveBankIndex = bankTypeIndex"
                      v-for="(bankType, bankTypeIndex) in cardType[ActiveCardIndex].items" :key="bankTypeIndex" clickable
                      class="row no-wrap items-center">
                      <q-img class="q-mr-sm" :src="imageSrc(bankType.icon)" width="38px" height="38px" />
                      <div>
                        <div style="font-size: 16px;">{{ bankType.name }}</div>
                      </div>
                      <q-space />
                      <q-icon v-if="ActiveBankIndex == bankTypeIndex" name="o_check_circle" color="primary"
                        size="20px"></q-icon>
                    </q-item>
                  </q-list>
                </q-menu>
              </div>
            </div>

            <!-- 本人姓名 -->
            <div>
              <div class="text-weight-medium q-mb-xs">{{ $t('idName') }}：</div>
              <q-input dense outlined v-model="params.realName" />
            </div>

            <!-- 银行卡号 -->
            <div>
              <div class="text-weight-medium q-mb-xs">{{ $t('bankNumber') }}：</div>
              <q-input type="number" dense outlined v-model="params.number" />
            </div>

            <!-- 银行地址-->
            <div>
              <div class="text-weight-medium q-mb-xs">{{ $t('digitalAddress') }}：</div>
              <q-input type="text" dense outlined v-model="params.code" />
            </div>

            <q-btn unelevated rounded color="primary" :label="$t('submit')" class="q-my-md" no-caps
              style="height: 40px;width: 144px;" @click="submit" />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { imageSrc } from 'src/utils/index';
import { walletsPaymentIndexAPI, walletsAccountCreateAPI, walletsAccountUpdateAPI, walletsAccountInfoAPI } from 'src/apis/wallets';
import { useI18n } from 'vue-i18n';
import { NotifyPositive } from 'src/utils/notify';

export default {
  name: 'addCard',
  setup() {
    const $route = useRoute()
    const $router = useRouter()
    const { t } = useI18n(); // 获取t函数进行翻译

    const state = reactive({
      // 密码对话框
      alertPass: false,

      params: {} as any,

      // 当前选中的银行key
      ActiveBankIndex: 0,

      // 选中卡片类型
      ActiveCardIndex: 0,

      // 卡片类型
      cardType: [] as any,
    });

    // 如果编辑卡片就要获取卡片详情
    onMounted(() => {
      if ($route.query.type == 'edit') {
        getCardInfo()
      }
      getPayment()
    })


    // 切换卡片类型
    const selectType = (typeIndex: any) => {
      state.ActiveCardIndex = typeIndex
      state.ActiveBankIndex = 0
    }

    // 获取卡片详情
    const getCardInfo = () => {
      walletsAccountInfoAPI({ id: Number($route.query.id) }).then((res: any) => {
        console.log('卡片详情', res);
        state.params = res
      })
    }

    // 获取支付列表
    const getPayment = () => {
      walletsPaymentIndexAPI({ modes: [] }).then((res: any) => {
        console.log('支付列表', res);
        state.cardType = res
        // 预设
        state.cardType.forEach((cardType: any, cardTypeIndex: any) => {
          if (cardType.name == state.params.name) {
            state.ActiveCardIndex = cardTypeIndex
            cardType.items.forEach((items: any, itemsIndex: any) => {
              if (items.id == state.params.paymentId) {
                state.ActiveBankIndex = itemsIndex
              }
            })
          }
        });
      })
    }

    const submit = () => {
      // 判断编辑还是添加卡片
      if ($route.query.type == 'add') {
        state.params.paymentId = state.cardType[state.ActiveCardIndex].items[state.ActiveBankIndex].id
        walletsAccountCreateAPI(state.params).then((res: any) => {
          console.log(res);
          NotifyPositive(t('submittedSuccess'))
          $router.push({ name: 'WalletsAccountIndex' })
        })
      } else {
        state.params.name = state.cardType[state.ActiveCardIndex].items[state.ActiveBankIndex].name
        state.params.paymentId = state.cardType[state.ActiveCardIndex].items[state.ActiveBankIndex].id
        walletsAccountUpdateAPI(state.params).then((res: any) => {
          console.log(res);
          NotifyPositive(t('submittedSuccess'))
          $router.push({ name: 'WalletsAccountIndex' })
        })
      }

    }


    const yesFun = (router: any) => {
      state.alertPass = false;
      // 密码正确
      router.push({
        name: 'showMessage',
        state: {
          params: JSON.stringify({
            title: 'Created Successfully',
            content: '',
            yesBtn: 'OK',
            logo: '/images/default/success.png',
            backUrl: ''
          })
        }
      })
    };

    return {
      imageSrc,
      ...toRefs(state),
      yesFun,
      submit,
      selectType,
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
