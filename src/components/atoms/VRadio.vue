<template>
  <label class="vRadio">
    <input
      v-model="model"
      v-bind="$attrs"
      :value="value"
      type="radio"
      class="vRadio__input"
    />
    <span class="vRadio__label"><slot /></span>
  </label>
</template>

<script>
export default {
  inheritAttrs: false,
  model: {
    event: 'change',
    prop: 'checkedValue'
  },
  props: {
    value: { type: String, required: true },
    checkedValue: { type: String }
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
.vRadio {
  position: relative;

  @include media-min {
    padding: 7px 0 6px 32px;
    font-size: $fontSize-pc;
  }

  @include media-max {
    padding: 7px 0 6px 28px;
    font-size: $fontSize-sp;
  }
}

.vRadio__input {
  position: absolute;
  left: 0;
  top: 0;
  width: 5px;
  height: 5px;
  opacity: 0;

  &:checked {
    + span::before {
      border-color: $color-theme;
    }
    + span::after {
      opacity: 1;
    }
  }
}

.vRadio__label {
  &::before,
  &::after {
    position: absolute;
    top: 50%;
    content: '';
    border-radius: 50%;
    transform: translate3d(0, -50%, 0);
  }
  &::before {
    left: 0;
    border: 1px solid $color-border;
    transition: border-color 0.1s $easing;
  }
  &::after {
    background: $color-theme;
    opacity: 0;
    transition: opacity 0.1s $easing;
  }

  @include media-min {
    &::before {
      width: 24px;
      height: 24px;
    }
    &::after {
      left: 6px;
      width: 14px;
      height: 14px;
    }
  }

  @include media-max {
    &::before {
      width: 20px;
      height: 20px;
    }
    &::after {
      left: 5px;
      width: 12px;
      height: 12px;
    }
  }
}
</style>
