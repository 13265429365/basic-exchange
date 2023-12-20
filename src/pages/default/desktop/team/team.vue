<template>
  <div class="calc">
    <!-- 通用header(app.scss) -->
    <div class="pageHeader">
      {{ $t('myTeam') }}
    </div>

    <div class="maxWidth1200" style="min-width: 1160px;">
      <div>
        <!-- 总金额 -->
        <div class="page_bg q-pa-md radius-8 row no-wrap items-center" style="width: 220px;">
          <div class="text-primary text-weight-bold" style="font-size: 16px;">
            {{ $t('teamBenefits') }} : {{ TeamMembers.teamEarnings }}
          </div>
          <q-icon class="q-ml-sm" name="arrow_forward_ios"></q-icon>
        </div>

        <!-- 树级 -->
        <q-list class="rounded-borders team">
          <q-expansion-item v-for="(customize, customizeIndex) in TeamMembers.childUserList" :key="customizeIndex"
            expand-icon-toggle hide-expand-icon v-model="customize.expanded">
            <!-- 第一级 -->
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar style="width: 40;height: 40px;">
                  <q-img :src="imageSrc('')"></q-img>
                </q-avatar>
              </q-item-section>
              <q-item-section style="justify-content:start">
                <div>{{ customize.username }}</div>
                <q-chip v-if="customize.lv" class="text-primary q-ml-lg"
                  style="background: rgba(1,172,102,0.1);font-size: 10px;">
                  {{ customize.lv }}
                </q-chip>
              </q-item-section>
              <q-item-section class="text-color-6" style="min-width: 215px;">
                {{ formatDate(customize.createdAt) }}
              </q-item-section>
              <q-item-section class="text-primary" style="min-width: 215px;">
                {{ customize.teamEarnings }}
              </q-item-section>
              <q-item-section style="justify-content:end;min-width: 215px;">
                <div @click="Team({ id: customize.id })"
                  class="btn row justify-center items-center q-mr-sm cursor-pointer">
                  <div>{{ $t('more') }}</div>
                  <!-- <q-icon class="q-ml-xs" :name="customize.expanded ? 'expand_less' : 'expand_more'"></q-icon> -->
                </div>
                <div @click="$router.push('/team/earnings/index')"
                  class="btn row justify-center items-center cursor-pointer">{{ $t('desc') }}
                </div>
              </q-item-section>
            </template>
          </q-expansion-item>

          <!-- 没有成员时显示 -->
          <q-expansion-item v-if="TeamMembers.childUserList == null || TeamMembers.childUserList.length <= 0"
            expand-icon-toggle hide-expand-icon>
            <template v-slot:header>
              <q-item-section>
                暂无成员
              </q-item-section>
            </template>
          </q-expansion-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { formatDate, imageSrc } from 'src/utils/index'
import { getTeam } from 'src/apis/user';

export default defineComponent({
  name: 'teamIndex',
  setup() {
    const $router = useRouter();

    let state = reactive({
      // 团队成员
      TeamMembers: [] as any,
    });



    onMounted(() => {
      const id = localStorage.getItem('userInfo')
      if (id != null) {
        Team({ id: JSON.parse(id).id })
      }
    })

    // 获取用户团队详情
    const Team = (params: any) => {
      getTeam(params).then((res: any) => {
        console.log(res);
        state.TeamMembers = res
      })
    }

    return {
      imageSrc,
      formatDate,
      ...toRefs(state),
      Team,
    }
  }
});
</script>
<style lang="scss" scoped>
.btn {
  height: 24px;
  border-radius: 12px 12px 12px 12px;
  border: 1px solid #666666;
  color: #666;
  padding: 2px 10px;
}

:deep .team .q-item .q-item__section {
  flex-direction: row;
  align-items: center;
}

:deep .team .q-item {
  border-bottom: 1px solid #DDDDDD;
  padding: 20px 3px;
}

:deep .team .q-expansion-item .q-expansion-item__content {
  background: #F9F9F9;
}
</style>
