<template>
  <transition name="fade">
    <slot />
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s $easing;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
