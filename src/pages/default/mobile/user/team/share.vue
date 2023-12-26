<template>
  <div class="column full-height" style="width: 100vw;">
    <div class="col page_bg column full-width " style=" background: linear-gradient(to right,  #14BF71,#82D880);">
      <div class="radius-8 bg-white column items-center q-py-md" style="width: 90%;margin: 36px auto;">

        <q-img :src="imageSrc('')" class="q-mt-lg" width="60px" height="60px" />

        <div class="text-color-3 text-h6 q-mt-md">{{ $t('inviteFriends') }}</div>

        <vueQr style="width: 224px;height: 224px;" :text="inviteUrl"></vueQr>

        <div class="text-grey-7 text-weight-medium" style="margin: 20px 0 10px 0;">Copy invitation link</div>

        <div class="text-weight-regular text-black ellipsis  q-pa-sm text-body1"
          style="background-color: #F4F5F8;width: 238px;border-radius: 10px;">
          {{ inviteUrl }}
        </div>

        <q-btn unelevated rounded style="margin: 30px 0 20px 0;width: 230px;height: 40px;" color="primary"
          :label="$t('copy')" no-caps @click="copyToClipboardFunc(inviteUrl)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';
import { copyToClipboard, useQuasar } from 'quasar';
import { NotifyNegative, NotifyPositive } from 'src/utils/notify';
import { useI18n } from 'vue-i18n';
import { getInvite } from 'src/apis/user';
import vueQr from 'vue-qr/src/packages/vue-qr.vue';
import { imageSrc } from 'src/utils';

export default {
  name: 'ShareIndex',
  components: { vueQr },
  setup(props: any, context: any) {
    const { t } = useI18n()
    const $q = useQuasar()
    console.log($q);

    const state = reactive({
      inviteUrl: ''
    });

    context.emit('update', {
      title: t('inviteFriends'),
    })

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
      imageSrc,
      ...toRefs(state),
      copyToClipboardFunc,
    }
  }
};
</script>
