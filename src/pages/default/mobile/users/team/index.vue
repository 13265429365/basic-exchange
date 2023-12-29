<template>
  <div class="column full-height">
    <div class="col page_bg column ">
      <div class="rounded-borders q-px-md q-py-lg row justify-between q-ma-md "
        style="background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);">
        <div class="row">
          <q-avatar size="50px">
            <q-img :src="imageSrc(teamMembers.avatar)"></q-img>
          </q-avatar>
          <div class="q-ml-md text-subtitle1">
            <div class="text-white">
              <span class="text-weight-medium">{{ teamMembers.username }}</span>
              <span style="background: rgba(255, 255, 255, 0.12);padding: 3px 10px;"
                class="radius-x text-caption q-ml-sm">LV{{ teamMembers.depth }}</span>
            </div>
            <div class="text-white text-weight-medium">{{ $t('teamEarnings') + ': +' + teamMembers.earnings }}
            </div>
          </div>
        </div>
        <div @click="$router.push('/team/earnings/index')" class="text-white">{{ $t('desc') }} <q-icon
            name="chevron_right" size="16px" /></div>
      </div>
      <div class="bg-white col q-pa-md">
        <div v-for="(teamItem, listIndex) in teamMembers.children" :key="listIndex">
          <div @click="getTeam({ id: teamItem.id })" class="row justify-between bg-white q-py-md">
            <div class="row">
              <q-avatar size="32px">
                <q-img :src="teamItem.avatar ? imageSrc(teamItem.avatar) : imageSrc('')"></q-img>
              </q-avatar>
              <div class="q-ml-md">
                <div class="text-color-3 text-subtitle2 text-weight-medium">{{ teamItem.username }}</div>
                <div class="text-grey-6 text-caption text-weight-regular text-weight-regular">{{
                  formatDate(teamItem.createdAt) }}</div>
              </div>
            </div>
            <div class="row justify-end">
              <div class="text-primary self-center text-subtitle1 text-weight-medium">+{{ teamItem.teamEarnings }}</div>
              <q-icon class="self-center" name="chevron_right" size="22px" style="color: #999999;" />
            </div>
          </div>
          <q-separator style="height: 1px;background: #F4F5FD;" />
        </div>
        <div v-if="teamMembers.children.length <= 0" class="q-py-md text-center text-grey-6">
          {{ $t('noData') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { UserStore } from 'src/stores/user';
import { imageSrc, formatDate } from 'src/utils';
import { teamIndexAPI } from 'src/apis/user';


export default {
  name: 'TeamIndex',
  setup(props: any, context: any) {
    const $userStore = UserStore();
    const { t } = useI18n();

    const state = reactive({
      // 团队成员
      teamMembers: {
        children: [],
      } as any,
    });

    context.emit('update', {
      title: t('myTeam'),
    })

    onMounted(() => {
      getTeam({ id: $userStore.userInfo.id })
    })

    // 获取用户团队详情
    const getTeam = (params: any) => {
      teamIndexAPI(params).then((res: any) => {
        console.log(res);
        state.teamMembers = res
      })
    }

    return {
      imageSrc,
      formatDate,
      ...toRefs(state),
      getTeam,
    }
  }
};
</script>
