<template>
  <div class="calc">
    <!-- 通用header(app.scss) -->
    <div class="pageHeader">
      realAuth
    </div>

    <div class="maxWidth1200">
      <!-- input -->
      <div>
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
                  class="column justify-center items-center fit">
                  <q-icon name="add" size="29px" />
                </div>
              </template>
            </uploader>
            <div class="text-body2 text-weight-medium text-center q-mt-lg">证件正面照</div>
          </div>

          <!--  -->
          <div style="width: 31%;">
            <uploader :value="imgUrl" :listStyle="{
              height: '155px',
            }">
              <template v-slot:noneAdd>
                <div style="border: 1px dashed #D7D7D7;width: 100%;height: 100%;"
                  class="column justify-center items-center fit">
                  <q-icon name="add" size="29px" />
                </div>
              </template>
            </uploader>
            <div class="text-body2 text-weight-medium text-center q-mt-lg">证件反面照</div>
          </div>

          <!--  -->
          <div style="width: 31%;">
            <uploader :value="imgUrl" :listStyle="{
              height: '155px',
            }">
              <template v-slot:noneAdd>
                <div style="border: 1px dashed #D7D7D7;width: 100%;height: 100%;"
                  class="column justify-center items-center fit">
                  <q-icon name="add" size="29px" />
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
import uploader from 'src/components/uploader.vue';
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  components: {
    uploader
  },
  name: 'realAuthIndex',
  setup() {
    let state = reactive({
      //
      content: '',
      imgUrl: '',
    });
    return {
      ...toRefs(state),
    }
  }
});
</script>
<style lang="scss" scoped>
// upload样式
:deep .q-uploader__list {
  padding: 0;
}
</style>
