<template>
  <div class="vBalloon">
    <slot />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.vBalloon {
  border-radius: 2px;
  background: rgba(0, 0, 0, 0.72);
  color: #fff;

  @include media-min {
    padding: 8px 16px;
  }
}
</style>
