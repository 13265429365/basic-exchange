<template>
  <div class="q-px-md q-py-md row navBar justify-between" :style="{
    'background': bgColor,
    height: height
  }">
    <q-icon class="self-center absolute" name="arrow_back" size="24px" @click="backFunc"></q-icon>
    <p
      :class="[color == 'black' ? 'text-color-3' : 'text-' + color, 'text-weight-bolder', 'q-ma-none', textCenter ? 'text-center' : 'q-pl-sm', 'ellipsis', 'col', 'text-subtitle1']">
      {{ title }}
    </p>
    <slot name="right"></slot>
  </div>
  <!-- 占位 -->
  <div :style="{ height }"></div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { reactive, toRefs } from 'vue';

export default {
  name: 'navBar',
  props: {
    color: {
      type: String,
      default: () => {
        return 'black';
      },
    },
    bgColor: {
      type: String,
      default: () => {
        return 'white';
      },
    },
    title: {
      type: String,
      default: () => {
        return '';
      },
    },
    backUrl: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '60px',
    },
    textCenter: {
      type: Boolean,
      default: true
    },
  },
  setup(props: any, { emit }) {
    const router = useRouter();
    // 返回按钮
    const backFunc = () => {
      props.backUrl === '' ? router.back() : router.push(props.backUrl);
      // console.log(props.backUrl);
    };
    const state = reactive({
    });
    const handleClick = (tabIndex: any) => {
      // 使用self访问组件实例
      emit('custom_event', tabIndex);
    }
    return {
      ...toRefs(state),
      backFunc,
      handleClick
    };
  },
};
</script>

<style scoped>
.navBar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
}
</style>
