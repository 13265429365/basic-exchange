<template>
  <div class="calc" style="padding: 48px 100px;">
    <!-- 头像 -->
    <div class="row q-mb-xl">
      <div class="q-mr-md avatar">
        <q-avatar class="q-mr-md avatar" style="width: 64px;height: 64px;">
          <q-img :src="imageSrc('')"></q-img>
        </q-avatar>
      </div>
      <div>
        <div class="text-weight-bold q-mb-sm" style="font-size: 18px;line-height: 1;">
          Paul K. Jensen
        </div>
        <q-chip class="q-chip row justify-center items-center">
          <q-img style="width: 11px;height: 10px;" src="/images/pc/header/Vip_icon.png" />
          <span class="q-mx-xs">Lv.3</span>
          <q-icon name="arrow_forward_ios"></q-icon>
        </q-chip>
      </div>
      <div class="q-mx-lg q-mt-sm" style="height: 41px;border: 1px solid #DDDDDD;"></div>
      <div>
        <div class="text-color-9">
          User ID
        </div>
        <div class="text-color-3">
          869323388
        </div>
      </div>
    </div>
    <!-- 资产 -->
    <div class="radius-8 q-pa-md full-width row q-pb-lg justify-between" style="border: 1px solid #DDDDDD;">
      <!-- left -->
      <div>
        <div class="text-h5 text-weight-medium q-mb-xl">
          <span class="q-mr-sm">Estimated Balance</span>
          <q-img @click="moneyShow = !moneyShow" src="page_bg/eye@2x.png" class="cursor-pointer" width="18px"
            height="18px"></q-img>
        </div>
        <div v-if="moneyShow">
          <div class="text-h5">
            $8,692.000
          </div>
          <div class="text-h6">
            ≈￥20,21
          </div>
        </div>
        <div v-else class="text-h5">****</div>
      </div>
      <!-- right -->
      <div class=" q-mr-sm">
        <div>
          <q-btn class="text-primary" style="background: rgba(1,172,102,0.1);" rounded label="Deposit"></q-btn>
          <q-btn class="text-primary q-ml-md" style="background: rgba(1,172,102,0.1);" rounded label="Widrow"></q-btn>
        </div>
        <div class="row justify-center q-mt-lg">
          <div class="line"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { imageSrc } from 'src/utils/index'

export default defineComponent({
  name: 'DashboardIndex',
  setup() {
    let state = reactive({
      // 是否显示余额
      moneyShow: true,
    });
    return {
      imageSrc,
      ...toRefs(state)
    }
  }
});
</script>
<style lang="scss" scoped>
.line {
  width: 150px;
  height: 73px;
  background: linear-gradient(180deg, rgba(1, 172, 102, 0.3) 0%, rgba(1, 172, 102, 0) 100%);
}

.q-btn:before {
  box-shadow: none;
}

.q-chip {
  // width: 62px;
  height: 22px;
  font-size: 10px;
  color: #F7DEB6 !important;
  background: #322B19 !important;
  border: 1px solid #F7DEB6;
  margin: 0;
  padding: 6px 10px;
}
</style>
