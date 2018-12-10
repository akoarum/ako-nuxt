<template>
  <div class="textarea">
    <VTextarea
      :id="id ? id : name"
      :name="name"
      :value="value"
      :placeholder="placeholder"
      :minlength="minlength"
      :maxlength="maxlength"
      :autocomplete="autocomplete"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :error="!!error"
      :aria-describedby="id ? `${id}-error` : `${name}-error`"
      @dirty="isDirtied = true"
      @input="inputHandler"
      class="textarea__body"
    />
    <VTexts
      v-show="error"
      :id="id ? `${id}-error` : `${name}-error`"
      role="alert"
      :text="error"
      :aria-live="error ? 'assertive' : 'off'"
      error
      class="textarea__error"
    />
  </div>
</template>

<script>
import { VALIDATES } from '~/functions/variables'
import VTextarea from '~/components/atoms/VTextarea'
import VTexts from '~/components/atoms/VTexts'

export default {
  components: { VTextarea, VTexts },
  props: {
    name: { type: String, required: true },
    value: { type: String, required: true },
    id: { type: String },
    placeholder: { type: String },
    minlength: { type: String },
    maxlength: { type: String },
    autocomplete: { type: Boolean },
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    required: { type: Boolean }
  },
  data() {
    return {
      isDirtied: false,
      error: ''
    }
  },
  watch: {
    value() {
      this.error = this.validate()
    },
    isDirtied() {
      this.error = this.validate()
    },
    error() {
      this.$emit('error', { name: this.name, error: !!this.error })
    }
  },
  created() {},
  methods: {
    inputHandler(value) {
      this.$emit('input', value)
    },
    validate() {
      if (!this.isDirtied) {
        return ''
      }

      if (this.required && !this.value) {
        return VALIDATES.EMPTY.message
      }

      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.textarea {
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
