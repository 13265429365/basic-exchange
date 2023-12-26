<template>
  <div class="calc">

    <div>
      <q-img class="q-mb-xl" height="280px" src="/images/banner.png"></q-img>
      <div class="q-pt-xl">
        <div class="row justify-center">
          <div class="relative-position">
            <div class="qrcode bg-white" style="z-index: 999;">
              <vueQr class="full-width full-height" :text="inviteUrl"></vueQr>
            </div>
            <q-img class="absolute" width="133px" height="225px" style="left: -103px;top:0"
              src="/images/qrcode-left.png"></q-img>
            <q-img class="absolute" width="115px" height="229px" style="right: -90px;top:0;z-index: -1;"
              src="/images/qrcode-right.png"></q-img>
          </div>
        </div>
        <div class="text-center q-mt-lg text-color-6" style="font-size: 20px;">Scan to Download the App</div>
        <div class="text-center q-mt-sm text-color-3" style="font-size: 28px;">iOS and Android</div>
        <div class="row justify-center q-mt-lg">
          <div class="row no-wrap items-center q-py-md q-px-lg radius-8" style="color: #000;border: 1px solid #DDDDDD">
            <div class="q-mr-sm">{{ inviteUrl }}</div>
            <q-icon @click="copyToClipboardFunc(inviteUrl)" class="text-color-3 cursor-pointer"
              name="content_copy"></q-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue';
import { copyToClipboard } from 'quasar';
import { NotifyNegative, NotifyPositive } from 'src/utils/notify';
import { getInvite } from 'src/apis/user';
import vueQr from 'vue-qr/src/packages/vue-qr.vue';

export default {
  name: 'ShareIndex',
  components: { vueQr },
  setup() {
    const state = reactive({
      inviteUrl: ''
    });

    onMounted(() => {
      getInvite().then((res: any) => {
        state.inviteUrl = location.href + `?code=${res.code}`
        console.log(res);
      })
    })

    // 复制方法
    const copyToClipboardFunc = (str: string) => {
      copyToClipboard(str)
        .then(() => {
          NotifyPositive('复制成功！');
        })
        .catch(() => {
          NotifyNegative('复制失败！');
        });
    };
    return {
      ...toRefs(state), copyToClipboardFunc
    }
  }
};
</script>
<style scoped>
.qrcode {
  width: 206px;
  height: 206px;
  border-radius: 26px;
  border: 1px solid #DDDDDD;
  padding: 14px;
}

.background {
  width: 100%;
  background: url('/public/images/banner.png');
  background-size: cover;
  background-repeat: no-repeat;
  height: 280px;
}
</style>
