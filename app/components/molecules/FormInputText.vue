<template>
  <div class="inputText">
    <VInputText
      :id="id ? id : name"
      :type="type"
      :name="name"
      :value="value"
      :minlength="minlength"
      :maxlength="maxlength"
      :min="min"
      :max="max"
      :step="step"
      :readonly="readonly"
      :disabled="disabled"
      :autocomplete="autocomplete"
      :required="required"
      :error="!!error"
      :aria-describedby="id ? `${id}-error` : `${name}-error`"
      class="inputText__input"
      @dirty="isDirtied = true"
      @input="inputHandler"
    />
    <VTexts
      v-show="error"
      :id="id ? `${id}-error` : `${name}-error`"
      role="alert"
      :text="error"
      :aria-live="error ? 'assertive' : 'off'"
      error
      class="inputText__error"
    />
  </div>
</template>

<script>
import { VALIDATES } from '~/assets/js/variables'
import VTexts from '~/components/atoms/VTexts'
import VInputText from '~/components/atoms/VInputText'

export default {
  components: { VTexts, VInputText },
  props: {
    type: { type: String, required: true },
    name: { type: String, required: true },
    value: { type: String, required: true },
    id: { type: String },
    placeholder: { type: String },
    minlength: { type: String },
    maxlength: { type: String },
    min: { type: String },
    max: { type: String },
    step: { type: String },
    required: { type: Boolean },
    readonly: { type: Boolean },
    disabled: { type: Boolean },
    autocomplete: { type: Boolean }
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
  created() {
    if (this.value) {
      this.error = this.validate()
    }
  },
  methods: {
    inputHandler(value) {
      this.$emit('input', value)
    },
    validate() {
      if (!this.isDirtied) return ''

      if (!this.value && this.required) {
        return VALIDATES.EMPTY.message
      }

      if (!this.value && !this.required) {
        return ''
      }

      const type = this.type.toUpperCase()
      if (type in VALIDATES && !VALIDATES[type].regex.test(this.value)) {
        return VALIDATES[type].message
      }

      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.inputText {
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
