<template>
  <time :datetime="date" class="time">{{ date | displayDate }}</time>
</template>

<script>
export default {
  props: {
    date: { type: String, required: true }
  }
}
</script>

<style lang="scss" scoped>
.time {
  font-family: $fontFamily-en;
  font-size: 1.4rem;
  color: $color-caption;
}
</style>
