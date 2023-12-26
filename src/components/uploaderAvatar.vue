<template>
  <q-uploader flat auto-upload :url="baseURL + '/upload'" :field-name="name" :style="uploaderStyle" :accept="accept"
    :class="uploaderClass" :multiple="multiple" max-files="9" @uploaded="uploadedFunc" @start="uploaderStartFunc"
    @finish="uploaderFinishFunc" @rejected="uploaderRejectedFunc"
    :headers="[{ name: 'Authorization', value: 'Bearer ' + userToken }]">
    <template v-slot:header></template>
    <template v-slot:list="scope">
      <div @click="scope.pickFiles">
        <!-- 单图 -->
        <q-uploader-add-trigger />
        <q-img class="head_edit cursor-pointer" src="/images/edit.png" />
      </div>
    </template>
  </q-uploader>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import { imageSrc } from 'src/utils';
import { Loading, QSpinnerBars } from 'quasar';
import { InitStore } from 'src/stores/init';
import { NotifyNegative } from 'src/utils/notify';


export default {
  name: 'uploaderAvatar',
  props: {
    // 
    name: { type: String, default: 'file' },

    // 文件大小
    size: { type: String, default: '80px' },

    // 是否上传多张
    multiple: { type: Boolean, default: false },

    // 图片路径
    respValue: {
      type: String,
      default: '',
    },

    // upload 自定义class
    uploaderClass: { type: String, default: '' },
    uploaderStyle: {
      type: Object,
      default: () => {
        return { width: '100%' };
      },
    },

    // card样式
    listStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },

    // 上传文件的类型
    accept: { type: String, default: '.jpg,.png,.gif,image/*' },

    //  avatar | multiple
    type: { type: String, default: 'avatar' },
  },
  setup(props: any, context: any) {
    let $initStore = InitStore()

    // const userStore = useUserStore();
    const state = reactive({
      // 用户token
      userToken: $initStore.userToken,

      // api路径
      baseURL: process.env.baseURL,

      // 
      respValue: '' as any,

      // upload样式
      barStyle: {
        height: '8px',
        borderRadius: '9px',
        backgroundColor: '#1E1F22',
        opacity: 0.2,
      } as any,
      thumbStyle: {
        height: '4px',
        bottom: '2px',
        borderRadius: '5px',
        backgroundColor: '#1E1F22',
        opacity: '0.7',
      },

    });

    // 上传完成回调方法
    const uploadedFunc = (info: any) => {
      const imagePath = JSON.parse(info.xhr.response).data;

      state.respValue = imagePath[0];
      console.log(state.respValue);

      context.emit('upload', state.respValue);
    };

    // 删除图片列表
    const deleteImagesFunc = (index: number, arr: any) => {
      state.respValue.splice(index, 1);
      arr.splice(index, 1);
      context.emit('deleted', state.respValue);
    };

    // 开始上传
    const uploaderStartFunc = () => {
      Loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'secondary',
        spinnerSize: 50,
        message: 'Some important process is in progress. Hang on...',
      });
    };

    // 上传完成
    const uploaderFinishFunc = () => {
      Loading.hide();
    };

    // 检查格式是否正确
    const uploaderRejectedFunc = () => {
      NotifyNegative('accept, max-file-size, max-total-size, filter, etc check please')
    };

    return {
      imageSrc,
      uploadedFunc,
      uploaderStartFunc,
      uploaderFinishFunc,
      deleteImagesFunc,
      uploaderRejectedFunc,
      ...toRefs(state),
    };
  },
};
</script>

<style scoped lang="scss">
.q-uploader {
  display: block;
  width: 27px !important;
  height: 27px;
  background: none;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 9999999;
}

:deep(.q-uploader__list) {
  padding: 0px !important;
  min-height: 27px;
}

.head_edit {
  width: 27px;
  height: 27px;

}
</style>
