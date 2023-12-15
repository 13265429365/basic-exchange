<template>
  <div>
    <navBar height="49px"></navBar>
    <q-separator class="q-mt-sm q-mb-lg" color="grey-2" />
    <div>
      <div class="row justify-center q-mb-sm">
        <div class="text-h5 text-weight-bold">Verify Account</div>
      </div>
      <div class="row justify-center q-px-lg">
        Enter 4-digit Code
      </div>
      <div class="q-mt-lg q-px-lg q-mb-xl">
        <div class="row flex-column">
          <div class="row justify-between relative code">
            <input @input="newValue()" v-model="verifyCode" type="number" class="absolute full-width" />
            <div class="row items-center justify-center item" v-for="(item, i) in 4" :key="i">
              {{ verifyCodeArr[i] ? verifyCodeArr[i] : '' }}
            </div>
          </div>
        </div>
        <q-btn @click="proceed()" class="full-width q-mb-xl" unelevated rounded no-caps style="height: 44px;"
          color="primary" label="Proceed" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import navBar from 'src/layouts/mobile/header.vue';
import fCode from 'src/components/mobile/fCode.vue';
import { NotifyPositive } from 'src/utils/notify';
// 列表
export default defineComponent({
  name: 'verifytCode',
  components: {
    navBar,
    fCode
  },
  setup() {
    const router = useRouter();
    let state = reactive({
      verifyCode: '',
      verifyCodeArr: ['', '', '', ''],
      toggle: false,
      options: [
        { label: '+86', value: '中国' },
        { label: '+866', value: '香港' },
      ],
      areaCode: '+86',
      // 表单数据
      PhoneNumber: '',
    })

    const newValue = () => {
      state.verifyCode = state.verifyCode + '';
      if (state.verifyCode.length < 5) {
        state.verifyCodeArr = state.verifyCode.split('');
      } else {
        state.verifyCode = '';
        state.verifyCodeArr = ['', '', '', ''];
        console.log(state.verifyCode);
      }
    };

    const proceed = () => {
      NotifyPositive('验证成功')
      router.push('setting')
    };

    return {
      ...toRefs(state),
      newValue,
      proceed,
    }
  }
})
</script>

<style scoped></style>
