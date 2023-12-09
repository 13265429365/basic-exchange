<template>
  <div class="row no-wrap">
    <menuBar></menuBar>
    <div class="calc">
      <div style="padding: 48px 100px;">
        <div class="text-weight-medium q-mb-lg" style="font-size: 28px;">
          Team Benefit
        </div>
        <!-- 头像 -->
        <div class="radius-8 q-pa-lg" style="border: 1px solid #DDDDDD;">
          <div class="row no-wrap items-center">
            <div class="row no-wrap items-center q-mr-xl">
              <q-avatar class="q-mr-md" style="width: 60px;height: 60px;">
                <q-img src="/images/default/head.png"></q-img>
              </q-avatar>
              <div>
                <div class="size16 text-weight-medium">Jessica</div>
                <div class="text-weight-medium text-primary" style="font-size: 17px;">+$2659</div>
              </div>
            </div>
            <div class="separation"></div>
            <div>
              <div class="size22 text-center text-weight-medium">26</div>
              <div class="text-color-6 text-center">邀请人数</div>
            </div>
            <div class="separation"></div>
            <div>
              <div class="size22 text-center text-weight-medium">26</div>
              <div class="text-color-6 text-center">邀请收益</div>
            </div>
            <div class="separation"></div>
            <div>
              <div class="size22 text-center text-weight-medium">696.23</div>
              <div class="text-color-6 text-center">购买总金额</div>
            </div>
            <div class="separation"></div>
            <div>
              <div class="size22 text-center text-weight-medium">9623.2</div>
              <div class="text-color-6 text-center">购买收益</div>
            </div>
            <div class="separation"></div>
            <div>
              <div class="size22 text-center text-weight-medium">26</div>
              <div class="text-color-6 text-center">利润总金额</div>
            </div>
            <div class="separation"></div>
            <div>
              <div class="size22 text-center text-weight-medium">26</div>
              <div class="text-color-6 text-center">利润收益</div>
            </div>
          </div>
        </div>
        <!-- 表格 -->
        <q-table class="q-mt-lg q-pa-lg no-shadow radius-8" bordered :rows="rows" :columns="columns" row-key="i" hide-bottom hide-header>
          <template v-slot:top>
            <div class="size20 text-weight-medium">Transactions</div>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td>
                <div class="size16">
                  {{ props.row.name }}
                </div>
              </q-td>
              <q-td>
                <div class="size16">
                  {{ props.row.calories }}
                </div>
              </q-td>
              <q-td>
                <div class="size16">
                  {{ props.row.fat }}
                </div>
              </q-td>
              <q-td class="row justify-between items-center">
                <div :class="['size16',{'text-primary':props.row.fat=='Recharge'}]">
                  {{ props.row.carbs }}
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import menuBar from 'src/components/pc/menu.vue';
  import { defineComponent, reactive, toRefs } from 'vue';
  import { useRouter } from 'vue-router';
  export default defineComponent({
    components: {
      menuBar,
    },
    name: 'teamView',
    setup() {
      const router = useRouter();
      let store = reactive({});
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
          name: '1',
          calories: '2023-11-08',
          fat: 'Withdrawal',
          carbs: '+236',
          i: 0,
        },
        {
          name: '2',
          calories: '2023-11-08',
          fat: 'Recharge',
          carbs: '+190',
          i: 1,
        },
        {
          name: '3',
          calories: '2023-11-08',
          fat: 'Withdrawal',
          carbs: '+236',
          i: 0,
        },
        {
          name: '4',
          calories: '2023-11-08',
          fat: 'Recharge',
          carbs: '+190',
          i: 1,
        },
      ]
      return {
        ...toRefs(store),
        columns,
        rows,
        to(url : string) {
          if (url) {
            router.push(url)
          }
        }
      }
    }
  });
</script>
<style lang="scss" scoped>
  .separation {
    width: 1px;
    background: #DDDDDD;
    height: 42px;
    margin: 0 27px;
  }
</style>
