<template>
  <input
    :value="value"
    class="vInput"
    @focus="$emit('focus')"
    @input="$emit('input', $event.target.value)"
    @blur="$emit('blur')"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: { type: String, required: true }
  }
})
</script>

<style lang="scss" scoped>
.vInput {
  box-sizing: border-box;
  border: 1px solid $color-border;
  width: 100%;
  background: #fff;
  font-size: $fontSize-pc;
  outline: none;
  transition: border 0.3s $easing;

  @include media-min {
    padding: 7px 14px 8px;
  }

  @include media-max {
    padding: 8px 13px 9px;
  }
}

.vInput:focus {
  border: 1px solid $color-secondary;
}

.vInput[aria-invalid='true'] {
  border: 1px solid $color-caution;
}
</style>
