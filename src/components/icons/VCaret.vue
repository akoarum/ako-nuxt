<template>
  <span :style="styled" class="vCaret"></span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class VCaret extends Vue {
  @Prop() public width?: number
  @Prop() public height?: number

  public get styled(): { [index: string]: string } {
    const styles = {}

    if (this.width) {
      styles['--width'] = `${this.width}px`
    }

    if (this.height) {
      styles['--height'] = `${this.height}px`
    }

    return styles
  }
}
</script>

<style lang="scss" scoped>
.vCaret {
  --width: 8px;
  --height: 6px;
  display: inline-block;
  border-width: var(--height) var(--width);
  border-style: solid;
  border-color: transparent transparent transparent currentColor;
}
</style>
