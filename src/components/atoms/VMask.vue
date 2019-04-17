<template>
  <div class="vMask" :class="styledClass" @click="$emit('click')" />
</template>

<script>
export default {
  props: {
    transparent: { type: Boolean }
  },
  computed: {
    styledClass() {
      const classes = []

      if (this.transparent) {
        classes.push('-transparent')
      }

      return classes
    }
  }
}
</script>

<style lang="scss" scoped>
.vMask {
  background: rgba(0, 0, 0, 0.5);
}
.vMask.-transparent {
  background: transparent;
}
</style>
