<template>
  <div class="q-pa-lg">
    <!-- 文章详情页面 -->
    <div class="text-h6 text-primary text-weight-bold q-mb-sm text-center">{{ name }}</div>
    <div class="content" v-html="content"></div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleInfo } from 'src/apis/index'

export default {
  name: 'ArticleDetails',
  setup() {
    const $route = useRoute();

    const state = reactive({
      content: '',
      name: '',
    })
    onMounted(() => {
      getArticleInfo({ id: Number($route.query.id) }).then((res: any) => {
        state.content = res.content
        state.name = res.name
        console.log(res);
      })
    })
    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped></style>
