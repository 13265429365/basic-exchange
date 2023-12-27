<template>
  <div style="width: calc(100% - 284px);">
    <q-toolbar class="bg-grey-1" style="padding: 33px 100px;">
      <q-toolbar-title class="text-h5 text-weight-bold">
        {{ $t('accountManage') }}
      </q-toolbar-title>
    </q-toolbar>

    <div class="row justify-center" style="padding: 48px 100px;">
      <div class="row">
        <!-- 银行卡 -->
        <!-- background: linear-gradient(90deg, #7474BF 0%, #348AC7 100%) -->
        <div v-for="(card, cardIndex) in cardList" :key="cardIndex" class="q-mb-md q-mr-md rounded-borders"
          style="height: 132px;width: 360px;background: linear-gradient(90deg, #4CB8C4 0%, #3CD3AD 100%);overflow: hidden;">
          <div class="cardTransparent row " style="padding: 15px 20px;">
            <q-img :src="imageSrc(card.icon)" width="40px" height="40px" />
            <div class="col column justify-between">
              <div class="row justify-between q-pl-sm">
                <div>
                  <div class="row items-center">
                    <div class="text-white size16">
                      {{ card.name }}
                    </div>
                    <div @click="$router.push({ name: `AddCard`, query: { type: 'edit', id: card.id } })"
                      class="row btn justify-center items-center q-ml-md">
                      {{ $t('edit') }}</div>
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

        <!-- 添加按钮 (本页定义css) -->
        <div @click="$router.push({ name: 'AddCard', query: { type: 'add' } })"
          class="column justify-center row add-btn cursor-pointer">
          <div class="text-center text-color-9">
            <q-icon size="28px" name="add" class="self-center" />
            <div>Add Card</div>
          </div>
        </div>

      </div>
    </div>

    <!-- 输入密码 -->
    <q-dialog v-model="alertPass">
      <q-card style="width: 380px;">
        <q-card-section style="padding: 20px;">
          <div class="row no-wrap">
            <div class="text-weight-bold text-color-3 size20">
              {{ $t('enterSecretKey') }}
            </div>
            <q-space />
            <q-btn class="text-color-6" icon="close" flat round dense v-close-popup />
          </div>
          <div class="q-mt-lg">
            <q-form>
              <q-input standout class="q-mb-md" type="password" v-model="securityKey" :placeholder="$t('enterSecretKey')">
              </q-input>
              <div class="row justify-center q-mt-lg">
                <q-btn class="q-mr-md text-color-3" unelevated rounded no-caps @click="alertPass = false"
                  style="background: #F3F5F5;height: 40px;width: 160px;" :label="$t('cancel')"></q-btn>
                <q-btn @click="delCard" class="" unelevated rounded no-caps style="height: 40px;width: 160px;"
                  color="primary" :label="$t('confirm')" />
              </div>
            </q-form>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { imageSrc } from 'src/utils/index';
import { userGetCard, userDelCard } from 'src/apis/wallets';
import { ConfirmPrompt, NotifyPositive } from 'src/utils/notify';
import { InitStore } from 'src/stores/init';

export default defineComponent({
  name: 'cardIndex',
  setup() {
    const { t } = useI18n(); // 获取t函数进行翻译  
    const $initStore = InitStore()

    let state = reactive({
      // 用户卡片列表
      cardList: [] as any,

      // 当前需要删除的卡片id
      id: '',

      // 密码弹窗
      alertPass: false,
      securityKey: '',
    });

    onMounted(() => {
      getCard()
    })

    // 获取卡片列表
    const getCard = () => {
      userGetCard().then((res: any) => {
        console.log(res);
        state.cardList = res
      })
    }

    // 删除卡片
    const delCard = () => {
      // 如果有安全码，必须输入安全码
      if (state.securityKey == '' && $initStore.config.settings.register.showSecurityPass) {
        return false
      }
      let params = {
        id: Number(state.id),
        securityKey: state.securityKey
      }
      userDelCard(params).then((res: any) => {
        console.log(res);
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
});
</script>
<style lang="scss" scoped>
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

function callback(): { return: any; } {
  throw new Error('Function not implemented.');
}

function actions(): () => { return: any; } {
  throw new Error('Function not implemented.');
}
