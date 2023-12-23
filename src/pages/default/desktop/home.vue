<template>
  <div class="">
    <div class="homeBack"></div>
    <div style="padding: 120px 165px 70px 165px;">
      <div class="text-center size36 text-weight-bold">Our Clients</div>
      <div class="text-center text-color-3 text-h6 q-mt-xs">
        We have been working with some Fortune 500+ clients
      </div>
      <div class="row no-wrap justify-between q-mt-md q-py-lg q-mb-xl">
        <q-img v-for="item in 7" :key="item" :src="`/images/pc/home/Logo(${item}).png`" fit="contain" width="48px"
          height="48px"></q-img>
      </div>
      <!-- 登录后隐藏 -->
      <div v-if="!isLogin">
        <div class="row justify-center q-mt-xl">
          <div class="text-center size36 text-weight-bold q-mt-lg" style="width: 542px;">
            Manage your entire community in a single system
          </div>
        </div>
        <div class="text-center text-color-3 text-h6 q-my-sm">
          Who is Nextcent suitable for?
        </div>
        <!-- card -->
        <div class="row no-wrap justify-between q-mb-xl q-py-xl">
          <q-card v-for="(item, i) in cardList" :key="i" class="q-my-lg q-mx-md"
            style="width: 299px;box-shadow: 0px 2px 4px 0px rgba(171,190,209,0.2)">
            <q-card-section class="text-color-3 text-center text-weight-bold q-my-md">
              <q-img class="q-mb-md" :src="`/images/pc/home/${item.url}.png`" width="65px" height="56px"></q-img>
              <div v-html="item.title" class="size28"></div>
            </q-card-section>
          </q-card>
        </div>
        <!-- Learn More -->
        <div class="row justify-between items-center no-wrap q-mb-xl q-py-xl">
          <q-img class="q-mr-xl" src="/images/pc/home/mobile.png" width="441px" height="433px"></q-img>
          <div style="width: 660px;padding-right: 60px">
            <div class="size36 text-weight-bold q-mb-md">
              How to design your site footer like we did
            </div>
            <div class="text-color-6 text-h6 q-mb-lg">
              Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, augue nec tincidunt molestie, massa nunc
              varius arcu, at scelerisque elit erat a magna. Donec quis erat at libero ultrices mollis. In hac habitasse
              platea dictumst. Vivamus vehicula leo dui, at porta
            </div>
            <q-btn class="text-weight-regular" style="width: 152px;min-height: 52px" unelevated rounded no-caps
              color="primary" label="Learn More" />
          </div>
        </div>
        <div class="row justify-between items-center no-wrap q-my-xl q-py-xl">
          <div style="width: 660px;padding-right: 60px">
            <div class="size36 text-weight-bold q-mb-md">
              How to design your site footer like we did
            </div>
            <div class="text-color-6 text-h6 q-mb-lg">
              Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, augue nec tincidunt molestie, massa nunc
              varius arcu, at scelerisque elit erat a magna. Donec quis erat at libero ultrices mollis. In hac habitasse
              platea dictumst. Vivamus vehicula leo dui, at porta
            </div>
            <q-btn class="text-weight-regular" style="width: 152px;min-height: 52px" unelevated rounded no-caps
              color="primary" label="Learn More" />
          </div>
          <q-img src="/images/pc/home/mobile.png" width="441px" height="433px"></q-img>
        </div>
        <!-- FAQ -->
        <q-list class="q-mt-lg text-black q-py-xl" style="border-radius: 8px" v-if="FAQ.length > 0">
          <div class="size36 q-mb-lg text-color-3 text-weight-bold">FAQ</div>
          <div v-for="( item, i ) in  FAQ " :key="i">
            <q-expansion-item class="q-ma-none text-h5" :label="item.title">
              <q-card flat>
                <q-card-section>
                  <div class="text-color-6 text-body2" v-html="item.content"></div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-separator style="background: #F1F1F1;" class="q-my-lg" />
          </div>
        </q-list>
      </div>
    </div>

    <!-- ready to start -->
    <div v-if="!isLogin" class="q-pt-xl q-pb-xl" style="background: #F5F7FA;height: 200px;">
      <div class="size36 text-center text-weight-medium text-color-3">ready to start</div>
      <div class="row justify-center q-mt-md">
        <q-btn class="text-weight-regular" style="width: 178px;min-height: 52px" unelevated rounded no-caps
          color="primary">
          <span>Get a Demo</span>
          <span class="q-ml-sm">→</span>
        </q-btn>
      </div>
    </div>
  </div>

  <!-- 客服图标 -->
  <q-page-sticky v-if="loginSetting.online.showLogin" position="bottom-right" :offset="[18, 18]">
    <q-fab class="bg-white" style="width: 56px;height: 56px;" hide-icon>
      <template v-slot:label>
        <q-avatar class="full-width full-height">
          <q-img width="56px" height="56px" :src="imageSrc(onlineIcon ? onlineIcon : '')"></q-img>
        </q-avatar>
      </template>
    </q-fab>
  </q-page-sticky>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import { imageSrc } from 'src/utils';
import { InitStore, InitStoreState } from 'src/stores/init';
export default {
  name: 'homeIndex',
  setup() {
    const $initStore = InitStore();

    const state = reactive({

      // 登录配置
      loginSetting: $initStore.config.settings,

      // 客服图标
      onlineIcon: $initStore.config.onlineIcon,

      // 是否登录状态
      isLogin: $initStore.userToken != '',
      // cardList
      cardList: [
        { title: 'Membership <br> Organisations', url: 'team' },
        { title: 'National <br> Associations', url: 'National' },
        { title: 'Clubs And <br> Groups', url: 'Groups' },
      ],
      FAQ: [
        { title: 'How to change my account', content: 'Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, augue nec tincidunt molestie, massa nunc varius arcu, at scelerisque elit erat a magna. Donec quis erat at libero ultrices mollis. In hac habitasse platea dictumst.' },
        { title: 'How do I order a new card', content: 'Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, augue nec tincidunt molestie, massa nunc varius arcu, at scelerisque elit erat a magna. Donec quis erat at libero ultrices mollis. In hac habitasse platea dictumst.' },
        { title: 'How to change my account', content: 'Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, augue nec tincidunt molestie, massa nunc varius arcu, at scelerisque elit erat a magna. Donec quis erat at libero ultrices mollis. In hac habitasse platea dictumst.' },
        { title: 'How to change my account', content: 'Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, augue nec tincidunt molestie, massa nunc varius arcu, at scelerisque elit erat a magna. Donec quis erat at libero ultrices mollis. In hac habitasse platea dictumst.' },
        { title: 'How to change my account', content: 'Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, augue nec tincidunt molestie, massa nunc varius arcu, at scelerisque elit erat a magna. Donec quis erat at libero ultrices mollis. In hac habitasse platea dictumst.' },
      ],
    });

    return {
      imageSrc,
      ...toRefs(state),
    }
  }
}
</script>

<style scoped lang="scss">
:deep(.q-fab > a) {
  padding: 0;

  .q-fab__label {
    padding-right: 0 !important;
    padding-left: 0 !important;
    max-height: 100%;
  }
}

:deep(.q-expansion-item .q-item) {
  padding: 0;
  margin-bottom: 16px;
}

:deep(.q-card .q-card__section--vert) {
  padding: 0;
  color: #666666 !important;
}

.size36 {
  font-size: 36px;
  line-height: 44px;
}

.size28 {
  font-size: 28px;
  line-height: 36px;
}

.homeBack {
  height: 600px;
  background: url('/public/images/pc/home/background.png');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
