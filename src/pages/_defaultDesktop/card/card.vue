<template>
  <div class="row no-wrap">
    <menuBar></menuBar>
    <div class="calc">
      <!-- 通用header(app.scss) -->
      <div class="pageHeader">
        Card
      </div>
      <div style="padding: 48px 100px;">
        <div class="row">
          <!-- 银行卡 -->
          <div class="q-mb-md q-mr-md radius-8"
            style="height: 132px;width: 360px;background: linear-gradient(90deg, #4CB8C4 0%, #3CD3AD 100%);overflow: hidden;">
            <div class="cardTransparent row " style="padding: 15px 20px;">
              <q-img src="/images/delete/USDT.png" width="40px" height="40px" />
              <div class="col column justify-between">
                <div class="row justify-between q-pl-sm">
                  <div>
                    <div class="row items-center">
                      <div class="text-white text-h6">
                        兴业银行·厦门支行
                      </div>
                      <div @click="to('/edit/card')" class="row btn justify-center items-center q-ml-md">Edit</div>
                    </div>
                    <div class="text-white" style="font-size: 12px;">Josh Daniel</div>
                  </div>
                  <div class="row">
                    <q-img src="/images/pc/card/delete.png" class="cursor-pointer" width="20px" height="20px"></q-img>
                  </div>
                </div>

                <div class="q-pl-sm  q-mt-md">
                  <div style="font-size: 10px;color: rgba(255,255,255,0.7);">Card Number</div>
                  <div class="text-white text-weight-medium ellipsis" style="font-size: 18px;width: 272px;">6986 3652
                    9868 2636</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 银行卡 -->
          <div class="q-mb-md q-mr-md radius-8"
            style="height: 132px;width: 360px;background: linear-gradient(90deg, #7474BF 0%, #348AC7 100%);overflow: hidden;">
            <div class="cardTransparent row " style="padding: 15px 20px;">
              <q-img src="/images/delete/USDT.png" width="40px" height="40px" />
              <div class="col column justify-between">
                <div class="row justify-between q-pl-sm">
                  <div>
                    <div class="row items-center">
                      <div class="text-white text-h6">
                        USDT-ERC20
                      </div>
                      <div @click="to('/edit/card')" class="row btn justify-center items-center q-ml-md">Edit</div>
                    </div>
                    <div class="text-white" style="font-size: 12px;">Digital Currency</div>
                  </div>
                  <div class="row">
                    <q-img src="/images/pc/card/delete.png" class="cursor-pointer" width="20px" height="20px"></q-img>
                  </div>
                </div>

                <div class="q-pl-sm  q-mt-md">
                  <div style="font-size: 10px;color: rgba(255,255,255,0.7);">Address</div>
                  <div class="text-white text-weight-medium ellipsis" style="font-size: 18px;width: 272px;">
                    dfjskdishfsdjkhfhfjdsfhsdadfjskdishfsdjkhfhfjdsfhsda</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 添加按钮 (本页定义css) -->
          <div @click="to('/add/card')" class="column justify-center row add-btn cursor-pointer">
            <div class="text-center text-color-9">
              <q-icon size="28px" name="add" class="self-center" />
              <div>Add Card</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import menuBar from 'src/layouts/desktop/settingLayouts.vue';
  import { defineComponent, reactive, toRefs } from 'vue';
  import { useRouter } from 'vue-router';
  export default defineComponent({
    components: {
      menuBar,
    },
    name: 'cardView',
    setup() {
      const router = useRouter();
      let store = reactive({});
      return {
        ...toRefs(store),
        to(url : string) {
          if (url) {
            router.push(url)
          }
        }
      }
    }
  });
</script>
<style lang="scss" scoped>
  @import url("../../../css/pcCss.css");
  .btn {
    width: 46px;
    height: 22px;
    border-radius: 29px 29px 29px 29px;
    opacity: 1;
    border: 1px solid #FFFFFF;
    cursor: pointer;
    color: #FFFFFF;
    font-size: 12px;
  }

  .add-btn {
    border: 1px dashed rgba(221, 221, 221, 0.8);
    height: 132px;
    width: 132px;
    background: rgba(221, 221, 221, 0.16);
    border-radius: 6px;
  }
</style>
