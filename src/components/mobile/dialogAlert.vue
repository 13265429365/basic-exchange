<template>
  <div class="bg-white radius-8 column justify-between q-pa-lg shadow-pc" style="width: 88%;">
    <div>
      <div :class="`text-color-3 text-body1  text-${titleAlign} text-weight-bolder`" style="position: relative">
        {{ title }}
        <q-img src="page_bg/xx.png" v-if="isShowCloseBtn" class="xxImg self-center cursor-pointer" width="18.86px"
          height="18.86px" @click="changedialogAlert" />
      </div>
      <slot name="body"></slot>
    </div>

    <div class="row justify-end" v-if="isShowBtn">
      <div class="col q-px-sm">
        <q-btn outline rounded color="primary" no-caps :label="cancelBtnText" style="height: 40px;" class="full-width"
          text-color="grey" @click="changedialogAlert" />
      </div>
      <div class="col q-px-sm">
        <q-btn unelevated rounded color="primary" no-caps :label="yesBtnText" style="height: 40px;" class="full-width"
          text-color="white" @click="changedialogAlertYesBtn" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';
export default {
  name: 'dialogAlert',
  props: {
    title: {
      type: String,
      default: '标题',
    },
    // 是否显示按钮
    isShowBtn: {
      type: Boolean,
      default: true,
    },
    // 是否显示关闭按钮
    isShowCloseBtn: {
      type: Boolean,
      default: true,
    },
    // 确认按钮文字
    yesBtnText: {
      type: String,
      default: 'Agree',
    },
    // 取消按钮文字
    cancelBtnText: {
      type: String,
      default: 'Cancel',
    },
    // 标题对齐方式
    titleAlign: {
      type: String,
      default: 'center',
    },
  },
  setup(props, context) {
    const state = reactive({});

    const changedialogAlert = () => {
      context.emit('eventDialogAlert', false);
    };
    const changedialogAlertYesBtn = () => {
      context.emit('eventDialogAlertYesBtn', false);
    };
    onMounted(() => {
      // console.log(scrollAreaRef);
    });

    return {
      ...toRefs(state),
      changedialogAlert,
      changedialogAlertYesBtn,
    };
  },
};
</script>

<style scoped>
.xxImg {
  position: absolute;
  right: 2px;
  top: 28%;
  transform: translateY(-50%);
}
</style>
