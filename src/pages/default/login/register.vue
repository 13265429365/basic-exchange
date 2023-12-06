<template>
  <div class="register">
    <lang></lang>
    <div>
      <div class="row justify-center">
        <q-img class="logo" src="/images/default/logo.png" :ratio="1" />
      </div>
      <div class="row justify-center">
        <div class="size24 text-weight-bold">Create New Account</div>
      </div>
      <div class="q-mt-lg q-px-lg">
        <q-form>
          <!-- <q-input color="grey-3" label-color="orange" outlined v-model="text" label="Label">
            <template v-slot:append>
              <q-icon name="event" color="orange" />
            </template>
          </q-input> -->
          <q-input standout class="q-mb-md" v-model="text" placeholder="Label">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/email.png" />
            </template>
          </q-input>
          <q-input class="q-mb-md" v-model="password" standout :type="isPwd ? 'password' : 'text'" placeholder="Password">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/password.png" />
            </template>
            <template v-slot:append>
              <q-icon style="color: #999999;" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-input class="q-mb-md" standout v-model="text" placeholder="Confirm Password">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/password.png" />
            </template>
          </q-input>
          <q-input class="q-mb-lg" standout v-model="text" placeholder="Code">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/code.png" />
            </template>
          </q-input>
          <q-input class="q-mb-md" standout v-model="text" placeholder="Secret Key">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/key.png" />
            </template>
          </q-input>
          <q-input class="q-mb-md" standout v-model="text" placeholder="Invite Code">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/user.png" />
            </template>
          </q-input>
          <div class="row no-wrap">
            <q-select @update:modelValue="newValue($event)" v-model="areaCode" :options="options"
              class="q-mb-md q-mr-sm select" standout>
              <template v-slot:prepend>
                <q-img class="countryLogo" src="/images/default/china.png" @click.stop.prevent />
                <q-icon name="keyboard_arrow_down" />
              </template>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <q-img class="countryLogo" src="/images/default/china.png" @click.stop.prevent />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                    <!-- <q-item-label caption>{{ scope.opt.value }}</q-item-label> -->
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:append>
                <div>+86</div>
              </template>
            </q-select>
            <q-input class="q-mb-lg full-width" standout v-model="text" placeholder="Telphone" />
          </div>
          <q-btn @click="toMypage()" class="full-width q-mb-lg" unelevated rounded no-caps style="height: 44px;"
            color="primary" label="Signup" />
          <div class="size14 text-center q-pb-xl">
            Already have an account?
            <span @click="toLogin()" class="login">Login</span>
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import lang from 'src/components/mobile/lang.vue';
  import { defineComponent, reactive, toRefs } from 'vue';
  import { useRouter } from 'vue-router';
  // 因为自动加载路由问题。 第一次会获取不到页面跳转到404页面，未修复
  export default defineComponent({
    components: {
      lang,
    },
    name: 'indexView',
    setup() {
      const router = useRouter();
      let store = reactive({
        isPwd: false,
        options: [
          { label: '+86', value: '中国' },
          { label: '+866', value: '香港' },
        ],
        text: '',
        password: '',
        areaCode: '+86',
      });
      return {
        ...toRefs(store),
        newValue(newValue : void) {
          console.log(newValue)
        },
        toLogin() {
          router.push('login')
        },
        toMypage() {
          router.push('info')
        },
      }
    }
  });
</script>
<style lang="scss" scoped>
  :deep .q-select .q-field__control:hover:before {
    opacity: 0;
  }
  :deep .q-select .q-field__prepend {
    padding-right: 0;
    color: #8F959E;
  }
  :deep .q-select  .q-field__append {
    padding-left: 4px;
    font-size: 15px;
    color: #8F959E;
  }
  :deep .q-select .q-field__native {
    display: none;
  }
  :deep .q-select  .q-field__append .q-icon {
    display: none;
  }
</style>
