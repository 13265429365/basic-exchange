<template>
  <div>
    <div>
      <div class="row justify-center q-mt-lg">
        <div class="text-h6 text-weight-bold">{{ $t('updateSecretKey') }}</div>
      </div>
      <div class="q-mt-lg q-px-lg">
        <q-form>
          <q-input class="q-mb-md" v-model="oldPassword" outlined dense :type="isPwd ? 'password' : 'text'"
            :placeholder="$t('secretKey')">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/password.png" />
            </template>
            <template v-slot:append>
              <q-icon style="color: #999999;" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-input class="q-mb-md" v-model="newPassword" outlined dense :type="isPwd2 ? 'password' : 'text'"
            :placeholder="$t('newSecretKey')">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/password.png" />
            </template>
            <template v-slot:append>
              <q-icon style="color: #999999;" :name="isPwd2 ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="isPwd2 = !isPwd2" />
            </template>
          </q-input>
          <q-btn @click="submitFunc" class="full-width q-mb-xl" unelevated rounded no-caps style="height: 44px;"
            color="primary" :label="$t('confirm')" />
        </q-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router'
import { updatePasswordAPI } from 'src/apis/user';

// 列表
export default defineComponent({
  name: 'EditSecretKey',
  setup(props: any, context: any) {
    const $router = useRouter();

    const state = reactive({
      isPwd: false,
      isPwd2: false,

      oldPassword: '',
      newPassword: '',
    })

    // 执行接口
    const submitFunc = () => {
      const params = {
        type: 2,
        oldPassword: state.oldPassword,
        newPassword: state.newPassword,
      }
      updatePasswordAPI(params).then((res: any) => {
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
