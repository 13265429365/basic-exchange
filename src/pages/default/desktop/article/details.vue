<template>
  <div style="padding: 80px 108px;min-height: 90vh;">
    <!-- 文章详情页面 -->
    <div class="text-h5 text-weight-bold text-center q-mb-lg">{{ name }}</div>
    <div class="content" v-html="content"></div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleInfo } from 'src/apis/index'

export default {
  name: 'articleDetails',
  setup() {
    const $route = useRoute();

    const state = reactive({
      content: '',
      name: '',
    })
    onMounted(() => {
      let params = {
        id: Number($route.query.id)
      }
      console.log(params);

      getArticleInfo(params).then((res: any) => {
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
