<template>
  <div class="column full-height">
    <navBar title="success"></navBar>
    <div class="col bg-white  q-pa-md column items-center justify-between">
      <div class="column items-center ">
        <q-img :src="params.logo" width="70px" height="70px" style="margin-top: 80px;" />
        <div class="text-color-3 text-h6 text-weight-medium q-mt-md">{{ params.title }}</div>
        <div class="text-color-9 text-body2 text-center q-mt-sm" style="width: 216px;">{{ params.content }}</div>
      </div>
      <q-btn unelevated rounded color="primary" label="OK" class="full-width q-my-xl" no-caps @click="backFunc" />
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import navBar from 'src/components/navBar.vue';

export default {
  name: 'showMessage',
  components: { navBar },
  setup() {
    const router = useRouter();

    const state = reactive({
      params: {
        title: 'success',
        content: '',
        yesBtn: 'OK',
        logo: '/images/default/success.png',
        backUrl: ''
      }
    });
    const backFunc = () => {
      state.params.backUrl === '' ? router.back() : router.push(state.params.backUrl);
    };
    onMounted(() => {
      if (history.state.params) state.params = JSON.parse(history.state.params)
    })
    return {
      ...toRefs(state), backFunc
    }
  }
};
</script>
