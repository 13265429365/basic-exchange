<template>
  <div class="column full-height" style="width: 100vw;">
    <div class="col page_bg column full-width " style=" background: linear-gradient(to right,  #14BF71,#82D880);">
      <div class="radius-8 bg-white column items-center q-py-md" style="width: 90%;margin: 36px auto;">

        <q-img src="/images/delete/logo.png" width="60px" height="60px" />

        <div class="text-color-3 text-h6 q-mt-md">Internet Company</div>

        <q-img src="/images/delete/M.png" style="margin-top: 20px;" width="224px" height="224px" fit="fill" />

        <div class="text-color-6 text-weight-medium text-body1" style="margin: 20px 0 10px 0;">Copy invitation link</div>

        <div class="text-weight-regular text-black ellipsis  q-pa-sm text-body1"
          style="background-color: #F4F5F8;width: 238px;border-radius: 10px;">
          {{ inviteUrl }}
        </div>

        <q-btn unelevated rounded style="margin: 30px 0 20px 0;width: 230px;height: 40px;" color="primary"
          label="Copy Code" no-caps @click="copyToClipboardFunc(inviteUrl)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import { copyToClipboard } from 'quasar';
import { NotifyNegative, NotifyPositive } from 'src/utils/notify';


export default {
  name: 'defaultShare',
  setup(props: any, context: any) {
    const state = reactive({
      inviteUrl: 'http://192.168.3.126:9100/login'
    });

    context.emit('update', {
      title: 'InviteFriends',
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
      ...toRefs(state),
      copyToClipboardFunc,
    }
  }
};
</script>
