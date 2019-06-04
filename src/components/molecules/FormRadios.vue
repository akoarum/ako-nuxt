<template>
  <div class="formRadios">
    <ul class="formRadios__items">
      <template v-for="item in items">
        <li :key="item.id" class="formRadios__item">
          <VRadio
            v-model="model"
            v-bind="$attrs"
            :name="name"
            :value="item.value || item.id"
            :required="required"
            :aria-invalid="String(isError)"
            :aria-describedby="`${name}-error`"
            @change.once="updateDirty"
          >
            <span>{{ item.label }}</span>
          </VRadio>
        </li>
      </template>
    </ul>
    <template v-if="isError">
      <VTexts
        :id="`${name}-error`"
        role="alert"
        aria-live="assertive"
        class="formRadios__error"
      >
        <span>{{ error }}</span>
      </VTexts>
    </template>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Option } from '~/types/models'
import { VALIDATE_PATTERNS } from '~/utils/variables'
import { VRadio, VTexts } from '~/components/atoms'

type Data = {
  error: string
  isDirty: boolean
}

export default Vue.extend({
  components: { VRadio, VTexts },
  inheritAttrs: false,
  model: {
    event: 'change'
  },
  props: {
    name: { type: String, required: true },
    items: { type: Array as PropType<Option[]>, required: true },
    value: { type: [String, Number], required: true },
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
