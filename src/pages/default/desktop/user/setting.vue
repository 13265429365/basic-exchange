<template>
  <div class="calc">
    <!-- 通用header(app.scss) -->
    <div class="pageHeader">
      Settings
    </div>
    <div class="maxWidth1200">
      <div>
        <div class="text-weight-bold text-h5">My Profile</div>
        <!-- row -->
        <div v-for="(item, i) in SettingList" :key="i" class="q-mt-lg">
          <div class="row no-wrap justify-between">
            <div>
              <div class="row" style="min-width: 260px;">
                <q-img class="q-mr-sm" width="24px" height="24px" :src="imageSrc('')"></q-img>
                <div>
                  <div class="text-h6 text-color-3 text-weight-bold">{{ item.title }}</div>
                  <div style="font-size: 12px;">{{ item.decs }}</div>
                </div>
              </div>
            </div>
            <div class="row items-center">
              <q-avatar v-if="item.avatar" style="width: 34px;height: 34px;">
                <img src="https://cdn.quasar.dev/img/avatar.png">
              </q-avatar>
              <div v-else class="text-weight-medium">{{ item.content }}</div>

            </div>
            <div class="row items-end">
              <q-btn @click="show(item)" class="bg-grey-3" no-caps :label="item.btn"></q-btn>
            </div>
          </div>
          <q-separator class="q-mt-md" style="background: #F1F1F1;" />
        </div>
      </div>
      <!--  -->
    </div>
    <Edit ref="edit" @UserInfo="UserInfo"></Edit>
  </div>
</template>

<script lang="ts">
import Edit from './Edit/Edit.vue';

import { defineComponent, reactive, toRefs, ref, onMounted } from 'vue';
import { imageSrc } from 'src/utils/index';
import { getUserInfo } from 'src/apis/user';

export default defineComponent({
  name: 'userIndex',
  components: {
    Edit,
  },

  setup() {
    let edit = ref(null);

    let state = reactive({
      //
      SettingList: [
        // arguments是请求的参数
        // type==info基本资料,  type==secure密码（判断弹窗显示内容）
        // headTitle弹窗标题
        {
          title: 'Nickname',
          decs: 'Set a customized nickname for your profile.',
          content: 'Paul K. Jensen',
          btn: 'Edit',
          arguments: 'nickname',
          type: 'info',
          headTitle: 'Edit Nickname',
        },
        {
          title: 'Avatar',
          decs: 'Select an avatar to personalize your account.',
          avatar: 'avatar(2)',
          btn: 'Change',
          arguments: 'avatar',
          type: 'info',
          headTitle: 'Edit Avatar',
        },
        {
          title: 'Gender',
          decs: 'Select your gender.',
          content: 'Male',
          btn: 'Edit',
          arguments: 'sex',
          type: 'info',
          headTitle: 'Edit Gender',
        },
        {
          title: 'Birthday',
          decs: 'Select your birthday.',
          content: '2023-10-12',
          btn: 'Edit',
          arguments: 'birthday',
          type: 'info',
          headTitle: 'Edit Birthday',
        },
        {
          title: 'Phone Number',
          decs: 'Set a phonenumber for your profile.',
          content: '+18652368542',
          btn: 'Edit',
          arguments: 'telephone',
          type: 'info',
          headTitle: 'Bind Phone Number',
        },
        {
          title: 'E-mail',
          decs: 'Set a E-mail for your profile.',
          content: 'Jimmy.smith1996@gmail.com',
          btn: 'Edit',
          arguments: 'email',
          type: 'info',
          headTitle: 'Enter Email',
        },
        {
          title: 'Password',
          decs: 'Set a password for your profile.',
          btn: 'Change',
          arguments: 'oldPassword',
          type: 'secure',
          headTitle: 'Edit Password',
        },
        {
          title: 'Secret Key',
          decs: 'Set a Secret Key for your profile.',
          btn: 'Change',
          arguments: 'oldPassword',
          type: 'secure',
          headTitle: 'Edit Secret Key',
        },
      ],
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

        localStorage.setItem('userInfo', JSON.stringify(res))
      })
    }

    const show = (row: any) => {
      edit.value?.showEdit(row)
    }

    return {
      imageSrc,
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
