<template>
  <label class="checkbox">
    <input
      :name="name"
      :value="value"
      :aria-label="ariaLabel"
      :aria-labelledby="ariaLabelledby"
      :aria-describedby="ariaDescribedby"
      :aria-invalid="String(error)"
      :checked="isChecked"
      :required="required"
      type="checkbox"
      @change="
        $emit('change', {
          value: $event.target.value,
          checked: $event.target.checked
        })
      "
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
    checked: { type: Array, required: true },
    ariaLabel: { type: String },
    ariaLabelledby: { type: String },
    ariaDescribedby: { type: String },
    required: { type: Boolean },
    error: { type: Boolean }
  },
  computed: {
    isChecked() {
      return this.checked.indexOf(this.value) > -1
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox {
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
      &::before {
        border: $color-primary;
        background: $color-primary;
      }
      &::after {
        opacity: 1;
      }
    }
  }
  span {
    position: relative;
    display: inline-block;
    padding-left: 22px;

    &::before,
    &::after {
      position: absolute;
      top: 50%;
      content: '';
      transform: translateY(-50%);
    }
    &::before {
      left: 0;
      border-radius: 2px;
      border: 1px solid $color-border;
      width: 16px;
      height: 16px;
      background: #fff;
      transition: background $transition-duration $transition-easing,
        border $transition-duration $transition-easing;
      will-change: background, border;
    }
    &::after {
      left: 1px;
      width: 14px;
      height: 14px;
      background: url('~assets/img/icon_check-01.svg') left top no-repeat;
      background-size: 100% auto;
      opacity: 0;
      transition: opacity $transition-duration $transition-easing;
      will-change: opacity;
    }
  }
}
</style>
