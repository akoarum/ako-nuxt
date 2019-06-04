<template>
  <div :class="styledClass" class="vMask" @click="$emit('click')" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    transparent: { type: Boolean }
  },
  computed: {
    styledClass(): string {
      if (this.transparent) return '-transparent'
      return ''
    }
  }
})
</script>

<style lang="scss" scoped>
.vMask {
  background: rgba(0, 0, 0, 0.5);
}

.vMask.-transparent {
  background: transparent;
}
</style>
