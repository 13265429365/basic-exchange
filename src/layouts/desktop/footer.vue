<template>
  <div style="background: #021736;padding: 36px" class="text-white column items-center">
    <div style="width: 1200px;">
      <div class="row">
        <div class="col-9">
          <div class="row justify-center">
            <div v-for="(article, articleIndex) in articleList" :key="articleIndex" class="col-3">
              <div class="column">
                <div class="text-body1 text-bold">{{ article.name }}</div>
                <div v-for="(children, childrenIndex) in article.children" :key="childrenIndex" style="width: 100%;">
                  <div class="ellipsis text-grey-4 text-body2 q-mt-sm cursor-pointer" @click="routerTo(children.route)">{{
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
              <q-icon :name="community.icon" size="md" class="cursor-pointer" @click="routerTo(community.route)"></q-icon>
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
import { reactive, toRefs } from 'vue'
import { useInitStore } from 'src/stores/init';
import { routerTo } from 'src/utils'

export default {
  name: 'LayoutsFooter',
  setup() {
    const $initStore = useInitStore()
    const state = reactive({
      config: $initStore.config,
      articleList: [] as any,
      communityList: [] as any
    })

    state.communityList = [
      { name: '关于我们', route: '', icon: 'mail' },
      { name: '关于我们', route: '', icon: 'mail' },
      { name: '关于我们', route: '', icon: 'mail' },
      { name: '关于我们', route: '', icon: 'mail' },
      { name: '关于我们', route: '', icon: 'mail' },
    ]

    state.articleList = [
      {
        name: '关于我们', route: '', children: [
          { name: '关于我们', route: '', icon: '' },
          { name: '服务协议', route: '', icon: '' },
          { name: '隐私协议', route: '', icon: '' },
          { name: '公告中心', route: '', icon: '' },
          { name: '最新新闻', route: '', icon: '' },
          { name: '下载中心', route: '', icon: '' },
        ]
      }, {
        name: '平台服务', route: '', children: [
          { name: '产品服务', route: '', icon: '' },
          { name: '产品定价', route: '', icon: '' },
          { name: '最新产品', route: '', icon: '' }
        ]
      }, {
        name: '帮助中心', route: '', children: [
          { name: '帮助中心1', route: '', icon: '' },
          { name: '帮助中心1', route: '', icon: '' },
          { name: '帮助中心1', route: '', icon: '' },
          { name: '帮助中心1', route: '', icon: '' },
          { name: '帮助中心1', route: '', icon: '' },
          { name: '帮助中心1', route: '', icon: '' },
          { name: '帮助中心1', route: '', icon: '' },
          { name: '帮助中心1', route: '', icon: '' },
        ]
      }, {
        name: '联系我们', route: '', children: [
          { name: 'North Dakota RALEIGH 4018 Upton Avenue', route: '', icon: 'place' },
          { name: '+1 (555)123-456', route: '', icon: 'phone_iphone' },
          { name: 'muiprosperyls15@gmail.com', route: '', icon: 'forward_to_inbox' },
        ]
      }
    ]

    return {
      routerTo,
      ...toRefs(state)
    };
  },
};
</script>
