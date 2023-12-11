<template>
  <div class="column bg-grey-11" style="padding: 48px 244px;">
    <div class="col column justify-between bg-white radius-8">
      <div class="q-py-md q-px-lg row items-center no-wrap text-h5 text-weight-medium"
        style="background: linear-gradient(275deg, rgba(19,140,91,0.1) 0%, rgba(1,172,102,0.04) 100%);border-radius: 8px 8px 0 0;">
        <q-img src="/images/pc/card/add.png" width="40PX" height="28px"></q-img>
        <div class="q-ml-md">Edit Card</div>
      </div>
      <div class="col full-width q-pa-lg">
        <div class="text-color-3 text-subtitle1 text-weight-medium bg-grey-11 q-py-xs q-px-md" style="border-radius: 2px;">
          Account Type
        </div>
        <!-- 卡类型选择 -->
        <div class="row q-mt-md">
          <div v-for="(typeI, typeIndex) in typeArr" :key="typeIndex" style="width: 214px;height: 60px"
            :class="`q-pa-sm row bg-grey-11 q-mr-md q-mb-md radius-8 justify-center cursor-pointer relative-position ${typeIndex == typeDataIndex ? 'select' : ''}`"
            @click="typeDataIndex = typeIndex">
            <q-img class="self-center q-mr-sm" :src="typeI.image" width="32px" height="32px" />
            <div style="font-size: 16px;" class="text-color-3 text-weight-bold self-center">{{ typeI.value }}</div>
            <q-img v-if="typeIndex == typeDataIndex" class="absolute" src="/images/pc/recharge/select.png" width="30PX"
              height="30px" style="bottom: 0;right: 0;"></q-img>
          </div>
        </div>
        <!--  -->
        <div class="text-color-3 text-subtitle1 text-weight-medium bg-grey-11 q-py-xs q-mt-lg q-px-md"
          style="border-radius: 2px;">
          Basic Information
        </div>
        <!-- 创建信息输入 -->
        <!-- 卡片类型1 -->
        <div class="q-mt-lg q-pa-md" v-if="typeDataIndex==0">
          <div class="q-mb-lg">
            <div class="text-color-3 text-weight-medium q-mb-xs">银行名称：</div>
            <div class="row justify-between q-px-md q-mb-md q-py-sm"
              style="border-radius: 4px;width: 420px;border: 1px solid #DDDDDD;" @click="dialog = true">
              <div class="self-center row">
                <q-img :src="options[model].image" width="26px" height="26px" />
                <div class="self-center q-ml-sm">{{ options[model].value }}</div>
              </div>
              <q-img class="self-center" src="/images/default/chevron.png" width="24px" height="24px" />
              <!-- 下拉 -->
              <q-menu auto-close transition-show="jump-down" transition-hide="jump-up">
                <q-list style="min-width: 268px" class="q-py-sm">
                  <q-item @click="model=i" v-for="(item,i) in options" :key="i" clickable
                    class="row no-wrap items-center">
                    <q-img class="q-mr-sm" :src="item.image" width="38px" height="38px" />
                    <div>
                      <div style="font-size: 16px;">{{item.value}}</div>
                    </div>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
          </div>
          <div class="q-mb-lg">
            <div class="text-color-3 text-weight-medium q-mb-xs">银行卡号：</div>
            <q-input type="number" standout v-model="text" />
          </div>
          <div class="q-mb-lg">
            <div class="text-color-3 text-weight-medium q-mb-xs">本人姓名：</div>
            <q-input standout v-model="text" />
          </div>
          <q-btn unelevated rounded color="primary" label="Submit" class="q-my-md" no-caps
            style="height: 40px;width: 144px;" @click="alertPass = true" />
        </div>
        <!-- 卡片类型2 -->
        <div class="q-mt-lg q-pa-md" v-else>
          <div class="q-mb-lg">
            <div class="text-color-3 text-weight-medium q-mb-xs">Public Blockchain</div>
            <div class="row justify-between q-px-md q-mb-md q-py-sm"
              style="border-radius: 4px;width: 420px;border: 1px solid #DDDDDD;" @click="dialog = true">
              <div class="self-center row">
                <q-img :src="options[model].image" width="26px" height="26px" />
                <div class="self-center q-ml-sm">{{ options[model].value }}</div>
              </div>
              <q-img class="self-center" src="/images/default/chevron.png" width="24px" height="24px" />
              <!-- 下拉 -->
              <q-menu auto-close transition-show="jump-down" transition-hide="jump-up">
                <q-list style="min-width: 268px" class="q-py-sm">
                  <q-item @click="model=i" v-for="(item,i) in options" :key="i" clickable
                    class="row no-wrap items-center">
                    <q-img class="q-mr-sm" :src="item.image" width="38px" height="38px" />
                    <div>
                      <div style="font-size: 16px;">{{item.value}}</div>
                    </div>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
          </div>
          <div class="q-mb-lg">
            <div class="text-color-3 text-weight-medium q-mb-xs">Token Name</div>
            <div class="row justify-between q-px-md q-mb-md q-py-sm"
              style="border-radius: 4px;width: 420px;border: 1px solid #DDDDDD;" @click="dialog = true">
              <div class="self-center row">
                <q-img :src="options[model].image" width="26px" height="26px" />
                <div class="self-center q-ml-sm">{{ options[model].value }}</div>
              </div>
              <q-img class="self-center" src="/images/default/chevron.png" width="24px" height="24px" />
              <!-- 下拉 -->
              <q-menu auto-close transition-show="jump-down" transition-hide="jump-up">
                <q-list style="min-width: 268px" class="q-py-sm">
                  <q-item @click="model=i" v-for="(item,i) in options" :key="i" clickable
                    class="row no-wrap items-center">
                    <q-img class="q-mr-sm" :src="item.image" width="38px" height="38px" />
                    <div>
                      <div style="font-size: 16px;">{{item.value}}</div>
                    </div>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
          </div>
          <div class="q-mb-lg">
            <div class="text-color-3 text-weight-medium q-mb-xs">Token Address</div>
            <q-input standout v-model="text" />
          </div>
          <q-btn unelevated rounded color="primary" label="Submit" class="q-my-md" no-caps
            style="height: 40px;width: 144px;" @click="alertPass = true" />
        </div>
      </div>

      <!-- 成功-->
      <q-dialog v-model="alertPass">
        <q-card style="width: 380px;">
          <q-card-section style="padding: 20px;">
            <div class="row no-wrap">
              <div class="text-weight-bold text-color-3 text-h5">
                Enter Security Key
              </div>
              <q-space />
              <q-btn class="text-color-6" icon="close" flat round dense v-close-popup />
            </div>
            <div class="q-mt-lg">
              <q-form>
                <q-input standout class="q-mb-md" type="password" v-model="text" placeholder="Enter Security Key">
                </q-input>
                <div class="row justify-center q-mt-lg">
                  <q-btn class="q-mr-md text-color-3" unelevated rounded no-caps @click="alertPass=false" style="background: #F3F5F5;height: 40px;width: 160px;" label="Cancel"></q-btn>
                  <q-btn @click="alertPass=false" class="" unelevated rounded no-caps style="height: 40px;width: 160px;"
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
  import { reactive, toRefs } from 'vue';
  export default {
    name: 'editCard',
    setup() {
      const state = reactive({
        // 密码对话框
        alertPass: false,
        text: '',
        model: 0,
        typeDataIndex: 0,
        imgUrl: '',
        inviteUrl: '09z8we73847zusyd873ezs88d009z8we73847zusyd873ezs88d0',
        typeArr: [{
          image: '/images/delete/USDT.png',
          value: 'Card',
          type: 2
        }, {
          image: '/images/delete/USDT.png',
          value: 'TRC20',
          type: 1
        }, {
          image: '/images/delete/USDT.png',
          value: 'TRC20',
          type: 1
        }, {
          image: '/images/delete/USDT.png',
          value: 'TRC20',
          type: 1
        }],
        options: [
          {
            image: '/images/delete/USDT.png',
            value: '农业银行'
          }, {
            image: '/images/delete/BTC.png',
            value: '建设银行'
          },
        ],
      });

      const yesFun = (router : any) => {
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
        ...toRefs(state),
        yesFun,
      }
    }
  };
</script>

<style lang="scss" scoped>
  .select {
    background-color: rgba(241, 250, 246, 1) !important;
    border: 1px solid $primary;
  }

  // pc版input样式
  :deep .q-field--standout .q-field__native {
    color: rgba(0, 0, 0, 0.87) !important;
  }

  :deep .q-field--standout .q-field__control {
    width: 420px;
    background: #fff !important;
    height: 40px !important;
    min-height: 40px !important;
    outline: none !important;
    border: 1px solid #DDDDDD;
    box-shadow: none !important;
    border-radius: 4px;
  }
</style>
