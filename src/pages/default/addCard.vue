<template>
  <div class="column full-height full-width">
    <navBar title="edit card"></navBar>
    <q-separator style="background: #F4F5FD;" />
    <div class="col   q-pa-md full-width column justify-between">
      <div class="col full-width">
        <!-- 卡类型选择 -->
        <q-scroll-area style="height: 60px; width: 100%;" :visible="false">
          <div class="row no-wrap">
            <div v-for="(typeI, typeIndex) in typeArr" :key="typeIndex" style="width: 120px;height: 50px;"
              :class="`q-pa-sm row page_bg radius-8 q-mr-sm justify-center ${typeIndex == typeDataIndex ? 'select' : ''}`"
              @click="typeDataIndex = typeIndex">
              <q-img class="self-center q-mr-sm" :src="typeI.image" width="26px" height="26px" />
              <div class="text-color-3 text-body1 text-weight-bold self-center">{{ typeI.value }}</div>
            </div>
          </div>
        </q-scroll-area>



        <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-sm">Bank Name</div>
        <div class="page_bg full-width row justify-between q-px-md" style="border-radius: 10px;height: 55px;"
          @click="dialog = true">
          <div class="self-center row">
            <q-img :src="options[model].image" width="26px" height="26px" />
            <div class="self-center q-ml-sm">{{ options[model].value }}</div>
          </div>
          <q-img class="self-center" src="/images/default/chevron.png" width="24px" height="24px" />
        </div>

        <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-sm">Card Owner</div>
        <q-input standout v-model="text" class="q-mb-md" />
        <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-sm">Card Number</div>
        <q-input standout v-model="text" class="q-mb-md" />
      </div>

      <!-- 添加按钮 -->
      <q-btn unelevated rounded color="primary" label="Save Card" class="full-width q-my-md" no-caps style="height: 44px;"
        @click="$router.push({ name: 'addCard' })" />
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
      <dialogAlert :isShowCloseBtn="false" title="Security Key" @eventDialogAlert="alertPass = false"
        @eventDialogAlertYesBtn="yesFun">
        <template v-slot:body>
          <div class="q-py-md">
            <q-input standout placeholder="请输入" v-model="text" :dense="true" class="alertInput" style="height: 48px;" />
          </div>
        </template>
      </dialogAlert>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import navBar from 'src/components/navBar.vue';
import dialogAlert from 'src/components/dialogAlert.vue';

export default {
  name: 'addNewCard',
  components: { navBar, dialogAlert },
  setup() {
    const state = reactive({
      dialog: false,
      alertPass: false,
      text: '',
      model: 0,
      typeDataIndex: 0,
      typeArr: [{
        image: '/images/delete/USDT.png',
        value: 'Card'
      }, {
        image: '/images/delete/BTC.png',
        value: 'TRC20'
      }, {
        image: '/images/delete/BTC.png',
        value: 'TRC20'
      }, {
        image: '/images/delete/BTC.png',
        value: 'TRC20'
      }],
      options: [
        {
          image: '/images/delete/USDT.png',
          value: '农业银行'
        }, {
          image: '/images/delete/BTC.png',
          value: '建设银行'
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
    return {
      ...toRefs(state),
      yesFun,
      changeSelect
    }
  }
};
</script>

<style lang="scss" scoped>
.cardTransparent {
  background: url('/images/default/cardTransparent.png') no-repeat;
  background-size: 100% 100%;
  height: 125px;
  width: 100%;
  border-radius: 14px;
}

.select {
  background-color: rgba(241, 250, 246, 1) !important;
  border: 1px solid $primary;
}

:deep(.q-scrollarea__thumb) {
  display: none !important;
}

:deep(.q-field__control) {
  background-color: #F5F6FA !important;
  height: 50px;
  box-shadow: none !important;
}

:deep(.q-field__marginal) {
  height: 50px;
}

:deep(.q-field--labeled .q-field__native) {
  padding: 0;
}

:deep(.userInfo-input .q-field__native) {
  text-align: end;
}

:deep(.q-field__label) {
  top: 20px;
}

:deep(.q-btn) {
  min-height: 44px;
}

:deep(.q-field--standout.q-field--rounded .q-field__control) {
  border-radius: 25px;
}

:deep(.q-field__control:before) {
  color: #333333 !important;
}

:deep(.q-field__native) {
  color: #333333 !important;
  font-weight: 500 !important;
  font-family: PingFangSC-Medium, sans-serif;
  line-height: 20px;
}

:deep(.q-field__prepend .q-field--standout .q-field--highlighted) {
  color: #333333 !important;
}

:deep(.q-field--focused .q-field--highlighted) {
  color: #333333 !important;
  background-color: #333333 !important;
}
</style>
