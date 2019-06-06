<template>
  <div :style="styled" class="vContainer">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    maxWidth: { type: String }
  },
  computed: {
    styled(): { [index: string]: string } {
      const style = {}

      if (this.maxWidth) {
        style['--maxWidth'] = this.maxWidth
      }

      return style
    }
  }
})
</script>

<style lang="scss" scoped>
.vContainer {
  --maxWidth: 1024px;
  box-sizing: border-box;
  background: #fff;

  @include media-min {
    padding: 28px 16px 30px;
    max-width: var(--maxWidth);
  }

  @include media-max {
    padding: 28px 12px 30px;
  }
}
</style>
