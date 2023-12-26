<template>
  <div class="background q-py-xl">
    <div class="text-center text-weight-bold q-mt-lg" style="font-size: 32px;">Pick your plan</div>
    <div class="text-center text-color-6 q-mt-sm q-mb-xl">
      Choose your perfect plan and get started.
    </div>
    <div class="row justify-center q-pt-lg">
      <q-card v-for="(item, i) in levelList" :key="i" style="width: 288px;"
        :class="['border-a-20 q-mr-lg q-mb-xl', { 'border': i == select }]">
        <div :class="['text-weight-medium', { 'gradeBackground': i != select, 'text-white': i != select }]"
          style="height: 152px;">
          <q-img class="absolute" :src="imageSrc(item.icon)" width="66px" height="64px"
            style="top: 0; left: 50%; transform: translate(-50%, -36%);z-index: 999;"></q-img>
          <!-- 占位符 -->
          <div style="height: 64px;"></div>
          <div class="text-center size20">{{ item.name }}</div>
          <div class="text-center" style="font-size: 28px;">
            <span class="size20">$</span>
            <span>{{ item.money }}</span>
          </div>
        </div>
        <q-card-section>
          <div class="row justify-center q-mt-sm">
            <q-btn @click="OrderLevel(item.name, i)" class="text-weight-regular"
              :class="[item.name == actName ? 'text-white bg-primary' : 'text-primary bg-white border']"
              style="width: 248px;min-height: 38px" unelevated rounded no-caps :label="$t('buy')" />
          </div>
          <div class="row no-wrap q-mt-lg q-px-sm">
            <q-icon class="q-mt-sm q-mr-sm" name="lens" size="5px" style="color: #999999;"></q-icon>
            <div>
              Vip the mounth However mean your life
            </div>
          </div>
          <div class="row no-wrap q-mt-lg q-mb-xl q-px-sm">
            <q-icon class="q-mt-sm q-mr-sm" name="lens" size="5px" style="color: #999999;"></q-icon>
            <div>
              Vip the mounth However mean your lifeHowever mean your life
            </div>
          </div>
        </q-card-section>
      </q-card>
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

export default {
  name: 'defaultShare',
  setup() {
    const $userStore = UserStore()
    const $router = useRouter()

    const state = reactive({
      actName: '',
      select: 0,
      levelList: [] as any,
    });

    onMounted(() => {
      getLevelList()
    })

    // 获取会员等级列表
    const getLevelList = () => {
      state.select = $userStore.userInfo.Level
      getLevel().then((res: any) => {
        state.levelList = res
        if (state.levelList.length > 0) {
          state.actName = state.levelList[0].name
        }
        console.log('会员等级列表', res);
      })
    }

    // 用户购买会员
    const OrderLevel = (name: string, i: any) => {
      state.actName = name
      state.select = i
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
        $userStore.updateUserInfo(res)
        localStorage.setItem('userInfo', JSON.stringify(res))
      })
    }


    return {
      imageSrc,
      ...toRefs(state),
      OrderLevel,
    }
  }
};
</script>
<style scoped>
.border {
  border: 3px solid #01AC66;
}

.q-card {
  border-radius: 8px;
  box-shadow: 0px 4px 30px 0px rgba(192, 192, 192, 0.3);
}

.size20 {
  font-size: 20px;
}

.background {
  background: url('/public/images/pc/vip/bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  height: 1000px;
}

.gradeBackground {
  background: linear-gradient(180deg, #10BE70 0%, #91DB82 100%);
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
