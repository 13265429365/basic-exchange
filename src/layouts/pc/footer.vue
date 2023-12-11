<template>
  <q-footer>
    <div style="padding: 36px 105px;margin-bottom: 102px;" class="row no-wrap justify-center">
      <!--  -->
      <div v-for="(item,i) in list" :key="i" style="margin-right: 70px;">
        <div v-for="(str,s) in item.data" :key="s"
          :class="['q-mb-sm row items-center no-wrap cursor-pointer',{'white':!str.isTitle}]">
          <q-img v-if="str.icon" class="q-mr-xs" :src="`/images/default/pc/${str.icon}.png`" width="20px"
            height="20px"></q-img>
          <div style="white-space: nowrap;">{{str.name}}</div>
        </div>
      </div>
      <!-- Community -->
      <div>
        <div class="white q-mb-sm cursor-pointer">Community</div>
        <div class="row no-wrap q-mb-md">
          <q-img class="q-mr-md cursor-pointer" src="/images/default/pc/Facebook.png" width="32px" height="32px"></q-img>
          <q-img class="q-mr-md cursor-pointer" src="/images/default/pc/twitter.png" width="32px" height="32px"></q-img>
          <q-img class="q-mr-md cursor-pointer" src="/images/default/pc/Instagram.png" width="32px" height="32px"></q-img>
          <q-img class="q-mr-md cursor-pointer" src="/images/default/pc/Youtube.png" width="32px" height="32px"></q-img>
        </div>
        <!-- 下拉按钮 -->
        <q-btn-dropdown class="q-mb-md justify-between" style="border: 1px solid #fff;width: 176px;height: 40px;" icon="language" label="English" no-caps>
          <q-list>
            <q-item v-close-popup clickable >
              <q-item-section>
                <q-item-label>English</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-close-popup clickable>
              <q-item-section>
                <q-item-label>China</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <!-- 注册 -->
        <div>
          <q-btn rounded class="bg-white text-color-3" style="width: 120px;" label="立即注册" />
        </div>
      </div>
    </div>
    <!-- 底部授权 -->
    <div class="row justify-center">
      <div class="row no-wrap items-center">
        <div class="q-mr-xs">APP</div>
        <q-icon name="copyright" class="white q-mr-sm" style="font-size: 20px;"></q-icon>
        <div class="white q-mr-sm">2023</div>
        <div class="white">Cookie settings</div>
      </div>
    </div>
  </q-footer>
</template>

<script lang="ts">
  import { reactive, toRefs } from 'vue';
  import { useRouter } from 'vue-router';
  export default {
    name: 'footerBar',
    setup() {
      const router = useRouter();
      let state = reactive({
        list: [
          {
            data: [
              { name: 'About us', isTitle: true },
              { name: 'about us' },
              { name: 'service agreement' },
              { name: 'Privacy' },
              { name: 'Announcements' },
              { name: 'News' },
              { name: 'Downloads' },
            ],
          },
          {
            data: [
              { name: 'Service', isTitle: true },
              { name: 'Service1' },
              { name: 'Service2' },
              { name: 'Service3' },
            ],
          },
          {
            data: [
              { name: 'Help', isTitle: true },
              { name: 'about usHow it works?' },
              { name: 'our promises' },
              { name: 'FAQ' },
            ],
          },
          {
            data: [
              { name: 'Contact us', isTitle: true },
              { name: '123 Main Street, Anytown,USA', icon: 'location' },
              { name: '+1 (555) 123-4567', icon: 'phone' },
              { name: 'TechHeimSupport@gmail.com', icon: 'email' },
            ],
          },
        ],
      })
      return {
        ...toRefs(state),
        to(url : string) {
          if (url) {
            router.push(url)
          }
        },
      }
    }
  }
</script>

<style scoped>
  @import url("../../css/pcCss.css");
  .q-footer {
    min-width: 1100px;
    background: #021736;
    padding: 34px 108px 20px 108px;
  }

  .white {
    color: #CBCBCB;
  }

  .nowrap {
    white-space: nowrap;
  }
</style>
