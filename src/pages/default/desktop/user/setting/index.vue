<template>
  <div class="calc">
    <!-- 通用header(app.scss) -->
    <div class="pageHeader">
      {{ $t('settings') }}
    </div>
    <div class="maxWidth1200">
      <div>
        <div class="text-weight-bold text-h5">{{ $t('personalSetting') }}</div>
        <!-- row -->
        <div v-for="(item, i) in SettingList" :key="i" class="q-mt-lg">
          <div class="row no-wrap justify-between">
            <div>
              <div class="row" style="min-width: 260px;">
                <q-img class="q-mr-sm" width="24px" height="24px" :src="imageSrc('')"></q-img>
                <div>
                  <div class="text-h6 text-color-3 text-weight-bold">{{ $t(item.arguments) }}</div>
                  <div style="font-size: 12px;">{{ item.decs }}</div>
                </div>
              </div>
            </div>
            <div class="row items-center">
              <q-avatar v-if="item.avatar" style="width: 34px;height: 34px;">
                <q-img :src="imageSrc(item.content ? item.content : '')"></q-img>
              </q-avatar>
              <div v-if="item.title == 'Gender'" class="text-weight-medium">
                {{ item.text }}
              </div>
              <div v-if="item.title == 'Birthday'" class="text-weight-medium">
                {{ date.formatDate(item.content * 1000, 'YYYY-MM-DD') }}
              </div>
              <div v-if="item.title != 'Gender' && item.title != 'Birthday' && item.title != 'Avatar'"
                class="text-weight-medium">{{
                  item.content }}
              </div>

            </div>
            <div class="row items-end">
              <q-btn @click="show(item)" class="bg-grey-3" no-caps :label="$t(item.btn)"></q-btn>
            </div>
          </div>
          <q-separator class="q-mt-md" style="background: #F1F1F1;" />
        </div>
      </div>
      <!--  -->
    </div>
    <update ref="edit" @UserInfo="UserInfo"></update>
  </div>
</template>

<script lang="ts">
import update from 'src/pages/default/desktop/user/setting/update.vue';

import { defineComponent, reactive, toRefs, ref, onMounted, nextTick } from 'vue';
import { imageSrc } from 'src/utils/index';
import { getUserInfo } from 'src/apis/user';
import { UserStore } from 'src/stores/user';
import { date } from 'quasar';


export default defineComponent({
  name: 'userIndex',
  components: {
    update,
  },

  setup() {
    const $userStore = UserStore()

    const edit = ref(null);

    const state = reactive({
      //
      SettingList: [
        // arguments是请求的参数
        // type==info基本资料,  type==secure密码（判断弹窗显示内容）
        // headTitle弹窗标题
        {
          title: 'Nickname',
          decs: 'Set a customized nickname for your profile.',
          content: '',
          btn: 'edit',
          arguments: 'nickname',
          type: 'info',
          headTitle: 'Edit Nickname',
        },
        {
          title: 'Avatar',
          decs: 'Select an avatar to personalize your account.',
          avatar: '1',
          btn: 'edit',
          arguments: 'avatar',
          type: 'info',
          headTitle: 'Edit Avatar',
        },
        {
          title: 'Gender',
          decs: 'Select your gender.',
          content: '',
          btn: 'edit',
          arguments: 'sex',
          type: 'info',
          headTitle: 'Edit Gender',
        },
        {
          title: 'Birthday',
          decs: 'Select your birthday.',
          content: '',
          btn: 'edit',
          arguments: 'birthday',
          type: 'info',
          headTitle: 'Edit Birthday',
        },
        {
          title: 'Phone Number',
          decs: 'Set a phonenumber for your profile.',
          content: '',
          btn: 'edit',
          arguments: 'telephone',
          type: 'info',
          headTitle: 'Bind Phone Number',
        },
        {
          title: 'E-mail',
          decs: 'Set a E-mail for your profile.',
          content: '',
          btn: 'edit',
          arguments: 'email',
          type: 'info',
          headTitle: 'Enter Email',
        },
        {
          title: 'Password',
          decs: 'Set a password for your profile.',
          btn: 'edit',
          arguments: 'password',
          type: 'secure',
          headTitle: 'Edit Password',
        },
        {
          title: 'Secret Key',
          decs: 'Set a Secret Key for your profile.',
          btn: 'edit',
          arguments: 'secretKey',
          type: 'secure',
          headTitle: 'Edit Secret Key',
        },
      ] as any,
    });

    onMounted(() => {
      UserInfo()
    })

    const UserInfo = () => {
      getUserInfo().then((res: any) => {
        console.log('用户信息', res);
        state.SettingList.forEach((Setting: any) => {
          for (const resItem in res) {
            if (Setting.arguments == resItem) {
              Setting.content = res[resItem]
            }
          }
        });
        state.SettingList.forEach((Setting: any) => {
          if (Setting.title == 'Gender') {
            if (Setting.content == 0) {
              Setting.text = '未填写'
            }
            if (Setting.content == 1) {
              Setting.text = 'male'
            }
            if (Setting.content == 2) {
              Setting.text = 'female'
            }
          }
        })
        $userStore.updateUserInfo(res)
        localStorage.setItem('userInfo', JSON.stringify(res))
      })
    }


    const show = (row: any) => {
      edit.value?.showEdit(row)
    }

    return {
      imageSrc,
      date,
      ...toRefs(state),
      edit,
      // 打开edit对话框
      show,
      UserInfo,
    }
  }
});
</script>
<style lang="scss" scoped>
.q-btn {
  width: 80px;
  height: 32px;
}

.q-btn:before {
  box-shadow: none;
}
</style>
