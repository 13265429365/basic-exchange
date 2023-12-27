<template>
  <div>
    <q-img class="q-mb-xl" height="280px" src="/images/banner.png"></q-img>
    <div class="q-pt-xl">
      <div class="row justify-center">
        <div class="relative-position">
          <div class="qrcode bg-white" style="z-index: 999;">
            <img :src="inviteImage" alt="">
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
        <div class="row no-wrap items-center q-py-md q-px-lg rounded-borders"
          style="color: #000;border: 1px solid #DDDDDD">
          <div class="q-mr-sm">{{ inviteUrl }}</div>
          <q-icon @click="copyToClipboardFunc(inviteUrl)" class="text-color-3 cursor-pointer"
            name="content_copy"></q-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue';
import { copyToClipboard } from 'quasar';
import { inviteInfoAPI } from 'src/apis/user';
import QRCode from 'qrcode-svg-ts';

export default {
  name: 'ShareIndex',
  setup() {


    const state = reactive({
      inviteUrl: '',
      inviteImage: '',
    });

    onMounted(() => {
      console.log(location);

      inviteInfoAPI().then((res: any) => {
        state.inviteUrl = location.origin + `/register?code=${res.code}`
        const qrCode = new QRCode({
          content: state.inviteUrl,
          padding: 0,
          width: 175,
          height: 175,
          color: '#000000',
          background: '#ffffff',
          ecl: 'M',
        });
        state.inviteImage = qrCode.toDataURL()
        console.log(res);
      })
    })

    // 复制方法
    const copyToClipboardFunc = (str: string) => {
      copyToClipboard(str)
        .then(() => {
          console.log('复制');

        })
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
