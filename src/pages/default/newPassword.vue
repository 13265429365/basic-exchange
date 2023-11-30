<template>
  <div>
    <navBar height="49px"></navBar>
    <q-separator class="q-mt-sm q-mb-lg" color="grey-2" />
    <div>
      <div class="row justify-center">
        <div class="size24 text-weight-bold">Complete Your Profile</div>
      </div>
      <div class="q-mt-lg q-px-lg">
        <q-form>
          <!-- <q-input color="grey-3" label-color="orange" outlined v-model="text" label="Label">
            <template v-slot:append>
              <q-icon name="event" color="orange" />
            </template>
          </q-input> -->
          <q-input class="q-mb-md" v-model="password" filled :type="isPwd ? 'password' : 'text'" placeholder="Password">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/password.png" />
            </template>
            <template v-slot:append>
              <q-icon style="color: #999999;" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-input class="q-mb-md" v-model="ConfirmPassword" filled :type="isPwd ? 'password' : 'text'" placeholder="Confirm Password">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/password.png" />
            </template>
            <template v-slot:append>
              <q-icon style="color: #999999;" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-btn @click="toMypage()" class="full-width q-mb-xl" unelevated rounded no-caps style="height: 44px;"
            color="primary" label="Create New Password" />
        </q-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  // import { useRouter } from 'vue-router';
  import navBar from 'src/components/navBar.vue';
  // 列表
  export default defineComponent({
    name: 'infoSetting',
    components: {
      navBar
    },
    setup() {
      // const router = useRouter();
      let store = reactive({
        isPwd: false,
        password: '',
        ConfirmPassword: '',
      })
      return {
        ...toRefs(store),
      }
    }
  })
</script>

<style scoped>
</style>
