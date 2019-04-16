<template>
  <div class="vSelect">
    <label class="vSelect__label" @click="updateOptionView(!optionVisible)">
      {{ selectedView }}
      <VCaret :width="10" :height="6" class="vSelect__icon" />
    </label>
    <transition name="option">
      <ul v-show="optionVisible" class="vSelect__options">
        <li v-for="option in options" :key="option.id" class="option">
          <label class="option__label">
            <input
              v-bind="$attrs"
              :value="option.value"
              :checked="isSelected(option.value)"
              type="radio"
              class="option__input"
              @change="$emit('change', option.value)"
              @click="updateOptionView(false)"
            />
            <span class="option__txt">{{ option.label }}</span>
          </label>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import { VCaret } from '~/components/icons'

export default {
  components: { VCaret },
  inheritAttrs: false,
  model: {
    event: 'change',
    prop: 'checkedValue'
  },
  props: {
    options: { type: Array, required: true },
    checkedValue: { type: String }
  },
  data() {
    return {
      optionVisible: false
    }
  },
  computed: {
    selectedView() {
      if (!this.checkedValue) return '選択してください'
      return this.options.find(option => option.value === this.checkedValue)
        .label
    }
  },
  methods: {
    isSelected(value) {
      return this.checkedValue === value
    },
    updateOptionView(status) {
      this.optionVisible = status
    }
  }
}
</script>

<style lang="scss" scoped>
.vSelect {
  position: relative;
  display: block;
}

.vSelect__label {
  display: block;
  box-sizing: border-box;
  border: 1px solid $color-border;
  padding: 8px 12px;
  font-size: $fontSize-pc;
  outline: none;
  transition: border 0.3s $easing;
}

.vSelect__icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: rotate(90deg);
}

.vSelect__options {
  position: absolute;
  left: 13px;
  top: 90%;
  box-shadow: 0 3px 8px 0 rgba(100, 100, 100, 0.4);
  min-width: 120px;
  background: #fff;
}

.option {
  position: relative;
}

.option__input {
  position: absolute;
  left: 0;
  top: 0;
  width: 5px;
  height: 5px;
  opacity: 0;

  &:checked + .option__txt {
    background: #efefef;
  }
}

.option__label {
  display: block;
  transition: background 0.3s $easing;

  &:hover,
  &:focus {
    background: #efefef;
  }
}

.option__txt {
  display: block;
  padding: 12px;
  font-size: $fontSize-pc;
  line-height: 1;
}

.option {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s $easing;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
  }
}
</style>
