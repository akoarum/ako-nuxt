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

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { VALIDATES } from '~/utils/variables.ts'
import { VCheckbox, VTexts } from '~/components/atoms'

interface Select {
  id: number
  value: string
  label: string
}

@Component({
  components: { VCheckbox, VTexts }
})
export default class FormCheckboxes extends Vue {
  private inheritAttrs = false

  @Prop() public name!: string
  @Prop() public selects!: Select[]
  @Prop() public value: string[]
  @Prop() public required?: boolean
  @Prop() public min?: number
  @Prop() public max?: number

  public error: string = ''
  public isDirty: boolean = !!this.value.length || !this.required

  public set model(values: string[]) {
    this.$emit('change', values)
    this.error = this.validate(values)
  }

  public get model(): string[] {
    return this.value
  }

  @Watch('error')
  public emitError(value: string) {
    this.$emit('error', { name: this.name, error: !!value })
  }

  @Watch('isDirty')
  public emitDirty() {
    this.$emit('dirty', this.name)
  }

  public validate(values: string[]): string {
    if (!this.required) return ''
    if (!this.isDirty) return ''
    if (!values.length) return VALIDATES.selected
    if (this.min && values.length < this.min) {
      return `${this.min}個以上選択してください。`
    }
    if (this.max && values.length > this.max) {
      return `${this.max}個以内で選択してください。`
    }
  }

  public updateDirty() {
    this.isDirty = true
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
