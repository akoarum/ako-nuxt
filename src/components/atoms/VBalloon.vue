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
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.34);
    padding: 8px 16px;
  }

  @include media-max {
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.48);
    padding: 9px 13px;
  }
}
</style>
