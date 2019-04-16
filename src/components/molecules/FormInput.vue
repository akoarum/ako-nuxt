<template>
  <div class="formInput">
    <VInput
      :id="name"
      v-model="model"
      v-bind="$attrs"
      :name="name"
      :type="type"
      :required="required"
      :aria-invalid="String(!!error)"
      :aria-describedby="error ? `error-${name}` : false"
      class="formInput__input"
      @blur="updateDirty"
    />
    <VTexts
      v-if="error"
      :id="`error-${name}`"
      class="formInput__error"
      role="alert"
      aria-live="assertive"
      caution
      small
    >
      <span>{{ error }}</span>
    </VTexts>
  </div>
</template>

<script>
import { VALIDATES } from '~/utils/variables'
import { VInput, VTexts } from '~/components/atoms'

export default {
  components: { VInput, VTexts },
  inheritAttrs: false,
  props: {
    name: { type: String, required: true },
    type: { type: String, required: true },
    value: { type: String, required: true },
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
      if (!value) {
        if (!this.required || !this.isDirty) {
          return ''
        }
        return VALIDATES.required
      }

      if (this.type in VALIDATES) {
        if (!VALIDATES[this.type].regex.test(value)) {
          return VALIDATES[this.type].message
        }
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
.formInput__error {
  @include media-min {
    margin-top: 6px;
  }
  @include media-max {
    margin-top: 8px;
  }
}
</style>
