<template>
  <div style="padding: 48px 100px;">
    <div class="text-weight-bold text-h5">{{ $t('personalSetting') }}</div>

    <div class="q-mt-lg">
      <div class="row justify-between items-center q-mb-lg" v-for="(setting, settingIndex) in settingsList"
        :key="settingIndex">
        <div class="col-6">
          <div class="text-body1">{{ $t(setting.name) }}</div>
          <div class="text-grey text-caption">{{ $t(setting.desc) }}</div>
        </div>
        <div class="col">
          <div v-if="setting.type == 'password'">
            <div>******</div>
          </div>
          <div v-else-if="setting.type == 'avatar'">
            <q-avatar>
              <q-img no-spinner :src="imageSrc(setting.value)"></q-img>
            </q-avatar>
          </div>
          <div v-else-if="setting.type == 'datePicker'">
            {{ date.formatDate(setting.value * 1000, 'YYYY/MM/DD') }}
          </div>
          <div v-else class="text-body2">
            <div v-if="setting.params == 'sex'">
              <div v-if="setting.value == 1">{{ $t('male') }}</div>
              <div v-else-if="setting.value == 2">{{ $t('female') }}</div>
              <div v-else>{{ $t('unknown') }}</div>
            </div>
            <div v-else>
              {{ setting.value == '' ? '- -' : setting.value }}
            </div>
          </div>
        </div>
        <div>
          <q-btn flat :label="$t('edit')" class="bg-grey-1 text-grey-8" @click="openUpdateDialog(setting)"></q-btn>
        </div>
      </div>
    </div>
    <q-dialog v-model="dialogShow">
      <q-card class="full-width">
        <q-card-section>
          <div class="text-h6">{{ $t('edit') }}{{ $t(currentSetting.name) }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="relative row justify-center" v-if="currentSetting.params == 'avatar'">
            <q-avatar style="width: 80px;height: 80px;">
              <q-img :src="currentSetting.value ? imageSrc(currentSetting.value) : imageSrc('')" />
              <uploader type="avatar"
                :uploaderStyle="{ position: 'absolute', right: '0', bottom: '0', width: '27px', height: '27px', background: 'transparent' }"
                :respValue="currentSetting.value" @uploaded="uploaded"></uploader>
            </q-avatar>
          </div>

          <div v-else-if="currentSetting.params == 'nickname'">
            <q-input outlined v-model="currentSetting.value"></q-input>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn @click="updateUserInfo" flat :label="$t('cancel')" color="grey" v-close-popup />
          <q-btn @click="submitFunc" flat :label="$t('submit')" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { getUserInfo, updateInfo, updatePassword } from 'src/apis/user';
import { imageSrc } from 'src/utils';
import { UserStore } from 'stores/user';
import { date } from 'quasar';
import uploader from 'src/components/uploader.vue';

export default defineComponent({
  name: 'SettingIndex',
  components: {
    uploader,
  },
  setup() {
    const $userStore = UserStore()

    const userInfo = $userStore.userInfo
    const state = reactive({
      dialogShow: false,

      // 弹窗数据
      currentSetting: {} as any,

      // 接口参数
      params: {} as any,
      settingsList: [
        { name: 'avatar', params: 'avatar', type: 'avatar', desc: 'avatarSmall', value: userInfo.avatar },
        { name: 'nickname', params: 'nickname', type: 'text', desc: 'nicknameSmall', value: userInfo.nickname },
        { name: 'email', params: 'email', type: 'text', desc: 'emailSmall', value: userInfo.email },
        { name: 'password', params: 'password', type: 'password', desc: 'passwordSmall', value: '' },
        { name: 'secretKey', params: 'secretKey', type: 'password', desc: 'secretKeySmall', value: '' },
        { name: 'telephone', params: 'telephone', type: 'telephone', desc: 'telephoneSmall', value: userInfo.telephone },
        { name: 'sex', params: 'sex', type: 'toggle', desc: 'sexSmall', value: userInfo.sex },
        { name: 'birthday', params: 'birthday', type: 'datePicker', desc: 'birthdaySmall', value: userInfo.birthday },
        { name: 'personalSignature', params: 'desc', type: 'textarea', desc: 'personalSignatureSmall', value: userInfo.desc },
      ]
    });

    // 打开弹窗
    const openUpdateDialog = (setting: any) => {
      state.dialogShow = true
      state.currentSetting = setting
      console.log(setting);

    }

    // 更新用户信息
    const submitFunc = () => {
      updateInfo(state.params).then((res: any) => {
        $userStore.updateUserInfo(res)
      })
      updatePassword(state.params).then((res: any) => {
        $userStore.updateUserInfo(res)
      })
    }

    // 更新当前用户信息
    const updateUserInfo = () => {
      getUserInfo().then((res: any) => {
        console.log(res);
        $userStore.updateUserInfo(res)
        state.settingsList.forEach((item: any) => {
          item.value = userInfo[item.name]
        })
      })
    }

    updateUserInfo()

    // 更改头像
    const uploaded = (url: any) => {
      state.params.avatar = url
      state.currentSetting.value = url
    }

    return {
      imageSrc,
      date,
      ...toRefs(state),
      updateUserInfo,
      openUpdateDialog,
      submitFunc,
      uploaded,
    }
  }
});
</script>
<style lang="scss" scoped></style>
