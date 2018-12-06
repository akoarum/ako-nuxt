<template>
  <div :class="appearanceClasses" class="select">
    <input
      :id="id ? id : name"
      :name="`${name}-display`"
      :value="displayValue"
      type="text"
      class="select__input"
      readonly
      @click="openOption"
    />
    <transition name="option">
      <div v-show="isOpened" class="select__optionContainer">
        <ul class="select__options">
          <li v-for="option in options" :key="option.id">
            <label>
              <input
                type="radio"
                :name="name"
                :value="option.value"
                :checked="value === option.value"
                :required="required"
                @change="selectOption"
              />
              <span>{{ option.display || option.value }}</span>
            </label>
          </li>
        </ul>
      </div>
    </transition>
    <div v-if="isOpened" class="select__mask" @click="closeOption" />
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    value: { type: String, required: true },
    options: { type: Array, required: true },
    placeholder: { type: String, default: '選択してください' },
    id: { type: String },
    error: { type: Boolean },
    required: { type: Boolean }
  },
  data() {
    return {
      isOpened: false
    }
  },
  computed: {
    displayValue() {
      if (!this.value) return this.placeholder

      for (const option of this.options) {
        if (this.value !== String(option.value)) continue
        return option.display || option.value
      }

      return this.placeholder
    },
    appearanceClasses() {
      const classes = []

      if (this.error) {
        classes.push('-error')
      }

      return classes
    }
  },
  methods: {
    openOption() {
      this.isOpened = true
      window.addEventListener('keyup', this.escKeyHandler)
    },
    closeOption() {
      this.isOpened = false
      window.removeEventListener('keyup', this.escKeyHandler)
    },
    selectOption(event) {
      this.$emit('change', event.target.value)
      this.closeOption()
    },
    escKeyHandler(event) {
      if (event.keyCode !== 27) return
      this.closeOption()
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  display: inline-block;

  &__input {
    box-sizing: border-box;
    border-radius: 4px;
    background: $color-inputBack;
    font-size: $fontSize-base;
    outline: none;
    transition: box-shadow $transition-duration $transition-easing,
      background $transition-duration $transition-easing;
    will-change: box-shadow, background;
    cursor: pointer;
  }

  &__optionContainer {
    position: absolute;
    left: 0;
    top: 100%;
    border-radius: 4px;
    width: 100%;
    background: #fff;
    z-index: 20;
  }
  &__options {
    border: 1px solid $color-border;

    > li {
      position: relative;

      + li {
        border-top: 1px solid $color-border;
      }
    }
    input {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      width: 1px;
      height: 1px;

      &:checked + span {
        background: $color-inputBack;
      }
    }
    label {
      display: block;
      cursor: pointer;

      &:hover,
      &:focus {
        span {
          background: $color-inputBack;
        }
      }
    }
    span {
      display: block;
      transition: background $transition-duration $transition-easing;
      will-change: background;
    }
  }
  &__mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 19;
  }

  &.-error {
    .select__input {
      background: #ffe8e8;
    }
  }

  @media screen and (min-width: 768px) {
    &__input {
      padding: 4px 12px;
    }
    &__options {
      label {
        font-size: $fontSize-base;
      }
      span {
        padding: 7px 12px;
      }
    }
  }

  @media screen and (max-width: 767px) {
    display: block;

    &__input {
      padding: 7px 12px;
      width: 100%;
    }
    &__options {
      label {
        font-size: $fontSize-sp;
      }
      span {
        padding: 9px 14px;
      }
    }
  }
}

.option {
  &-enter-active,
  &-leave-active {
    transition: opacity $transition-duration $transition-easing;
    will-change: opacity;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
  }
  &-enter-to,
  &-leave {
    opacity: 1;
  }
}
</style>
