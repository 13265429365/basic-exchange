<template>
    <div class="window-height">
        <div>digitalMarkets</div>
    </div>
</template>
  
<script lang="ts">
import { reactive, toRefs, defineComponent } from 'vue';

export default defineComponent({
    name: 'digitalMarketsIndex',
    setup() {
        const state = reactive({});

        return {
            ...toRefs(state),
        };
    },
});
</script>
  