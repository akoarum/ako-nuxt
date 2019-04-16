<template>
  <label class="vCheckbox">
    <input
      v-model="model"
      v-bind="$attrs"
      :value="value"
      type="checkbox"
      class="vCheckbox__input"
    />
    <span class="vCheckbox__label"><slot /></span>
  </label>
</template>

<script>
export default {
  inheritAttrs: false,
  model: {
    prop: 'checkedValue',
    event: 'change'
  },
  props: {
    value: { type: String, required: true },
    checkedValue: { type: Array, default: () => [] }
  },
  computed: {
    model: {
      set(value) {
        this.$emit('change', value)
      },
      get() {
        return this.checkedValue
      }
    }
  }
}
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

  &:checked + .vCheckbox__label {
    &::before {
      border-color: $color-theme;
      background: $color-theme;
    }
  }
}

.vCheckbox__label {
  &::before,
  &::after {
    position: absolute;
    content: '';
  }
  &::before {
    top: 6px;
    left: 0;
    border-radius: 2px;
    border: 1px solid $color-border;
    width: 22px;
    height: 22px;
    transition: background 0.3s $easing, border-color 0.3s $easing;
  }
  &::after {
    top: 12px;
    left: 3px;
    width: 18px;
    height: 10px;
    background: url('~assets/icons/check.svg') left top no-repeat;
    background-size: 100% auto;
  }
}
</style>
