<template>
  <label :for="htmlFor || false" class="vLabel">
    <slot />
  </label>
</template>

<script lang="ts">
import * as tsx from 'vue-tsx-support'
import Vue, { CreateElement, VNode } from 'vue'

export default tsx.componentFactory.create({
  props: {
    htmlFor: { type: String }
  }
})
</script>

<style lang="scss" scoped>
.vLabel {
  font-weight: bold;
  cursor: default;

  @include media-min {
    font-size: $fontSize-pc;
  }

  @include media-max {
    font-size: $fontSize-sp;
  }
}

.vLabel[for] {
  cursor: pointer;
}
</style>
