<template>
  <button class="btn" :class="appearanceClasses" @click="$emit('click')">
    <span>{{ label }}</span>
  </button>
</template>

<script>
import Presenter from './Presenter'

export default {
  mixins: [Presenter]
}
</script>

<style lang="scss" scoped>
@import './style';
</style>
