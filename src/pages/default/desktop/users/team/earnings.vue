<template>
  <div style="padding: 48px 100px;">
    <!-- 头像 -->
    <div class="text-h5 q-mb-md">{{ $t('teamEarnings') }}</div>

    <div class="rounded-borders q-pa-lg" style="border: 1px solid #DDDDDD;">
      <q-scroll-area style="height: 70px; max-width: 100%">
        <div class="row no-wrap items-center">
          <!-- 固定头像 -->
          <div class="row no-wrap items-center q-mr-xl">
            <q-avatar class="q-mr-md" size="60px">
              <q-img :src="imageSrc(userInfo.avatar ?? '')"></q-img>
            </q-avatar>
            <div>
              <div class="text-h6 text-weight-medium">{{ userInfo.username }}</div>
              <div class="text-weight-medium text-primary" style="font-size: 17px;">+{{ teamEarnings }}</div>
            </div>
          </div>

          <div class="row no-wrap">
            <div v-for="(item, i) in TeamBenefit" :key="i" class="row no-wrap items-center">
              <div style="width: 1px;background: #DDDDDD;height: 42px;margin: 0 27px;"></div>
              <div style="width: 110px;">
                <div class="text-h5 text-center text-weight-medium">{{ item.number }}</div>
                <div class="text-center">{{ $t(item.name) }}</div>
              </div>
            </div>
          </div>

        </div>
      </q-scroll-area>
    </div>


    <!-- 表格 -->
    <q-table class="q-mt-lg q-pa-lg no-shadow rounded-borders" bordered :rows="rows" :columns="columns" row-key="i"
      hide-bottom hide-header>
      <template v-slot:top>
        <div class="text-h5 text-weight-medium">{{ $t('transactions') }}</div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td style="width: 20%;">
            <div class="text-body1 full-width">
              {{ props.row.id }}
            </div>
          </q-td>
          <q-td style="width: 20%;">
            <div class="text-body1 full-width">
              {{ props.row.userName }}
            </div>
          </q-td>
          <q-td style="width: 20%;">
            <div class="text-body1 full-width">
              {{ formatDate(props.row.createdAt) }}
            </div>
          </q-td>
          <q-td style="width: 20%;">
            <div class="text-body1 full-width">
              {{ $t(props.row.name) }}
            </div>
          </q-td>
          <q-td style="width: 20%;">
            <div class="text-body1 full-width text-primary">
              {{ props.row.money }}
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { imageSrc, formatDate } from 'src/utils';
import { teamDetailsAPI } from 'src/apis/user';
import { UserStore } from 'src/stores/user';


export default defineComponent({
  name: 'TeamEarnings',
  setup() {
    const $userStore = UserStore();

    let state = reactive({
      // 用户资料
      userInfo: $userStore.userInfo as any,

      // 总收益
      teamEarnings: '' as any,

      // 团队收益
      TeamBenefit: [] as any,

      // 收益详情
      columns: [] as any,
      rows: [] as any,
    });

    onMounted(() => {
      state.userInfo = $userStore.userInfo
      TeamDetails({ id: $userStore.userInfo.id })
    })

    // 获取用户团队详情
    const TeamDetails = (params: any) => {
      teamDetailsAPI(params).then((res: any) => {
        console.log(res);
        // 总收益
        state.teamEarnings = res.teamEarnings

        // 团队收益
        for (const TeamBenefit in res) {
          if (TeamBenefit != 'teamEarningsIndex') {
            state.TeamBenefit.push({
              name: TeamBenefit,
              number: res[TeamBenefit],
            })
          }
        }
        console.log(state.TeamBenefit);


        // 收益详情
        if (res.teamEarningsIndex.length <= 0) {
          return false
        }
        for (const BenefitDetails in res.teamEarningsIndex[0]) {
          state.columns.push({
            name: BenefitDetails,
          })
        }
        res.teamEarningsIndex.forEach((element: any) => {
          state.rows.push(element)
        });
      })
    }


    return {
      imageSrc,
      formatDate,
      ...toRefs(state),
    }
  }
});
</script>
<style lang="scss" scoped></style>
