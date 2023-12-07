<script setup lang="ts">
import { ref } from 'vue';
import { VueCountUp } from './components/index'
const value = ref(1000.134)
const countValue = ref(0)

const setCountValue = () => {
  countValue.value = value.value
}

</script>

<template>
  <div>
    <input v-model="value" />
    <div>
      <button @click="setCountValue">切换数字</button>
    </div>
    <VueCountUp :endVal="countValue" :isAutoDecimalPlaces="true" />
  </div>
</template>