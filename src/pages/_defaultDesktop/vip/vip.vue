<template>
  <div class="background q-py-xl">
    <div class="text-center text-weight-bold q-mt-lg" style="font-size: 32px;">Pick your plan</div>
    <div class="text-center text-color-6 q-mt-sm q-mb-xl">
      Choose your perfect plan and get started.
    </div>
    <div class="row justify-center q-pt-lg">
      <q-card v-for="(item,i) in list" :key="i" style="width: 288px;" :class="['border-a-20 q-mr-lg',{'border':item.name==actName}]">
        <div :class="['text-weight-medium',{'gradeBackground':item.name!=actName,'text-white':item.name!=actName}]" style="height: 152px;">
          <q-img class="absolute" src="/images/pc/vip/icon.png" width="66px" height="64px" style="top: 0; left: 50%; transform: translate(-50%, -36%);z-index: 999;"></q-img>
          <!-- 占位符 -->
          <div style="height: 64px;"></div>
          <div class="text-center text-h5">{{item.name}}</div>
          <div class="text-center" style="font-size: 28px;">
            <span class="text-h5">$</span>
            <span>120</span>
          </div>
        </div>
        <q-card-section>
          <div class="row justify-center q-mt-sm">
            <q-btn @click="actName=item.name" class="text-weight-regular" :class="[item.name==actName?'text-white bg-primary':'text-primary bg-white border']" style="width: 248px;min-height: 38px"
              unelevated rounded no-caps label="Purchase Now" />
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
  import { reactive, toRefs } from 'vue';
  export default {
    name: 'defaultShare',
    setup() {
      const state = reactive({
        actName: 'Level1',
        list: [
          { name: 'Level1' },
          { name: 'Level2' },
          { name: 'Level3' },
        ],
      });

      return {
        ...toRefs(state)
      }
    }
  };
</script>
<style scoped>
  @import url("../../../css/pcCss.css");
  .border {
    border: 3px solid #01AC66;
  }
  .q-card {
    border-radius: 8px;
    box-shadow: 0px 4px 30px 0px rgba(192,192,192,0.3);
  }
  .text-h5 {
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
