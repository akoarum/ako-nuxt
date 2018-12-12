<template>
  <label class="radio">
    <input
      :name="name"
      :value="value"
      :aria-label="ariaLabel"
      :aria-labelledby="ariaLabelledby"
      :aria-describedby="ariaDescribedby"
      :aria-invalid="String(error)"
      :checked="value === checked"
      type="radio"
      @change="$emit('change', $event.target.value)"
    />
    <span>{{ label }}</span>
  </label>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    value: { type: String, required: true },
    label: { type: String, required: true },
    checked: { type: String, required: true },
    ariaLabel: { type: String },
    ariaLabelledby: { type: String },
    ariaDescribedby: { type: String },
    error: { type: Boolean }
  }
}
</script>

<style lang="scss" scoped>
.radio {
  position: relative;
  display: inline-block;
  font-size: $fontSize-base;
  cursor: pointer;

  input {
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    height: 1px;
    opacity: 0;

    &:checked + span {
      &::after {
        opacity: 1;
      }
    }
  }
  span {
    position: relative;
    display: inline-block;
    padding-left: 24px;

    &::before,
    &::after {
      position: absolute;
      top: 50%;
      content: '';
      border-radius: 50%;
      transform: translateY(-50%);
    }
    &::before {
      left: 0;
      border: 1px solid $color-border;
      width: 18px;
      height: 18px;
      background: #fff;
    }
    &::after {
      left: 4px;
      width: 10px;
      height: 10px;
      background: $color-primary;
      opacity: 0;
      transition: opacity $transition-duration $transition-easing;
      will-change: opacity;
    }
  }
}
</style>
