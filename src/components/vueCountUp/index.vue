<script setup lang="ts">
import { onMounted, watch, ref, withDefaults, reactive } from "vue";
import { CountUp, type CountUpOptions } from 'countup.js'
import { parseDecimal } from "./utils.ts"

defineOptions({
    name: 'VueCountUp'
})

export type CountUpProps = {
    // 最后的值
    endVal: number;
    // 配置
    options?: CountUpOptions;
    // 是否自动计算小数位数
    isAutoDecimalPlaces?: boolean
}

const props = withDefaults(defineProps<CountUpProps>(), {
    isAutoDecimalPlaces: false,
});
const { endVal, isAutoDecimalPlaces } = props;
const countRef = ref<HTMLSpanElement | null>();
const countUpRef = ref();
const state = reactive({
    endVal: 0,
    startVal: 0,
})

const startCount = (value: number, startVal: number, options: CountUpOptions) => {
    const decimalPlaces = isAutoDecimalPlaces ? parseDecimal(value) : 0;
    countUpRef.value = new CountUp(countRef.value!, value, { ...options, decimalPlaces, startVal });
    countUpRef.value.start();
}


onMounted(() => {
    if (countRef.value) {
        startCount(endVal, 0, {})
        state.endVal = endVal
    }
});

watch(
    () => props.endVal,
    (newVal, oldVal) => {
        startCount(newVal, oldVal, {})
        state.endVal = newVal;
        state.startVal = oldVal;
    },
);

watch(
    () => props.options,
    (newVal) => {
        startCount(state.endVal, state.startVal, newVal!)
    },
);


</script>

<template>
    <span ref="countRef"></span>
</template>
