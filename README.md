# 如何使用vue-countup-v3 ？
## 1.安装
```
npm i @dm0104x/vue-countup-v3
```
## 2.引入
```
import VueCountUp from '@dm0104x/vue-countup-v3'
```
## 3.使用
```
<VueCountUp :endVal="endVal" :isAutoDecimalPlaces='0' :options="options"></VueCountUp>
```
## 4.参数
```
endVal:目标值
options:配置项
isAutoDecimalPlaces:是否自动计算小数位数
```
## 5.配置项
```
{
    startVal: 0, // 开始值
    decimalPlaces: 0, // 小数位数
    duration: 2, // 动画持续时间
    useEasing: true, // 是否使用缓和效果
    useGrouping: true, // 是否使用分组
    smartEasingThreshold: 999, // 动画阈值
    smartEasingAmount: 333, // 动画阈值
    separator: ',', // 分隔符
    decimal: '.', // 小数点
    prefix: '', // 前缀
    suffix: '' // 后缀
}
```
## 6.完整示例
```
<template>
  <div id="app">
    <VueCountUp :endVal="endVal" :options="options"></VueCountUp>
  </div>
</template>
```