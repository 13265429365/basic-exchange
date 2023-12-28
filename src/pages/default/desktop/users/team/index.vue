<template>
  <div style="padding: 48px 100px;">
    <!-- 总金额 -->
    <q-btn color="primary" no-caps unelevated class="bg-grey-2">
      <div class="text-primary text-weight-bold">
        {{ $t('teamEarnings') }} : {{ TeamMembers.teamEarnings }}
      </div>
      <q-icon size="14px" class="q-ml-md text-grey-7" name="arrow_forward_ios"></q-icon>
    </q-btn>

    <div class="q-mt-lg">
      <div v-for="(team, teamIndex) in TeamMembers.childUserList" :key="teamIndex">
        <div class="row justify-between items-center q-my-lg">
          <div class="col-5 row items-center">
            <q-avatar>
              <q-img width="40px" height="40px" :src="imageSrc(team.avatar ?? '')"></q-img>
            </q-avatar>
            <div class="text-body1 q-ml-sm">{{ team.username }} {{ '(ID:' + team.id + ')' }}</div>
          </div>
          <div class="col text-grey-7">
            {{ date.formatDate(team.createdAt * 1000, 'YYYY/MM/DD') }}
          </div>
          <div class="col text-primary">
            + {{ team.teamEarnings }}
          </div>
          <div class="row q-gutter-sm">
            <q-btn @click="getTeam({ id: team.id })" size="sm" flat rounded no-caps :label="$t('desc')"
              class="bg-grey-1 text-grey-8" style="border: 1px solid;"></q-btn>
          </div>
        </div>
        <q-separator />
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { imageSrc } from 'src/utils/index'
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
        console.log(res);
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
