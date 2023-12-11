<template>
  <div>
    <div class="page_bg full-width row justify-between q-px-md" style="border-radius: 10px;height: 55px;"
      @click="dialog = true">
      <div class="self-center row">
        <q-img :src="list[value].image" width="26px" height="26px" />
        <div class="self-center q-ml-sm">{{ list[value].value }}</div>
      </div>
      <q-img class="self-center" src="page_bg/chevron.png" width="24px" height="24px" />
    </div>
  </div>

  <q-dialog v-model="dialog" position="bottom">
    <q-card style="width: 100%">
      <div v-for="(i, index) in list" :key="index" class="row q-pa-sm">
        <q-img class="self-center" :src="i.image" width="26px" height="26px" />
        <div class="q-ml-sm self-center">{{ i.value }}</div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';
export default {
  name: 'dialogAlert',
  props: {
    value: {
      type: Number,
      default: () => {
        return 0
      },
    },
    list: {
      type: Array,
      default: () => {
        return [
          {
            image: '/images/delete/USDT.png',
            value: 'USDT'
          }, {
            image: '/images/delete/BTC.png',
            value: 'BTC'
          },
        ];
      },
    },
  },
  setup(props, context) {
    const state = reactive({
      dialog: false
    });

    const changedialogAlert = () => {
      context.emit('eventDialogAlert', false);
    };
    const changedialogAlertYesBtn = () => {
      context.emit('eventDialogAlertYesBtn', false);
    };
    onMounted(() => {
      // console.log(scrollAreaRef);
    });

    return {
      ...toRefs(state),
      changedialogAlert,
      changedialogAlertYesBtn,
    };
  },
};
</script>

<style scoped>
.xxImg {
  position: absolute;
  right: 2px;
  top: 28%;
  transform: translateY(-50%);
}
</style>
