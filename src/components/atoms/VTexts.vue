<template>
  <p :class="styledClasses" class="vTexts">
    <slot />
  </p>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    small: { type: Boolean },
    caution: { type: Boolean }
  },
  computed: {
    styledClasses(): string[] {
      const classes: string[] = []

      if (this.small) {
        classes.push('-small')
      }

      if (this.caution) {
        classes.push('-caution')
      }

      return classes
    }
  }
})
</script>

<style lang="scss" scoped>
.vTexts {
  white-space: pre-line;
  word-wrap: break-word;
  @include media-min {
    font-size: $fontSize-pc;
    line-height: $lineHeight-pc;
  }
  @include media-max {
    font-size: $fontSize-sp;
    line-height: $lineHeight-sp;
  }
}

.-caution {
  color: $color-caution;
}

.-small {
  @include media-min {
    font-size: 1.4rem;
    line-height: 1.6;
  }
  @include media-max {
    font-size: 1.3rem;
    line-height: 1.5;
  }
}
</style>
