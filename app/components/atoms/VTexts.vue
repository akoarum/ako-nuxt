<template>
  <p :class="appearanceClasses" class="texts">{{ text }}</p>
</template>

<script>
export default {
  props: {
    text: { type: String, required: true },
    error: { type: Boolean }
  },
  computed: {
    appearanceClasses() {
      const classes = []

      if (this.error) {
        classes.push('-error')
      }

      return classes
    }
  }
}
</script>

<style lang="scss" scoped>
.texts {
  white-space: pre-wrap;

  &.-error {
    color: $color-caution;
  }

  @media screen and (min-width: 768px) {
    font-size: $fontSize-base;
    line-height: $lineHeight-base;
  }
  @media screen and (max-width: 767px) {
    font-size: $fontSize-sp;
    line-height: $lineHeight-sp;
  }
}
</style>
