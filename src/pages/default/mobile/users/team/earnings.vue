<template>
  <div class="column full-height">
    <div class="col page_bg q-pa-md ">
      <div class="rounded-borders q-px-md q-py-lg row"
        style="background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);">
        <q-avatar size="50px">
          <q-img :src="userInfo.avatar ? imageSrc(userInfo.avatar) : imageSrc('')"></q-img>
        </q-avatar>
        <div class="q-ml-md text-subtitle1">
          <div class="text-white text-weight-medium">{{ userInfo.userName }}</div>
          <div class="text-white text-weight-medium">{{ $t('teamBenefits') }} : +{{ teamEarnings }}</div>
        </div>
      </div>

      <div class="rounded-borders bg-white q-px-md q-py-lg  q-mt-md">
        <div class="text-color-3 text-black text-weight-bold">Beneficial Data</div>
        <div class="row text-color-3 ">
          <div class="col-4 q-pt-md" v-for="(item, index) in TeamBenefit" :key="index">
            <div class="text-weight-bold text-h6 text-center">{{ item.number }}</div>
            <div class="text-color-6  text-subtitle2   text-center text-weight-regular ellipsis">{{ $t(item.name)
            }}</div>
          </div>
        </div>
      </div>

      <div class="q-py-md row">
        <div class="text-color-3 text-subtitle1 text-weight-bolder column col-3">
          <span>Transactions</span>
          <q-separator style="height: 4px;width: 20px;border-radius: 2px;" class="bg-primary self-center" />
        </div>
      </div>

      <div v-for="(row, rowsIndex) in rows" :key="rowsIndex"
        class="row justify-between bg-white rounded-borders q-pa-md q-mb-md">
        <div>
          <div class="text-color-3 text-subtitle2 text-weight-medium">{{ row.userName }}</div>
          <div class="text-color-6 text-caption text-weight-regular text-weight-regular">{{ date.formatDate(row.createdAt
            *
            1000, 'YYYY/MM/DD HH:mm:ss') }}</div>
        </div>
        <div class="text-primary self-center text-subtitle1 text-weight-medium">+{{ row.money }}</div>
      </div>
      <div v-if="rows.length <= 0" class="row justify-center rounded-borders q-pa-md q-mb-md">

      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { imageSrc } from 'src/utils';
import { teamDetailsAPI } from 'src/apis/user';
import { UserStore } from 'src/stores/user';
import { useI18n } from 'vue-i18n';
import { date } from 'quasar';


export default defineComponent({
  name: 'TeamEarnings',
  setup(props: any, context: any) {
    const $userStore = UserStore();
    const { t } = useI18n();

    const state = reactive({
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

    context.emit('update', {
      title: t('teamBenefits'),
    })

    onMounted(() => {
      state.userInfo = $userStore.userInfo
      TeamDetails({ id: $userStore.userInfo.id })
    })

    // 获取用户团队详情
    const TeamDetails = (params: any) => {
      teamDetailsAPI(params).then((res: any) => {
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
      ...toRefs(state),
      date,
    }
  }
});
</script>


