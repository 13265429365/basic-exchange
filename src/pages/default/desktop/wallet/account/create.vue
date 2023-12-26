<template>
  <div class="column bg-grey-2" style="padding: 48px 244px;background: #F8F9FC;">
    <div class="col column justify-between bg-white rounded-borders">
      <!-- 大标题 -->
      <div class="q-py-md q-px-lg row items-center no-wrap size20 text-weight-medium"
        style="background: linear-gradient(275deg, rgba(19,140,91,0.1) 0%, rgba(1,172,102,0.04) 100%);border-radius: 8px 8px 0 0;">
        <q-img :src="imageSrc('')" width="40PX" height="28px"></q-img>
        <div class="q-ml-md"> {{ $route.query.type == 'add' ? $t('create') : $t('edit') }}</div>
      </div>

      <!--  -->
      <div class="col full-width q-pa-lg">
        <div class="text-color-3 text-subtitle1 text-weight-medium q-py-xs q-px-md" style="border-radius: 2px;
background: #F8F9FC;">
          {{ $t('type') }}
        </div>

        <!-- 卡类型选择 -->
        <div class="row q-mt-md">
          <div v-for="(typeI, typeIndex) in cardType" :key="typeIndex"
            style="width: 214px;height: 50px;border-radius: 9px;background: #F8F9FC;"
            :class="`q-pa-sm row q-mr-md q-mb-md justify-center cursor-pointer relative-position ${typeIndex == ActiveCardIndex ? 'select' : ''}`"
            @click="selectType(typeIndex)">
            <q-img class="self-center q-mr-sm" :src="imageSrc(typeI.icon)" width="32px" height="32px" />
            <div style="font-size: 16px;" class="text-color-3 text-weight-bold self-center">{{ typeI.name }}</div>
            <q-img v-if="typeIndex == ActiveCardIndex" class="absolute" src="/images/select.png" width="30PX"
              height="30px" style="bottom: 0;right: 0;"></q-img>
          </div>
        </div>

        <!--  -->
        <div class="text-color-3 text-subtitle1 text-weight-medium q-py-xs q-mt-lg q-px-md" style="border-radius: 2px;
background: #F8F9FC;">
          {{ $t('depositAccountInfo') }}
        </div>



        <!-- 卡片类型1 -->
        <div class="q-mt-lg q-pa-md">
          <q-form @submit="submit" class="q-gutter-md">
            <!-- 银行名称 -->
            <div class="q-mb-lg"
              v-if="cardType[ActiveCardIndex] && cardType[ActiveCardIndex].items && cardType[ActiveCardIndex].items.length > 0">
              <div class="text-color-3 text-weight-medium q-mb-xs">{{ $t('bankName') }}：</div>
              <div class="row justify-between q-px-md q-mb-md q-py-sm"
                style="border-radius: 4px;width: 420px;border: 1px solid #DDDDDD;">
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
            <div class="q-mb-lg">
              <div class="text-color-3 text-weight-medium q-mb-xs">{{ $t('idName') }}：</div>
              <q-input standout v-model="form.realName" :rules="[val => val && val.length > 0]" />
            </div>

            <!-- 银行卡号 -->
            <div class="q-mb-lg">
              <div class="text-color-3 text-weight-medium q-mb-xs">{{ $t('bankNumber') }}：</div>
              <q-input type="number" standout v-model="form.number" :rules="[val => val && val.length > 0]" />
            </div>

            <!-- 银行地址-->
            <div class="q-mb-lg">
              <div class="text-color-3 text-weight-medium q-mb-xs">{{ $t('digitalAddress') }}：</div>
              <q-input type="text" standout v-model="form.code" />
            </div>

            <q-btn unelevated rounded color="primary" :label="$t('submit')" class="q-my-md" no-caps
              style="height: 40px;width: 144px;" type="submit" />
          </q-form>
        </div>

      </div>

      <!-- 成功-->
      <q-dialog v-model="alertPass">
        <q-card style="width: 380px;">
          <q-card-section style="padding: 20px;">
            <div class="row no-wrap">
              <div class="text-weight-bold text-color-3 size20">
                Enter Security Key
              </div>
              <q-space />
              <q-btn class="text-color-6" icon="close" flat round dense v-close-popup />
            </div>
            <div class="q-mt-lg">
              <q-form>
                <q-input standout class="q-mb-md" type="password" v-model="form.number" placeholder="Enter Security Key">
                </q-input>
                <div class="row justify-center q-mt-lg">
                  <q-btn class="q-mr-md text-color-3" unelevated rounded no-caps @click="alertPass = false"
                    style="background: #F3F5F5;height: 40px;width: 160px;" label="Cancel"></q-btn>
                  <q-btn @click="alertPass = false" class="" unelevated rounded no-caps style="height: 40px;width: 160px;"
                    color="primary" label="Save" />
                </div>
              </q-form>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { imageSrc } from 'src/utils/index';
import { userPayment, userAddCard, userEditCard, userGetCardInfo } from 'src/apis/wallets';

export default {
  name: 'addCard',
  setup() {
    const $route = useRoute()
    const $router = useRouter()

    const state = reactive({
      // 密码对话框
      alertPass: false,

      form: {
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
      userGetCardInfo({ id: Number($route.query.id) }).then((res: any) => {
        console.log('卡片详情', res);
        state.form = res
      })
    }

    // 获取支付列表
    const getPayment = () => {
      userPayment({ modes: [] }).then((res: any) => {
        console.log('支付列表', res);
        state.cardType = res
        // 预设
        state.cardType.forEach((cardType: any, cardTypeIndex: any) => {
          if (cardType.name == state.form.name) {
            state.ActiveCardIndex = cardTypeIndex
            cardType.items.forEach((items: any, itemsIndex: any) => {
              if (items.id == state.form.paymentId) {
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
          realName: state.form.realName,
          number: state.form.number,
          code: state.form.code,
        }
        userAddCard(params).then((res: any) => {
          console.log(res);
          $router.push({ name: 'AccountCard' })
        })
      } else {
        let params = {
          id: state.form.id,
          name: state.cardType[state.ActiveCardIndex].items[state.ActiveBankIndex].name,
          paymentId: state.cardType[state.ActiveCardIndex].items[state.ActiveBankIndex].id,
          realName: state.form.realName,
          number: state.form.number,
          code: state.form.code,
        }
        userEditCard(params).then((res: any) => {
          console.log(res);
          $router.push({ name: 'AccountCard' })
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

:deep(.q-field--standout .q-field__control) {
  width: 420px;
  height: 40px !important;
  min-height: 40px !important;

  .q-field__append {
    height: 40px !important;
    min-height: 40px !important;
  }
}
</style>
