<template>
  <div class="bg-white q-px-md q-py-md row">
    <q-img class="self-center" src="/images/default/left.png" width="24px" height="24px" @click="backFunc" />
    <div v-if="tabArr[0]" class="row justify-center col">
      <div class="row col-11 text-center font-size-12 font-c-3 font_bold q-px-xs q-py-xs radius-6"
        style="background-color: #F6F6F6;">
        <span :class="['col-4', 'self-center', 'radius-6', 'q-py-xs', tabActive == tabIndex ? 'bg-white' : '']"
          v-for="(tabi, tabIndex) in tabArr" :key="tabIndex" @click="handleClick(tabIndex)">{{
            tabi }}</span>
      </div>
    </div>
    <p v-else style="flex: 1;"
      :class="['font-c-3', 'font-size-16', 'font_bold', 'q-ma-none', textCenter ? 'text-center' : 'q-pl-sm', 'ellipsis', 'q-pl-sm']">
      {{ title }}
    </p>

  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { reactive, toRefs } from 'vue';

export default {
  name: 'navBar',
  props: {
    toolbarStyle: {
      type: Object,
      default: () => {
        return { height: '60px' };
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
    moreObject: {
      type: Object,
      default: () => {
        return {
          label: '',
          icon: '',
          click: () => {
            console.log(1);
          },
        };
      },
    },
    tabArr: {
      type: Array,
      default: () => {
        return []
      }
    },
    textCenter: {
      type: Boolean,
      default: true
    },
    tabActive: {
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  setup(props: any, { emit }) {
    const router = useRouter();
    // 返回按钮
    const backFunc = () => {
      props.backUrl === '' ? router.back() : router.push(props.backUrl);
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

<style scoped></style>
