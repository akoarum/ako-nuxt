<template>
  <label class="vCheckbox">
    <input
      v-bind="$attrs"
      :value="value"
      :checked="checked"
      type="checkbox"
      class="vCheckbox__input"
      @change="$emit('change', !checked)"
    />
    <span class="vCheckbox__label"><slot /></span>
  </label>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  inheritAttrs: false,
  model: {
    event: 'change',
    prop: 'checked'
  },
  props: {
    value: { type: [String, Number], required: true },
    checked: { type: Boolean }
  }
})
</script>

<style lang="scss" scoped>
.vCheckbox {
  position: relative;

  @include media-min {
    padding: 7px 0 6px 34px;
    font-size: $fontSize-pc;
  }

  @include media-max {
    padding: 7px 0 6px 34px;
    font-size: $fontSize-sp;
  }
}

.vCheckbox__input {
  position: absolute;
  left: 0;
  top: 0;
  width: 5px;
  height: 5px;
  opacity: 0;
}

.vCheckbox__input:checked + .vCheckbox__label::before {
  border-color: $color-theme;
  background: $color-theme;
}

.vCheckbox__label::before,
.vCheckbox__label::after {
  position: absolute;
  content: '';
}

.vCheckbox__label::before {
  top: 6px;
  left: 0;
  border-radius: 2px;
  border: 1px solid $color-border;
  width: 22px;
  height: 22px;
  transition: background 0.3s $easing, border-color 0.3s $easing;
}

.vCheckbox__label::after {
  top: 12px;
  left: 3px;
  width: 18px;
  height: 10px;
  background: url('~assets/icons/check.svg') left top no-repeat;
  background-size: 100% auto;
}
</style>
