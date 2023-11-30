<template>
  <div class="register">
    <navBar></navBar>
    <div>
      <div class="row justify-center q-px-xl">
        <div class="text-weight-bold q-mt-md" style="font-size: 24px;">Forgot Password</div>
        <div class="q-px-lg">Enter your email we will send 4 digits code to your email</div>
      </div>
      <div class="q-mt-xl q-px-lg">
        <q-form>
          <div class="row no-wrap q-mb-lg">
            <q-input placeholder="Email" filled v-model="text">
              <template v-slot:prepend>
                <q-img class="iconLogo" src="/images/default/email.png" />
              </template>
            </q-input>
            <q-btn @click="countdown()" :disable="sendCode" :class="['q-ml-md rounded-borders Code', {success: sendCode}]" unelevated no-caps
              color="primary" :label="sendCode?`Repeat(${time}S)`:'Send Code'" />
          </div>
          <q-input placeholder="Code" class="q-mb-lg" filled v-model="text">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/code.png" />
            </template>
          </q-input>
          <q-btn class="full-width q-mb-xl" unelevated rounded no-caps style="height: 44px;" color="primary"
            label="Continue" />
        </q-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import navBar from 'src/components/navBar.vue';
  import { defineComponent, reactive, toRefs } from 'vue';
  // import { useRouter } from 'vue-router';
  // 因为自动加载路由问题。 第一次会获取不到页面跳转到404页面，未修复
  export default defineComponent({
    components: {
      navBar
    },
    name: 'loginView',
    setup() {
      // const router = useRouter();
      let store = reactive({
        sendCode: false,
        time: 30,
        text:'',
      });
      return {
        ...toRefs(store),
        countdown() {
          if (store.sendCode==false) {
            store.time--
            store.sendCode=true
            let time = setInterval(()=>{
              if (store.time>0) {
                store.time--
              } else {
                clearInterval(time)
                store.sendCode=false
              }
            },1000)
          } else {
            console.log('30秒后再发送');
          }
        },

      }
    }
  });
</script>
<style lang="scss" scoped>
  .success {
    background: rgba(1,172,102,0.2) !important;
    color: #01AC66 !important;
  }
  .Code {
    width: 100px;
    height: 50px;
    border-radius: 10px;
    white-space: nowrap;
  }
</style>
