<template>
  <label class="vRadio">
    <input
      v-model="model"
      v-bind="$attrs"
      :value="value"
      type="radio"
      class="vRadio__input"
    />
    <span class="vRadio__label">
      <slot />
    </span>
  </label>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  inheritAttrs: false,
  model: {
    event: 'change',
    prop: 'checkedValue'
  },
  props: {
    value: { type: [String, Number], required: true },
    checkedValue: { type: [String, Number] }
  },
  computed: {
    model: {
      get(): string | number {
        return this.checkedValue
      },
      set(value: string | number) {
        this.$emit('change', value)
      }
    }
  }
})
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
}

.vRadio__input:checked + span::before {
  border-color: $color-theme;
}

.vRadio__input:checked + span::after {
  opacity: 1;
}

.vRadio__label::before,
.vRadio__label::after {
  position: absolute;
  top: 50%;
  content: '';
  border-radius: 50%;
  transform: translate3d(0, -50%, 0);
}

.vRadio__label::before {
  left: 0;
  border: 1px solid $color-border;
  background: #fff;
  transition: border-color 0.1s $easing;

  @include media-min {
    width: 24px;
    height: 24px;
  }

  @include media-max {
    width: 20px;
    height: 20px;
  }
}

.vRadio__label::after {
  background: $color-theme;
  opacity: 0;
  transition: opacity 0.1s $easing;

  @include media-min {
    left: 6px;
    width: 14px;
    height: 14px;
  }

  @include media-max {
    left: 5px;
    width: 12px;
    height: 12px;
  }
}
</style>
