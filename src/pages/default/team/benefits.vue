<template>
  <div class="column full-height">
    <navBar title="Team Benefits"></navBar>
    <div class="col page_bg q-pa-md ">
      <div class="radius-8 q-px-md q-py-lg row" style="background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);">
        <q-avatar size="50px">
          <img src="https://cdn.quasar.dev/img/avatar.png">
        </q-avatar>
        <div class="q-ml-md text-subtitle1">
          <div class="text-white text-weight-medium">Carla Schoen</div>
          <div class="text-white text-weight-medium">Team Benefits: +8626</div>
        </div>
      </div>

      <div class="radius-8 bg-white q-px-md q-py-lg  q-mt-md">
        <div class="text-color-3 text-black text-weight-bold">Beneficial Data</div>
        <div class="row text-color-3 ">
          <div class="col-4 q-pt-md" v-for="(i, index) in testData" :key="index">
            <div class="text-weight-bold text-h6 text-center">{{ i.value }}</div>
            <div class="text-color-6  text-subtitle2   text-center text-weight-regular ellipsis">{{ i.name
            }}</div>
          </div>
        </div>
      </div>

      <div class="q-py-md row">
        <div class="text-color-3 text-subtitle1 text-weight-bolder column col-3">
          <span>Transactions</span>
          <q-separator style="height: 4px;width: 20px;border-radius: 2px;" class="bg-primary self-center" />
        </div>
      </div>

      <div v-for="(transI, transIndex) in transactions" :key="transIndex"
        class="row justify-between bg-white radius-8 q-pa-md q-mb-md">
        <div>
          <div class="text-color-3 text-subtitle2 text-weight-medium">{{ transI.name }}</div>
          <div class="text-color-6 text-caption text-weight-regular text-weight-regular">{{ date.formatDate(transI.time *
            1000, 'YYYY/MM/DD HH:mm:ss') }}</div>
        </div>
        <div class="text-primary self-center text-subtitle1 text-weight-medium">+{{ transI.num }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import navBar from 'src/components/navBar.vue';
import { date } from 'quasar';

export default {
  name: 'teamBenefits',
  components: { navBar },
  setup() {
    const state = reactive({
      tab: 'mails',
      testData: [
        {
          name: '邀请人数',
          value: 26
        },
        {
          name: '邀请收益',
          value: 201.12
        }, {
          name: '购买总金额',
          value: 126
        }, {
          name: '购买收益',
          value: 2345
        }, {
          name: '利润总金额',
          value: 88
        }, {
          name: '利润收益',
          value: 201
        }
      ],
      transactions: [{
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
      }]
    });
    return {
      ...toRefs(state), date
    }
  }
};
</script>
