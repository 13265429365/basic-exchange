<template>
  <div class="calc">
    <!-- 通用header(app.scss) -->
    <div class="pageHeader">
      My Team
    </div>

    <div class="maxWidth1200" style="min-width: 1160px;">
      <div>
        <!-- 总金额 -->
        <div class="page_bg q-pa-md radius-8 row no-wrap items-center" style="width: 220px;">
          <div class="text-primary text-weight-bold" style="font-size: 16px;">
            Team Benefit：$2659
          </div>
          <q-icon class="q-ml-sm" name="arrow_forward_ios"></q-icon>
        </div>

        <!-- 树级 -->
        <q-list class="rounded-borders team">
          <q-expansion-item v-for="(customize, customizeIndex) in customizeList" :key="customizeIndex" expand-icon-toggle
            hide-expand-icon v-model="customize.expanded">
            <!-- 第一级 -->
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar style="width: 40;height: 40px;">
                  <q-img :src="imageSrc('')"></q-img>
                </q-avatar>
              </q-item-section>
              <q-item-section style="justify-content:start">
                <div>{{ customize.name }}</div>
                <q-chip v-if="customize.lv" class="text-primary q-ml-lg"
                  style="background: rgba(1,172,102,0.1);font-size: 10px;">
                  {{ customize.lv }}
                </q-chip>
              </q-item-section>
              <q-item-section class="text-color-6" style="min-width: 215px;">
                {{ customize.date }}
              </q-item-section>
              <q-item-section class="text-primary" style="min-width: 215px;">
                {{ customize.money }}
              </q-item-section>
              <q-item-section style="justify-content:end;min-width: 215px;">
                <div v-if="customize.children.length > 0" @click="customize.expanded = !customize.expanded"
                  class="btn row justify-center items-center q-mr-sm cursor-pointer">
                  <div>下一级</div>
                  <q-icon class="q-ml-xs" :name="customize.expanded ? 'expand_less' : 'expand_more'"></q-icon>
                </div>
                <div @click="$router.push('/team/earnings/index')"
                  class="btn row justify-center items-center cursor-pointer">详情
                </div>
              </q-item-section>
            </template>

            <!-- 第二级 -->
            <q-expansion-item :header-inset-level="0.6" v-for="(child, childIndex) in customize.children"
              :key="childIndex" expand-icon-toggle hide-expand-icon v-model="child.expanded">
              <template v-slot:header>
                <q-item-section avatar>
                  <q-avatar style="width: 40;height: 40px;">
                    <q-img :src="imageSrc('')"></q-img>
                  </q-avatar>
                </q-item-section>
                <q-item-section style="justify-content:start">
                  <div>{{ child.name }}</div>
                  <q-chip v-if="child.lv" class="text-primary q-ml-lg"
                    style="background: rgba(1,172,102,0.1);font-size: 10px;">
                    {{ child.lv }}
                  </q-chip>
                </q-item-section>
                <q-item-section class="text-color-6" style="min-width: 215px;">
                  {{ child.date }}
                </q-item-section>
                <q-item-section class="text-primary" style="min-width: 215px;">
                  {{ child.money }}
                </q-item-section>
                <q-item-section style="min-width: 215px;justify-content:end">
                  <div v-if="child.children.length > 0" @click="child.expanded = !child.expanded"
                    class="btn row justify-center items-center q-mr-sm cursor-pointer">
                    <div>下一级</div>
                    <q-icon class="q-ml-xs" :name="child.expanded ? 'expand_less' : 'expand_more'"></q-icon>
                  </div>
                  <div @click="$router.push('/team/earnings/index')"
                    class="btn row justify-center items-center cursor-pointer">
                    详情</div>
                </q-item-section>
              </template>

              <!-- 第三级 -->
              <q-expansion-item :header-inset-level="1.2" v-for="(grandson, grandsonIndex) in child.children"
                :key="grandsonIndex" expand-icon-toggle hide-expand-icon v-model="child.expanded">
                <template v-slot:header>
                  <q-item-section avatar>
                    <q-avatar style="width: 40;height: 40px;">
                      <q-img :src="imageSrc('')"></q-img>
                    </q-avatar>
                  </q-item-section>
                  <q-item-section style="justify-content:start">
                    <div>{{ grandson.name }}</div>
                    <q-chip v-if="grandson.lv" class="text-primary q-ml-lg"
                      style="background: rgba(1,172,102,0.1);font-size: 10px;">
                      {{ grandson.lv }}
                    </q-chip>
                  </q-item-section>
                  <q-item-section class="text-color-6" style="min-width: 215px;">
                    {{ grandson.date }}
                  </q-item-section>
                  <q-item-section class="text-primary" style="min-width: 215px;">
                    {{ grandson.money }}
                  </q-item-section>
                  <q-item-section style="min-width: 215px;justify-content:end">
                    <div @click="$router.push('/team/earnings/index')"
                      class="btn row justify-center items-center cursor-pointer">详情</div>
                  </q-item-section>
                </template>
              </q-expansion-item>
            </q-expansion-item>
          </q-expansion-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { imageSrc } from 'src/utils/index'

export default defineComponent({
  name: 'teamIndex',
  setup() {
    const $router = useRouter();

    let state = reactive({
      customizeList: [] as any,
    });

    state.customizeList = [
      {
        img: 'avatar',
        name: 'Carla Schoen',
        date: '2023-11-03 12:30',
        money: '+150',
        expanded: false,
        children: [],
      },
      {
        img: 'avatar',
        name: 'Carla Schoen',
        date: '2023-11-03 12:30',
        money: '+236',
        expanded: false,
        children: [
          {
            img: 'avatar',
            name: 'Carla Schoen',
            date: '2023-11-05 12:30',
            money: '+200',
            expanded: false,
            children: [
              {
                img: 'avatar',
                name: 'Carla Schoen',
                date: '2023-11-03 12:30',
                money: '+150',
                expanded: false,
                lv: 'LV3',
                children: [],
              },
              {
                img: 'avatar',
                name: 'Carla Schoen',
                date: '2023-11-03 12:30',
                money: '+150',
                expanded: false,
                lv: 'LV2',
                children: [],
              },
            ],
          },
        ],
      },
      {
        img: 'avatar',
        name: 'Carla Schoen',
        date: '2023-11-03 12:30',
        money: '+150',
        expanded: false,
        children: [],
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
.btn {
  height: 24px;
  border-radius: 12px 12px 12px 12px;
  border: 1px solid #666666;
  color: #666;
  padding: 2px 10px;
}

:deep .team .q-item .q-item__section {
  flex-direction: row;
  align-items: center;
}

:deep .team .q-item {
  border-bottom: 1px solid #DDDDDD;
  padding: 20px 3px;
}

:deep .team .q-expansion-item .q-expansion-item__content {
  background: #F9F9F9;
}
</style>
