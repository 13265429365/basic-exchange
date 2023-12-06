<template>
  <div>
    <navBar height="49px"></navBar>
    <q-separator class="q-mt-sm q-mb-lg" color="grey-2" />
    <div>
      <div class="row justify-center">
        <div class="size24 text-weight-bold">New Secret Key</div>
      </div>
      <div class="q-mt-lg q-px-lg">
        <q-form>
          <q-input class="q-mb-md" v-model="code" placeholder="Code" standout :type="isPwd ? 'password' : 'text'">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/key.png" />
            </template>
            <template v-slot:append>
              <q-icon style="color: #999999;" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-input class="q-mb-md" v-model="ConfirmCode" placeholder="Confirm Code" standout :type="isPwd ? 'password' : 'text'">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/key.png" />
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
  import navBar from 'src/components/mobile/navBar.vue';
  // 列表
  export default defineComponent({
    name: 'newCode',
    components: {
      navBar
    },
    setup() {
      // const router = useRouter();
      let store = reactive({
        isPwd: false,
        code: '',
        ConfirmCode: '',
      })
      return {
        ...toRefs(store),
      }
    }
  })
</script>

<style scoped>
</style>
