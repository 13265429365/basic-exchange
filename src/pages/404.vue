<template>
  <q-layout style="min-width: 1100px;">
    <headerBar></headerBar>
    <q-page-container>
      <div class="row justify-center q-mb-lg" style="margin-top: 270px;">
        <q-img src="/images/default/pc/404.png" width="200px" height="200px" />
      </div>
      <div class="text-center text-weight-bold q-mb-md" style="font-size: 30px">Page Not Found!!</div>
      <div class="row justify-center" style="margin-bottom: 340px;">
        <div style="font-size: 16px;width: 455px;" class="text-center text-color-6">
          we’re sorry,the page you requested could not be found Please go back to the home page
        </div>
      </div>
    </q-page-container>
    <footerBar></footerBar>
  </q-layout>
</template>

<script lang="ts">
  import headerBar from 'src/components/pc/header.vue';
  import footerBar from 'src/components/pc/footer.vue';
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  // 因为自动加载路由问题。 第一次会获取不到页面跳转到404页面，未修复
  export default defineComponent({
    components: {
      headerBar,
      footerBar
    },
    name: 'errorView',
    setup() {
      const router = useRouter();
      return {
        newValue(newValue: void) {
          console.log(newValue)
        },
        toLogin() {
          router.push('Login')
        },
      }
    }
  });
</script>
<style lang="scss" scoped>
</style>
