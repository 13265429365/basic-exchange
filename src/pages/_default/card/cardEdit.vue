<template>
  <div class="column full-height full-width">
    <navBar title="Card"></navBar>
    <q-separator style="background: #F4F5FD;" />
    <div class="col   q-pa-md full-width column justify-between">
      <div>
        <div class="q-mb-md"
          :style="`height: 125px;background: linear-gradient(90deg, ${type == 1 ? '#1EC273' : '#7475BF'} 0%, ${type == 1 ? '#71D687' : '#3D8FC9'} 100%);border-radius: 14px;overflow: hidden;`">
          <div class="cardTransparent row " style="padding: 15px 20px;">
            <q-img src="/images/mobile/card/USDT.png" width="34px" height="34px" />
            <div class="col column justify-between">
              <div class="row justify-between q-pl-sm">
                <div>
                  <div class="text-white text-weight-bold">兴业银行·厦门支行</div>
                  <div class="text-white text-weight-bold" style="font-size: 10px;">Debit Card</div>
                </div>
              </div>

              <div>
                <div class="text-white text-weight-bold" style="font-size: 10px;">Card Number</div>
                <div class="text-white text-weight-bold" style="font-size: 18px;">6986 3652 9868 2636</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 银行卡类型 -->
        <div class="col full-width" v-if="type == 1">
          <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-sm">Bank Name</div>
          <div class="page_bg full-width row justify-between q-px-md q-mb-md" style="border-radius: 10px;height: 55px;"
            @click="dialog = true">
            <div class="self-center row">
              <q-img :src="options[model].image" width="26px" height="26px" />
              <div class="self-center q-ml-sm">{{ options[model].value }}</div>
            </div>
            <q-img class="self-center" src="/images/mobile/card/chevron.png" width="24px" height="24px" />
          </div>

          <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-sm">Card Owner</div>
          <q-input standout v-model="text" class="q-mb-md" />
          <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-sm">Card Number</div>
          <q-input standout v-model="text" class="q-mb-md" />
        </div>
        <!-- 数字货币类型 -->
        <div v-else>
          <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-sm">Public Blockchain</div>
          <div class="page_bg full-width row justify-between q-px-md q-mb-md" style="border-radius: 10px;height: 55px;"
            @click="dialog = true">
            <div class="self-center row">
              <q-img :src="options[model].image" width="26px" height="26px" />
              <div class="self-center q-ml-sm">{{ options[model].value }}</div>
            </div>
            <q-img class="self-center" src="/images/mobile/card/chevron.png" width="24px" height="24px" />
          </div>

          <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-sm">Token Name</div>
          <div class="page_bg full-width row justify-between q-px-md q-mb-md" style="border-radius: 10px;height: 55px;"
            @click="dialog = true">
            <div class="self-center row">
              <q-img :src="options[model].image" width="26px" height="26px" />
              <div class="self-center q-ml-sm">{{ options[model].value }}</div>
            </div>
            <q-img class="self-center" src="/images/mobile/card/chevron.png" width="24px" height="24px" />
          </div>

          <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-sm">Token Address</div>
          <q-input standout v-model="text" class="q-mb-md" />

        </div>
      </div>

      <!-- 添加按钮 -->
      <q-btn unelevated rounded color="primary" label="Save Card" class="full-width q-my-md" no-caps style="height: 44px;"
        @click="alertPass = true;" />


    </div>
    <!-- 选择框 -->
    <q-dialog v-model="dialog" position="bottom">
      <q-card style="width: 100%">
        <div v-for="(i, index) in options" :key="index" class="row q-pa-sm" @click="changeSelect(index)">
          <q-img class="self-center" :src="i.image" width="26px" height="26px" />
          <div class="q-ml-sm self-center">{{ i.value }}</div>
        </div>
      </q-card>
    </q-dialog>

    <!-- 安全密码 -->
    <q-dialog v-model="alertPass">
      <dialogAlert :isShowCloseBtn="false" title="Security Key" @eventDialogAlert="passwordFun"
        @eventDialogAlertYesBtn="yesFun">
        <template v-slot:body>
          <div class="q-py-md">
            <q-input type="password" standout placeholder="请输入" v-model="password" :dense="true" class="alertInput"
              style="height: 48px;" />
          </div>
        </template>
      </dialogAlert>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';
import navBar from 'src/layouts/mobile/header.vue';
import dialogAlert from 'src/components/mobile/dialogAlert.vue';
import { useRoute } from 'vue-router';

export default {
  name: 'cardEdit',
  components: { navBar, dialogAlert },
  setup() {
    const route = useRoute();
    const state = reactive({
      dialog: false,
      alertPass: false,
      password: '',
      text: '',
      model: 0,
      type: 1, //钱包类型
      options: [
        {
          image: '/images/mobile/card/USDT.png',
          value: 'USDT'
        }, {
          image: '/images/mobile/card/BTC.png',
          value: 'BTC'
        },
      ]
    });
    const yesFun = () => {
      state.alertPass = false;
    };
    // 选择银行
    const changeSelect = (i: any) => {
      state.model = i;
      state.dialog = false;
    };
    // 安全密码
    const passwordFun = () => {
      state.alertPass = false;
    }
    onMounted(() => {
      state.type = route.query.type as any;
    })
    return {
      ...toRefs(state),
      yesFun,
      changeSelect,
      passwordFun
    }
  }
};
</script>

<style lang="scss" scoped>
  @import url("../../../css/mobileCss.css");
.cardTransparent {
  background: url('page_bg/cardTransparent.png') no-repeat;
  background-size: 100% 100%;
  height: 125px;
  width: 100%;
  border-radius: 14px;
}


:deep(.q-field__control) {
  background-color: #F5F6FA !important;
  height: 50px;
  box-shadow: none !important;
}

:deep(.q-field__marginal) {
  height: 50px;
}

// :deep(.q-field--labeled .q-field__native) {
//   padding: 0;
// }

// :deep(.userInfo-input .q-field__native) {
//   text-align: end;
// }

// :deep(.q-field__label) {
//   top: 20px;
// }

// :deep(.q-btn) {
//   min-height: 44px;
// }

// :deep(.q-field--standout.q-field--rounded .q-field__control) {
//   border-radius: 25px;
// }

// :deep(.q-field__control:before) {
//   color: #333333 !important;
// }

// :deep(.q-field__native) {
//   color: #333333 !important;
//   font-weight: 500 !important;
//   font-family: PingFangSC-Medium, sans-serif;
//   line-height: 20px;
// }

// :deep(.q-field__prepend .q-field--standout .q-field--highlighted) {
//   color: #333333 !important;
// }

// :deep(.q-field--focused .q-field--highlighted) {
//   color: #333333 !important;
//   background-color: #333333 !important;
// }
</style>
