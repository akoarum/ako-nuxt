<template>
  <div class="formSelect">
    <VSelect
      v-model="model"
      :name="name"
      :options="options"
      :required="required"
      @change.once="updateDirty"
    />
    <template v-if="isError">
      <VTexts small caution>
        <span>{{ error }}</span>
      </VTexts>
    </template>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Option } from '~/types/models'
import { VALIDATE_PATTERNS } from '~/utils/variables'
import { VSelect, VTexts } from '~/components/atoms'

type Data = {
  error: string
  isDirty: boolean
}

export default Vue.extend({
  components: { VSelect, VTexts },
  inheritAttrs: false,
  model: {
    event: 'change'
  },
  props: {
    name: { type: String, required: true },
    value: { type: [String, Number], required: true },
    options: { type: Array as PropType<Option[]>, required: true },
    required: { type: Boolean }
  },
  data(): Data {
    return {
      error: '',
      isDirty: false
    }
  },
  computed: {
    model: {
      get(): string | number {
        return this.value
      },
      set(value: string | number) {
        this.$emit('change', value)
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
    updateDirty() {
      if (this.isDirty) return
      this.isDirty = true
    },
    validate(value: string | number): string {
      if (!this.isDirty) return ''
      if (this.isDirty && !value) return VALIDATE_PATTERNS.selected.message
      return ''
    }
  }
})
</script>

<style lang="scss" scoped>
.formSelect {
}
</style>
