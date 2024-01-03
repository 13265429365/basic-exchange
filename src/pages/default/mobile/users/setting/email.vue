<template>
  <div>
    <div class="q-mt-lg q-px-lg">
      <q-form>
        <q-input class="q-mb-md" v-model="params.email" :placeholder="$t('email')" outlined dense type="text" />
        <q-btn @click="submitFunc()" class="full-width q-mb-xl" unelevated rounded no-caps style="height: 44px;"
          color="primary" :label="$t('submit')" />
      </q-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { UserStore } from 'src/stores/user';
import { updateInfoAPI } from 'src/apis/user';
import { useI18n } from 'vue-i18n';

// 列表
export default defineComponent({
  name: 'SettingsBindEmail',
  setup(props: any, context: any) {
    const { t } = useI18n();
    context.emit('update', {title: t('bindEmail')})

    const $router = useRouter();
    const $userStore = UserStore();
    const state = reactive({
      userInfo: {} as any,
      params: {
        email: '',
      } as any,
    })

    onMounted(() => {
      state.userInfo = $userStore.userInfo
      state.params.email = state.userInfo.email
    })


    // 执行接口
    const submitFunc = () => {
      updateInfoAPI(state.params).then(() => {
        state.userInfo.email = state.params.email
        $userStore.updateUserInfo(state.userInfo)
        void $router.back()
      })
    }

    return {
      ...toRefs(state),
      submitFunc,
    }
  }
})
</script>

<style scoped></style>
