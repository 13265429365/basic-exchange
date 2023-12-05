<template>
  <div>
    <navBar height="49px"></navBar>
    <q-separator class="q-mt-sm q-mb-lg" color="grey-2" />
    <div>
      <div class="row justify-center q-mb-sm">
        <div class="size24 text-weight-bold">Verify Account</div>
      </div>
      <div class="row justify-center q-px-lg">
        Enter 4-digit Code
      </div>
      <div class="q-mt-lg q-px-lg">
        <fCode class="q-mb-xl"></fCode>
        <q-btn @click="proceed()" class="full-width q-mb-xl" unelevated rounded no-caps style="height: 44px;"
          color="primary" label="Proceed" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  import { useRouter } from 'vue-router';
  import navBar from 'src/components/mobile/navBar.vue';
  import fCode from 'src/components/mobile/fCode.vue';
  import { NotifyPositive } from 'src/utils/index';
  // 列表
  export default defineComponent({
    name: 'verifytCode',
    components: {
      navBar,
      fCode
    },
    setup() {
      const router = useRouter();
      let store = reactive({
        toggle: false,
        options: [
          { label: '+86', value: '中国' },
          { label: '+866', value: '香港' },
        ],
        areaCode: '+86',
        // 表单数据
        PhoneNumber: '',
      })
      return {
        ...toRefs(store),
        proceed() {
          NotifyPositive('验证成功')
          router.push('setting')
        },
      }
    }
  })
</script>

<style scoped>
</style>
