<template>
  <div class="spin-content" v-if="show">
    <div class="loader">
      <div class="loader-outter"></div>
      <div class="loader-inner"></div>
      <div class="loader-text">Loading...</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Loading extends Vue {
  @Prop()
  show: boolean
}
</script>
<style lang="less">
.spin-content {
  margin: 0 auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  .loader {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
  }
  .loader-outter {
    position: absolute;
    border: 4px solid #3d4967;
    border-left-color: transparent;
    border-bottom: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    -webkit-animation: loader-outter 1s cubic-bezier(0.42, 0.61, 0.58, 0.41)
      infinite;
    animation: loader-outter 1s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite;
  }
  .loader-inner {
    position: absolute;
    border: 4px solid #ffb74e;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    left: calc(50% - 20px);
    top: calc(50% - 20px);
    border-right: 0;
    border-top-color: transparent;
    -webkit-animation: loader-inner 1s cubic-bezier(0.42, 0.61, 0.58, 0.41)
      infinite;
    animation: loader-inner 1s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite;
  }
  .loader-text {
    color: #666;
    position: absolute;
    bottom: -30px;
    width: 60px;
    text-align: center;
  }
}

@keyframes loader-outter {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes loader-inner {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
</style>
