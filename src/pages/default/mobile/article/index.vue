<template>
  <div class="q-pb-xl">
    article
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue'
import { imageSrc } from 'src/utils/index'

export default {
  name: 'ArticleIndex',
  setup() {
    const state = reactive({})

    onMounted(() => { })

    return {
      imageSrc,
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped></style>
