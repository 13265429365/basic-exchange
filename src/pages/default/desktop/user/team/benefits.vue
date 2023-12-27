<template>
  <div style="width: calc(100% - 284px);">
    <q-toolbar class="bg-grey-1" style="padding: 33px 100px;">
      <q-toolbar-title class="text-h5 text-weight-bold">
        {{ $t('teamBenefits') }}
      </q-toolbar-title>
    </q-toolbar>
    <div style="padding: 48px 100px;">
      <!-- 头像 -->
      <div class="rounded-borders q-pa-lg" style="border: 1px solid #DDDDDD;">
        <!-- <q-scroll-area style="max-width: 942px;height: 60px;"> -->
        <div class="row no-wrap items-center">
          <div class="row no-wrap items-center q-mr-xl">
            <q-avatar class="q-mr-md" style="width: 60px;height: 60px;">
              <q-img :src="userInfo.avatar ? imageSrc(userInfo.avatar) : imageSrc('')"></q-img>
            </q-avatar>
            <div>
              <div class="text-h6 text-weight-medium">{{ userInfo.userName }}</div>
              <div class="text-weight-medium text-primary" style="font-size: 17px;">+{{ teamEarnings }}</div>
            </div>
          </div>
          <div v-for="(item, i) in TeamBenefit" :key="i" class="row no-wrap">
            <div class="separation"></div>
            <div>
              <div class="text-h5 text-center text-weight-medium noWrap">{{ item.number }}</div>
              <div class="text-color-6 text-center noWrap">{{ $t(item.name) }}</div>
            </div>
          </div>
        </div>
        <!-- </q-scroll-area> -->
      </div>


      <!-- 表格 -->
      <q-table class="q-mt-lg q-pa-lg no-shadow rounded-borders" bordered :rows="rows" :columns="columns" row-key="i"
        hide-bottom hide-header>
        <template v-slot:top>
          <div class="text-h5 text-weight-medium">{{ $t('transactions') }}</div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td>
              <div class="text-body1">
                {{ props.row.id }}
              </div>
            </q-td>
            <q-td>
              <div class="text-body1">
                {{ props.row.userName }}
              </div>
            </q-td>
            <q-td>
              <div class="text-body1">
                {{ formatDate(props.row.createdAt) }}
              </div>
            </q-td>
            <q-td>
              <div class="text-body1">
                {{ $t(props.row.name) }}
              </div>
            </q-td>
            <q-td>
              <div :class="['text-body1', { 'text-primary': props.row.name == 'Recharge' }]">
                {{ props.row.money }}
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { imageSrc, formatDate } from 'src/utils/index';
import { getTeamDetails } from 'src/apis/user';
import { UserStore } from 'src/stores/user';


export default defineComponent({
  name: 'benefitIndex',
  setup() {
    const $router = useRouter();
    const $userStore = UserStore();

    let state = reactive({
      // 用户资料
      userInfo: {} as any,

      // 总收益
      teamEarnings: '' as any,

      // 团队收益详情
      TeamBenefit: [] as any,

      // table数据
      columns: [] as any,
      rows: [] as any,
    });

    onMounted(() => {
      state.userInfo = $userStore.userInfo
      TeamDetails({ id: $userStore.userInfo.id })
    })

    // 获取用户团队详情
    const TeamDetails = (params: any) => {
      getTeamDetails(params).then((res: any) => {
        console.log(res);
        state.teamEarnings = res.teamEarnings
        // 团队数据
        for (const TeamBenefit in res) {
          if (TeamBenefit != 'teamEarningsIndex') {
            state.TeamBenefit.push({
              name: TeamBenefit,
              number: res[TeamBenefit],
            })
          }
        }


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
<style lang="scss" scoped>
.separation {
  width: 1px;
  background: #DDDDDD;
  height: 42px;
  margin: 0 27px;
}

.noWrap {
  white-space: nowrap;
}

td {
  width: 20%;

  div {
    width: 100%;
  }
}
</style>
