<template>
  <div class="vMask" @click="$emit('click')" />
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.vMask {
  background: rgba(0, 0, 0, 0.5);
}
</style>
