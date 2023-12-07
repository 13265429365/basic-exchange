<template>
  <div>
    <navBar height="49px"></navBar>
    <q-separator class="q-mt-sm q-mb-lg" color="grey-2" />
    <div>
      <div class="row justify-center q-mb-sm">
        <div class="size24 text-weight-bold">Bind Phone Number</div>
      </div>
      <div class="row justify-center q-px-lg">
        Please enter your valid phone number. We will send you 4-digit code to verify account.
      </div>
      <div class="q-mt-lg q-px-lg">
        <q-form>
          <div class="row no-wrap">
            <q-select @update:modelValue="newValue($event)" v-model="areaCode" :options="options"
              class="q-mb-md q-mr-sm select" standout>
              <template v-slot:prepend>
                <q-img class="countryLogo" src="/images/default/china.png" @click.stop.prevent />
                <q-icon name="keyboard_arrow_down" />
              </template>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <q-img class="countryLogo" src="/images/default/china.png" @click.stop.prevent />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                    <!-- <q-item-label caption>{{ scope.opt.value }}</q-item-label> -->
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:append>
                <div>+86</div>
              </template>
            </q-select>
            <q-input placeholder="Enter phone number" class="q-mb-lg full-width" standout v-model="PhoneNumber" />
          </div>
          <q-btn @click="toVerifyt()" class="full-width q-mb-xl" unelevated rounded no-caps style="height: 44px;"
            color="primary" label="Send Code" />
        </q-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  import { useRouter } from 'vue-router';
  import navBar from 'src/components/mobile/navBar.vue';
  // 列表
  export default defineComponent({
    name: 'phoneAuthentication',
    components: {
      navBar
    },
    setup() {
      const router = useRouter();
      let store = reactive({
        toggle: false,
        options: [
          { label: '+86', value: '中国' },
          { label: '+866', value: '香港' },
        ],
        areaCode: '+86',
        // 表单数据
        PhoneNumber: '',
      })
      return {
        ...toRefs(store),
        newValue(newValue:void) {
          console.log(newValue);
        },
        toVerifyt() {
          router.push('verifyt')
        },
      }
    }
  })
</script>

<style scoped>
  :deep .q-select .q-field__control:hover:before {
    opacity: 0;
  }
  :deep .q-select .q-field__prepend {
    padding-right: 0;
    color: #8F959E;
  }
  :deep .q-select  .q-field__append {
    padding-left: 4px;
    font-size: 15px;
    color: #8F959E;
  }
  :deep .q-select .q-field__native {
    display: none;
  }
  :deep .q-select  .q-field__append .q-icon {
    display: none;
  }
</style>
