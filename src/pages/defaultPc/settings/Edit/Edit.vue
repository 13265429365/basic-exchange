<template>
  <q-dialog v-model="Show">
    <q-card style="width: 380px;">
      <q-card-section style="padding: 20px;">
        <div class="row no-wrap">
          <div class="text-weight-bold text-color-3 size20">
            {{form.arguments}}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </div>
        <div class="q-mt-lg">
          <q-form>
            <div class="q-mb-xs">Nickname</div>
            <q-input standout class="q-mb-md" v-model="form.content" placeholder="Email">
            </q-input>
            <div class="row justify-center q-mt-lg">
              <q-btn class="q-mr-md text-color-3" unelevated rounded no-caps @click="Show=false" style="background: #F3F5F5;height: 40px;width: 160px;" label="Cancel"></q-btn>
              <q-btn @click="Show=false" class="" unelevated rounded no-caps style="height: 40px;width: 160px;"
                color="primary" label="Save" />
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
// 因为自动加载路由问题。 第一次会获取不到页面跳转到404页面，未修复
export default defineComponent({
  name: 'settingsView',
  setup() {
    let store = reactive({
      Show: false,
      isPwd: false,
      form: {
        content: '',
        arguments: 'Edit',
      },
    });
    let showEdit = (row:{content: string, arguments: string}) =>{
      console.log(row);
      store.form = row
      store.Show = true
    }
    return {
      ...toRefs(store),
      showEdit,
    }
  },
});
</script>
<style lang="scss" scoped>
  // 下拉选框样式
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
  // pc版input样式
  :deep .q-field--standout .q-field__native {
    color: rgba(0, 0, 0, 0.87) !important;
  }

  :deep .q-field--standout .q-field__prefix {
    color: rgba(0, 0, 0, 0.87) !important;
  }

  :deep .q-field--standout .q-field__append {
    color: rgba(0, 0, 0, 0.54) !important;
  }
  :deep .q-field__marginal {
    height: 40px !important;
  }
  :deep .q-field--standout:before {
    background: #fff !important;
  }
  :deep .q-field--standout .q-field__control {
    background: #fff !important;
    height: 40px !important;
    min-height: 40px !important;
    outline: none !important;
    border: 1px solid #DDDDDD;
    box-shadow: none !important;
    border-radius: 4px;
  }
  :deep .q-field--highlighted .q-field__control {
    background: #fff !important;
    box-shadow: none !important;
  }
</style>
