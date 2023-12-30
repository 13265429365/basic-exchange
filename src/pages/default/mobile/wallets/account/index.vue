<template>
  <div class="column full-height full-width">
    <div class="col q-pa-md full-width column justify-between">
      <div class="col full-width">
        <div class="q-mb-md" v-for="(card, cardIndex) in cardList" :key="cardIndex"
          style="height: 125px;background: linear-gradient(90deg, #4CB8C4 0%, #3CD3AD 100%);border-radius: 14px;overflow: hidden;">
          <div class="row" style="padding: 15px 20px;">
            <q-img :src="imageSrc(card.icon)" width="34px" height="34px" />
            <div class="col column justify-between text-white">
              <div class="row justify-between q-pl-sm">
                <div>
                  <div class="text-weight-bold">{{ card.name }}</div>
                  <div class="text-caption">{{ card.realName }}</div>
                </div>
                <div>
                  <q-btn outline rounded size="sm" color="white" :label="$t('edit')" no-caps
                    @click="$router.push({ name: `WalletAccountCreate`, query: { type: 'edit', id: card.id } })" />
                  <q-btn outline rounded size="sm" color="white" class="q-ml-sm" :label="$t('delete')" no-caps
                    @click="Confirm(card.id)" />
                </div>
              </div>

              <div class="full-width q-mt-md">
                <div class="text-caption">{{ card.paymentName }}</div>
                <div class="text-weight-bold ellipsis full-width text-body1">
                  {{ card.number }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 添加按钮 -->
      <div style="border: 1px dashed #01AC66;height: 40px;background-color: rgba(1, 172, 102, 0.05);"
        class="rounded-borders column justify-center row"
        @click="$router.push({ name: 'WalletAccountCreate', query: { type: 'add' } })">
        <div class="text-center text-primary text-weight-bold self-center row"> <q-icon size="20px" name="add"
            class="self-center" />Add Card
        </div>
      </div>
    </div>
  </div>

  <!-- 输入密码 -->
  <q-dialog v-model="alertPass">
    <q-card style="width: 380px;">
      <q-card-section style="padding: 20px;">
        <div class="text-center text-weight-bold">
          {{ $t('enterSecretKey') }}
        </div>
        <div class="q-mt-lg">
          <q-form>
            <q-input outlined dense class="q-mb-md" type="password" v-model="params.securityKey"
              :placeholder="$t('enterSecretKey')">
            </q-input>
            <div class="row justify-center q-mt-lg">
              <q-btn class="q-mr-md col-4" unelevated rounded no-caps @click="alertPass = false"
                style="background: #F3F5F5" :label="$t('cancel')"></q-btn>
              <q-btn class="col-4" @click="delCard" unelevated rounded no-caps color="primary" :label="$t('confirm')" />
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
  emits: ['update'],
  setup(props: any, context: any) {
    const { t } = useI18n(); // 获取t函数进行翻译

    const state = reactive({
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

    context.emit('update', {
      title: t('accountManage')
    })

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
