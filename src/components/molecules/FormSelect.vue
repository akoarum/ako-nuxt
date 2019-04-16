<template>
  <div class="formSelect">
    <VSelect
      v-model="model"
      v-bind="$attrs"
      :name="name"
      :options="options"
      :aria-invalid="String(!!error)"
      :aria-describedby="error ? `error-${name}` : false"
      class="formSelect__select"
    />
    <VTexts
      v-if="error"
      :id="`error-${name}`"
      caution
      small
      class="formSelect__error"
      role="alert"
      aria-live="assertive"
    >
      <span>{{ error }}</span>
    </VTexts>
  </div>
</template>

<script>
import { VSelect, VTexts } from '~/components/atoms'
import { VALIDATES } from '~/utils/variables'

export default {
  components: { VSelect, VTexts },
  inheritAttrs: false,
  model: {
    event: 'change'
  },
  props: {
    name: { type: String, required: true },
    options: { type: Array, required: true },
    value: { type: String },
    required: { type: Boolean }
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
        this.$emit('change', value)
        this.error = this.validate(value)
        this.updateDirty(value)
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
      if (!this.required || !this.isDirty) return ''
      if (!value) return VALIDATES.selected
      return ''
    },
    updateDirty(value) {
      if (!value || this.isDirty) return
      this.isDirty = true
    }
  }
}
</script>

<style lang="scss" scoped>
.formSelect__error {
  @include media-min {
    margin-top: 6px;
  }
  @include media-max {
    margin-top: 8px;
  }
}
</style>
