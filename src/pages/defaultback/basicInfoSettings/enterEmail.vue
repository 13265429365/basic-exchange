<template>
  <div>
    <navBar height="49px"></navBar>
    <q-separator class="q-mt-sm q-mb-lg" color="grey-2" />
    <div>
      <div class="row justify-center">
        <div class="text-h5 text-weight-bold">Enter Email</div>
      </div>
      <div class="q-mt-lg q-px-lg">
        <q-form>
          <q-input class="q-mb-md" v-model="email" placeholder="Enter a email address" standout type="text" />
          <q-btn @click="sub()" class="full-width q-mb-xl" unelevated rounded no-caps style="height: 44px;"
            color="primary" label="Sumbit" />
        </q-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  import { useRouter } from 'vue-router';
  import navBar from 'src/layouts/mobile/header.vue';
  // 列表
  export default defineComponent({
    name: 'enterEmail',
    components: {
      navBar
    },
    setup() {
      const router = useRouter();
      let store = reactive({
        email: '',
      })
      return {
        ...toRefs(store),
        sub() {
          router.back()
        },
      }
    }
  })
</script>

<style scoped>
  @import url("../../../css/mobileCss.css");
</style>
