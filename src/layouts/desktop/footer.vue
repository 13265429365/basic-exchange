<template>
  <div style="padding: 36px" class="text-white column items-center">
    <div style="width: 1200px;">
      <div class="row">
        <div class="col-9">
          <div class="row justify-center">
            <div v-for="(article, articleIndex) in articleList" :key="articleIndex" class="col-3">
              <div class="column">
                <div class="text-body1 text-bold">{{ article.name }}</div>
                <div v-for="(children, childrenIndex) in article.children" :key="childrenIndex" style="width: 100%;">
                  <div class="ellipsis text-grey-4 text-body2 q-mt-sm cursor-pointer"
                    @click="$router.push(children.link)">{{
                      children.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-1"></div>
        <div class="col-2">
          <div class="text-body1 text-bold">社区</div>
          <div class="row items-center q-gutter-sm">
            <div v-for="(community, communityIndex) in communityList" :key="communityIndex">
              <q-img :src="imageSrc(community.icon)" width="32px" height="32px" class="cursor-pointer"
                @click="$router.push(community.link)"></q-img>
            </div>
          </div>

          <!-- 切换语言 -->
        </div>
      </div>

      <div class="q-mt-xl text-center">
        <div class="text-grey">
          {{ config.name }}
          <q-icon name="copyright" size="xs"></q-icon>
          <span>2023</span>
          <span>Cookie settings</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue'
import { InitStore } from 'src/stores/init';
import { imageSrc } from 'src/utils'
import { getFooter } from 'src/apis/index'


export default {
  name: 'LayoutsFooter',
  setup() {
    const $initStore = InitStore()
    const state = reactive({
      config: $initStore.config,
      articleList: [] as any,
      communityList: [] as any
    })

    onMounted(() => {
      getFooterList()
    })

    const getFooterList = () => {
      getFooter().then((res: any) => {
        state.articleList = res.items
        state.communityList = res.socialList
      })
    }

    return {
      imageSrc,
      ...toRefs(state)
    };
  },
};
</script>
