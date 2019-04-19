<template>
  <div class="vMask" :class="styledClass" @click="$emit('click')" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class VMask extends Vue {
  @Prop() public transparent?: boolean

  public get styledClass(): string[] {
    const classes = []

    if (this.transparent) {
      classes.push('-transparent')
    }

    return classes
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
