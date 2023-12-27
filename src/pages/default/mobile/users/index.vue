<template>
  <div class="mypage">
    <div class="row justify-between q-pt-xl q-px-md q-pb-lg bg-white">
      <!-- 头像 -->
      <div class="row">
        <q-avatar class="q-mr-md avatar">
          <q-img :src="userInfo.avatar ? imageSrc(userInfo.avatar) : imageSrc('')" width="50px" height="50px" />
        </q-avatar>
        <div class="col-8">
          <div class="text-weight-bolder">
            {{ userInfo.username }}
          </div>
          <div>
            {{ userInfo.email }}
          </div>
          <div class="row no-wrap">
            <q-chip class="text-white" size="sm" style="background: #322B19;border: 1px solid #F7DEB6;">
              <q-img src="/images/icons/vip-icon.png" class="q-mr-xs" width="11px" height="11px" />
              <span style="color: #F7DEB6;">Lv{{ userInfo.level }}</span>
            </q-chip>
            <q-chip class="text-grey-9 bg-white" size="sm" style="border: 1px solid #F1F1F1;">
              <q-img src="/images/icons/credit.png" class="q-mr-xs" width="11px" height="11px" />
              {{ $t('creditScore') + userInfo.score }}
            </q-chip>
            <q-chip class="text-primary bg-white" size="sm" style="border: 1px solid #01AC66;">
              {{ userInfo.authStatus ? $t('realNameFailed') : $t('alreadyRealName') }}
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
          :key="quickMenuIndex" style="width: 47%;" class="bg-white q-py-sm rounded-borders" no-caps unelevated>
          <div class="row justify-start items-center">
            <q-img class="q-mr-sm" :src="imageSrc(quickMenu.icon)" width="42px" height="42px" />
            <div>{{ $t(quickMenu.name) }}</div>
          </div>
        </q-btn>
      </div>


      <!-- 列表 -->
      <q-list v-for="(item, i) in userList" :key="i" bordered class="q-mb-md rounded-borders no-border">
        <div v-for="(child, childKey) in item.children" :key="childKey" class="bg-white">
          <q-item @click="$router.push(child.route)" class="q-pa-md" clickable>
            <q-item-section avatar class="q-mr-sm" style="min-width: 0;">
              <!-- <q-img :src="`/images/mobile/info/${child.avatar}`" width="24px" height="24px" /> -->
              <q-img :src="`${imageSrc(child.icon)}`" width="24px" height="24px" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-weight-bold">{{ $t(child.name) }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="keyboard_arrow_right" size="24px"></q-icon>
            </q-item-section>
          </q-item>
          <q-separator style="background: #F4F5FD;" inset />
        </div>
      </q-list>
      <q-btn @click="dialog = true" class="full-width q-mb-lg q-mt-md" unelevated rounded no-caps color="primary"
        :label="$t('logout')" />
    </div>

    <!-- 退出登录 -->
    <q-dialog full-width v-model="dialog" position="bottom">
      <q-card>
        <q-card-section>
          <div class="row justify-center q-mb-lg">
            <q-separator class="rounded-borders col-3" style="height: 4px" color="grey-4" />
          </div>
          <div class="row justify-center">
            <div class="text-weight-bold text-h6">{{ $t('logout') }}</div>
          </div>
          <q-separator class="q-mt-md  q-mb-lg" color="grey-4" />
          <div class="row justify-center q-mb-xl">
            <div class="text-grey-10">{{ $t('logoutSmall') }}</div>
          </div>
          <div class="row justify-between no-wrap">
            <q-btn @click="dialog = false" class="q-mr-md text-primary bg-white col-5" unelevated rounded no-caps
              style="border:1px solid #01AC66" :label="$t('cancel')" />
            <q-btn @click="Logout" class="col-5" unelevated rounded no-caps color="primary" :label="$t('logout')" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { InitStore } from 'src/stores/init';
import { UserStore, UserInfoKey } from 'src/stores/user';
import { imageSrc } from 'src/utils';
import { getUserInfo } from 'src/apis/user';

export default defineComponent({
  name: 'userIndex',
  setup() {
    const $router = useRouter();
    const $initStore = InitStore()
    const $userStore = UserStore()

    let state = reactive({
      userInfo: {} as any,

      // 用户菜单
      userList: [] as any,

      // 快捷菜单
      quickMenuList: [] as any,

      // 退出彈窗
      dialog: false,
    })




    onMounted(async () => {
      //  是否登录
      if ($initStore.userToken == '' || $initStore.userToken == null) {
        $router.push({ name: 'UserLogin' })
      }

      // 右侧头像菜单
      state.userList = $initStore.userMenu

      // 左侧快捷菜单
      state.quickMenuList = $initStore.quickMenu;

      UserInfo()
    })

    // 获取用户信息
    const UserInfo = () => {
      if ($initStore.userToken) {
        getUserInfo().then((res: any) => {
          console.log('用户信息', res);
          state.userInfo = res
          $userStore.updateUserInfo(res)
          localStorage.setItem(UserInfoKey, JSON.stringify(res))
        })
      }
    }

    // 退出登录
    const Logout = async () => {
      await $initStore.removeUserToken()
      localStorage.removeItem('userInfo')
      $router.push({ name: 'HomeIndex' })
    }



    return {
      imageSrc,
      ...toRefs(state),
      Logout,
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
</style>
