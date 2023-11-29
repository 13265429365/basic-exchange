<template>
  <div class="mypage">
    <div class="row q-pt-xl q-mt-md q-px-md q-pb-lg">
      <div>
        <q-avatar class="q-mr-md avatar">
          <img src="https://cdn.quasar.dev/img/avatar.png">
        </q-avatar>
      </div>
      <div>
        <div class="text-weight-bold" style="font-size: 18px;">
          Ahmed Raza
        </div>
        <div>
          ahmedraza@gmail.com
        </div>
        <div>
          <q-chip class="q-chip">
            <q-img class="vip" src="/images/default/Vip@2x.png" />
            Lv.3
          </q-chip>
          <q-chip style="background: #fff !important;color: #333333 !important;border: 1px solid #F1F1F1;">
            <q-img class="vip" src="/images/default/Vip@2x.png" />
            信用分100
          </q-chip>
        </div>
      </div>
      <div></div>
    </div>
    <div class="bg-grey-2 q-px-md q-py-md full-width">
      <div class="row q-mb-md">
        <q-btn style="padding: 9px 15px;border-radius: 8px" class="bg-white col q-mr-md justify-start">
          <q-img class="manage" src="/images/default/shop@2x.png" />
          <div>Label</div>
        </q-btn>
        <q-btn style="padding: 9px 15px;border-radius: 8px" class="bg-white col">
          <q-img class="manage" src="/images/default/transaction@2x.png" />
          <div>Label</div>
        </q-btn>
      </div>
      <q-list v-for="(item, i) in list" :key="i" bordered class="q-mb-md border-a-8"
        style="border:0 !important;overflow: hidden;border-radius: 8px;">
        <div v-for="(str, s) in item.element" :key="s" class="bg-white">
          <q-item v-ripple class="q-pa-md" clickable>
            <q-item-section avatar style="padding-right: 11px;min-width: 0;">
              <img :src="`/images/default/${str.avatar}`" class="iconLogo">
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-weight-bold">{{ str.name }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-img class="iconLogo" src="/images/default/Chevron@2x.png" />
            </q-item-section>
          </q-item>
          <q-separator style="background: #F4F5FD;" inset />
        </div>
      </q-list>
      <q-btn class="full-width q-mb-lg q-mt-md" unelevated rounded no-caps
        style="height: 44px;justify-content: center !important;" color="primary" label="Logout" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  import { list } from './data';
  export default defineComponent({
    name: 'myPage',
    setup() {
      let store = reactive({
        list,
      })
      return {
        ...toRefs(store)
      }
    }
  })
</script>

<style scoped>
  @import url("../../css/login.scss");

 /* :deep .q-btn {
    padding: 9px 15px;
    border-radius: 8px 8px 8px 8px;
  } */

  :deep .q-btn:before {
    box-shadow: 0 0 0 !important;
  }

  :deep .row > .q-btn .q-btn__content {
    justify-content: start !important;
  }

  .manage {
    width: 42px;
    height: 42px;
    margin-right: 10px;
  }

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

  .avatar {
    width: 50px;
    height: 50px;
  }
</style>
