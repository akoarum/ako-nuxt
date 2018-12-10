<template>
  <div class="inputRadio">
    <ul class="inputRadio__list">
      <li v-for="item in items" :key="item.id">
        <VInputRadio
          :name="name"
          :value="item.value"
          :label="item.display"
          :checked-value="value"
          :required="required"
          :disabled="disabled"
          @change="changeHandler"
        />
      </li>
    </ul>
    <VTexts v-show="error" :text="error" error class="inputRadio__error" />
  </div>
</template>

<script>
import { VALIDATES } from '~/functions/variables'
import VInputRadio from '~/components/atoms/VInputRadio'
import VTexts from '~/components/atoms/VTexts'

export default {
  components: { VInputRadio, VTexts },
  model: {
    event: 'change'
  },
  props: {
    name: { type: String, required: true },
    value: { type: String, required: true },
    items: { type: Array, required: true },
    required: { type: Boolean },
    disabled: { type: Boolean }
  },
  data() {
    return {
      error: ''
    }
  },
  methods: {
    changeHandler(value) {
      this.$emit('change', value)
    },
    validate() {
      if (this.required && !this.value) {
        return VALIDATES.EMPTY.message
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.inputRadio {
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
