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

          <div v-else-if="currentSetting.params == 'sex'">
            <q-select outlined dense v-model="currentSetting.value" :options="sexList" option-value="value"
              option-label="name" map-options dropdown-icon="expand_more" />
          </div>

          <div v-else-if="currentSetting.params == 'birthday'">
            <q-input outlined dense v-model="currentSetting.value" :placeholder="$t(currentSetting.params)" mask="date">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="currentSetting.value">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup :label="$t('confirm')" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div v-else-if="currentSetting.params == 'password' || currentSetting.params == 'secretKey'">
            <q-input v-model="params.oldPassword" outlined dense class="q-mb-md" :type="ShowPwd ? 'password' : 'text'">
              <template v-slot:append>
                <q-icon @click="ShowPwd = !ShowPwd" :name="ShowPwd ? 'o_visibility' : 'o_visibility_off'"></q-icon>
              </template>
            </q-input>
            <q-input v-model="params.newPassword" outlined dense class="q-mb-md" :type="ShowCfmPwd ? 'password' : 'text'">
              <template v-slot:append>
                <q-icon @click="ShowCfmPwd = !ShowCfmPwd"
                  :name="ShowCfmPwd ? 'o_visibility' : 'o_visibility_off'"></q-icon>
              </template>
            </q-input>
          </div>

          <div v-else>
            <q-input outlined dense v-model="currentSetting.value" :placeholder="$t(currentSetting.params)"></q-input>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('cancel')" color="grey" v-close-popup />
          <q-btn @click="submitFunc" flat :label="$t('submit')" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { userInfoAPI, updateInfoAPI, updatePasswordAPI } from 'src/apis/user';
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
      // 性别列表
      sexList: [
        { name: 'male', value: 1 },
        { name: 'female', value: 2 },
      ],

      // 是否显示密码
      ShowPwd: false,
      ShowCfmPwd: false,

      dialogShow: false,

      // 弹窗数据
      currentSetting: {} as any,

      // 接口参数
      params: {} as any,
      settingsList: [
        { name: 'avatar', params: 'avatar', type: 'avatar', desc: 'avatarSmall', value: userInfo.avatar as any },
        { name: 'nickname', params: 'nickname', type: 'text', desc: 'nicknameSmall', value: userInfo.nickname as any },
        { name: 'email', params: 'email', type: 'text', desc: 'emailSmall', value: userInfo.email as any },
        { name: 'password', params: 'password', type: 'password', desc: 'passwordSmall', value: userInfo.password as any },
        { name: 'secretKey', params: 'secretKey', type: 'password', desc: 'secretKeySmall', value: userInfo.secretKey as any },
        { name: 'telephone', params: 'telephone', type: 'telephone', desc: 'telephoneSmall', value: userInfo.telephone as any },
        { name: 'sex', params: 'sex', type: 'toggle', desc: 'sexSmall', value: userInfo.sex as any },
        { name: 'birthday', params: 'birthday', type: 'datePicker', desc: 'birthdaySmall', value: userInfo.birthday as any },
        { name: 'personalSignature', params: 'desc', type: 'textarea', desc: 'personalSignatureSmall', value: userInfo.desc as any },
      ]
    });

    // 打开弹窗
    const openUpdateDialog = (setting: any) => {
      state.dialogShow = true
      state.currentSetting = setting
    }

    // 更新用户信息
    const submitFunc = () => {
      // 修改登录密码
      if (state.currentSetting.params == 'password' || state.currentSetting.params == 'secretKey') {
        state.params = {
          type: state.currentSetting.params == 'password' ? 1 : 2,
          oldPassword: state.params.oldPassword,
          newPassword: state.params.newPassword,
        }
        updatePasswordAPI(state.params).then(async (res: any) => {
          await $userStore.updateUserInfo(res)
          // updateUserInfo()
        })
      } else {
        // 修改个人信息
        if (state.currentSetting.params == 'birthday') {
          state.params[state.currentSetting.params] = Number(date.formatDate(state.currentSetting.value, 'X'))
        } else if (state.currentSetting.params == 'sex') {
          state.params[state.currentSetting.params] = state.currentSetting.value.value
        } else {
          state.params[state.currentSetting.params] = state.currentSetting.value
        }
        updateInfoAPI(state.params).then(async (res: any) => {
          await $userStore.updateUserInfo(res)
          // updateUserInfo()
        })
      }
      // 清空params
      state.params = {}
      state.dialogShow = false
    }

    // 更新当前用户信息
    // const updateUserInfo = () => {
    //   userInfoAPI().then((res: any) => {
    //     console.log(res);
    //     $userStore.updateUserInfo(res)
    //     state.settingsList.forEach((item: any) => {
    //       if (item.name == 'birthday') {
    //         item.value = date.formatDate(res[item.name] * 1000, 'YYYY-MM-DD')
    //       } else {
    //         item.value = res[item.name]
    //       }
    //     })
    //   })
    // }

    // onMounted(() => {
    //   updateUserInfo()
    // })

    // 更改头像
    const uploaded = (url: any) => {
      state.params.avatar = url
      state.currentSetting.value = url
    }

    return {
      imageSrc,
      date,
      ...toRefs(state),
      // updateUserInfo,
      openUpdateDialog,
      submitFunc,
      uploaded,
    }
  }
});
</script>
<style lang="scss" scoped></style>
