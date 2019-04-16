<template>
  <button
    v-bind="$attrs"
    :class="styledClass"
    type="button"
    class="btn"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'VButton',
  inheritAttrs: true,
  props: {
    secondary: { type: Boolean },
    caution: { type: Boolean }
  },
  computed: {
    styledClass() {
      if (this.secondary) return '-secondary'
      if (this.caution) return '-caution'
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style';
</style>
