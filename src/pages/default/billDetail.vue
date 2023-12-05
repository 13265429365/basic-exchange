<template>
  <div class="column full-width" style="min-height: 100vh;">
    <navBar title="Bill Detail">
      <template v-slot:right>
        <div @click="dialog=true" class="row items-center">
          筛选
        </div>
      </template>
    </navBar>
    <div class="col page_bg q-pa-md full-width">
      <!-- 明细列表 -->
      <div v-for="item in 8" :key="item" class="radius-8 bg-white q-pa-md  q-mb-md">
        <div class="row justify-between">
          <div class="">
            <div class="text-color-3 text-weight-bold">Recharge-Wallet</div>
            <div class="text-color-6 text-weight-medium text-caption">2023/10/12 12:20:36</div>
          </div>
          <div>
            <div class="text-body1 text-weight-bold text-right">+236</div>
            <div class="text-weight-medium text-right text-caption">余额:25,982.12</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 筛选对话框 -->
    <q-dialog v-model="dialog" :maximized="true" position="right" full-height style="padding: 0;">
      <q-card style="width: 320px">
        <q-card-section class="relative full-height">
          <div class="text-weight-bold q-mb-md size15">筛选</div>
          <div class="text-weight-bold q-mb-sm size15">Type</div>
          <div class="q-gutter-sm q-mb-md">
            <q-btn @click="type=item.name" v-for="(item, i) in typeList" :key="i" :class="[{'text-white':item.name==type,'bg-primary':item.name==type,'text-grey-8':item.name!=type,'page_bg':item.name!=type, }]" style="width: 90px;height: 36px;" unelevated rounded no-caps>
              {{item.name}}
            </q-btn>
          </div>
          <div class="text-weight-bold q-mb-sm size15">Timescales</div>
          <div class="row no-wrap items-center">
            <q-input @click="startDatePouop=true" placeholder="开始时间" style="height: 34px;" filled v-model="startDate" mask="date">
              <template v-slot:append>
                <q-popup-proxy v-model="startDatePouop">
                  <q-date v-model="startDate">
                    <div class="row items-center justify-end">
                      <q-btn @click="startDatePouop=false" no-caps label="confirm" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </template>
            </q-input>
            <div class="q-mx-sm" style="width: 15px;height: 1px;border: 1px solid #EDEDED;"></div>
            <q-input @click="endDatePouop=true" placeholder="结束时间" style="height: 34px;" filled v-model="endDate" mask="date">
              <template v-slot:append>
                <q-popup-proxy v-model="endDatePouop">
                  <q-date v-model="endDate">
                    <div class="row items-center justify-end">
                      <q-btn @click="endDatePouop=false" no-caps label="confirm" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </template>
            </q-input>
          </div>
          <div class="row justify-between no-wrap absolute">
            <q-btn @click="dialog = false" class="bg-grey-2" unelevated rounded no-caps
              style="height: 44px;width: 140px;" label="Cancel" />
            <q-btn @click="dialog = false" unelevated rounded no-caps
              style="height: 44px;width: 140px;" color="primary" label="Confirm" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
  import { reactive, toRefs } from 'vue';
  import navBar from 'src/components/navBar.vue';

  export default {
    name: 'billDetail',
    components: { navBar },
    setup() {
      const state = reactive({
        dialog: false,
        typeList: [
          { name: '全部' },
          { name: '体现' },
          { name: '充值' },
          { name: '体现' },
          { name: '充值' },
        ],
        type: '全部',
        startDatePouop: false,
        startDate: false,
        endDatePouop: false,
        endDate: false,
      });
      return {
        ...toRefs(state)
      }
    }
  };
</script>
<style scoped>
  .relative {
    position: relative;
  }
  .absolute {
    position: absolute;
    left: 15px;
    right: 15px;
    bottom: 44px;
  }
  .size15 {
    font-size: 15px;
  }
  :deep .q-field__control {
      height: 34px !important;
      min-height: 34px !important;
  }
  :deep .q-field__native, .q-field__input {
    text-align: center;
  }
</style>
