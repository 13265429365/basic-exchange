<template>
  <div style="padding: 48px 100px;">
    <!-- 头像 -->
    <div class="rounded-borders q-pa-lg text-white" style="background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);">
      <q-scroll-area style="height: 60px; max-width: 100%" :thumb-style="{ display: 'none' }">
        <div class="row no-wrap items-center">
          <!-- 固定头像 -->
          <div class="row no-wrap items-center q-mr-xl">
            <q-avatar class="q-mr-md" size="60px">
              <q-img :src="imageSrc(TeamBenefit.currentInfo.avatar ?? '')"></q-img>
            </q-avatar>
            <div>
              <div class="text-h6 text-weight-medium">{{ TeamBenefit.currentInfo.username ?? '' }}</div>
              <div class="text-weight-medium" style="font-size: 17px;">+{{ TeamBenefit.teamEarnings }}</div>
            </div>
          </div>

          <div class="row no-wrap">
            <div class="row no-wrap items-center">
              <div style="width: 1px;background: #fff;height: 42px;margin: 0 27px;"></div>
              <div style="width: 110px;">
                <div class="text-h5 text-center text-weight-medium">{{ TeamBenefit.buyAmount }}</div>
                <div class="text-center">{{ $t('buyAmount') }}</div>
              </div>
            </div>
            <div class="row no-wrap items-center">
              <div style="width: 1px;background: #DDDDDD;height: 42px;margin: 0 27px;"></div>
              <div style="width: 110px;">
                <div class="text-h5 text-center text-weight-medium">{{ TeamBenefit.inviteNums }}</div>
                <div class="text-center">{{ $t('inviteNums') }}</div>
              </div>
            </div>
            <div class="row no-wrap items-center">
              <div style="width: 1px;background: #DDDDDD;height: 42px;margin: 0 27px;"></div>
              <div style="width: 110px;">
                <div class="text-h5 text-center text-weight-medium">{{ TeamBenefit.teamEarnings }}</div>
                <div class="text-center">{{ $t('teamEarnings') }}</div>
              </div>
            </div>
            <div class="row no-wrap items-center">
              <div style="width: 1px;background: #DDDDDD;height: 42px;margin: 0 27px;"></div>
              <div style="width: 110px;">
                <div class="text-h5 text-center text-weight-medium">{{ TeamBenefit.todayAmount }}</div>
                <div class="text-center">{{ $t('todayAmount') }}</div>
              </div>
            </div>
            <div class="row no-wrap items-center">
              <div style="width: 1px;background: #DDDDDD;height: 42px;margin: 0 27px;"></div>
              <div style="width: 110px;">
                <div class="text-h5 text-center text-weight-medium">{{ TeamBenefit.todayEarnings }}</div>
                <div class="text-center">{{ $t('todayEarnings') }}</div>
              </div>
            </div>
            <div class="row no-wrap items-center">
              <div style="width: 1px;background: #DDDDDD;height: 42px;margin: 0 27px;"></div>
              <div style="width: 110px;">
                <div class="text-h5 text-center text-weight-medium">{{ TeamBenefit.todayNums }}</div>
                <div class="text-center">{{ $t('todayNums') }}</div>
              </div>
            </div>

          </div>

        </div>
      </q-scroll-area>
    </div>

    <div class="text-h5 q-mb-md q-my-lg">{{ $t('transactions') }}</div>
    <!-- 表格 -->
    <div class="q-mt-lg q-pa-lg rounded-borders">
      <div v-for="(team, teamIndex) in TeamBenefit.children" :key="teamIndex">
        <div class="row justify-between items-center q-mb-lg q-px-md">
          <div class="col">
            <q-avatar size="40px">
              <q-img :src="imageSrc(team.avatar ?? '')"></q-img>
            </q-avatar>
          </div>
          <div class="col">
            {{ team.username }}
          </div>
          <div class="col text-grey-7">
            {{ date.formatDate(team.createdAt * 1000, 'YYYY/MM/DD HH:mm:SS') }}
          </div>
          <div class="col text-center">
            + {{ team.name }}
          </div>
          <div class="col text-primary text-right text-h6 text-weight-bold">
            + {{ team.money }}
          </div>
        </div>
        <q-separator />
      </div>
      <div v-if="TeamBenefit.children == null || TeamBenefit.children.length <= 0">
        <div class="text-center q-my-lg text-h6 text-grey-8">
          {{ $t('noData') }}
        </div>
        <q-separator />
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { imageSrc } from 'src/utils';
import { teamDetailsAPI } from 'src/apis/user';
import { UserStore } from 'src/stores/user';
import { useRoute } from 'vue-router';
import { date } from 'quasar';

export default defineComponent({
  name: 'TeamEarnings',
  setup() {
    const $userStore = UserStore();
    const $route = useRoute();

    let state = reactive({
      // 用户资料
      userInfo: $userStore.userInfo as any,
      // 团队收益
      TeamBenefit: {
        currentInfo: {}
      } as any,
    });

    onMounted(() => {
      state.userInfo = $userStore.userInfo
      TeamDetails({ id: $route.query.id ? Number($route.query.id) : $userStore.userInfo.id })
    })

    // 获取用户团队详情
    const TeamDetails = (params: any) => {
      teamDetailsAPI(params).then((res: any) => {
        state.TeamBenefit = res
      })
    }

    return {
      imageSrc,
      date,
      ...toRefs(state),
    }
  }
});
</script>
<style lang="scss" scoped></style>
