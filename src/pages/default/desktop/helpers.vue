<template>
  <div class="row justify-center full-width">
    <div class="col">
      <!-- 背景 -->
      <div class="bg row items-center justify-center">
        <div class="text-white text-h4 text-weight-bolder">{{ $t('helpers') }}</div>
      </div>

      <div class="q-mt-xl relative-position" style="padding: 0 200px;">
        <!-- 帮助列表 -->
        <div class="row q-col-gutter-md">
          <div class="col-3" v-for="( social, socialIndex ) in socialList" :key="socialIndex">
            <div class="rounded-borders column justify-center q-py-md bg-white cursor-pointer"
              style="border: 1px solid #DDDDDD;height: 144px;">
              <q-img class="self-center" :src="imageSrc(social.icon)" width="56px" height="56px" />
              <div class="self-center text-body1 q-pt-sm text-weight-medium">{{ $t(social.name) }}</div>
            </div>
          </div>

        </div>

        <!-- 文章列表 -->
        <q-list class="q-ma-md bg-white q-mt-lg text-black" style="border-radius: 8px" v-if="articleList.length > 0">
          <div class="q-px-md q-pt-sm text-h6 text-weight-medium">FAQ</div>
          <q-expansion-item v-for="( helper, helperIndex ) in  articleList " :key="helperIndex" :label="helper.title">
            <template v-slot:header>
              <div class="full-width text-subtitle1 text-weight-medium">
                {{ helper.name }}
              </div>
            </template>
            <q-card flat>
              <q-card-section>
                <div v-html="helper.content"></div>
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
import { imageSrc } from 'src/utils'

export default {
  name: 'helpCenter',
  setup() {
    const state = reactive({
      // 帮助文章
      articleList: [] as any,

      // 帮助列表
      socialList: [] as any,
    })

    onMounted(() => {
      getHelpers().then((res: any) => {
        state.articleList = res.articleList
        state.socialList = res.socialList
        console.log(res);
      })
    })

    return {
      imageSrc,
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  background: url("/images/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  height: 240px;
}

::v-deep(.q-expansion-item) {
  padding-left: 9px;
  border-bottom: 1px solid #F4F5FD;
}
</style>
