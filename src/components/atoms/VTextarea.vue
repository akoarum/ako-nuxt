<template>
  <textarea
    :value="value"
    class="vTextarea"
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
.vTextarea {
  box-sizing: border-box;
  border: 1px solid $color-border;
  padding: 8px 12px;
  width: 100%;
  font-size: $fontSize-pc;
  outline: none;
  transition: border 0.3s $easing;

  @include media-min {
    height: 140px;
  }

  @include media-max {
    height: 100px;
  }
}

.vTextarea:focus {
  border: 1px solid $color-theme;
}

.vTextarea[aria-invalid='true'] {
  border: 1px solid $color-caution;
}
</style>
