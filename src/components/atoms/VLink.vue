<template>
  <a class="vLink">
    <VCaret class="vLink__arrow" />
    <slot />
  </a>
</template>

<script lang="ts">
import Vue from 'vue'
import { VCaret } from '~/components/icons'

export default Vue.extend({
  components: { VCaret }
})
</script>

<style lang="scss" scoped>
.vLink {
  position: relative;
  display: inline-block;
  text-decoration: none;

  @include media-min {
    padding-left: 12px;
    font-size: $fontSize-pc;
  }

  @include media-max {
    padding-left: 12px;
    font-size: $fontSize-sp;
  }
}
.vLink__arrow {
  position: absolute;
  left: 0;

  @include media-min {
    top: 0.35em;
  }

  @include media-max {
    top: 0.3em;
  }
}
</style>
