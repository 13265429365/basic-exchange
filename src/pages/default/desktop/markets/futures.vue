<template>
    <div class="window-height">
        <div>FuturesMarkets</div>
    </div>
</template>
  
<script lang="ts">
import { reactive, toRefs, defineComponent } from 'vue';

export default defineComponent({
    name: 'FuturesMarketsIndex',
    setup() {
        const state = reactive({});

        return {
            ...toRefs(state),
        };
    },
});
</script>
  