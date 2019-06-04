<template>
  <div class="formInput">
    <VInput
      v-model="model"
      v-bind="$attrs"
      :type="type"
      :required="required"
      :aria-invalid="String(isError)"
      :aria-describedby="isError ? `error-${name}` : false"
      class="formInput__input"
      @focus="$emit('focus')"
      @blur="handleBlur"
    />
    <template v-if="isError">
      <VTexts
        :id="`error-${name}`"
        class="formInput__error"
        role="alert"
        aria-live="assertive"
        small
        caution
      >
        <span>{{ error }}</span>
      </VTexts>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { VALIDATE_PATTERNS } from '~/utils/variables'
import { VInput, VTexts } from '~/components/atoms'

type Data = {
  error: string
  isDirty: boolean
}

export default Vue.extend({
  components: { VInput, VTexts },
  inheritAttrs: false,
  props: {
    name: { type: String, required: true },
    value: { type: String, required: true },
    type: { type: String, default: 'text' },
    required: { type: Boolean },
    validateType: { type: String }
  },
  data(): Data {
    return {
      error: '',
      isDirty: false
    }
  },
  computed: {
    model: {
      get(): string {
        return this.value
      },
      set(value: string) {
        this.$emit('input', value)
        this.error = this.validate(value)
      }
    },
    isError(): boolean {
      return !!this.error
    }
  },
  watch: {
    isDirty() {
      this.$emit('dirty')
      this.error = this.validate(this.value)
    },
    isError(newValue: boolean) {
      this.$emit('error', newValue)
    }
  },
  created() {
    if (this.value || !this.required) {
      this.updateDirty()
    }
  },
  methods: {
    handleBlur() {
      this.$emit('blur')

      if (!this.isDirty) {
        this.updateDirty()
      }
    },
    updateDirty() {
      if (this.isDirty) return
      if (this.value) {
        this.isDirty = true
      }
    },
    validate(value: string): string {
      if (!this.isDirty) return ''
      if (!this.required && !value) return ''
      if (this.required && !value) return VALIDATE_PATTERNS.required.message

      for (const type in VALIDATE_PATTERNS) {
        if (this.type === type) {
          if (value && !VALIDATE_PATTERNS[type].regex!.test(value)) {
            return VALIDATE_PATTERNS[type].message
          }
        }
      }

      return ''
    }
  }
})
</script>

<style lang="scss" scoped>
.formInput__error {
  @include media-min {
    margin-top: 6px;
  }
  @include media-max {
    margin-top: 8px;
  }
}
</style>
