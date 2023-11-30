<template>
  <div class="column full-height" style="width: 100vw;">
    <div class="col page_bg column full-width ">
      <div class="bg">
        <navBar title="Help Center" color="white" bgColor="#fff0"></navBar>
        <div class="q-pa-md">
          <div class="row justify-between">
            <div class="col-6  ">
              <div class="text-body1 text-white text-weight-bold q-mb-sm">
                Hi,Can I help you?
              </div>
              <div style="background: rgba(255, 255, 255, 0.12);padding: 7px 16px;max-width: 131px;"
                class="radius-x text-center text-white ellipsis">24hours
                online</div>
            </div>
            <q-img src="/images/default/helpFAQ.png" width="62px" height="79px" />
          </div>
          <div class="row q-col-gutter-md q-mt-xs">
            <div class="col-4">
              <div class="radius-8 bg-white column items-center" style="padding: 25px 0;">
                <q-img src="/images/default/line.png" width="41px" height="41px" />
                <div class="text-color-3 text-body2 text-weight-medium q-mt-sm">Line</div>
              </div>
            </div>
            <div class="col-4">
              <div class="radius-8 bg-white column items-center" style="padding: 25px 0;">
                <q-img src="/images/default/telegram.png" width="41px" height="41px" />
                <div class="text-color-3 text-body2 text-weight-medium q-mt-sm">Telegram</div>
              </div>
            </div>
            <div class="col-4">
              <div class="radius-8 bg-white column items-center" style="padding: 25px 0;">
                <q-img src="/images/default/whatsapp.png" width="41px" height="41px" />
                <div class="text-color-3 text-body2 text-weight-medium q-mt-sm">Whatsapp</div>
              </div>
            </div>
          </div>
        </div>


        <!--            帮助中心列表-->
        <q-list class="q-ma-md bg-white q-mt-lg text-black" style="border-radius: 8px" v-if="helpersList.length > 0">
          <q-expansion-item v-for="( helper, helperIndex ) in  helpersList " :key="helperIndex" :label="helper.title">
            <q-card flat>
              <q-card-section>
                <div class="font-c-6 font-18 text-400" v-html="helper.content"></div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import navBar from 'src/components/navBar.vue';

export default {
  name: 'helpCenter',
  components: { navBar },
  setup() {
    const state = reactive({
      helpersList: [{
        title: 'question',
        content: '巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉吧'
      }, {
        title: 'question',
        content: '巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉吧'
      }, {
        title: 'question',
        content: '巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉吧'
      }]
    });
    return {
      ...toRefs(state),
    }
  }
};
</script>

<style lang="scss" scoped>
.bg {
  background: linear-gradient(to right, #10BE70, #91DB82);
  height: 263px;
  border-bottom-left-radius: 24%;
  border-bottom-right-radius: 24%;
}

::v-deep(.q-expansion-item) {
  border-bottom: 1px solid #F4F5FD;
}
</style>
