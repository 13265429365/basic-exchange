<template>
  <div class="calc row justify-center">
    <div class="col-10">
      <div style="position: relative;">
        <q-img src="/images/pc/help/bg.png" width="100%" height="240px" fit="fill" />
        <div class="column justify-center text-center" style="position: absolute;top: 0;width: 100%;height: 100%;">
          <div class="text-white text-h4 text-weight-bolder">帮助中心</div>
        </div>
      </div>
      <div class="conent" style="margin-top: -50px;position: relative;">
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
        <q-list class="q-ma-md bg-white q-mt-lg text-black" style="border-radius: 8px" v-if="helpersList.length > 0">
          <div class="q-px-md q-pt-sm text-h6 text-weight-medium text-color-3">FAQ</div>
          <q-expansion-item v-for="( helper, helperIndex ) in  helpersList " :key="helperIndex" :label="helper.title">
            <template v-slot:header>
              <div class="full-width text-color-3 text-subtitle1 text-weight-medium">
                {{ helper.title }}
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
import { reactive, toRefs } from 'vue'

export default {
  name: 'helpCenter',
  setup() {
    const state = reactive({
      count: 0,
      helpersList: [{
        title: 'Can I purchase products from Tech Heim using installment payments?',
        content: 'Yes, Tech Heim offers the option to purchase products using both cash and installment payments. This allows you to choose the payment method that suits your needs and budget.'
      }, {
        title: 'How can I engage with the magazine contentHeim?',
        content: 'You can actively engage with the magazine content by leaving comments and participating in the question-and-answer section. Feel free to share your thoughts, ask questions, and interact with fellow tech enthusiasts in the community.'
      }, {
        title: 'Does Tech Heim offer a warranty on its products?',
        content: 'Yes, Tech Heim provides a warranty on all eligible products. The specific warranty details may vary depending on the manufacturer and product category. Please refer to the product description or contact our customer support for more information.'
      }]
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
