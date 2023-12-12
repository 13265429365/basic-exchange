<template>
  <div class="row flex-column">
    <div class="row justify-between relative code">
      <input
        @input="newValue()"
        v-model="verifyCode"
        type="number"
        class="absolute full-width"
      />
      <div
        class="row items-center justify-center item"
        v-for="(item, i) in 4"
        :key="i"
      >
        {{ verifyCodeArr[i] ? verifyCodeArr[i] : '' }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
// import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'verifytCode',
  // props: {
  //   verifyCode: String,
  //   verifyCodeArr: []
  // },
  setup() {
    // const router = useRouter();
    let verifyCode = ref('');
    let verifyCodeArr = ref(['', '', '', '']);
    return {
      newValue() {
        verifyCode.value = verifyCode.value + '';
        if (verifyCode.value.length < 5) {
          verifyCodeArr.value = verifyCode.value.split('');
        } else {
          verifyCode.value = '';
          verifyCodeArr.value = ['', '', '', ''];
          console.log(verifyCode.value);
        }
      },
      verifyCode,
      verifyCodeArr,
      // ...toRefs(store),
    };
  },
});
</script>
<style lang="scss" scoped></style>
