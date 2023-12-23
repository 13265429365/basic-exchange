<template>
  <div class="column full-height full-width">
    <div class="col  page_bg q-pa-md full-width column justify-between">
      <div class="col full-width">

        <div class="q-mb-md" v-for="(card, cardIndex) in cardList" :key="cardIndex"
          style="height: 125px;background: linear-gradient(90deg, #4CB8C4 0%, #3CD3AD 100%);border-radius: 14px;overflow: hidden;">
          <div class="cardTransparent row" style="padding: 15px 20px;">
            <q-img :src="imageSrc(card.icon)" width="34px" height="34px" />
            <div class="col column justify-between">
              <div class="row justify-between q-pl-sm">
                <div>
                  <div class="text-white text-weight-bold">{{ card.name }}</div>
                  <div class="text-white text-weight-bold" style="font-size: 10px;">{{ card.realName }}</div>
                </div>
                <div class="row">
                  <q-btn outline rounded color="white" class="q-pa-xs" size="13px" style="width: 58px;height: 15px;"
                    :label="$t('edit')" no-caps
                    @click="$router.push({ name: `AddCard`, query: { type: 'edit', id: card.id } })" />
                  <q-btn outline rounded color="white" class="q-pa-xs q-ml-sm" size="13px"
                    style="width: 58px;height: 15px;" :label="$t('delete')" no-caps @click="Confirm(card.id)" />
                </div>
              </div>

              <div class="full-width">
                <div class="text-white text-weight-bold" style="font-size: 10px;">{{ card.paymentName }}</div>
                <div class="text-white text-weight-bold ellipsis full-width" style="font-size: 18px;">
                  {{ card.number }}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- 添加按钮 -->
      <div style="border: 1px dashed #01AC66;height: 54px;background-color: rgba(1, 172, 102, 0.05);"
        class="radius-8  column justify-center row" @click="$router.push({ name: 'AddCard', query: { type: 'add' } })">
        <div class="text-center text-primary text-weight-bold self-center row"> <q-icon size="20px" name="add"
            class="self-center" />Add Card
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { imageSrc } from 'src/utils/index';
import { userGetCard, userDelCard } from 'src/apis/wallets';
import { ConfirmPrompt, NotifyNegative, NotifyPositive } from 'src/utils/notify';
import { InitStore } from 'src/stores/init';

export default {
  name: 'defaultCard',
  setup(props: any, context: any) {
    const { t } = useI18n(); // 获取t函数进行翻译  
    const $initStore = InitStore()

    const state = reactive({
      // 用户卡片列表
      cardList: [] as any,

      // 当前需要删除的卡片id
      id: '',

      // 密码弹窗
      alertPass: false,
      securityKey: '',
    });

    context.emit('update', {
      title: t('accountManage')
    })

    onMounted(() => {
      getCard()
    })

    // 获取卡片列表
    const getCard = () => {
      userGetCard().then((res: any) => {
        console.log(res.data);
        state.cardList = res.data
      })
    }

    // 删除卡片
    const delCard = () => {
      // 如果有安全码，必须输入安全码
      if (state.securityKey == '' && $initStore.config.settings.register.showSecurityPass) {
        NotifyNegative('请输入秘钥')
        return false
      }
      let params = {
        id: Number(state.id),
        securityKey: state.securityKey
      }
      userDelCard(params).then((res: any) => {
        console.log(res.data);
        if (res.code == 0) {
          getCard()
          NotifyPositive(t('submittedSuccess'))
        }
      })
    }

    // 打开密码框
    const updateDialog = () => {
      state.alertPass = true
    }

    // 删除卡片提示
    const Confirm = (id: any) => {
      state.id = id
      ConfirmPrompt(
        t('delete'),
        t('deleteLabel') + '?',
        // 如果没有安全码，直接执行删除
        $initStore.config.settings.register.showSecurityPass ?
          updateDialog : delCard
      )
    }

    return {
      imageSrc,
      ...toRefs(state),
      delCard,
      Confirm
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
