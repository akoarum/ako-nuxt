<template>
  <div class="formCheckboxes">
    <ul class="formCheckboxes__list">
      <template v-for="item in items">
        <li :key="item.id" class="formCheckboxes__item">
          <VCheckbox
            :name="name"
            :value="item.value || item.id"
            :checked="checkedValues[item.id]"
            :required="required"
            :aria-invalid="String(isError)"
            :aria-describedby="isError ? `${name}-error` : false"
            @change.once="updateDirty"
            @change="updateValue(item.value || item.id)"
          >
            <span>{{ item.label }}</span>
          </VCheckbox>
        </li>
      </template>
    </ul>
    <template v-if="isError">
      <VTexts
        :id="`${name}-error`"
        role="alert"
        aria-live="assertive"
        class="formCheckboxes__error"
        caution
        small
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
import { VCheckbox, VTexts } from '~/components/atoms'

type Data = {
  error: string
  isDirty: boolean
  checkedValues: { [key: string]: boolean }
}

export default Vue.extend({
  components: { VCheckbox, VTexts },
  inheritAttrs: false,
  model: {
    event: 'change'
  },
  props: {
    name: { type: String, required: true },
    items: { type: Array as PropType<Option[]>, required: true },
    value: { type: Array as PropType<(string | number)[]>, required: true },
    required: { type: Boolean },
    min: { type: Number },
    max: { type: Number }
  },
  data(): Data {
    return {
      error: '',
      isDirty: false,
      checkedValues: {}
    }
  },
  computed: {
    isError(): boolean {
      return !!this.error
    },
    checkedIds(): (string | number)[] {
      const values: (string | number)[] = []

      for (const key in this.checkedValues) {
        if (!this.checkedValues[key]) continue
        values.push(key)
      }

      return values
    }
  },
  watch: {
    checkedValues(newValue) {
      this.$emit('change', this.checkedIds)
      this.error = this.validate(this.checkedIds)
    },
    isDirty() {
      this.$emit('dirty')
    }
  },
  created() {
    this.setCheckedValues()

    if (!this.required || this.value.length) {
      this.updateDirty()
    }
  },
  methods: {
    setCheckedValues() {
      const values = {}
      this.items.forEach(item => {
        values[item.id] = this.value.indexOf(item.id) !== -1
      })
      this.checkedValues = values
    },
    updateDirty() {
      if (this.isDirty) return
      this.isDirty = true
    },
    updateValue(id: string | number) {
      this.checkedValues = Object.assign({}, this.checkedValues, {
        [id]: !this.checkedValues[id]
      })
    },
    validate(value): string {
      if (!this.isDirty) return ''
      if (this.required && !value.length) {
        return VALIDATE_PATTERNS.selected.message
      }
      if (this.min && value.length < this.min) {
        return `${this.min}個以上選択してください。`
      }
      if (this.max && value.length > this.max) {
        return `選択できるのは${this.max}個までです。`
      }
      return ''
    }
  }
})
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
