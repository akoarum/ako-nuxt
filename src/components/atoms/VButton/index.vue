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

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class VButton extends Vue {
  @Prop() public secondary?: boolean
  @Prop() public caution?: boolean

  public get styledClass(): string {
    if (this.secondary) return '-secondary'
    if (this.caution) return '-caution'
    return ''
  }
}
</script>

<style lang="scss" scoped>
@import './style';
</style>
