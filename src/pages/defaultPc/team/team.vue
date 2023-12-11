<template>
  <div class="row no-wrap">
    <menuBar></menuBar>
    <div class="calc">
      <!-- 通用header(app.scss) -->
      <div class="pageHeader">
        My Team
      </div>
      <div style="padding: 48px 100px;">
        <div class="page_bg q-pa-md radius-8 row items-center" style="width: 220px;">
          <div class="text-primary size16 text-weight-bold">
            Team Benefit：$2659
          </div>
          <q-icon class="q-ml-sm" name="arrow_forward_ios"></q-icon>
        </div>
        <q-list class="rounded-borders team">
          <q-expansion-item v-for="(item,i) in customize" :key="i" expand-icon-toggle hide-expand-icon v-model="item.expanded">
            <template  v-slot:header>
              <q-item-section avatar>
                <q-avatar style="width: 40;height: 40px;">
                  <q-img :src="`/images/default/${item.img}.png`"></q-img>
                </q-avatar>
              </q-item-section>
              <q-item-section style="justify-content:start">
                <div>{{item.name}}</div>
                <q-chip v-if="item.lv" class="text-primary q-ml-lg" style="background: rgba(1,172,102,0.1);font-size: 10px;">
                  {{item.lv}}
                </q-chip>
              </q-item-section>
              <q-item-section class="text-color-6" style="min-width: 215px;">
                {{item.date}}
              </q-item-section>
              <q-item-section class="text-primary" style="min-width: 215px;">
                {{item.money}}
              </q-item-section>
              <q-item-section style="justify-content:end;min-width: 215px;">
                <div v-if="item.children.length>0" @click="item.expanded = !item.expanded" class="btn row justify-center items-center q-mr-sm cursor-pointer">
                  <div>下一级</div>
                  <q-icon class="q-ml-xs" :name="item.expanded?'expand_less':'expand_more'"></q-icon>
                </div>
                <div @click="to('/benefit')" class="btn row justify-center items-center cursor-pointer">详情</div>
              </q-item-section>
            </template>
            <!-- 第二级 -->
            <q-expansion-item header-inset-level="0.6" v-for="(str,s) in item.children" :key="s" expand-icon-toggle hide-expand-icon v-model="str.expanded">
              <template  v-slot:header>
                <q-item-section avatar>
                  <q-avatar style="width: 40;height: 40px;">
                    <q-img :src="`/images/default/${str.img}.png`"></q-img>
                  </q-avatar>
                </q-item-section>
                <q-item-section style="justify-content:start">
                  <div>{{str.name}}</div>
                  <q-chip v-if="str.lv" class="text-primary q-ml-lg" style="background: rgba(1,172,102,0.1);font-size: 10px;">
                    {{str.lv}}
                  </q-chip>
                </q-item-section>
                <q-item-section class="text-color-6" style="min-width: 215px;">
                  {{str.date}}
                </q-item-section>
                <q-item-section class="text-primary" style="min-width: 215px;">
                  {{str.money}}
                </q-item-section>
                <q-item-section style="min-width: 215px;justify-content:end">
                  <div v-if="str.children.length>0" @click="str.expanded = !str.expanded" class="btn row justify-center items-center q-mr-sm cursor-pointer">
                    <div>下一级</div>
                    <q-icon class="q-ml-xs" :name="str.expanded?'expand_less':'expand_more'"></q-icon>
                  </div>
                  <div @click="to('/benefit')" class="btn row justify-center items-center cursor-pointer">详情</div>
                </q-item-section>
              </template>
              <!-- 第三级 -->
              <q-expansion-item header-inset-level="1.2" v-for="(el,e) in str.children" :key="e" expand-icon-toggle hide-expand-icon v-model="str.expanded">
                <template  v-slot:header>
                  <q-item-section avatar>
                    <q-avatar style="width: 40;height: 40px;">
                      <q-img :src="`/images/default/${el.img}.png`"></q-img>
                    </q-avatar>
                  </q-item-section>
                  <q-item-section style="justify-content:start">
                    <div>{{el.name}}</div>
                    <q-chip v-if="el.lv" class="text-primary q-ml-lg" style="background: rgba(1,172,102,0.1);font-size: 10px;">
                      {{el.lv}}
                    </q-chip>
                  </q-item-section>
                  <q-item-section class="text-color-6" style="min-width: 215px;">
                    {{el.date}}
                  </q-item-section>
                  <q-item-section class="text-primary" style="min-width: 215px;">
                    {{el.money}}
                  </q-item-section>
                  <q-item-section style="min-width: 215px;justify-content:end">
                    <div @click="to('/benefit')" class="btn row justify-center items-center cursor-pointer">详情</div>
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
      let store = reactive({
        customize: [
          {
            img: 'head',
            name: 'Carla Schoen',
            date: '2023-11-03 12:30',
            money: '+150',
            expanded: false,
            children: [],
          },
          {
            img: '/pc/avatar',
            name: 'Carla Schoen',
            date: '2023-11-03 12:30',
            money: '+236',
            expanded: false,
            children: [
              {
                img: 'head',
                name: 'Carla Schoen',
                date: '2023-11-05 12:30',
                money: '+200',
                expanded: false,
                children: [
                  {
                    img: '/pc/avatar',
                    name: 'Carla Schoen',
                    date: '2023-11-03 12:30',
                    money: '+150',
                    expanded: false,
                    lv: 'LV3',
                    children: [],
                  },
                  {
                    img: 'head',
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
            img: '/pc/avatar',
            name: 'Carla Schoen',
            date: '2023-11-03 12:30',
            money: '+150',
            expanded: false,
            children: [],
          },
        ],
      });
      return {
        ...toRefs(store),
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
