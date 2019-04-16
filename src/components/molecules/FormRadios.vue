<template>
  <div class="formRadios">
    <ul class="formRadios__list">
      <li v-for="select in selects" :key="select.id" class="formRadios__item">
        <VRadio
          v-model="model"
          v-bind="$attrs"
          :name="name"
          :value="select.value"
          :aria-invalid="String(!!error)"
          :aria-describedby="error ? `error-${name}` : false"
          @change.once="updateDirty"
        >
          {{ select.label }}
        </VRadio>
      </li>
    </ul>
    <VTexts
      v-if="error"
      :id="`error-${name}`"
      role="alert"
      aria-live="assertive"
      caution
      small
      class="formRadios__error"
    >
      <span>{{ error }}</span>
    </VTexts>
  </div>
</template>

<script>
import { VALIDATES } from '~/utils/variables'
import { VRadio, VTexts } from '~/components/atoms'

export default {
  components: { VRadio, VTexts },
  inheritAttrs: false,
  model: {
    event: 'change'
  },
  props: {
    name: { type: String, required: true },
    selects: { type: Array, required: true },
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
      if (!this.required) return ''
      if (!this.isDirty) return ''
      if (!value) return VALIDATES.selected
      return ''
    },
    updateDirty() {
      this.isDirty = true
    }
  }
}
</script>

<style lang="scss" scoped>
.formRadios__item + .formRadios__item {
  margin-top: 12px;
}
.formRadios__error {
  @include media-min {
    margin-top: 6px;
  }
  @include media-max {
    margin-top: 8px;
  }
}
</style>
