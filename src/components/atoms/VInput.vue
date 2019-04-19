<template>
  <input
    v-bind="$attrs"
    :value="value"
    class="vInput"
    @focus="$emit('focus')"
    @input="$emit('input', $event.target.value)"
    @blur="$emit('blur')"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class VInput extends Vue {
  private inheritAttrs = false
  @Prop() public value: string
}
</script>

<style lang="scss" scoped>
.vInput {
  box-sizing: border-box;
  border: 1px solid $color-border;
  padding: 8px 12px;
  width: 100%;
  font-size: $fontSize-pc;
  outline: none;
  transition: border 0.3s $easing;

  &:focus {
    border: 1px solid $color-theme;
  }
  &[aria-invalid='true'] {
    border: 1px solid $color-caution;
  }
}
</style>
