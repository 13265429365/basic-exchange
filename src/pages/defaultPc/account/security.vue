<template>
  <div class="row no-wrap">
    <menuBar></menuBar>
    <div class="calc">
      <!-- 通用header(app.scss) -->
      <div class="pageHeader">
        Security
      </div>
      <div style="padding: 48px 100px;">
        <div class="text-weight-bold size20">My Profile</div>
        <!-- row -->
        <div v-for="(item, i) in list" :key="i" class="q-mt-lg">
          <div class="row no-wrap justify-between">
            <div>
              <div class="row" style="min-width: 260px;">
                <q-img class="iconLogo q-mr-sm" :src="`/images/pc/settings/${item.title}.png`"></q-img>
                <div>
                  <div class="size16 text-color-3 text-weight-bold">{{item.title}}</div>
                  <div style="font-size: 12px;">{{item.decs}}</div>
                </div>
              </div>
            </div>
            <div class="row items-center">
              <div class="text-weight-medium">{{item.content}}</div>
            </div>
            <div class="row items-end">
              <q-btn @click="showEdit(item)" class="page_bg" no-caps :label="item.btn"></q-btn>
            </div>
          </div>
          <q-separator class="q-mt-md" style="background: #F1F1F1;" />
        </div>
        <!--  -->
      </div>
    </div>
    <Edit ref="edit"></Edit>
  </div>
</template>

<script lang="ts">
import menuBar from 'src/components/pc/menu.vue';
import Edit from './Edit/Edit.vue';
import { defineComponent, reactive, toRefs, ref } from 'vue';
// 因为自动加载路由问题。 第一次会获取不到页面跳转到404页面，未修复
export default defineComponent({
  components: {
    menuBar,
    Edit
  },
  name: 'settingsView',
  setup() {
    let store = reactive({
      //
      list: [
        {
          title: 'Phone Number',
          decs: 'Set a phonenumber for your profile.',
          content: '+18652368542',
          btn: 'Edit',
          arguments: 'Bind Phone Number',
        },
        {
          title: 'E-mail',
          decs: 'Set a E-mail for your profile.',
          content: 'Jimmy.smith1996@gmail.com',
          btn: 'Edit',
          arguments: 'Edit Email',
        },
        {
          title: 'Password',
          decs: 'Set a password for your profile.',
          content: '******',
          btn: 'Change',
          arguments: 'Edit Password',
        },
        {
          title: 'Secret Key',
          decs: 'Set a Secret Key for your profile.',
          content: '******',
          btn: 'Change',
          arguments: 'Edit Secret Key',
        },
      ],
    });
    let edit = ref(null);
    return {
      ...toRefs(store),
      edit,
      // 打开edit对话框
      showEdit(row: unknown) {
        edit.value?.showEdit(row)
      },
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
