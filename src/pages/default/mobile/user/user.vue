<template>
  <div class="mypage">
    <div class="row justify-between q-pt-xl q-px-md q-pb-lg bg-white">
      <!-- 头像 -->
      <div class="row">
        <q-avatar class="q-mr-md avatar">
          <q-img src="https://cdn.quasar.dev/img/avatar.png" width="50px" height="50px" />
        </q-avatar>
        <div class="col-8">
          <div class="text-weight-bolder">
            Ahmed Raza
          </div>
          <div>
            ahmedraza@gmail.com
          </div>
          <div class="row no-wrap">
            <q-chip class="q-chip">
              <q-img src="/icons/Vip.png" class="q-mr-xs" style="width: 11px;height: 11px;" />
              Lv.3
            </q-chip>
            <q-chip style="background: #fff !important;color: #333333 !important;border: 1px solid #F1F1F1;">
              <q-img src="/icons/credit.png" class="q-mr-xs" style="width: 11px;height: 11px;" />
              信用分100
            </q-chip>
            <q-chip style="background: #fff !important;color: #01AC66 !important;border: 1px solid #01AC66;">
              已实名
              <q-icon class="text-primary" name="keyboard_arrow_right" size="11px"></q-icon>
            </q-chip>
          </div>
        </div>
      </div>
      <div>
        <q-icon name="keyboard_arrow_right" size="24px"></q-icon>
      </div>
    </div>

    <!--  -->
    <div class="bg-grey-1 q-px-md q-py-md full-width">
      <!-- 店铺、交易管理 -->
      <div class="row justify-between q-mb-md btn">
        <q-btn @click="$router.push(quickMenu.route)" v-for="(quickMenu, quickMenuIndex) in quickMenuList"
          :key="quickMenuIndex" style="width: 47%;" class="bg-white q-py-sm radius-8" no-caps unelevated>
          <div class="row justify-start items-center">
            <q-img class="q-mr-sm" :src="imageSrc(quickMenu.icon)" width="42px" height="42px" />
            <div>{{ quickMenu.name }}</div>
          </div>
        </q-btn>
      </div>


      <!-- 列表 -->
      <q-list v-for="(item, i) in userList" :key="i" bordered class="q-mb-md radius-8 no-border">
        <div v-for="(child, childKey) in item.children" :key="childKey" class="bg-white">
          <q-item @click="$router.push(child.route)" class="q-pa-md" clickable>
            <q-item-section avatar class="q-mr-sm" style="min-width: 0;">
              <!-- <q-img :src="`/images/mobile/info/${child.avatar}`" width="24px" height="24px" /> -->
              <q-img :src="`${imageSrc(child.icon)}`" width="24px" height="24px" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-weight-bold">{{ child.name }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="keyboard_arrow_right" size="24px"></q-icon>
            </q-item-section>
          </q-item>
          <q-separator style="background: #F4F5FD;" inset />
        </div>
      </q-list>
      <q-btn @click="dialog = true" class="full-width q-mb-lg q-mt-md" unelevated rounded no-caps color="primary"
        label="Logout" />
    </div>

    <!-- 退出登录 -->
    <q-dialog full-width v-model="dialog" position="bottom">
      <q-card>
        <q-card-section>
          <div class="row justify-center q-mb-lg">
            <q-separator class="rounded-borders col-3" style="height: 4px" color="grey-4" />
          </div>
          <div class="row justify-center">
            <div class="text-weight-bold text-h6">Logout</div>
          </div>
          <q-separator class="q-mt-md  q-mb-lg" color="grey-4" />
          <div class="row justify-center q-mb-xl">
            <div class="text-grey-10">Are you sure you want to log out?</div>
          </div>
          <div class="row justify-between no-wrap">
            <q-btn @click="dialog = false" class="q-mr-md text-primary bg-white col-5" unelevated rounded no-caps
              style="border:1px solid #01AC66" label="Cancel" />
            <q-btn @click="$router.push({ name: 'UserLogin' })" class="col-5" unelevated rounded no-caps color="primary"
              label="Yes,Logout" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { imageSrc } from 'src/utils';
import { InitStore, InitStoreState } from 'src/stores/init';
export default defineComponent({
  name: 'userIndex',
  setup() {
    const $initStore = InitStore()

    let state = reactive({
      // 用户菜单
      userList: [] as any,

      // 快捷菜单
      quickMenuList: [] as any,

      // 退出彈窗
      dialog: false,
    })

    state.userList = $initStore.userMenu
    state.quickMenuList = $initStore.quickMenu;

    return {
      ...toRefs(state),
      imageSrc,
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


/* 头像下按钮 */
.q-chip {
  height: 19px;
  font-size: 10px;
  color: #F7DEB6 !important;
  background: #322B19 !important;
  border: 1px solid #F7DEB6;
  margin: 0;
  margin-right: 4px;
  padding: 4px 5px;
}
</style>
