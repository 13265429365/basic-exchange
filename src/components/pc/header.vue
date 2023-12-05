<template>
  <!-- <div class="Header"> -->
  <q-header reveal class="bg-white text-color-3 row justify-between q-py-md q-pl-xl q-pr-lg no-wrap">
    <div class="row items-center no-wrap">
      <q-img @click="to('/')" class="q-mr-lg cursor-pointer" src="/images/default/pc/logo.png" width="172px" height="42px" />
      <span class="text-color-3 q-ml-sm q-mr-xl cursor-pointer">Support Center</span>
      <div class="row no-wrap items-center cursor-pointer">
        <span>more</span>
        <q-icon name="keyboard_arrow_down" />
        <q-menu :offset="[0, 27]" auto-close transition-show="jump-down" transition-hide="jump-up">
          <q-list style="min-width: 268px" class="q-py-sm">
            <q-item v-for="(item,i) in moreList" :key="i" clickable class="row no-wrap items-center">
              <q-img class="q-mr-sm" :src="`/images/default/${item.url}.png`" width="38px" height="38px" />
              <div>
                <div style="font-size: 16px;">{{item.name}}</div>
                <div style="font-size: 12px;">{{item.content}}</div>
              </div>
            </q-item>
          </q-list>
        </q-menu>
      </div>
    </div>
    <div class="row items-center no-wrap">
      <!-- 搜索框 -->
      <q-input placeholder="searching..." rounded outlined v-model="text">
        <template v-slot:prepend>
          <q-img class="q-mr-sm" src="/images/default/pc/search.png" width="20px" height="20px" />
        </template>
      </q-input>
      <!-- 登录状态下 -->
      <div v-if="isLogin" class="row items-center">
        <!-- Deposit -->
        <q-btn class="q-ml-md text-weight-regular cursor-pointer" style="padding: 0 10px;min-height: 30px" unelevated
          rounded no-caps color="primary" label="Deposit">
          <q-menu :offset="[140, 22]" auto-close transition-show="jump-down" transition-hide="jump-up">
            <q-list style="min-width: 214px" class="q-px-sm">
              <q-item v-for="(item,i) in depositList" :key="i" clickable class="row no-wrap items-center">
                <q-img class="q-mr-sm" :src="`/images/default/pc/${item.url}.png`" width="20px" height="20px" />
                <div style="font-size: 16px;">{{item.name}}</div>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <!-- 头像 -->
        <q-avatar class="q-ml-md cursor-pointer" style="width: 34px;height: 34px;">
          <img src="/images/default/pc/avatar.png">
          <q-menu :offset="[30, 22]" auto-close transition-show="jump-down" transition-hide="jump-up">
            <q-list style="min-width: 218px;padding: 20px 23px 0 23px">
              <q-item style="padding: 0;">
                <div class="row">
                  <div>
                    <q-avatar class="q-mr-sm" style="width: 30px;height: 30px">
                      <img src="/images/default/head.png">
                    </q-avatar>
                  </div>
                  <div class="col-8">
                    <div class="row no-wrap items-center q-mb-xs">
                      <div class="text-weight-bold q-mr-sm">
                        Jack
                      </div>
                      <div style="font-size: 12px;">
                        569***@qq.com
                      </div>
                    </div>
                    <div class="row no-wrap">
                      <q-chip class="q-chip" style="border: 1px solid #F7DEB6;">
                        <q-img class="vip" src="/images/default/Vip_icon.png" />
                        Lv.3
                      </q-chip>
                      <q-chip class="q-chip bg-primary text-white" style="font-size: 12px;">
                        unverified
                      </q-chip>
                    </div>
                  </div>
                </div>
              </q-item>
              <q-separator class="q-mt-lg" style="background: #F1F1F1;" />
              <q-item v-for="(item,i) in infoList" :key="i" clickable class="row no-wrap items-center q-py-md q-px-xs">
                <q-img class="q-mr-sm" :src="`/images/default/pc/${item.url}.png`" width="20px" height="20px" />
                <div>{{item.name}}</div>
              </q-item>
              <q-separator class="q-mt-md" style="background: #F1F1F1;" />
              <q-item clickable class="row no-wrap items-center q-py-xs q-px-xs">
                <q-img class="q-mr-sm" src="/images/default/pc/LogOut.png" width="20px" height="20px" />
                <div>Log out</div>
              </q-item>
            </q-list>
          </q-menu>
        </q-avatar>
        <!--  -->
        <q-img class="q-ml-md iconLogo cursor-pointer" src="/images/default/darkness/email.png" />
        <q-img class="q-ml-md iconLogo cursor-pointer" style="overflow: unset;"
          src="/images/default/darkness/prompt.png">
          <q-badge style="background: #F45E0C;" class="badge" floating rounded>20</q-badge>
        </q-img>
      </div>
      <!-- 未登录状态下 -->
      <div v-else class="row items-center no-wrap">
        <q-btn @click="isLogin=true" class="q-ml-md text-color-3 text-weight-regular"
          style="padding: 0 10px;min-height: 30px" unelevated rounded no-caps color="white" label="Login" />
        <q-btn @click="isLogin=true" class="q-ml-md text-weight-regular" style="padding: 0 10px;min-height: 30px"
          unelevated rounded no-caps color="primary" label="Register" />
      </div>
      <q-img class="q-ml-md iconLogo cursor-pointer" src="/images/default/darkness/language.png" />
    </div>
  </q-header>
  <!-- </div> -->
</template>

<script lang="ts">
  import { reactive, toRefs } from 'vue';
  import { useRouter } from 'vue-router';
  export default {
    name: 'headerBar',
    setup() {
      const router = useRouter();
      let state = reactive({
        text: '',
        // 判断是否登录
        isLogin: false,
        moreList: [
          {
            name: 'Title',
            content: 'describedescribedescribe',
            url: 'cashOut',
          },
          {
            name: 'Title',
            content: 'describedescribedescribe',
            url: 'cashOut',
          },
          {
            name: 'Title',
            content: 'describedescribedescribe',
            url: 'cashOut',
          },
        ],
        depositList: [
          {
            name: 'Card Management',
            url: 'CardManagement',
          },
          {
            name: 'My Wallet',
            url: 'MyWallet',
          },
          {
            name: 'My Property',
            url: 'MyProperty',
          },
        ],
        infoList: [
          {
            name: 'Profile',
            url: 'Profile',
          },
          {
            name: 'Security',
            url: 'Security',
          },
          {
            name: 'Share',
            url: 'Share',
          },
          {
            name: 'Team Management',
            url: 'TeamManagement',
          },
          {
            name: 'Vip',
            url: 'Vip',
          },
        ],
      })
      return {
        ...toRefs(state),
        to(url: string) {
          if (url) {
            router.push(url)
          }
        },
      }
    }
  }
</script>

<style scoped>
  .q-header {
    min-width: 1100px;
    position: absolute;
  }

  /* 头像下按钮 */
  .q-chip {
    /* width: 44px; */
    height: 18px;
    font-size: 10px;
    color: #F7DEB6;
    background: #322B19;
    margin: 0;
    margin-right: 4px;
    padding: 4px 5px;
  }

  .vip {
    width: 11px;
    height: 11px;
    margin-right: 2px;
  }

  .badge {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    padding: 2px;
    top: -35%;
    right: -35%;
  }

  :deep .q-field__control {
    color: $default !important;
    background: #fff !important;
    border: 1px solid #DDDDDD !important;
    border-radius: 20px !important;
    height: 40px !important;
    min-height: 40px !important;
    outline: none !important;
  }

  :deep .q-field__marginal {
    height: 40px;
    padding-right: 0 !important;
  }
</style>
