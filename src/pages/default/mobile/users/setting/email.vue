<template>
  <div>
    <div class="row justify-center q-mt-lg">
      <div class="text-h6 text-weight-bold">{{ $t('bindEmail') }}</div>
    </div>
    <div class="q-mt-lg q-px-lg">
      <q-form>
        <q-input class="q-mb-md" v-model="form.email" :placeholder="$t('email')" outlined dense type="text" />
        <q-btn @click="submit()" class="full-width q-mb-xl" unelevated rounded no-caps style="height: 44px;"
          color="primary" :label="$t('submit')" />
      </q-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { UserStore, UserInfoKey } from 'src/stores/user';
import { userInfoAPI, updateInfoAPI } from 'src/apis/user';

// 列表
export default defineComponent({
  name: 'enterEmail',
  setup(props: any, context: any) {
    const router = useRouter();
    const $userStore = UserStore();

    let state = reactive({
      form: {} as any,
    })

    onMounted(() => {
      UserInfo()
    })

    // 获取用户信息
    const UserInfo = () => {
      userInfoAPI().then((res: any) => {
        console.log('用户信息', res);
        state.form = res
        $userStore.updateUserInfo(res)
        localStorage.setItem(UserInfoKey, JSON.stringify(res))
      })
    }

    // 执行接口
    const submit = () => {
      let params = {
        email: state.form.email,
      }
      updateInfoAPI(params).then((res: any) => {
        console.log(res);
        UserInfo()
      })
    }

    return {
      ...toRefs(state),
      submit,
    }
  }
})
</script>

<style scoped></style>
