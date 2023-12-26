<template>
  <div>
    <q-uploader flat auto-upload :url="baseURL + '/upload'" :field-name="name" :style="uploaderStyle" :accept="accept"
      :class="uploaderClass" :multiple="multiple" max-files="9" @uploaded="uploadedFunc" @start="uploaderStartFunc"
      @finish="uploaderFinishFunc" @rejected="uploaderRejectedFunc"
      :headers="[{ name: 'Authorization', value: 'Bearer ' + userToken }]">
      <template v-slot:header></template>
      <template v-slot:list="scope">
        <div @click="scope.pickFiles">
          <!-- 单图 -->
          <q-card flat bordered :style="listStyle" class="cursor-pointer" v-if="type === 'avatar'">
            <div class="row justify-center items-center" style="border-radius: 8px;overflow: hidden;">
              <q-uploader-add-trigger />
              <div v-if="respValue" class="row justify-center items-center"
                :style="{ width: '100%', height: listStyle.height }">
                <q-img :src="imageSrc(respValue)" alt="" style="width: 100%;" height="160px"></q-img>
              </div>
              <div v-else :style="{ width: '100%', height: listStyle.height, border: '1px dashed #D7D7D7', }">
                <slot name="noneAdd"></slot>
              </div>
            </div>
          </q-card>

          <!--  显示多图上传 -->
          <!-- <q-scroll-area :style="{ width: '100%', height: listStyle.height }" v-else-if="multiple" :bar-style="barStyle"
            :thumb-style="thumbStyle">
            <div class="row no-wrap">
              <q-card flat bordered v-for="(file, fileIndex) in scope.files" :key="file.__key" :style="listStyle"
                class="q-mr-sm">
                <q-card-section class="no-padding">
                  <q-img no-spinner :src="file.__img.src"></q-img>
                  <div style="position: absolute; top: 0; right: 0">
                    <q-btn flat dense color="negative" @click.stop="deleteImagesFunc(fileIndex, scope.files)"
                      icon="sym_o_delete"></q-btn>
                  </div>
                </q-card-section>
              </q-card>

              <q-card flat bordered :style="listStyle" class="cursor-pointer">
                <div class="column justify-center items-center" style="height: 100%">
                  <q-icon name="add" :size="size">
                    <q-uploader-add-trigger />
                  </q-icon>
                </div>
              </q-card>
            </div>
          </q-scroll-area> -->
        </div>
      </template>
    </q-uploader>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import { imageSrc } from 'src/utils';
import { Loading, QSpinnerBars } from 'quasar';
import { InitStore } from 'src/stores/init';
import { NotifyNegative } from 'src/utils/notify';


export default {
  name: 'UploaderComponents',
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


      if (props.multiple) {
        state.respValue.push(...imagePath);
      } else {
        state.respValue = imagePath[0];
      }
      console.log(state.respValue);

      context.emit('uploaded', state.respValue);
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
.q-card--bordered {
  border: 0px !important;
}

:deep(.q-uploader .q-uploader__list) {
  // padding: 8px !important;
  overflow: hidden;
}
</style>
