<template>
  <div class="row no-wrap">
    <menuBar></menuBar>
    <div class="calc">
      <!-- 通用header(app.scss) -->
      <div class="pageHeader">
        Identification
      </div>
      <div style="padding: 48px 100px;">
        <!-- input -->
        <div class="row no-wrap justify-between">
          <div class="q-mr-md" style="width: 48.5%;">
            <div class="q-mb-xs text-color-6">your name</div>
            <q-input standout class="q-mb-lg" v-model="content" placeholder="Email" />
          </div>
          <div style="width: 48.5%;">
            <div class="q-mb-xs text-color-6">Phone number</div>
            <q-input standout class="q-mb-lg" v-model="content" placeholder="Email" />
          </div>
        </div>
        <div class="row no-wrap justify-between">
          <div class="q-mr-md" style="width: 48.5%;">
            <div class="q-mb-xs text-color-6">ID number</div>
            <q-input standout class="q-mb-lg" v-model="content" placeholder="Email" />
          </div>
          <div style="width: 48.5%;">
            <div class="q-mb-xs text-color-6">ID Address</div>
            <q-input standout class="q-mb-lg" v-model="content" placeholder="Email" />
          </div>
        </div>
        <!-- 上传身份证 -->
        <div class="q-mb-xs text-color-6">Document</div>
        <div class="row justify-between">
          <div style="width: 31%;">
            <uploader :value="imgUrl" :listStyle="{
              height: '155px',
            }">
              <template v-slot:noneAdd>
                <div style="border: 1px dashed #D7D7D7;width: 100%;height: 100%;"
                  class="radius-8 column justify-center page_bg fit">
                  <q-img src="/images/default/add.png" width="29px" height="29px" class="self-center" />
                </div>
              </template>
            </uploader>
            <div class="text-body2 text-weight-medium text-center q-mt-lg">证件正面照</div>
          </div>
          <div style="width: 31%;">
            <uploader :value="imgUrl" :listStyle="{
              height: '155px',
            }">
              <template v-slot:noneAdd>
                <div style="border: 1px dashed #D7D7D7;width: 100%;height: 100%;"
                  class="radius-8 column justify-center page_bg fit">
                  <q-img src="/images/default/add.png" width="29px" height="29px" class="self-center" />
                </div>
              </template>
            </uploader>
            <div class="text-body2 text-weight-medium text-center q-mt-lg">证件反面照</div>
          </div>
          <div style="width: 31%;">
            <uploader :value="imgUrl" :listStyle="{
              height: '155px',
            }">
              <template v-slot:noneAdd>
                <div style="border: 1px dashed #D7D7D7;width: 100%;height: 100%;"
                  class="radius-8 column justify-center page_bg fit">
                  <q-img src="/images/default/add.png" width="29px" height="29px" class="self-center" />
                </div>
              </template>
            </uploader>
            <div class="text-body2 text-weight-medium text-center q-mt-lg">手持证件照</div>
          </div>
        </div>
        <!-- sub按钮 -->
        <div class="q-mt-xl row justify-end">
          <q-btn rounded color="primary" no-caps label="Submit" style="width: 170px;height: 48px;"></q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import menuBar from 'src/layouts/pc/settingLayouts.vue';
import uploader from 'src/components/mobile/uploader.vue';
import { defineComponent, reactive, toRefs } from 'vue';
// 因为自动加载路由问题。 第一次会获取不到页面跳转到404页面，未修复
export default defineComponent({
  components: {
    menuBar,
    uploader
  },
  name: 'identificationView',
  setup() {
    let store = reactive({
      //
      content: '',
      imgUrl: '',
    });
    return {
      ...toRefs(store),
    }
  }
});
</script>
<style lang="scss" scoped>
  @import url("../../../css/pcCss.css");
  // upload样式
  :deep .q-uploader__list {
    padding: 0;
  }
  // pc版input样式
  // :deep .q-field--standout .q-field__native {
  //   color: rgba(0, 0, 0, 0.87) !important;
  // }

  // :deep .q-field--standout .q-field__prefix {
  //   color: rgba(0, 0, 0, 0.87) !important;
  // }

  // :deep .q-field--standout .q-field__append {
  //   color: rgba(0, 0, 0, 0.54) !important;
  // }

  // :deep .q-field__marginal {
  //   height: 40px !important;
  // }

  // :deep .q-field--standout:before {
  //   background: #fff !important;
  // }

  :deep .q-field--standout .q-field__control {
    height: 40px !important;
    min-height: 40px !important;
  }

  // :deep .q-field--highlighted .q-field__control {
  //   background: #fff !important;
  //   box-shadow: none !important;
  // }
</style>
