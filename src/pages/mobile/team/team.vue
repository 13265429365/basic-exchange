<template>
  <div class="column full-height">
    <navBar title="Team Management"></navBar>
    <div class="col page_bg column ">
      <div class="radius-8 q-px-md q-py-lg row justify-between q-ma-md "
        style="background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);">
        <div class="row">
          <q-avatar size="50px">
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
          <div class="q-ml-md text-subtitle1">
            <div class="text-white">
              <span class="text-weight-medium">Carla Schoen</span>
              <span class="radius-x text-caption q-ml-sm">LV6</span>
            </div>
            <div class="text-white text-weight-medium">Team Benefits: +8626</div>
          </div>
        </div>
        <div class="text-white">详情 <q-icon name="chevron_right" size="16px" /></div>
      </div>
      <div class="bg-white col q-pa-md">
        <div v-for="(listI, listIndex) in list" :key="listIndex">
          <div class="row justify-between bg-white q-py-md">
            <div class="row">
              <q-avatar size="32px">
                <img src="https://cdn.quasar.dev/img/avatar.png">
              </q-avatar>
              <div class="q-ml-md">
                <div class="text-color-3 text-subtitle2 text-weight-medium">{{ listI.name }}</div>
                <div class="text-color-6 text-caption text-weight-regular text-weight-regular">{{
                  date.formatDate(listI.time
                    *
                    1000, 'YYYY/MM/DD HH:mm:ss') }}</div>
              </div>
            </div>
            <div class="row justify-end">
              <div class="text-primary self-center text-subtitle1 text-weight-medium">+{{ listI.num }}</div>
              <q-icon class="self-center" name="chevron_right" size="22px" style="color: #999999;" />
            </div>
          </div>
          <q-separator style="height: 1px;background: #F4F5FD;" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { reactive, toRefs } from 'vue';
  import navBar from 'src/layouts/mobile/header.vue';
  import { date } from 'quasar';

  export default {
    name: 'teamBenefits',
    components: { navBar },
    setup() {
      const state = reactive({
        tab: 'mails',
        list: [
          {
            time: 1626355200,
            name: 'Carla Schoen',
            num: 16
          }, {
            time: 1626355200,
            name: 'Carla Schoen',
            num: 16
          }, {
            time: 1626355200,
            name: 'Carla Schoen',
            num: 16
          }, {
            time: 1626355200,
            name: 'Carla Schoen',
            num: 16
          }
        ],

      });
      return {
        ...toRefs(state), date
      }
    }
  };
</script>
<style scoped>
  @import url("../../../css/mobileCss.css");
  .radius-x {
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.12);
    padding: 3px 10px;
  }
</style>