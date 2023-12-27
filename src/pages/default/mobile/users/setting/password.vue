<template>
  <div>
    <div>
      <div class="row justify-center q-mt-lg">
        <div class="text-h6 text-weight-bold">{{ $t('password') }}</div>
      </div>
      <div class="q-mt-lg q-px-lg">
        <q-form>
          <q-input class="q-mb-md" v-model="oldPassword" standout :type="isPwd ? 'password' : 'text'"
            :placeholder="$t('oldPassword')">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/password.png" />
            </template>
            <template v-slot:append>
              <q-icon style="color: #999999;" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-input class="q-mb-md" v-model="newPassword" standout :type="isPwd2 ? 'password' : 'text'"
            :placeholder="$t('newPassword')">
            <template v-slot:prepend>
              <q-img class="iconLogo" src="/images/default/password.png" />
            </template>
            <template v-slot:append>
              <q-icon style="color: #999999;" :name="isPwd2 ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="isPwd2 = !isPwd2" />
            </template>
          </q-input>
          <q-btn @click="submit()" class="full-width q-mb-xl" unelevated rounded no-caps style="height: 44px;"
            color="primary" :label="$t('confirm')" />
        </q-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { updatePasswordAPI } from 'src/apis/user';

// import { useRouter } from 'vue-router';
// 列表
export default defineComponent({
  name: 'updatePassword',
  setup(props: any, context: any) {
    const $router = useRouter();
    const { t } = useI18n();

    let state = reactive({
      isPwd: false,
      isPwd2: false,

      oldPassword: '',
      newPassword: '',
    })

    // 执行接口
    const submit = () => {
      let params = {
        type: 1,
        oldPassword: state.oldPassword,
        newPassword: state.newPassword,
      }
      updatePasswordAPI(params).then((res: any) => {
        console.log(res);
        $router.push({ name: 'UserIndex' })
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
