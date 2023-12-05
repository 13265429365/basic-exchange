<template>
  <div class="mypage">
    <div @click="toEdit()" class="row justify-between q-pt-xl q-mt-md q-px-md q-pb-lg">
      <!-- 头像 -->
      <div class="row">
        <div class="q-mr-md avatar">
          <q-avatar class="q-mr-md avatar">
            <img src="/images/default/head.png">
          </q-avatar>
        </div>
        <div class="col-8">
          <div class="text-weight-bold" style="font-size: 18px;line-height: 1;">
            Ahmed Raza
          </div>
          <div class="q-mt-xs q-mb-sm">
            ahmedraza@gmail.com
          </div>
          <div class="row no-wrap">
            <q-chip class="q-chip">
              <q-img class="vip" src="/images/default/Vip_icon.png" />
              Lv.3
            </q-chip>
            <q-chip style="background: #fff !important;color: #333333 !important;border: 1px solid #F1F1F1;">
              <q-img class="vip" src="/images/default/credit.png" />
              信用分100
            </q-chip>
            <q-chip style="background: #fff !important;color: #01AC66 !important;border: 1px solid #01AC66;">
              已实名
              <span style="font-size: 11px;">＞</span>
              <!-- <q-img class="q-ml-xs vip" src="/images/default/right_arrow.png.png" /> -->
            </q-chip>
          </div>
        </div>
      </div>
      <div>
        <q-img class="iconLogo" src="/images/default/right_arrow.png" />
      </div>
    </div>
    <div class="bg-grey-1 q-px-md q-py-md full-width">
      <!-- 店铺、交易管理 -->
      <div class="row q-mb-md btn">
        <q-btn @click="to('recharge')" no-caps style="padding: 9px 15px;border-radius: 8px" class="bg-white col q-mr-md justify-start">
          <q-img class="manage" src="/images/default/shop.png" />
          <div>Recharge</div>
        </q-btn>
        <q-btn @click="to('withdrawal')" no-caps style="padding: 9px 15px;border-radius: 8px" class="bg-white col">
          <q-img class="manage" src="/images/default/transaction.png" />
          <div>Cash Out</div>
        </q-btn>
      </div>
      <!-- 列表 -->
      <q-list v-for="(item, i) in list" :key="i" bordered class="q-mb-md border-a-8"
        style="border:0 !important;overflow: hidden;border-radius: 8px;">
        <div v-for="(str, s) in item.element" :key="s" class="bg-white">
          <q-item @click="to(str.url)" v-ripple class="q-pa-md" clickable>
            <q-item-section avatar style="padding-right: 11px;min-width: 0;">
              <img :src="`/images/default/${str.avatar}`" class="iconLogo">
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-weight-bold">{{ str.name }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-img class="iconLogo" src="/images/default/right_arrow.png" />
            </q-item-section>
          </q-item>
          <q-separator style="background: #F4F5FD;" inset />
        </div>
      </q-list>
      <q-btn @click="dialog = true" class="full-width q-mb-lg q-mt-md" unelevated rounded no-caps
        style="height: 44px;justify-content: center !important;" color="primary" label="Logout" />
    </div>
    <!-- 退出登录 -->
    <q-dialog full-width v-model="dialog" position="bottom">
      <q-card style="border-radius: 20px 20ox 0 0;">
        <q-card-section>
          <div class="row justify-center q-mb-lg">
            <q-separator style="height: 4px;width: 80px;border-radius: 24px;" color="grey-4" />
          </div>
          <div class="row justify-center">
            <div class="text-weight-bold" style="font-size: 18px;">Logout</div>
          </div>
          <q-separator class="q-mt-md  q-mb-lg" color="grey-4" />
          <div class="row justify-center q-mb-xl">
            <div class="text-grey-10">Are you sure you want to log out?</div>
          </div>
          <div class="row justify-between no-wrap">
            <q-btn @click="dialog = false" class="q-mr-md" unelevated rounded no-caps
              style="height: 44px;border:1px solid #01AC66;width: 157px;" color="bg-white text-green" label="Cancel" />
            <q-btn @click="Logout()" unelevated rounded no-caps
              style="height: 44px;width: 157px;" color="primary" label="Yes,Logout" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  import { useRouter } from 'vue-router';
  // 列表数据
  import { infoList } from './data';
  export default defineComponent({
    name: 'infoView',
    setup() {
      const router = useRouter();
      let store = reactive({
        list: infoList,
        dialog: false,
      })
      return {
        ...toRefs(store),
        to(url: string) {
          if (url) {
            router.push(url)
          }
        },
        Logout() {
          router.push('/')
          store.dialog = false
        },
        toEdit() {
          router.push('info/edit')
        },
      }
    }
  })
</script>

<style scoped>
  /* 退出dialog */
  .q-dialog__inner>div {
    border-radius: 20px 20px 0 0;
  }
  .q-dialog__inner>div>div {
    padding: 10px 20px 50px 20px;
  }

  /* 店铺、交易管理按钮 */
  :deep .q-btn:before {
    box-shadow: 0 0 0 !important;
  }

  :deep .btn>.q-btn .q-btn__content {
    justify-content: start !important;
  }

  .manage {
    width: 42px;
    height: 42px;
    margin-right: 10px;
  }

  /* 头像下按钮 */
  .q-chip {
    /* width: 44px; */
    height: 19px;
    font-size: 10px;
    color: #F7DEB6 !important;
    background: #322B19 !important;
    border: 1px solid #F7DEB6;
    margin: 0;
    margin-right: 4px;
    padding: 4px 5px;
  }

  .vip {
    width: 11px;
    height: 11px;
    margin-right: 2px;
  }

  /* 头像 */
  .avatar {
    width: 50px;
    height: 50px;
  }
</style>
