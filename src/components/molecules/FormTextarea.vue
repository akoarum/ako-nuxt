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

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { VALIDATES } from '~/utils/variables.ts'
import { VTextarea, VTexts } from '~/components/atoms'

@Component({
  components: { VTextarea, VTexts }
})
export default class FormTextarea extends Vue {
  private inheritAttrs = false

  @Prop() public name!: string
  @Prop() public value!: string
  @Prop() public required?: boolean
  @Prop() public minlength?: number
  @Prop() public maxlength?: number

  public error: string = ''
  public isDirty: boolean = !!this.value || !this.required

  public set model(value: string) {
    this.$emit('input', value)
    this.error = this.validate(value)
  }

  public get model(): string {
    return this.value
  }

  @Watch('error')
  public emitError(value) {
    this.$emit('error', { name: this.name, error: !!value })
  }

  @Watch('isDirty')
  public emitDirty() {
    this.$emit('dirty', this.name)
  }

  public validate(value: string): string {
    if (!this.isDirty) return ''
    if (this.required && !value) return VALIDATES.required
    if (this.minlength && value.length < this.minlength) {
      return `${this.minlength}字以上で入力して下さい。`
    }
    if (this.maxlength && value.length > this.maxlength) {
      return `${this.maxlength}字以内で入力して下さい。`
    }
    return ''
  }

  public updateDirty() {
    if (!this.value || this.isDirty) return false
    this.isDirty = true
    this.error = this.validate(this.value)
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
