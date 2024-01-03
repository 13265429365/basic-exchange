<template>
  <div class="column full-height" style="width: 100%;">
    <div class="col bg-white  q-pa-md" style="width: 100%;">
      <div class="q-mt-md row  q-pa-md" style="background-image: url('/images/level-bg.png');
        height: 80px;
        width: 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: relative;">
        <q-img src="/images/level.png" width="93px" height="66px" style="position: absolute;top: -13px;right: 0;" />
        <div class="col-10 column">
          <div style="color: #FEC183;" class="text-h6">VIP Card</div>
          <div style="color: #FEC183;" class="text-caption full-width col">
            <div class="ellipsis ">
              Purchase members to gain more
              benefitsPurchase
              members to gain
              more benefitsPurchase members to gain more benefits
            </div>
          </div>
        </div>
      </div>

      <div class="row q-col-gutter-sm q-mt-md">
        <div class="col-4" v-for="(level, levelIndex) in levelList" :key="levelIndex">
          <div :style="{
            border: `2px solid ${levelIndex == currentLevelIndex ? '#01AC66' : '#F5F6FA'}`,
            backgroundColor: levelIndex == currentLevelIndex ? 'rgba(1, 172, 102, 0.05)' : '#fff',
            height: '140px'
          }" class="my-content rounded-borders column justify-center items-center"
            @click="currentLevelIndex = levelIndex">
            <div class="text-weight-bold" style="font-size: 16px;">{{ level.name }}</div>
            <div class="self-cneter q-mt-sm text-primary text-h5 text-weight-bold"><span class="text-h6 "> $</span>{{
              level.money
            }}
            </div>
          </div>
        </div>
      </div>

      <div class="q-ml-md q-mt-md">
        <ul class="text-color-3 text-weight-regular" style="padding: 0;">
          <li>Vip the mounth However mean your life</li>
          <li>Vip the mounth However mean your lifeHowever mean your life</li>
        </ul>
      </div>

      <q-btn @click="submitFunc(levelList[currentLevelIndex])" unelevated rounded color="primary" :label="$t('buy')"
        class="full-width q-my-xl" no-caps style="height: 44px;" />
    </div>

  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue';
import { levelIndexAPI, levelCreateAPI } from 'src/apis/user';
import { imageSrc } from 'src/utils';
import { UserStore } from 'src/stores/user';
import { useI18n } from 'vue-i18n';
import { ConfirmPrompt } from 'src/utils/notify';


export default {
  name: 'UserLevel',
  setup(props: any, context: any) {
    const { t } = useI18n()
    const $userStore = UserStore()

    const state = reactive({
      currentLevelIndex: 0,
      userInfo: {} as any,
      levelList: [] as any,
    });

    context.emit('update', {
      title: t('memberVip'),
    })

    onMounted(() => {
      state.userInfo = $userStore.userInfo
      levelIndexAPI().then((res: any) => {
        state.levelList = res
      })
    })

    // 用户购买会员
    const submitFunc = (level: any) => {
      ConfirmPrompt(t('isExecute'), t('isBuy') + '【' + level.name + '】?', () => {
        levelCreateAPI({ id: level.id }).then(() => {
          state.userInfo.level = level.level
          $userStore.updateUserInfo(state.userInfo)
        })
      }, { ok: { label: t('submit') }, cancel: { label: t('cancel') } })
    }

    return {
      imageSrc,
      ...toRefs(state),
      submitFunc,
    }
  }
};
</script>

<style lang="scss" scoped></style>
