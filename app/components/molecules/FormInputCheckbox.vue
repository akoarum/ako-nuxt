<template>
  <div class="inputCheckbox">
    <ul class="inputCheckbox__list">
      <li v-for="item in items" :key="item.id">
        <VInputCheckbox
          :name="name"
          :value="item.value"
          :label="item.display"
          :checked="value"
          :error="!!error"
          :required="required"
          :aria-describedby="error ? `${name}-error` : ''"
          @change="changeHandler"
        />
      </li>
    </ul>
    <VTexts
      v-show="error"
      :id="`${name}-error`"
      :text="error"
      :aria-live="error ? 'assertive' : 'off'"
      role="alert"
      error
      class="inputCheckbox__error"
    />
  </div>
</template>

<script>
import { VALIDATES } from '~/assets/js/variables'
import VInputCheckbox from '~/components/atoms/VInputCheckbox'
import VTexts from '~/components/atoms/VTexts'

export default {
  components: { VInputCheckbox, VTexts },
  model: {
    event: 'change'
  },
  props: {
    name: { type: String, required: true },
    value: { type: Array, required: true },
    items: { type: Array, required: true },
    required: { type: Boolean },
    disabled: { type: Boolean }
  },
  data() {
    return {
      error: '',
      isDirtied: false
    }
  },
  watch: {
    error() {
      this.$emit('error', !!this.error)
    },
    value() {
      if (!this.isDirtied) return
      this.error = this.validate()
    }
  },
  methods: {
    changeHandler({ value, checked }) {
      let newValue

      if (!this.isDirtied) {
        this.isDirtied = true
      }

      if (checked) {
        newValue = this.value.concat([value])
      } else {
        newValue = this.value.filter(item => item !== value)
      }

      this.$emit('change', newValue)
    },
    validate() {
      if (!this.isDirtied) return ''

      if (this.required && !this.value.length) {
        return VALIDATES.SELECT.message
      }

      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.inputCheckbox {
  @media screen and (min-width: 768px) {
    &__list {
      > li {
        + li {
          margin-top: 6px;
        }
      }
    }
    &__error {
      margin-top: 4px;
    }
  }

  @media screen and (max-width: 767px) {
    &__list {
      > li {
        + li {
          margin-top: 8px;
        }
      }
    }
    &__error {
      margin-top: 3px;
    }
  }
}
</style>
