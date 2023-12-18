<template>
  <div class="calc">
    <div style="padding: 48px 100px;">
      <div class="text-weight-medium q-mb-lg" style="font-size: 28px;">
        Team Benefit
      </div>
      <!-- 头像 -->
      <div class="radius-8 q-pa-lg" style="border: 1px solid #DDDDDD;">
        <q-scroll-area style="max-width: 942px;height: 60px;">
          <div class="row no-wrap items-center">
            <div class="row no-wrap items-center q-mr-xl">
              <q-avatar class="q-mr-md" style="width: 60px;height: 60px;">
                <q-img :src="imageSrc('')"></q-img>
              </q-avatar>
              <div>
                <div class="text-h6 text-weight-medium">Jessica</div>
                <div class="text-weight-medium text-primary" style="font-size: 17px;">+$2659</div>
              </div>
            </div>
            <div class="separation"></div>
            <div>
              <div class="text-h5 text-center text-weight-medium noWrap">26</div>
              <div class="text-color-6 text-center noWrap">邀请人数</div>
            </div>
            <div class="separation"></div>
            <div>
              <div class="text-h5 text-center text-weight-medium noWrap">26</div>
              <div class="text-color-6 text-center noWrap">邀请收益</div>
            </div>
            <div class="separation"></div>
            <div>
              <div class="text-h5 text-center text-weight-medium noWrap">696.23</div>
              <div class="text-color-6 text-center noWrap">购买总金额</div>
            </div>
            <div class="separation"></div>
            <div>
              <div class="text-h5 text-center text-weight-medium noWrap">9623.2</div>
              <div class="text-color-6 text-center noWrap">购买收益</div>
            </div>
            <div class="separation"></div>
            <div>
              <div class="text-h5 text-center text-weight-medium noWrap">26</div>
              <div class="text-color-6 text-center noWrap">利润总金额</div>
            </div>
            <div class="separation"></div>
            <div>
              <div class="text-h5 text-center text-weight-medium noWrap">26</div>
              <div class="text-color-6 text-center noWrap">利润收益</div>
            </div>
          </div>
        </q-scroll-area>
      </div>


      <!-- 表格 -->
      <q-table class="q-mt-lg q-pa-lg no-shadow radius-8" bordered :rows="rows" :columns="columns" row-key="i" hide-bottom
        hide-header>
        <template v-slot:top>
          <div class="text-h5 text-weight-medium">Transactions</div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td>
              <div class="text-body1">
                {{ props.row.name }}
              </div>
            </q-td>
            <q-td>
              <div class="text-body1">
                {{ props.row.calories }}
              </div>
            </q-td>
            <q-td>
              <div class="text-body1">
                {{ props.row.fat }}
              </div>
            </q-td>
            <q-td class="row justify-between items-center">
              <div :class="['text-body1', { 'text-primary': props.row.fat == 'Recharge' }]">
                {{ props.row.carbs }}
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { imageSrc } from 'src/utils/index';

export default defineComponent({
  name: 'benefitIndex',
  setup() {
    const $router = useRouter();
    let state = reactive({
      // table数据
      columns: [] as any,
      rows: [] as any,
    });
    state.columns = [
      {
        name: 'name',
        required: true,
        align: 'left',
        sortable: true
      },
      { name: 'calories', align: 'center', field: 'calories', sortable: true },
      { name: 'fat', field: 'fat', sortable: true },
      { name: 'carbs', field: 'carbs' },
    ]

    state.rows = [
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
      imageSrc,
      ...toRefs(state),
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

.noWrap {
  white-space: nowrap;
}
</style>
