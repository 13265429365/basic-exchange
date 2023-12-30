<template>
  <div class="column full-height full-width">
    <div class="col q-pa-md full-width column justify-between">
      <div class="col full-width row justify-center">
        <!-- 卡类型选择 -->
        <q-scroll-area style="height: 80px; width: 100%;" :thumb-style="{ display: 'none' }" :visible="false">
          <div class="row no-wrap">
            <div v-for="(typeI, typeIndex) in cardType" :key="typeIndex"
              style="width: 200px;height: 50px;border-radius: 9px"
              :class="`page_bg q-pa-sm row q-mr-md justify-center cursor-pointer relative-position ${typeIndex == ActiveCardIndex ? 'select' : ''}`"
              @click="selectType(typeIndex)">
              <q-img class="self-center q-mr-sm" :src="imageSrc(typeI.icon)" width="32px" height="32px" />
              <div class="text-color-3 text-weight-bold self-center">{{ typeI.name }}</div>
              <q-img v-if="typeIndex == ActiveCardIndex" class="absolute" src="/images/select.png" width="30PX"
                height="30px" style="bottom: 0;right: 0;"></q-img>
            </div>
          </div>
        </q-scroll-area>


        <!-- 数字货币类型 -->
        <div class="full-width">
          <!-- 银行名称 -->
          <div
            v-if="cardType[ActiveCardIndex] && cardType[ActiveCardIndex].items && cardType[ActiveCardIndex].items.length > 0">
            <div class="text-color-3 text-weight-medium q-mb-xs">{{ $t('bankName') }}：</div>
            <div class="row justify-between q-px-md q-mb-md q-py-sm rounded-borders"
              style="height: 45px;border: 1px solid rgba(0, 0, 0, 0.24)">
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
          <div class="q-mt-md">
            <div class="text-color-3 text-weight-medium q-mb-xs">{{ $t('idName') }}</div>
            <q-input outlined dense v-model="params.realName" />
          </div>

          <!-- 银行卡号 -->
          <div class="q-mt-md">
            <div class="text-color-3 text-weight-medium q-mb-xs">{{ $t('bankNumber') }}</div>
            <q-input type="number" outlined dense v-model="params.number" />
          </div>

          <!-- 银行地址-->
          <div class="q-mt-md q-mb-xl">
            <div class="text-color-3 text-weight-medium q-mb-xs">{{ $t('digitalAddress') }}</div>
            <q-input type="text" outlined dense v-model="params.code" />
          </div>

          <q-btn unelevated rounded color="primary" :label="$t('submit')" class="full-width q-my-md" no-caps
            style="height: 44px;" @click="submit" />
        </div>
      </div>

      <!-- 添加按钮 -->

    </div>

  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { reactive, toRefs, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { imageSrc } from 'src/utils/index';
import { walletsPaymentIndexAPI, walletsAccountCreateAPI, walletsAccountUpdateAPI, walletsAccountInfoAPI } from 'src/apis/wallets';


export default {
  name: 'addCard',
  setup(props: any, context: any) {
    const { t } = useI18n(); // 获取t函数进行翻译
    const $route = useRoute()
    const $router = useRouter()

    const state = reactive({
      params: {
        number: '',
        realName: '',
        code: '',
        id: '',
      } as any,

      // 当前选中的银行key
      ActiveBankIndex: 0,

      // 选中卡片类型
      ActiveCardIndex: 0,

      // 卡片类型
      cardType: [] as any,
    });

    context.emit('update', {
      title: t('accountManage')
    })

    // 如果编辑卡片就要获取卡片详情
    onMounted(async () => {
      if ($route.query.type == 'edit') {
        await getCardInfo()
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
        let params = {
          paymentId: state.cardType[state.ActiveCardIndex].items[state.ActiveBankIndex].id,
          realName: state.params.realName,
          number: state.params.number,
          code: state.params.code,
        }
        walletsAccountCreateAPI(params).then((res: any) => {
          console.log(res);
          $router.push({ name: 'AccountCard' })
        })
      } else {
        let params = {
          id: state.params.id,
          name: state.cardType[state.ActiveCardIndex].items[state.ActiveBankIndex].name,
          paymentId: state.cardType[state.ActiveCardIndex].items[state.ActiveBankIndex].id,
          realName: state.params.realName,
          number: state.params.number,
          code: state.params.code,
        }
        walletsAccountUpdateAPI(params).then((res: any) => {
          console.log(res);
          $router.push({ name: 'AccountCard' })
        })
      }

    }


    return {
      imageSrc,
      ...toRefs(state),
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
