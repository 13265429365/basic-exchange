<template>
  <div class="q-pb-xl">
    <div style="position: relative;">
      <q-img src="/images/pc/help/bg.png" width="100%" height="240px" fit="fill" />
      <div class="column justify-center text-center" style="position: absolute;top: 0;width: 100%;height: 100%;">
        <div class="text-white text-h4 text-weight-bolder">Announcements</div>
      </div>
    </div>
    <div class="conent q-pt-lg">
      <div class=" q-my-md" v-for="(i, index) in 6" :key="index">
        <div class="row">
          <div class="row">
            <div class="column q-mr-lg justify-center">
              <div class="text-color-3 text-weight-medium" style="font-size: 42px;">
                23
              </div>
              <div class="text-color-6 text-subtitle2 text-weight-regular" style="margin-top: -15px;">
                2023.10
              </div>
            </div>
            <q-separator vertical inset style=" height: 90px" class="q-mt-md" />
          </div>

          <div class="q-pl-md col column justify-center">
            <div class="text-color-3 text-weight-medium text-subtitle1 ellipsis">After talks with Xi, Biden says progress
              made in
              three areas with
              China in thr After talks with Xi, Biden says progress made in
              three areas with
              China in thr</div>
            <div class="text-color-6 ellipsis">
              President Biden held a press conference after meeting with Chinese
            </div>
            <div style="color: #01AC66;" class="q-mt-md text-weight-medium cursor-pointer" @click="goWhere(index)">
              查看详情
            </div>
          </div>

        </div>
        <q-separator style="height: 1px;background: #DDDDDD;" inset class="q-my-md q-mx-none" />

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'


export default {
  name: 'ArticleAnnouncements',
  setup() {
    const state = reactive({
      count: 0
    })
    const $route = useRouter();
    const goWhere = (i: any) => {
      $route.push({ path: '/article/details/' + i })
    }
    return {
      ...toRefs(state),
      goWhere
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep(.q-expansion-item) {
  border-bottom: 1px solid #F4F5FD;
}

.show:hover .hide {
  display: block;
}

.hide {
  animation: all 1s ease;
  display: none;
}
</style>
