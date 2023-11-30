<template>
  <div>
    <navBar height="49px"></navBar>
    <q-separator class="q-mt-sm q-mb-lg" color="grey-2" />
    <div>
      <div class="row justify-center">
        <div class="size24 text-weight-bold">Complete Your Profile</div>
      </div>
      <div class="row justify-center">
        <div class="relative logo">
          <q-img src="/images/default/head.png" :ratio="1" />
          <q-img class="head_edit" src="/images/default/head_edit.png" style="" />
        </div>
      </div>
      <div class="q-mt-lg q-px-lg">
        <q-form>
          <!-- <q-input color="grey-3" label-color="orange" outlined v-model="text" label="Label">
            <template v-slot:append>
              <q-icon name="event" color="orange" />
            </template>
          </q-input> -->
          <div>
            <div class="text-weight-bold q-mb-sm">Name</div>
            <q-input color="green" class="q-mb-md" filled v-model="Name" />
          </div>
          <div>
            <div class="text-weight-bold q-mb-sm">Gender</div>
            <q-select @update:modelValue="newValue($event)" v-model="Gender" :options="GenderList"
              class="q-mb-md q-mr-md full-width" filled>
            </q-select>
          </div>
          <div>
            <div class="text-weight-bold q-mb-sm">Birthday</div>
            <q-input @click="birthdayPopup=true" filled v-model="Birthday" mask="date" class="q-mb-lg">
              <template v-slot:append>
                <q-popup-proxy v-model="birthdayPopup">
                  <q-date v-model="Birthday">
                    <div class="row items-center justify-end">
                      <q-btn @click="birthdayPopup=false" no-caps label="confirm" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </template>
            </q-input>
            <!-- <q-input class="q-mb-md" v-model="date" filled type="date" /> -->
            <!-- <q-input color="green" class="q-mb-md" filled v-model="Birthday" /> -->
          </div>
          <!-- <div>
            <div class="text-weight-bold q-mb-sm">Phone Number</div>
            <div class="row no-wrap">
              <q-select @update:modelValue="newValue($event)" v-model="areaCode" :options="options"
                class="q-mb-md q-mr-md" filled>
                <template v-slot:prepend>
                  <q-img class="countryLogo" src="/images/default/china.png" @click.stop.prevent />
                </template>
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section avatar>
                      <q-img class="countryLogo" src="/images/default/china.png" @click.stop.prevent />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                      <q-item-label caption>{{ scope.opt.value }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
              <q-input class="q-mb-lg full-width" filled v-model="PhoneNumber" />
            </div>
          </div> -->
          <q-btn @click="toMypage()" class="full-width q-mb-xl" unelevated rounded no-caps style="height: 44px;"
            color="primary" label="Complete Profile" />
        </q-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  // import { useRouter } from 'vue-router';
  import navBar from 'src/components/navBar.vue';
  // 列表
  export default defineComponent({
    name: 'infoEdit',
    components: {
      navBar
    },
    setup() {
      // const router = useRouter();
      let store = reactive({
        toggle: false,
        options: [
          { label: '+86', value: '中国' },
          { label: '+866', value: '香港' },
        ],
        areaCode: '+86',
        GenderList: [
          { label: 'male' },
          { label: 'female' },
        ],
        // 表单数据
        Name: '',
        Gender: 'female',
        Birthday: '',
        PhoneNumber: '',
        //date选择器状态
        birthdayPopup: false,
      })
      return {
        ...toRefs(store),
        newValue(newValue:void) {
          console.log(newValue);
        }
      }
    }
  })
</script>

<style scoped>
  .relative {
    position: relative;
  }
  .head_edit {
    width: 27px;
    height: 27px;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 99;
  }
</style>
