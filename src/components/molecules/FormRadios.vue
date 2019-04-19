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

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { VALIDATES } from '~/utils/variables.ts'
import { VRadio, VTexts } from '~/components/atoms'

interface Select {
  id: number
  name: string
  value: string
}

@Component({
  components: { VRadio, VTexts }
})
export default class FormRadios extends Vue {
  private inheritAttrs = false

  @Prop() public name!: string
  @Prop() public selects!: Select[]
  @Prop() public value?: string
  @Prop() public required?: boolean

  public error: string = ''
  public isDirty: boolean = !!this.value || !this.required

  public set model(value: string) {
    this.$emit('change', value)
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
    if (!this.required) return ''
    if (!this.isDirty) return ''
    if (!value) return VALIDATES.selected
    return ''
  }

  public updateDirty() {
    this.isDirty = true
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
