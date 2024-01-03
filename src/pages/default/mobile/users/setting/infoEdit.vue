<template>
  <div>
    <div>
      <div class="row justify-center q-py-lg">
        <div class="relative-position">
          <uploader @uploaded="(url) => { params.avatar = url }">
            <template v-slot:default>
              <q-uploader-add-trigger />
              <q-avatar style="width: 80px;height: 80px;">
                <q-img :src="imageSrc(params.avatar)" />
                <q-badge floating class="bg-transparent" :style="{ top: '70%' }">
                  <q-img src='/images/icons/edit.png' width="28px" height="28px"></q-img>
                </q-badge>
              </q-avatar>
            </template>
          </uploader>
        </div>
      </div>

      <div class="q-mt-lg q-px-lg">
        <div class="q-mb-md">
          <div class="text-weight-bold q-mb-sm">{{ $t('nickname') }}</div>
          <q-input color="green" outlined dense v-model="params.nickname" />
        </div>

        <div class="q-mb-md">
          <div class="text-weight-bold q-mb-sm">{{ $t('sex') }}</div>
          <q-btn-dropdown class="text-weight-regular full-width rounded-borders" :label="$t(GenderList[genderIndex].name)"
            unelevated flat no-caps dropdown-icon="expand_more"
            style="height: 45px;color: rgba(0, 0, 0, 0.87);border: 1px solid rgba(0, 0, 0, 0.24);">
            <!-- 下拉 -->
            <q-list style="min-width: 268px" class="q-py-sm">
              <q-item :active="genderIndex == Index" @click="genderIndex = Index" v-for="(gender, Index) in GenderList"
                :key="Index" clickable v-close-popup class="row no-wrap items-center">
                <div>
                  <div style="font-size: 16px;">{{ $t(gender.name) }}</div>
                </div>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>

        <div class="q-mb-md">
          <div class="text-weight-bold q-mb-sm">{{ $t('birthday') }}</div>
          <q-input @click="birthdayPopup = true" outlined dense v-model="params.birthday" mask="date" class="q-mb-lg">
            <template v-slot:append>
              <q-popup-proxy v-model="birthdayPopup">
                <q-date v-model="params.birthday">
                  <div class="row items-center justify-end">
                    <q-btn @click="birthdayPopup = false" no-caps :label="$t('confirm')" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </template>
          </q-input>
        </div>

        <q-btn @click="submitFunc" class="full-width q-mb-xl row justify-center" unelevated rounded no-caps
          style="height: 44px;" color="primary" :label="$t('submit')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { imageSrc } from 'src/utils';
import { userInfoAPI, updateInfoAPI } from 'src/apis/user';
import { UserStore } from 'src/stores/user';
import uploader from 'src/components/uploader.vue';
import { date } from 'quasar';
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'


export default defineComponent({
  name: 'SettingsInfoIndex',
  components: {
    uploader,
  },
  setup(props: any, context: any) {
    const { t } = useI18n();
    context.emit('update', {
      title: t('settings'),
    })

    const $userStore = UserStore();
    const $router = useRouter();

    const state = reactive({
      params: {} as any,
      genderIndex: 0,
      GenderList: [
        { name: 'unknown' },
        { name: 'male' },
        { name: 'female' },
      ],
      //date选择器状态
      birthdayPopup: false,
    })

    onMounted(() => {
      UserInfo()
    })

    // 获取用户信息
    const UserInfo = () => {
      userInfoAPI().then((res: any) => {
        state.params = res
        state.genderIndex = res.sex
        state.params.birthday = date.formatDate(state.params.birthday * 1000, 'YYYY/MM/DD')
        $userStore.updateUserInfo(res)
      })
    }

    // 执行接口
    const submitFunc = () => {
      const params = {
        avatar: state.params.avatar,
        sex: state.genderIndex,
        nickname: state.params.nickname,
        birthdayStr: date.formatDate(state.params.birthday, 'YYYY/MM/DD'),
      }
      updateInfoAPI(params).then(() => {
        UserInfo()
        $router.back()
      })
    }

    return {
      imageSrc,
      date,
      ...toRefs(state),
      submitFunc,
    }
  }
})
</script>

<style scoped lang="scss">
:deep(.q-btn-dropdown .q-btn__content) {
  justify-content: space-between;
}
</style>
