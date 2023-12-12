<template>
  <div class="row justify-between items-center" :style="style">
    <q-icon
      :name="leftButton.name"
      :size="leftButton.size"
      @click="
        leftButton.route == '' ? $router.back() : $router.push(leftButton.route)
      "
    ></q-icon>
  </div>
  <div :class="titleClass">{{ title }}</div>
  <div>
    <q-icon
      v-if="rightButton.icon != ''"
      :name="rightButton.name"
      :size="rightButton.size"
      @click="$router.push(rightButton.route)"
    ></q-icon>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';

export default {
  name: 'LayoutsHeader',
  props: {
    //  主体 style
    style: {
      type: Object,
      defualt: { height: '60px' },
    },
    //  标题
    title: {
      type: String,
      default: '',
    },
    titleClass: {
      type: String,
      default: 'text-body1 text-bold',
    },
    //  左侧按钮图标
    leftButton: {
      type: Object,
      default: () => {
        return { icon: 'arrow_back', size: '24px', route: '' };
      },
    },
    //  右侧按钮图标
    rightButton: {
      type: Object,
      default: () => {
        return { icon: '', size: '24px', route: '' };
      },
    },
  },
  setup() {
    const state = reactive({});

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style scoped></style>
