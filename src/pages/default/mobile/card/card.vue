<template>
  <div class="column full-height full-width">
    <div class="col  page_bg q-pa-md full-width column justify-between">
      <div class="col full-width">
        <div class="q-mb-md"
          style="height: 125px;background: linear-gradient(90deg, #1EC273 0%, #71D687 100%);border-radius: 14px;overflow: hidden;">
          <div class="cardTransparent row " style="padding: 15px 20px;">
            <q-img :src="imageSrc('')" width="34px" height="34px" />
            <div class="col column justify-between">
              <div class="row justify-between q-pl-sm">
                <div>
                  <div class="text-white text-weight-bold">兴业银行·厦门支行</div>
                  <div class="text-white text-weight-bold" style="font-size: 10px;">Debit Card</div>
                </div>
                <div class="row">
                  <q-btn outline rounded color="white" class="q-pa-xs" size="13px" style="width: 58px;height: 15px;"
                    label="Edit" no-caps @click="$router.push({ name: 'EditCard', query: { type: 1 } })" />
                  <q-btn outline rounded color="white" class="q-pa-xs q-ml-sm" size="13px"
                    style="width: 58px;height: 15px;" label="Delete" no-caps @click="alertDelete = true" />
                </div>
              </div>

              <div>
                <div class="text-white text-weight-bold" style="font-size: 10px;">Card Number</div>
                <div class="text-white text-weight-bold" style="font-size: 18px;">6986 3652 9868 2636</div>
              </div>
            </div>
          </div>
        </div>

        <div class="q-mb-md"
          style="height: 125px;background: linear-gradient(90deg, #7475BF 0%, #3D8FC9 100%);border-radius: 14px;overflow: hidden;">
          <div class="cardTransparent row" style="padding: 15px 20px;">
            <q-img :src="imageSrc('')" width="34px" height="34px" />
            <div class="col column justify-between">
              <div class="row justify-between q-pl-sm">
                <div>
                  <div class="text-white text-weight-bold">USDT-TRC20</div>
                  <div class="text-white text-weight-bold" style="font-size: 10px;">Digital Currency</div>
                </div>
                <div class="row">
                  <q-btn outline rounded color="white" class="q-pa-xs" size="13px" style="width: 58px;height: 15px;"
                    label="Edit" no-caps @click="$router.push({ name: 'EditCard', query: { type: 2 } })" />
                  <q-btn outline rounded color="white" class="q-pa-xs q-ml-sm" size="13px"
                    style="width: 58px;height: 15px;" label="Delete" no-caps @click="alertDelete = true" />
                </div>
              </div>

              <div class="full-width">
                <div class="text-white text-weight-bold" style="font-size: 10px;">Address</div>
                <div class="text-white text-weight-bold ellipsis full-width" style="font-size: 18px;">
                  09z8we73847zusyd873ez73847zusyd873ez73847zusyd873ez73847zusyd873ez</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- 添加按钮 -->
      <div style="border: 1px dashed #01AC66;height: 54px;background-color: rgba(1, 172, 102, 0.05);"
        class="radius-8  column justify-center row" @click="$router.push({ name: 'AddCard' })">
        <div class="text-center text-primary text-weight-bold self-center row"> <q-icon size="20px" name="add"
            class="self-center" />Add Card
        </div>
      </div>
    </div>
    <!-- 删除弹窗 -->
    <q-dialog v-model="alertDelete">
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import { imageSrc } from 'src/utils/index';

export default {
  name: 'defaultCard',
  setup() {
    const state = reactive({
      alertDelete: false,
    });
    const deleteFun = () => {
      state.alertDelete = false;
    };
    return {
      imageSrc,
      ...toRefs(state),
      deleteFun
    }
  }
};
</script>

<style lang="scss" scoped>
.cardTransparent {
  background: url('/images/default/cardTransparent.png') no-repeat;
  background-size: 100% 100%;
  height: 125px;
  width: 100%;
  border-radius: 14px;
}
</style>
