<template>
  <div>
    <div>
      <!-- <div class="row justify-center">
        <div class="size24 text-weight-bold">Complete Your Profile</div>
      </div> -->
      <div class="row justify-center q-py-lg">
        <div class="relative">
          <q-avatar style="width: 80px;height: 80px;">
            <q-img :src="form.avatar ? imageSrc(form.avatar) : imageSrc('')" />
            <uploaderAvatar :respValue="form.avatar" @upload="upload"></uploaderAvatar>
          </q-avatar>
        </div>
      </div>
      <div class="q-mt-lg q-px-lg">
        <q-form>
          <div class="q-mb-md">
            <div class="text-weight-bold q-mb-sm">{{ $t('nickname') }}</div>
            <q-input color="green" standout v-model="form.nickname" />
          </div>

          <div class="q-mb-md">
            <div class="text-weight-bold q-mb-sm">{{ $t('sex') }}</div>
            <q-btn-dropdown class="text-weight-regular full-width" :label="GenderList[genderIndex].name" unelevated flat
              no-caps dropdown-icon="expand_more"
              style="height: 50px;background: #f5f6fa;border-radius: 10px;color: rgba(0, 0, 0, 0.87);">
              <!-- 下拉 -->
              <q-list style="min-width: 268px" class="q-py-sm">
                <q-item @click="genderIndex = i" v-for="(item, i) in GenderList" :key="i" clickable v-close-popup
                  class="row no-wrap items-center">
                  <div>
                    <div style="font-size: 16px;">{{ item.name }}</div>
                  </div>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>

          <div class="q-mb-md">
            <div class="text-weight-bold q-mb-sm">{{ $t('birthday') }}</div>
            <q-input @click="birthdayPopup = true" standout v-model="form.birthday" mask="date" class="q-mb-lg">
              <template v-slot:append>
                <q-popup-proxy v-model="birthdayPopup">
                  <q-date v-model="form.birthday">
                    <div class="row items-center justify-end">
                      <q-btn @click="birthdayPopup = false" no-caps label="confirm" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </template>
            </q-input>
          </div>

          <q-btn @click="submit" class="full-width q-mb-xl row justify-center" unelevated rounded no-caps
            style="height: 44px;" color="primary" :label="$t('submit')" />
        </q-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { imageSrc } from 'src/utils/index';
import { getUserInfo, updateInfo } from 'src/apis/user';
import { UserStore } from 'src/stores/user';
import { NotifyPositive } from 'src/utils/notify';
import uploaderAvatar from 'src/components/uploaderAvatar.vue';
import { date } from 'quasar';
import { useI18n } from 'vue-i18n'


export default defineComponent({
  name: 'infoEdit',
  components: {
    uploaderAvatar,
  },
  setup(props: any, context: any) {
    const { t } = useI18n();
    const $userStore = UserStore();

    let state = reactive({
      form: {} as any,

      toggle: false,

      genderIndex: 0,
      GenderList: [
        { name: 'male' },
        { name: 'female' },
      ],

      //date选择器状态
      birthdayPopup: false,

      params: {
        Name: '',
        Gender: '',
        Birthday: '', //验证id
      }
    })

    context.emit('update', {
      title: t('settings'),
    })

    onMounted(() => {
      UserInfo()
    })

    // 获取用户信息
    const UserInfo = () => {
      getUserInfo().then((res: any) => {
        console.log('用户信息', res);
        state.form = res.data
        state.genderIndex = res.data.sex - 1
        state.form.birthday = date.formatDate(state.form.birthday * 1000, 'YYYY-MM-DD')
        $userStore.updateUserInfo(res.data)
        localStorage.setItem('userInfo', JSON.stringify(res.data))
      })
    }

    // 执行接口
    const submit = () => {
      let params = {
        avatar: state.form.avatar,
        nickname: state.form.nickname,
        sex: state.genderIndex + 1,
        birthday: Number(date.formatDate(state.form.birthday, 'X')),
      }
      updateInfo(params).then((res: any) => {
        console.log(res);
        NotifyPositive('修改成功')
        UserInfo()
      })
    }

    // 执行接口
    const upload = (url: string) => {

      state.form.avatar = url
      console.log(state.form.avatar);
    }

    return {
      imageSrc,
      date,
      ...toRefs(state),
      submit,
      upload,
    }
  }
})
</script>

<style scoped lang="scss">
.relative {
  position: relative;
}


:deep(.q-btn-dropdown) {

  .q-btn__content {
    justify-content: space-between;
  }
}
</style>
