<template>
  <div class="calc row justify-center">
    <div class="col-10">
      <div style="position: relative;">
        <q-img src="/images/bg.png" width="100%" height="240px" fit="fill" />
        <div class="column justify-center text-center" style="position: absolute;top: 0;width: 100%;height: 100%;">
          <div class="text-white text-h4 text-weight-bolder">{{ $t('helpers') }}</div>
        </div>
      </div>
      <div class="conent" style="margin-top: -50px;position: relative;padding: 0 200px;">
        <div class="row q-col-gutter-md">
          <div class="col-4 ">
            <div class="radius-8 column justify-center q-py-md bg-white" style="border: 1px solid #DDDDDD;height: 144px;">
              <q-img class="self-center" src="/images/pc/help/listLogo1.png" width="56px" height="56px" />
              <div class="self-center text-color-3 text-body1 q-pt-sm text-weight-medium">产品说明</div>
            </div>
          </div>
          <div class="col-4 ">
            <div class="radius-8 column justify-center q-py-md bg-white" style="border: 1px solid #DDDDDD;height: 144px;">
              <q-img class="self-center" src="/images/pc/help/listLogo2.png" width="56px" height="56px" />
              <div class="self-center text-color-3 text-body1 q-pt-sm text-weight-medium">产品教程</div>
            </div>
          </div>
          <div class="col-4 ">
            <div class="radius-8 column justify-center q-py-md bg-white" style="border: 1px solid #DDDDDD;height: 144px;">
              <q-img class="self-center" src="/images/pc/help/listLogo3.png" width="56px" height="56px" />
              <div class="self-center text-color-3 text-body1 q-pt-sm text-weight-medium">视频教程</div>
            </div>
          </div>
        </div>
        <!--            帮助中心列表-->
        <q-list class="q-ma-md bg-white q-mt-lg text-black" style="border-radius: 8px" v-if="articleList.length > 0">
          <div class="q-px-md q-pt-sm text-h6 text-weight-medium text-color-3">FAQ</div>
          <q-expansion-item v-for="( helper, helperIndex ) in  articleList " :key="helperIndex" :label="helper.title">
            <template v-slot:header>
              <div class="full-width text-color-3 text-subtitle1 text-weight-medium">
                {{ helper.name }}
              </div>
            </template>
            <q-card flat>
              <q-card-section>
                <div class="text-color-6 text-body2 text-weight-regular" v-html="helper.content"></div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue'
import { getHelpers } from 'src/apis/index'

export default {
  name: 'helpCenter',
  setup() {
    const state = reactive({
      count: 0,
      articleList: [] as any,
    })

    onMounted(() => {
      getHelpers().then((res: any) => {
        state.articleList = res.data.articleList
        console.log(res);
      })
    })

    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep(.q-expansion-item) {
  padding-left: 9px;
  border-bottom: 1px solid #F4F5FD;
}
</style>
