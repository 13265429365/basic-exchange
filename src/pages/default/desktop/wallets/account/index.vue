<template>
  <div class="row" style="padding: 48px 100px;">

    <!-- 银行卡 -->
    <div v-for="(card, cardIndex) in cardList" :key="cardIndex" class="q-mb-md q-mr-md rounded-borders"
      style="height: 132px;width: 360px;background: linear-gradient(90deg, #4CB8C4 0%, #3CD3AD 100%);overflow: hidden;">
      <div class="row" style="padding: 15px 20px;">
        <q-img :src="imageSrc(card.icon)" width="40px" height="40px" />
        <div class="col column justify-between">
          <div class="row justify-between q-pl-sm">
            <div>
              <div class="row items-center">
                <div class="text-white">
                  {{ card.name }}
                </div>
                <q-btn size="xs" unelevated rounded style="border: 1px solid #fff;"
                  @click="$router.push({ name: `WalletAccountCreate`, query: { type: 'edit', id: card.id } })"
                  class="q-ml-md text-white">
                  <div style="font-size: 12px;">{{ $t('edit') }}</div>

                </q-btn>
              </div>
              <div class="text-white" style="font-size: 12px;">{{ card.realName }}</div>
            </div>
            <div class="row">
              <q-icon @click="Confirm(card.id)" name="o_highlight_off" color="white" class="cursor-pointer"
                size="24px"></q-icon>
            </div>
          </div>

          <div class="q-pl-sm  q-mt-md">
            <div style="font-size: 10px;color: rgba(255,255,255,0.7);">{{ card.paymentName }}</div>
            <div class="text-white text-weight-medium ellipsis" style="font-size: 18px;width: 272px;">{{ card.number
            }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加按钮 -->
    <div @click="$router.push({ name: 'WalletAccountCreate', query: { type: 'add' } })"
      class="column justify-center row cursor-pointer" style="
        border: 1px dashed rgba(221, 221, 221, 0.8);
        height: 132px;
        width: 132px;
        background: rgba(221, 221, 221, 0.16);
        border-radius: 6px;
      ">
      <div class="text-center">
        <q-icon size="28px" name="add" class="self-center" />
        <div>Add Card</div>
      </div>
    </div>

  </div>

  <!-- 输入密码 -->
  <q-dialog v-model="alertPass">
    <q-card style="width: 380px;">
      <q-card-section style="padding: 20px;">
        <div class="row no-wrap">
          <div class="text-weight-bold">
            {{ $t('enterSecretKey') }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </div>
        <div class="q-mt-lg">
          <q-form>
            <q-input outlined dense class="q-mb-md" type="password" v-model="params.securityKey"
              :placeholder="$t('enterSecretKey')">
            </q-input>
            <div class="row justify-center q-mt-lg">
              <q-btn class="q-mr-md" unelevated rounded no-caps @click="alertPass = false"
                style="background: #F3F5F5;height: 40px;width: 160px;" :label="$t('cancel')"></q-btn>
              <q-btn @click="delCard" unelevated rounded no-caps style="height: 40px;width: 160px;" color="primary"
                :label="$t('confirm')" />
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { imageSrc } from 'src/utils';
import { walletsAccountIndexAPI, walletsAccountDeleteAPI } from 'src/apis/wallets';
import { ConfirmPrompt, NotifyPositive } from 'src/utils/notify';

export default defineComponent({
  name: 'WalletsAccountIndex',
  setup() {
    const { t } = useI18n(); // 获取t函数进行翻译

    let state = reactive({
      // 用户卡片列表
      cardList: [] as any,

      // 密码弹窗
      alertPass: false,

      // 接口参数
      params: {
        id: '',
        securityKey: '',
      },
    });

    onMounted(() => {
      getCard()
    })

    // 获取卡片列表
    const getCard = () => {
      walletsAccountIndexAPI().then((res: any) => {
        state.cardList = res
      })
    }

    // 删除卡片
    const delCard = () => {
      walletsAccountDeleteAPI(state.params).then((res: any) => {
        getCard()
        NotifyPositive(t('submittedSuccess'))
        state.alertPass = false
      })
    }

    // 删除卡片提示
    const Confirm = (id: any) => {
      state.params.id = id
      ConfirmPrompt(
        t('delete'),
        t('deleteLabel') + '?',
        // 如果没有安全码，直接执行删除
        () => {
          state.alertPass = true
        },
        { ok: { label: t('confirm') }, cancel: { label: t('cancel') } }
      )
    }

    return {
      imageSrc,
      ...toRefs(state),
      delCard,
      Confirm
    }
  }
});
</script>
<style lang="scss" scoped></style>
