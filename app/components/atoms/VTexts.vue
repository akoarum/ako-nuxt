<template>
  <p class="texts">{{ text }}</p>
</template>

<script>
export default {
  props: {
    text: { type: String, required: true }
  }
}
</script>

<style lang="scss" scoped>
.texts {
  white-space: pre-wrap;

  @media screen and (min-width: 768px) {
    font-size: $font-size-base;
    line-height: $line-height-base;
  }
  @media screen and (max-width: 767px) {
    font-size: $font-size-sp;
    line-height: $line-height-sp;
  }
}
</style>
