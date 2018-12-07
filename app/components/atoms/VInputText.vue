<template>
  <input
    :id="id ? id : name"
    :type="type"
    :name="name"
    :value="value"
    :aria-invalid="String(error)"
    :class="appearanceClasses"
    class="input"
    @focus="focusHandler"
    @blur="blurHandler"
    @input="inputHandler"
  />
</template>

<script>
export default {
  props: {
    type: { type: String, required: true },
    name: { type: String, required: true },
    value: { type: String, required: true },
    id: { type: String },
    error: { type: Boolean, default: false }
  },
  data() {
    return {
      isFocused: false,
      isBlurred: false,
      isInput: false,
      isDirtied: false
    }
  },
  computed: {
    appearanceClasses() {
      const classes = []

      if (this.error) {
        classes.push('-error')
      }

      return classes
    }
  },
  methods: {
    focusHandler() {
      if (!this.isFocused) {
        this.isFocused = true
      }
      this.$emit('focus')
    },
    blurHandler() {
      if (!this.isBlurred) {
        this.isBlurred = true
      }
      this.$emit('blur')

      if (!this.isInput || this.isDirtied) return
      this.$emit('dirty')
      this.isDirtied = true
    },
    inputHandler(event) {
      if (!this.isInput) {
        this.isInput = true
      }
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  box-sizing: border-box;
  border-radius: 4px;
  background: $color-inputBack;
  font-size: $fontSize-base;
  outline: none;
  transition: box-shadow $transition-duration $transition-easing,
    background $transition-duration $transition-easing;
  will-change: box-shadow, background;

  &.-error {
    background: #ffe8e8;
  }

  &:focus {
    box-shadow: 0 0 0 1px $color-primary inset;
  }

  @media screen and (min-width: 768px) {
    padding: 4px 12px 5px;
  }

  @media screen and (max-width: 767px) {
    padding: 7px 12px 8px;
    width: 100%;
  }
}
</style>
