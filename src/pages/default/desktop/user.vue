<template>
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
                <div class="text-h6 text-color-3 text-weight-bold">{{ item.title }}</div>
                <div style="font-size: 12px;">{{ item.decs }}</div>
              </div>
            </div>
          </div>
          <div class="row items-center">
            <div v-if="item.content" class="text-weight-medium">{{ item.content }}</div>
            <q-avatar v-else style="width: 34px;height: 34px;">
              <img src="https://cdn.quasar.dev/img/avatar.png">
            </q-avatar>
          </div>
          <div class="row items-end">
            <q-btn class="bg-grey-3" no-caps :label="item.btn"></q-btn>
          </div>
        </div>
        <q-separator class="q-mt-md" style="background: #F1F1F1;" />
      </div>
      <!--  -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
  name: 'userIndex',
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
    return {
      ...toRefs(store),
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
