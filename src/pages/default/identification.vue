<template>
  <div class="column full-height">
    <navBar title="Identification"></navBar>
    <q-separator style="background: #F4F5FD;" />
    <div class="col bg-white  q-pa-md">
      <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-sm">Name</div>
      <q-input standout v-model="text" class="q-mb-md" />
      <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-sm">ID Number</div>
      <q-input standout v-model="text" class="q-mb-md" />
      <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-sm">Phone Number</div>
      <q-input standout v-model="text" class="q-mb-md" />

      <div class="text-color-3 text-subtitle1 text-weight-medium q-pb-sm">Document</div>
      <uploader :value="imgUrl" :listStyle="{
        height: '186px',
      }">
        <template v-slot:noneAdd>
          <div style="border: 1px dashed #D7D7D7;width: 100%;height: 100%;background-color: #F5F6FA;"
            class="radius-8 column justify-center">
            <q-img src="/images/default/add.png" width="24px" height="24px" class="self-center" />
            <div class="text-body2 text-weight-medium text-color-9 self-center q-mt-sm">身份证正面</div>
          </div>
        </template>
      </uploader>
      <uploader :value="imgUrl2" :listStyle="{
        height: '186px',
      }">
        <template v-slot:noneAdd>
          <div style="border: 1px dashed #D7D7D7;width: 100%;height: 100%;background-color: #F5F6FA;"
            class="radius-8 column justify-center">
            <q-img src="/images/default/add.png" width="24px" height="24px" class="self-center" />
            <div class="text-body2 text-weight-medium text-color-9 self-center q-mt-sm">身份证背面</div>
          </div>
        </template>
      </uploader>

      <q-btn unelevated rounded color="primary" label="Submit" class="full-width q-my-xl" no-caps />
    </div>

  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import navBar from 'src/components/navBar.vue';
import uploader from 'src/components/uploader.vue';
export default {
  name: 'defaultIdentification',
  components: { navBar, uploader },
  setup() {
    const state = reactive({
      text: '',
      imgUrl: '',
      imgUrl2: '',
    });
    return {
      ...toRefs(state)
    }
  }
};
</script>

<style lang="scss" scoped>
:deep(.q-field__control) {
  background-color: #F5F6FA !important;
  height: 55px;
  box-shadow: none !important;
}

:deep(.q-field__marginal) {
  height: 55px;
}

:deep(.q-field--labeled .q-field__native) {
  padding: 0;
}

:deep(.userInfo-input .q-field__native) {
  text-align: end;
}

:deep(.q-field__label) {
  top: 20px;
}

:deep(.q-btn) {
  min-height: 44px;
}

:deep(.q-field--standout.q-field--rounded .q-field__control) {
  border-radius: 25px;
}

:deep(.q-field__control:before) {
  color: #999999 !important;
  background: #F5F6FA !important;
}

:deep(.q-field__native) {
  color: #999999 !important;
  font-weight: 500 !important;
  font-family: PingFangSC-Medium, sans-serif;
  line-height: 20px;
}

:deep(.q-field__prepend .q-field--standout .q-field--highlighted) {
  color: #999999 !important;
}
</style>
