<template>
  <div class="register">
    <lang></lang>
    <div>
      <div class="row justify-center">
        <q-img class="logo" src="/images/Logo@2x.png" :ratio="1" />
      </div>
      <div class="row justify-center">
        <div class="size24 bold">Create New Account</div>
      </div>
      <div class="margint40">
        <q-form>
          <q-input class="marginb15" filled v-model="text" label="Email">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/sms@2x.png" />
            </template>
          </q-input>
          <q-input class="marginb15" v-model="password" filled :type="isPwd ? 'password' : 'text'" label="Password">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/lock@2x.png" />
            </template>
            <template v-slot:append>
              <q-icon style="color: #999999;" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-input class="marginb15" filled v-model="text" label="Confirm Password">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/lock@2x.png" />
            </template>
          </q-input>
          <q-input class="marginb31" filled v-model="text" label="Code">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/shield-tick@2x.png" />
            </template>
          </q-input>
          <q-input class="marginb15" filled v-model="text" label="Secret Key">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/key@2x.png" />
            </template>
          </q-input>
          <q-input class="marginb15" filled v-model="text" label="Invite Code">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/profile-2user@2x.png" />
            </template>
          </q-input>
          <div class="row no-wrap">
            <q-select class="marginb15 marginr10" filled v-model="model" :options="options" label="+86">
              <template v-slot:prepend>
                <q-icon name="top" @click.stop.prevent />
              </template>
            </q-select>
            <q-input class="marginb15" filled v-model="text" label="Telphone" />
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import lang from '../components/lang/lang.vue';
  import { defineComponent, reactive, toRefs } from 'vue';

  // 因为自动加载路由问题。 第一次会获取不到页面跳转到404页面，未修复
  export default defineComponent({
    components: {
      lang
    },
    name: 'NotFound',
    setup() {
      let store = reactive({
        isPwd: false,
        options: [
          'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
        ],

      })
      return {
        ...toRefs(store)
      }
    }
  });
</script>
<style lang="scss" scoped>
  .marginr10 {
    margin-right: 10px;
  }
  .marginb15 {
    margin-bottom: 15px;
  }

  .marginb31 {
    margin-bottom: 31px;
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

  .margint40 {
    margin-top: 40px;
    padding: 0 20px;
  }
</style>
