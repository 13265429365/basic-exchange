<template>
  <div class="row flex-column">
    <div class="row justify-between relative code">
      <input @input="newValue($event)" v-model="verifyCode" type="number" class="absolute full-width">
      <!-- <q-input @update:modelValue="newValue($event)" v-model="verifyCode" type="number" class="absolute full-width" /> -->
      <div class="row items-center justify-center item" v-for="(item, i) in 4" :key="i">
        {{ verifyCodeArr[i] ? verifyCodeArr[i] : '' }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, watch, ref } from 'vue';
  // import { useRouter } from 'vue-router';
  // 列表
  export default defineComponent({
    name: 'verifytCode',
    setup() {
      // const router = useRouter();
      let verifyCode = ref('')
      let verifyCodeArr = ref(['','','',''])
      return {
        newValue(newValue: string) {
          verifyCode.value = verifyCode.value + ''
          if (verifyCode.value.length<5) {
            verifyCodeArr.value = verifyCode.value.split('')
          } else {
            verifyCode.value = ''
            verifyCodeArr.value = ['','','','']
            console.log(verifyCode.value)
          }
        },
        verifyCode,
        verifyCodeArr,
        // ...toRefs(store),
      }
    }
  })
</script>
<style lang="scss" scoped>
  .flex-column {
    flex-direction: column;
  }

  .relative {
    position: relative;
  }

  .absolute {
    position: absolute;
    opacity: 0;
  }

  .phone-input {
    border-bottom: 1px solid #eee;

    input {
      color: #101010;
    }

    :deep {
      .placeholder {
        color: #aaa;
        font-size: 32px;
      }
    }
  }

  .code {
    color: #333333;
    font-size: 35px;

    input {
      top: 0;
      bottom: 0;
      height: 100px;
    }

    .item {
      width: 73.58px;
      height: 62px;
      border-bottom: 2px solid #DDDDDD;
    }
  }
</style>
