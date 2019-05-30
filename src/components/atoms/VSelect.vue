<template>
  <div class="vSelect">
    <select v-model="model" v-bind="$attrs" class="vSelect__content">
      <template v-for="option in options">
        <option :key="option.id" :value="option.value || option.id">
          {{ option.label }}
        </option>
      </template>
    </select>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Option } from '~/types/models'

export default Vue.extend({
  inheritAttrs: false,
  model: {
    event: 'change'
  },
  props: {
    options: { type: Array as PropType<Option[]>, required: true },
    value: { type: [String, Number] }
  },
  computed: {
    model: {
      get(): string | number {
        return this.value
      },
      set(value: string | number) {
        this.$emit('change', value)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.vSelect {
  position: relative;
  display: inline-block;

  @include media-min {
    min-width: 240px;
  }

  @include media-max {
    width: 100%;
  }
}

.vSelect::after {
  position: absolute;
  top: 50%;
  right: 12px;
  content: '';
  margin-top: -4px;
  border-style: solid;
  border-color: $color-theme transparent transparent;
  border-width: 8px 5px;
  pointer-events: none;
}

.vSelect__content {
  display: inline-block;
  box-sizing: border-box;
  border-radius: 0;
  box-sizing: border-box;
  border: 1px solid $color-border;
  padding: 8px 32px 8px 12px;
  width: 100%;
  font-size: $fontSize-pc;
  line-height: 1.3;
}
</style>
