<template>
  <div class="row no-wrap">
    <menuBar></menuBar>
    <div class="calc">
      <!-- 通用header(app.scss) -->
      <div class="pageHeader">
        Settings
      </div>
      <div style="padding: 48px 100px;">
        <div class="text-weight-bold text-h5">My Profile</div>
        <!-- row -->
        <div v-for="(item, i) in list" :key="i" class="q-mt-lg">
          <div class="row no-wrap justify-between">
            <div>
              <div class="row" style="min-width: 260px;">
                <q-img class="q-mr-sm" width="24px" height="24px" :src="`/images/pc/settings/${item.title}.png`"></q-img>
                <div>
                  <div class="text-h6 text-color-3 text-weight-bold">{{item.title}}</div>
                  <div style="font-size: 12px;">{{item.decs}}</div>
                </div>
              </div>
            </div>
            <div class="row items-center">
              <div v-if="item.content" class="text-weight-medium">{{item.content}}</div>
              <q-avatar v-else style="width: 34px;height: 34px;">
                <img :src="`/images/pc/settings/${item.avatar}.png`">
              </q-avatar>
            </div>
            <div class="row items-end">
              <q-btn @click="showEdit(item)" class="bg-grey-11" no-caps :label="item.btn"></q-btn>
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
import menuBar from 'src/layouts/pc/settingLayouts.vue';
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
          title: 'Nickname',
          decs: 'Set a customized nickname for your profile.',
          content: 'Paul K. Jensen',
          btn: 'Edit',
          arguments: 'Edit Nickname',
        },
        {
          title: 'Avatar',
          decs: 'Select an avatar to personalize your account.',
          avatar: 'avatar(2)',
          btn: 'Change',
          arguments: 'Edit Avatar',
        },
        {
          title: 'Gender',
          decs: 'Select your gender.',
          content: 'Male',
          btn: 'Edit',
          arguments: 'Edit Gender',
        },
        {
          title: 'Birthday',
          decs: 'Select your birthday.',
          content: '2023-10-12',
          btn: 'Edit',
          arguments: 'Edit Birthday',
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
