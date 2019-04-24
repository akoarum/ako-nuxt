<template>
  <label class="toggleButton">
    <input
      v-model="model"
      v-bind="$attrs"
      :value="value"
      type="checkbox"
      class="toggleButton__input"
    />
    <span class="toggleButton__text"><slot /></span>
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
    checkedValue: { type: Array, required: true },
    value: { type: String, required: true }
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
.toggleButton {
  position: relative;
  display: block;
}

.toggleButton__input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 5px;
  height: 5px;

  &:focus + .toggleButton__text {
    background: #f0f0f0;
  }
}

.toggleButton__input:checked + .toggleButton__text {
  background: $color-theme;
  color: #fff;
}

.toggleButton__text {
  display: inline-block;
  box-sizing: border-box;
  border-radius: 2px;
  border: 1px solid $color-theme;
  line-height: 1;
  text-align: center;
  color: $color-theme;
  transition: background 0.4s $easing, color 0.4s $easing;

  @include media-min {
    padding: 9px 14px;
    max-width: 260px;
    width: 100%;
    font-size: $fontSize-pc;

    &:hover {
      background: #f0f0f0;
    }
  }

  @include media-max {
    padding: 8px 12px;
    width: 100%;
    font-size: $fontSize-sp;
  }
}
</style>
