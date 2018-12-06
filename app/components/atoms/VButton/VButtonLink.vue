<template>
  <router-link :to="to" class="btn" :class="appearanceClasses">
    <span>{{ label }}</span>
  </router-link>
</template>

<script>
import Presenter from './Presenter'
export default {
  mixins: [Presenter],
  props: {
    to: { type: [String, Object], required: true }
  }
}
</script>

<style lang="scss" scoped>
@import './style';
</style>
