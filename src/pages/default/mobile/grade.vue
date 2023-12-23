<template>
  <div class="column full-height" style="width: 100%;">
    <div class="col bg-white  q-pa-md" style="width: 100%;">
      <div class="vipCard q-mt-md row  q-pa-md">
        <q-img src="/images/vip.png" width="93px" height="66px" style="position: absolute;top: -13px;right: 0;" />
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
        <div class="col-4" v-for="(item, i) in levelList" :key="i">
          <div :style="{
            border: `2px solid ${i == select ? '#01AC66' : '#F5F6FA'}`,
            backgroundColor: i == select ? 'rgba(1, 172, 102, 0.05)' : '#fff',
            height: '140px'
          }" class="my-content radius-8 column justify-center items-center" @click="select = i">
            <div class="text-weight-bold" style="font-size: 16px;">{{ item.name }}</div>
            <div class="self-cneter q-mt-sm text-primary text-h5 text-weight-bold"><span class="text-h6 "> $</span>{{
              item.money
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


      <q-btn @click="OrderLevel" unelevated rounded color="primary" label="Purchase Now" class="full-width q-my-xl"
        no-caps style="height: 44px;" />

    </div>

  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue';
import { getLevel, orderLevel } from 'src/apis/user';
import { imageSrc } from 'src/utils/index';
import { NotifyPositive, NotifyNegative } from 'src/utils/notify';
import { UserStore } from 'src/stores/user';
import { getUserInfo } from 'src/apis/user';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';


export default {
  name: 'defaultGrade',
  setup(props: any, context: any) {
    const { t } = useI18n()
    const $userStore = UserStore()
    const $router = useRouter()

    const state = reactive({
      select: 0,

      levelList: [] as any,
    });

    context.emit('update', {
      title: t('memberBenefits'),
    })

    onMounted(() => {
      state.select = $userStore.userInfo.Level
      getLevelList()
    })

    // 获取会员等级列表
    const getLevelList = () => {
      getLevel().then((res: any) => {
        state.levelList = res.data
        console.log('会员等级列表', res.data);
      })
    }

    // 用户购买会员
    const OrderLevel = () => {

      if (state.select < $userStore.userInfo.Level) {
        NotifyNegative('不能购买比自己等级低的会员')
        return false
      }
      orderLevel({ id: state.levelList[state.select].id }).then((res: any) => {
        NotifyPositive('购买成功')
        UserInfo()
        console.log(res);
      })
    }

    const UserInfo = () => {
      getUserInfo().then((res: any) => {
        console.log('用户信息', res);
        $userStore.updateUserInfo(res.data)
        localStorage.setItem('userInfo', JSON.stringify(res.data))
        $router.push({ name: 'UserIndex' })
      })
    }

    return {
      imageSrc,
      ...toRefs(state),
      OrderLevel,
      $userStore,
    }
  }
};
</script>

<style lang="scss" scoped>
.vipCard {
  background-image: url('/images/vipBg.png');
  height: 80px;
  width: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
}

li::marker {
  color: #999999;
}
</style>
