<template>
  <div class="register">
    <lang></lang>

    <div class="size24 text-center text-weight-bold">404</div>
    <!-- <navBar></navBar> -->
  </div>
</template>

<script lang="ts">
  import lang from 'src/components/lang/lang.vue';
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  // 因为自动加载路由问题。 第一次会获取不到页面跳转到404页面，未修复
  export default defineComponent({
    components: {
      lang,
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
  .sub {
    width: 100%;
    height: 44px;
    background: $default;
    border-radius: 29px;
    cursor: pointer;
    color: #fff;
    font-size: 15px;
  }
  .login {
    color: $default;
    cursor: pointer;
  }

  .logo {
    width: 70px;
    height: 70px;
    margin-top: 30px;
    margin-bottom: 20px;
  }

  .iconLogo {
    width: 24px;
    height: 24px;
  }
  .countryLogo {
    width: 24px;
    height: 16px;
  }
</style>
