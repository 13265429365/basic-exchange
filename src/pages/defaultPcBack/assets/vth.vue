<template>
  <div class="row no-wrap">
    <menuBar></menuBar>
    <div class="calc">
      <div style="padding: 48px 100px;">
        <!-- 钱包余额 -->
        <div class="background row items-center justify-between radius-8 q-pa-lg q-pr-xl">
          <div class="row">
            <q-img class="q-mr-lg" src="/images/pc/assets/btc.png" width="66px" height="66px"></q-img>
            <div class="q-pt-sm">
              <div class="row items-center">
                <div class="text-white text-h6 q-mr-xs">VTH</div>
                <q-img @click="moneyShow=!moneyShow" class="cursor-pointer"
                  :src="`/images/pc/wallet/${moneyShow?'show':'noShow'}.png`" width="14px" height="14px"></q-img>
              </div>
              <div class="text-h5 text-white text-weight-bold">{{moneyShow?'$8,692.000':'****'}}</div>
            </div>
          </div>
          <!-- btn -->
          <div class="row">
            <q-btn @click="to('/recharge')" class="text-primary bg-white no-shadow" rounded no-caps label="Recharge"></q-btn>
            <q-btn @click="to('/withdrawal')" class="text-primary bg-white no-shadow q-ml-md" rounded no-caps label="Withdrawal"></q-btn>
          </div>
        </div>
        <!-- 表格 horizontal -->
        <q-table class="q-mt-lg no-shadow" bordered :rows="rows" :columns="columns" row-key="i" hide-header>
          <template v-slot:top>
            <q-tabs v-model="tab" narrow-indicator class="q-mb-lg">
              <q-tab class="text-primary q-pa-none" style="justify-content: flex-start !important;" name="Transactions"
                label="Transactions" />
              <q-tab class="text-primary q-pa-none" style="justify-content: flex-start !important;" name="Bill Detail"
                label="Bill Detail" />
            </q-tabs>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td>
                {{ props.row.name }}
              </q-td>
              <q-td>
                {{ props.row.calories }}
              </q-td>
              <q-td>
                {{ props.row.fat }}
              </q-td>
              <q-td class="row justify-between items-center">
                <div :class="[{'text-primary':props.row.carbs=='examine'},{'text-red':props.row.carbs=='fail'}]">
                  {{ props.row.carbs }}
                </div>
                <div v-if="props.row.carbs=='fail'">
                  <q-icon @click="props.expand = !props.expand" class="cursor-pointer"
                    :name="props.expand ? 'expand_less' : 'expand_more'" />
                </div>
              </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
              <q-td colspan="100%">
                <div class="text-left text-red">fail reasons，fail reasons fail reasons</div>
              </q-td>
            </q-tr>
          </template>
          <template v-slot:bottom>
            <div class="q-pa-md row items-center no-wrap">
              <div class="text-color-9 q-mr-md">
                共{{ pagination.rowsNumber }}条,
                {{ pagination.rowsPerPage }}条/页
              </div>
              <q-pagination v-model="pagination.page" :max="pages" :max-pages="5" ellipsess :direction-links="true"
                @input="changePagination($event)" active-color="#fff" class="pagination">
              </q-pagination>
              <div class="row nowrap">
                <div class="to">跳至</div>
                <q-input standout v-model="toPage" @keyup.enter="refreshTableData" suffix="页"
                  style="width: 50px;mi-height: 28px;"></q-input>
              </div>
            </div>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import menuBar from 'src/layouts/desktop/settingLayouts.vue';
  import { defineComponent, reactive, toRefs, ref } from 'vue';
  import { useRouter } from 'vue-router';
  export default defineComponent({
    components: {
      menuBar,
    },
    name: 'walletView',
    setup() {
      const router = useRouter();
      let store = reactive({
        tab: 'Transactions',
        // 是否显示余额
        moneyShow: true,
        //
        content: '',
        imgUrl: '',
        pages: 1, // 数据总页数
        toPage: 1, // 跳转至
        pagination: {
          rowsPerPage: 2,
          rowsNumber: 2,
          page: 1,
        },
      });
      const columns = [
        {
          name: 'name',
          required: true,
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'calories', align: 'center', field: 'calories', sortable: true },
        { name: 'fat', field: 'fat', sortable: true },
        { name: 'carbs', field: 'carbs' },
      ]

      const rows = [
        {
          name: '2023-11-08',
          calories: 'Recharge-VTH',
          fat: '+$26.623',
          carbs: 'fail',
          i: 0,
        },
        {
          name: '2023-11-08',
          calories: 'Recharge-VTH',
          fat: '+$26.623',
          carbs: 'fail',
          i: 1,
        },
      ]
      return {
        ...toRefs(store),
        columns,
        rows,
        changePagination(val:number) {
          console.log(`changePagination: ${val}`)
          store.pagination.page = val
        },
        refreshTableData() {
          console.log(store.toPage);
          if (store.toPage <= store.pagination.page) {
            store.pagination.page = parseInt(store.toPage)
          }
        },
        to(url:string) {
          if (url) {
            router.push(url)
          }
        }
      }
    }
  });
</script>
<style lang="scss" scoped>
  :deep .q-table {
    padding-left: 39px;
  }

  :deep .q-table td {
    font-size: 16px;
  }

  :deep .q-table__card .q-table__bottom {
    justify-content: center;
    border-top: 0;
  }

  .q-tab {
    text-transform: capitalize;
    flex: 0 1 auto !important;
    margin-right: 40px;
  }

  :deep .q-tab .q-tab__label {
    color: #666;
    font-size: 20px;
  }

  :deep .q-tab--active .q-tab__label {
    color: #333 !important;
    font-weight: bold;
  }

  :deep .q-tab .q-tab__indicator {
    width: 47px;
    height: 4px;
    border-radius: 3px;
    left: 50%;
    transform: translateX(-50%) !important;
  }

  .q-btn {
    width: 100px;
    height: 34px;
  }

  .q-btn::before {
    box-shadow: none;
  }

  .background {
    background: linear-gradient(93deg, #10BE70 0%, #91DB82 100%);
  }

  // pc版input样式
  :deep .q-field--standout .q-field__native {
    color: rgba(0, 0, 0, 0.87) !important;
  }
  :deep .q-field--standout .q-field__suffix {
    color: #DDDDDD;
    line-height: 28px;
    flex-wrap: nowrap;
  }
  :deep .q-field--standout .q-field__control {
    padding: 0 6px;
    background: #fff !important;
    height: 28px !important;
    min-height: 28px !important;
    outline: none !important;
    border: 1px solid #DDDDDD;
    box-shadow: none !important;
    border-radius: 0 4px 4px 0;
  }
  // 分页样式
  :deep .q-pagination .q-btn {
    width: 28px;
    height: 28px;
    padding: 0 !important;
    border: 1px solid #DDDDDD;
    margin-right: 3px;
    color: #333333 !important;

  }
  :deep .q-pagination .q-btn--standard:before {
    background: #fff;
    border: 1px solid #01AC66;
    box-shadow: none;

  }
  .to {
    height: 28px;
    padding: 6px 11px;
    border-radius: 4px 0 0 4px;
    border: 1px solid #DDDDDD;
  }
</style>
