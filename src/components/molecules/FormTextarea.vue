<template>
  <div class="formTextarea">
    <VTextarea
      v-model="model"
      v-bind="$attrs"
      :name="name"
      :required="required"
      :minlength="minlength"
      :maxlength="maxlength"
      :aria-invalid="String(!!error)"
      :aria-describedby="error ? `error-${name}` : false"
      class="formTextarea__textarea"
      @blur="updateDirty"
    />
    <VTexts
      v-if="error"
      :id="`error-${name}`"
      caution
      small
      class="formTextarea__error"
      role="alert"
      aria-live="assertive"
    >
      <span>{{ error }}</span>
    </VTexts>
  </div>
</template>

<script>
import { VALIDATES } from '~/utils/variables'
import { VTextarea, VTexts } from '~/components/atoms'

export default {
  components: { VTextarea, VTexts },
  inheritAttrs: false,
  props: {
    name: { type: String, required: true },
    value: { type: String, required: true },
    required: { type: Boolean },
    minlength: { type: Number },
    maxlength: { type: Number }
  },
  data() {
    return {
      error: '',
      isDirty: !!this.value || !this.required
    }
  },
  computed: {
    model: {
      set(value) {
        this.$emit('input', value)
        this.error = this.validate(value)
      },
      get() {
        return this.value
      }
    }
  },
  watch: {
    error(value) {
      this.$emit('error', { name: this.name, error: !!value })
    },
    isDirty() {
      this.$emit('dirty', this.name)
    }
  },
  methods: {
    validate(value) {
      if (!this.isDirty) return ''
      if (this.required && !value) return VALIDATES.required
      if (this.minlength && value.length < this.minlength) {
        return `${this.minlength}字以上で入力して下さい。`
      }
      if (this.maxlength && value.length > this.maxlength) {
        return `${this.maxlength}字以内で入力して下さい。`
      }
      return ''
    },
    updateDirty() {
      if (!this.value || this.isDirty) return false
      this.isDirty = true
      this.error = this.validate(this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.formTextarea__error {
  @include media-min {
    margin-top: 6px;
  }
  @include media-max {
    margin-top: 8px;
  }
}
</style>
