<template>
  <div class="select">
    <VSelect
      :name="name"
      :options="options"
      :value="value"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :aria-describedby="id ? `${id}-error` : `${name}-error`"
      :error="!!error"
      class="select__body"
      @open="opened = true"
      @change="changeHandler"
      @close="closeHandler"
    />
    <VTexts
      v-show="error"
      :id="id ? `${id}-error` : `${name}-error`"
      :text="error"
      :aria-live="error ? 'assertive' : 'off'"
      role="alert"
      error
      class="select__error"
    />
  </div>
</template>

<script>
import { VALIDATES } from '~/functions/variables'
import VSelect from '~/components/atoms/VSelect'
import VTexts from '~/components/atoms/VTexts'

export default {
  components: { VSelect, VTexts },
  model: {
    event: 'change'
  },
  props: {
    name: { type: String, required: true },
    options: { type: Array, required: true },
    value: { type: String, required: true },
    id: { type: String },
    placeholder: { type: String },
    required: { type: Boolean },
    disabled: { type: Boolean }
  },
  data() {
    return {
      error: '',
      opened: false
    }
  },
  watch: {
    error() {
      this.$emit('error', !!this.error)
    },
    value() {
      this.error = this.validate()
    }
  },
  methods: {
    changeHandler(value) {
      this.$emit('change', value)
    },
    closeHandler() {
      this.error = this.validate()
    },
    validate() {
      if (!this.required || !this.opened) {
        return ''
      }

      if (!this.value) {
        return VALIDATES.SELECT.message
      }

      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  @media screen and (min-width: 768px) {
    &__error {
      margin-top: 4px;
    }
  }

  @media screen and (max-width: 767px) {
    &__error {
      margin-top: 3px;
    }
  }
}
</style>
