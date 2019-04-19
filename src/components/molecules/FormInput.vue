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

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { VALIDATES } from '~/utils/variables.ts'
import { VInput, VTexts } from '~/components/atoms'

@Component({
  components: { VInput, VTexts }
})
export default class FormInput extends Vue {
  private inheritAttrs = false

  @Prop() name!: string
  @Prop() type: string = 'text'
  @Prop() value!: string
  @Prop() required?: boolean

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
  public emitError(value: string) {
    this.$emit('error', { name: this.name, error: !!value })
  }

  @Watch('isDirty')
  public emitDirty() {
    this.$emit('dirty', this.name)
  }

  public validate(value: string): string {
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
  }

  public updateDirty() {
    if (!this.value || this.isDirty) return false
    this.isDirty = true
    this.error = this.validate(this.value)
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
