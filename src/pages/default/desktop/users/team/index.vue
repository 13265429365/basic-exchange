<template>
  <div style="padding: 48px 100px;">
    <!-- 总金额 -->
    <div class="row items-center q-pa-lg rounded-borders"
      style="background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);">
      <q-avatar size="60px">
        <q-img :src="imageSrc(TeamMembers.avatar ?? '')"></q-img>
      </q-avatar>

      <div class="q-ml-md text-white">
        <div class="text-body1 text-weight-bold">
          {{ TeamMembers.username }}
          {{ '(ID:' + TeamMembers.id + ')' }}
        </div>
        <div class="row no-wrap items-center q-mt-sm">
          <div class="text-white text-weight-bold">
            {{ $t('teamEarnings') }} ： + {{ TeamMembers.earnings }}
          </div>
          <div @click="$router.push({ name: 'TeamEarnings', query: { id: TeamMembers.id } })"
            class="q-ml-lg cursor-pointer">
            <span style="font-size: 12px;">{{ $t('desc') }}</span>
            <q-icon size="12px" class="text-white q-ml-xs" name="arrow_forward_ios"></q-icon>
          </div>
        </div>
      </div>
    </div>

    <div class="q-mt-xl">
      <div v-for="(team, teamIndex) in TeamMembers.children" :key="teamIndex">
        <div class="row justify-between items-center q-my-lg q-px-md">
          <div class="col row items-center">
            <q-avatar size="40px">
              <q-img :src="imageSrc(team.avatar ?? '')"></q-img>
            </q-avatar>
            <div class="text-body1 q-ml-sm">{{ team.username }}<br> {{ '(ID:' + team.id + ')' }}</div>
          </div>
          <div class="col text-grey-7">
            {{ date.formatDate(team.createdAt * 1000, 'YYYY/MM/DD HH:mm:SS') }}
          </div>
          <div class="col text-primary text-weight-bold text-h6">
            + {{ team.earnings }}
          </div>
          <div class="row q-gutter-sm">
            <q-btn @click="getTeam({ id: team.id })" size="sm" flat dense rounded no-caps
              class="bg-grey-1 text-grey-8 q-px-md" style="border: 1px solid;">
              <div style="font-size: 12px;">{{ $t('desc') }}</div>
            </q-btn>
          </div>
        </div>
        <q-separator />
      </div>
      <div v-if="TeamMembers.children == null || TeamMembers.children.length <= 0">
        <div class="text-center q-my-lg text-h6 text-grey-8">
          {{ $t('noData') }}
        </div>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { imageSrc } from 'src/utils'
import { teamIndexAPI } from 'src/apis/user';
import { UserStore } from 'src/stores/user';
import { date } from 'quasar';

export default defineComponent({
  name: 'TeamIndex',
  setup() {
    const $userStore = UserStore();

    let state = reactive({
      // 团队成员
      TeamMembers: [] as any,
    });

    onMounted(() => {
      getTeam({ id: $userStore.userInfo.id })
    })

    // 获取用户团队详情
    const getTeam = (params: any) => {
      teamIndexAPI(params).then((res: any) => {
        state.TeamMembers = res
      })
    }

    return {
      imageSrc,
      date,
      ...toRefs(state),
      getTeam,
    }
  }
});
</script>
<style lang="scss" scoped></style>
