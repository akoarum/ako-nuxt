<template>
  <div class="formInputFile">
    <InputFile
      :name="name"
      :aria-invalid="String(!!error)"
      :aria-describedby="error ? `${name}-error` : false"
      class="formInputFile__input"
      @input="handleInput"
    />
    <VTexts
      v-if="error"
      :id="`${name}-error`"
      role="alert"
      aria-live="assertive"
      class="formInputFile__error"
      small
      caution
    >
      <span>{{ error }}</span>
    </VTexts>
  </div>
</template>

<script>
import { VALIDATES } from '~/utils/variables'
import { InputFile, VTexts } from '~/components/atoms'

export default {
  components: { InputFile, VTexts },
  props: {
    name: { type: String, required: true },
    value: { type: [File, null] },
    required: { type: Boolean }
  },
  data() {
    return {
      error: '',
      isDirty: false
    }
  },
  methods: {
    validate() {
      if (!this.required) return ''
      if (!this.isDirty) return ''
      if (this.value) return ''
      return VALIDATES.file
    },
    handleInput(value) {
      this.$emit('input', value)
      this.$nextTick(() => {
        this.isDirty = true
        this.error = this.validate()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.formInputFile__error {
  @include media-min {
    margin-top: 8px;
  }

  @include media-max {
    margin-top: 4px;
  }
}
</style>
