<template>
  <div class="column full-height" style="width: 100%;">
    <navBar title="Grade"></navBar>
    <q-separator style="background: #F4F5FD;" />
    <div class="col bg-white  q-pa-md" style="width: 100%;">
      <div class="vipCard q-mt-md row  q-pa-md">
        <q-img src="/images/default/VIP.png" width="93px" height="66px" style="position: absolute;top: -13px;right: 0;" />
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
        <div class="col-4   " v-for="n in 5" :key="`sm-${n}`">
          <div :style="{
            border: `2px solid ${n == select ? '#01AC66' : '#F5F6FA'}`,
            backgroundColor: n == select ? 'rgba(1, 172, 102, 0.05)' : '#fff',
            height: '140px',
            borderRadius: '10px',
          }" class="my-content column justify-center items-center" @click="select = n">
            <div class="text-color-3 text-h6">Level{{ n }}</div>
            <div class="self-cneter text-primary text-h5 text-weight-bold"><span class="text-h6 "> $</span>{{ 120 * n }}
            </div>
          </div>
        </div>
      </div>


      <div class="q-ml-md q-mt-md">
        <ul class="text-color-3 text-weight-regular" style="padding: 0;">
          <li class="q-mb-sm">Vip the mounth However mean your life</li>
          <li>Vip the mounth However mean your lifeHowever mean your life</li>
        </ul>
      </div>


      <q-btn unelevated rounded color="primary" label="Purchase Now" class="full-width q-my-xl" no-caps
        style="height: 44px;" />

    </div>

  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import navBar from 'src/layouts/mobile/header.vue';
export default {
  name: 'defaultGrade',
  components: { navBar },
  setup() {
    const state = reactive({
      select: 1
    });
    return {
      ...toRefs(state)
    }
  }
};
</script>

<style lang="scss" scoped>
.vipCard {
  background-image: url('/images/default/vipCard.png');
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
