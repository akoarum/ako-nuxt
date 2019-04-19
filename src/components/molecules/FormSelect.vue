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

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { VSelect, VTexts } from '~/components/atoms'
import { VALIDATES } from '~/utils/variables.ts'

interface Option {
  id: number
  value: string
  label: string
}

@Component({
  components: { VSelect, VTexts }
})
export default class FormSelect extends Vue {
  private inheritAttrs = false

  @Prop() public name!: string
  @Prop() public options!: Option[]
  @Prop() public value?: string
  @Prop() public required?: boolean

  public error: string = ''
  public isDirty: boolean = !!this.value || !this.required

  public set model(value: string) {
    this.$emit('change', value)
    this.error = this.validate(value)
    this.updateDirty(value)
  }

  public get model(): string {
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

  public validate(value: string): string {
    if (!this.required || !this.isDirty) return ''
    if (!value) return VALIDATES.selected
    return ''
  }

  public updateDirty(value: string) {
    if (!value || this.isDirty) return
    this.isDirty = true
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
