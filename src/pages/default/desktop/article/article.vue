<template>
  <div class="q-pb-xl">
    <div style="position: relative;">
      <q-img src="/images/bg.png" width="100%" height="240px" fit="fill" />
      <div class="column justify-center text-center" style="position: absolute;top: 0;width: 100%;height: 100%;">
        <div class="text-white text-h4 text-weight-bolder">News</div>
      </div>
    </div>
    <div class="q-mt-xl" style="padding: 0 108px;">
      <div class="row">
        <div style="width: 600px;">
          <div>
            <div class="text-color-3 text-h5 text-weight-bold q-mb-xs">Newsroom</div>
            <q-separator style="width: 46px;height: 2px;background: #01AC66;margin: 0;" inset />
          </div>
          <div class="row q-mt-lg">
            <div class="col-8 q-px-md q-py-lg row" style="background: #F5FAF8;position: relative;border-radius: 8px;">
              <div class="col-9">
                <div class="text-color-3 text-h6 text-weight-bold">After talks ？</div>
                <div class="ellipsis-2-lines text-color-6 text-subtitle2 text-weight-regular q-my-lg">President Biden held
                  a press
                  conference after meeting with
                  Chinese
                  PresidentPresident Biden held a press conference after meeting with Chinese President</div>
                <q-separator style="background: #666666;margin: 0;height: 2px;" inset />
                <div class="text-color-3 text-h5 text-weight-bold q-my-lg">11/30</div>
              </div>
              <q-img src="/images/new.png" width="300px" height="170px"
                style="position: absolute; right: -210px;top: 0;z-index: 99999;" />
            </div>
          </div>
          <div class="row q-col-gutter-none q-mt-lg"
            style="border-top: 1px solid #DDDDDD;border-left: 1px solid #DDDDDD;">
            <div class="col-6" v-for="n in 4" :key="`none-${n}`">
              <div
                style="border-bottom: 1px solid #DDDDDD; border-right: 1px solid #DDDDDD;position: relative;overflow: hidden;"
                class="q-px-md q-pt-md q-pb-xl pc-hover show">
                <div class="ellipsis text-color-3 text-subtitle1 text-weight-medium">ATCH LIVE: President Biden delxATCH
                  LIVE: President
                  Biden delxATCH
                  LIVE: President
                  Biden delx</div>
                <div class="text-weight-medium text-color-6 text-body2">2023-11-30</div>
                <div class=" q-pl-lg q-pt-md hide"
                  style="background-color: #01AC66;width: 98.72px;height: 98.72px;position: absolute;right: -44px;bottom: -50px;border-radius: 50%;">
                  <q-icon name="o_east" color="white" size="19px"></q-icon>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧 -->
        <div class="col " style="margin-left: 40px;">

          <div>
            <div class="text-color-3 text-h5 text-weight-bold">Latest News</div>
            <div style="background-color: #DDDDDD;" class="q-mt-xs">
              <q-separator style="width: 100px;height: 2px;background: #01AC66;margin: 0;" inset />
            </div>

            <q-scroll-area style="height: 700px;">
              <div class="q-pt-md cursor-pointer" v-for="(item, i) in articleList" :key="i">
                <div class="row">
                  <div class="col">
                    <div class="ellipsis text-subtitle1 text-weight-bold">{{ item.name }}</div>
                    <div style="height: 50px;width: 500px;" class="ellipsis text-subtitle1 text-weight-regular"
                      v-html="item.content">
                    </div>
                    <div class="text-weight-medium text-grey-7 text-body2">{{ date.formatDate(item.createdAt * 1000,
                      'YYYY-MM-DD') }}</div>
                  </div>
                  <q-img src="/images/new.png" class="rounded-borders" width="130px" height="76px" />
                </div>
                <q-separator style="height: 2px;background: #DDDDDD;" inset class="q-my-md q-mx-none" />
              </div>
            </q-scroll-area>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue'
import { getArticle } from 'src/apis/index'
import { imageSrc } from 'src/utils/index'
import { date } from 'quasar'

export default {
  name: 'articleNews',
  setup() {
    const state = reactive({
      count: 0,
      articleList: [] as any,
    })

    onMounted(() => {
      let params = {
        types: []
      }
      getArticle(params).then((res: any) => {
        state.articleList = res
        console.log('文章列表', res);
      })
    })

    return {
      imageSrc,
      date,
      ...toRefs(state),
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
