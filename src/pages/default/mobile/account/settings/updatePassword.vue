<template>
  <div>
    <div>
      <div class="row justify-center">
        <div class="size24 text-weight-bold">Change Password</div>
      </div>
      <div class="q-mt-lg q-px-lg">
        <q-form>
          <q-input class="q-mb-md" v-model="oldPassword" standout :type="isPwd ? 'password' : 'text'"
            placeholder="Old Password">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/password.png" />
            </template>
            <template v-slot:append>
              <q-icon style="color: #999999;" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="isPwd = !isPwd" />
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
          <q-input class="q-mb-md" v-model="ConfirmPassword" standout :type="isPwd ? 'password' : 'text'"
            placeholder="Confirm Password">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/password.png" />
            </template>
            <template v-slot:append>
              <q-icon style="color: #999999;" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-btn @click="toMypage()" class="full-width q-mb-xl" unelevated rounded no-caps style="height: 44px;"
            color="primary" label="Confirm" />
        </q-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
// import { useRouter } from 'vue-router';
// 列表
export default defineComponent({
  name: 'updatePassword',
  setup() {
    // const router = useRouter();
    let store = reactive({
      isPwd: false,
      oldPassword: '',
      password: '',
      ConfirmPassword: '',
    })
    return {
      ...toRefs(store),
    }
  }
})
</script>

<style scoped></style>
