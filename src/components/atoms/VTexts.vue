<template>
  <p :class="styledClasses" class="vTexts">
    <slot />
  </p>
</template>

<script>
export default {
  props: {
    caution: { type: Boolean },
    small: { type: Boolean }
  },
  computed: {
    styledClasses() {
      const classes = []

      if (this.caution) {
        classes.push('-caution')
      }

      if (this.small) {
        classes.push('-small')
      }

      return classes
    }
  }
}
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
