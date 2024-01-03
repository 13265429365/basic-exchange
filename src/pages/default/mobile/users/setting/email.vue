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
import { userInfoAPI, updateInfoAPI } from 'src/apis/user';
import { useI18n } from 'vue-i18n';

// 列表
export default defineComponent({
  name: 'SettingsEmailIndex',
  emits: ['update'],
  setup(props: any, context: any) {
    const { t } = useI18n();
    context.emit('update', {
      title: t('bindEmail'),
    })

    const $router = useRouter();
    const $userStore = UserStore();

    const state = reactive({
      params: {} as any,
    })

    onMounted(() => {
      UserInfo()
    })

    // 获取用户信息
    const UserInfo = () => {
      userInfoAPI().then((res: any) => {
        state.params = res
        $userStore.updateUserInfo(res)
      })
    }

    // 执行接口
    const submitFunc = () => {
      const params = {
        email: state.params.email,
      }
      updateInfoAPI(params).then((res: any) => {
        UserInfo()
        $router.back()
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
