<template>
  <label class="selectButton">
    <input
      v-model="model"
      v-bind="$attrs"
      :value="value"
      type="checkbox"
      class="selectButton__input"
    />
    <span class="selectButton__text"><slot /></span>
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
.selectButton {
  position: relative;
  display: inline-block;
}

.selectButton__input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 5px;
  height: 5px;

  &:focus + .selectButton__text {
    background: #f0f0f0;
  }
}

.selectButton__input:checked + .selectButton__text {
  background: $color-theme;
  color: #fff;
}

.selectButton__text {
  display: inline-block;
  border-radius: 2px;
  border: 1px solid $color-theme;
  line-height: 1;
  text-align: center;
  color: $color-theme;
  transition: background 0.4s $easing, color 0.4s $easing;

  @include media-min {
    padding: 9px 14px;
    min-width: 140px;
    font-size: $fontSize-pc;

    &:hover {
      background: #f0f0f0;
    }
  }
}
</style>
