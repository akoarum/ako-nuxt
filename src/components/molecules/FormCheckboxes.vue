<template>
  <div class="formCheckboxes">
    <ul class="formCheckboxes__list">
      <li
        v-for="select in selects"
        :key="select.id"
        class="formCheckboxes__item"
      >
        <VCheckbox
          v-model="model"
          v-bind="$attrs"
          :name="name"
          :value="select.value"
          :aria-invalid="String(!!error)"
          :aria-describedby="error ? `error-${name}` : false"
          @change.once="updateDirty"
        >
          {{ select.label }}
        </VCheckbox>
      </li>
    </ul>
    <VTexts
      v-if="error"
      :id="`error-${name}`"
      role="alert"
      aria-live="assertive"
      small
      caution
      class="formCheckboxes__error"
    >
      <span>{{ error }}</span>
    </VTexts>
  </div>
</template>

<script>
import { VALIDATES } from '~/utils/variables'
import VCheckbox from '~/components/atoms/VCheckbox'
import VTexts from '~/components/atoms/VTexts'

export default {
  components: { VCheckbox, VTexts },
  inheritAttrs: false,
  model: {
    event: 'change'
  },
  props: {
    name: { type: String, required: true },
    selects: { type: Array, required: true },
    value: { type: Array },
    required: { type: Boolean },
    min: { type: Number },
    max: { type: Number }
  },
  data() {
    return {
      error: '',
      isDirty: !!this.value.length || !this.required
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
      if (!value.length) return VALIDATES.selected
      if (this.min && value.length < this.min) {
        return `${this.min}個以上選択してください。`
      }
      if (this.max && value.length > this.max) {
        return `${this.max}個以内で選択してください。`
      }
    },
    updateDirty() {
      this.isDirty = true
    }
  }
}
</script>

<style lang="scss" scoped>
.formCheckboxes__item + .formCheckboxes__item {
  margin-top: 12px;
}
.formCheckboxes__error {
  @include media-min {
    margin-top: 6px;
  }
  @include media-max {
    margin-top: 8px;
  }
}
</style>
