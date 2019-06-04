<template>
  <div class="formTextarea">
    <VTextarea
      v-model="model"
      v-bind="$attrs"
      :name="name"
      :required="required"
      :aria-invalid="String(isError)"
      :aria-describedby="`${name}-error`"
      class="formTextarea__textarea"
      @focus="$emit('focus')"
      @blur="handleBlur"
    />
    <template v-if="isError">
      <VTexts
        :id="`${name}-error`"
        role="alert"
        aria-live="assertive"
        class="formTextarea__error"
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
import { VTextarea, VTexts } from '~/components/atoms'

type Data = {
  error: string
  isDirty: boolean
}

export default Vue.extend({
  components: { VTextarea, VTexts },
  inheritAttrs: false,
  props: {
    name: { type: String, required: true },
    value: { type: String, required: true },
    required: { type: Boolean }
  },
  data() {
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
    isError(value: boolean) {
      this.$emit('error', value)
    }
  },
  created() {
    if (this.value) {
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
      this.isDirty = true
    },
    validate(value: string): string {
      if (!this.isDirty) return ''
      if (this.required && !value) return VALIDATE_PATTERNS.required.message
      return ''
    }
  }
})
</script>

<style lang="scss" scoped>
.formTextarea {
}
</style>
