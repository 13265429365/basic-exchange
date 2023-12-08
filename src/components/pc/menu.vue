<template>
  <q-list padding class="q-ml-xl q-mt-xl" style="width: 220px;min-height:85vh">
    <div @click="to(item.url)" v-for="(item,i) in activeList" :key="i">
      <!-- 下拉展开项 -->
      <q-expansion-item v-if="item.child" default-opened>
        <!-- 父级 -->
        <template v-slot:header>
          <q-item-section avatar>
            <q-img :src="`/images/pc/menu/${activeRouter==item.url?'act_'+item.icon:item.icon}.png`" class="iconLogo"></q-img>
          </q-item-section>
          <q-item-section avatar class="q-mr-xl">
            {{item.name}}
          </q-item-section>
        </template>
        <!-- 子级 -->
        <q-item @click="to(str.url)" v-for="(str,s) in item.child" :key="s" :header-inset-level="1" :active="activeRouter==str.url" active-class="active" clickable v-ripple>
          <q-item-section avatar style="opacity: 0;">
            <q-icon name="inbox" />
          </q-item-section>
          <q-item-section>
            {{str.name}}
          </q-item-section>
        </q-item>
      </q-expansion-item>
      <!-- 不需要下拉 -->
      <q-item v-else :active="activeRouter==item.url" active-class="active" clickable v-ripple>
        <q-item-section avatar>
          <q-img :src="`/images/pc/menu/${activeRouter==item.url?'act_'+item.icon:item.icon}.png`" class="iconLogo"></q-img>
        </q-item-section>
        <q-item-section>
          {{item.name}}
        </q-item-section>
      </q-item>

    </div>
  </q-list>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  // 因为自动加载路由问题。 第一次会获取不到页面跳转到404页面，未修复
  export default defineComponent({
    name: 'menuView',
    setup() {
      // const userStore = useUserStore();
      const router = useRouter();
      let store = reactive({
        activeRouter: '/',
        activeList: [
          { name: 'Dashboard', url: '/dashboard', icon: 'dashboard' },
          { name: 'My Wallet', url: '/wallet', icon: 'MyWallet' },
          { name: 'Assets', url: '', icon: 'Assets' },
          { name: 'Card', url: '', icon: 'Card' },
          { name: 'My Team', url: '', icon: 'MyTeam' },
          {
            name: 'Account',
            icon: 'Account',
            child: [
              {name: 'Identification', url: '/identification' },
              {name: 'Security', url: '/security' }
            ],
          },
          { name: 'Settings', url: '/settings', icon: 'Settings' },
        ],
      });
      onMounted(() => {
        store.activeRouter = router.currentRoute.value.path
      })
      return {
        ...toRefs(store),
        to(url:string) {
          if (url) {
            router.push(url)
          }
        }
      }
    }
  });
</script>
<style lang="scss" scoped>
  .active {
    background: rgba(1, 172, 102, 0.1);
  }
  :deep(.q-item) {
    margin-bottom: 16px;
    font-weight: 500;
    font-size: 16px;
    border-radius: 8px;

    .q-item__section--avatar {
      min-width: auto;
    }
  }
</style>
