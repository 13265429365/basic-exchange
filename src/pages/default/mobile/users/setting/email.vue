<template>
  <div>
    <div class="row justify-center q-mt-lg">
      <div class="text-h6 text-weight-bold">{{ $t('bindEmail') }}</div>
    </div>
    <div class="q-mt-lg q-px-lg">
      <q-form>
        <q-input class="q-mb-md" v-model="params.email" :placeholder="$t('email')" outlined dense type="text" />
        <q-btn @click="submitFunc" class="full-width q-mb-xl" unelevated rounded no-caps style="height: 44px;"
          color="primary" :label="$t('submit')" />
      </q-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { UserStore } from 'src/stores/user';
import { userInfoAPI, updateInfoAPI } from 'src/apis/user';

export default defineComponent({
  name: 'SettingUpdateEmail',
  setup() {
    const $userStore = UserStore();
    const state = reactive({
      params: {} as any,
    })

    // 执行接口
    const submitFunc = () => {
      updateInfoAPI(state.params).then(() => {
        // 更新用户信息
        userInfoAPI().then((res: any) => {
          $userStore.updateUserInfo(res)
        })
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
