<template>
    <div class="window-height">
        <div>foreMarkets</div>
    </div>
</template>
  
<script lang="ts">
import { reactive, toRefs, defineComponent } from 'vue';

export default defineComponent({
    name: 'foreMarketsIndex',
    setup() {
        const state = reactive({});

        return {
            ...toRefs(state),
        };
    },
});
</script>
  