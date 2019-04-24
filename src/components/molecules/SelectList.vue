<template>
  <ul class="selectList">
    <li v-for="select in selects" :key="select.id" class="selectList__item">
      <ToggleButton v-model="model" :name="name" :value="select.value">
        {{ select.label }}
      </ToggleButton>
    </li>
  </ul>
</template>

<script>
import { ToggleButton } from '~/components/atoms'

export default {
  components: { ToggleButton },
  model: {
    event: 'change'
  },
  props: {
    name: { type: String, required: true },
    selects: { type: Array, required: true },
    value: { type: Array }
  },
  computed: {
    model: {
      set(value) {
        this.$emit('change', value)
      },
      get() {
        return this.value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.selectList {
  @include media-min {
    display: flex;
    flex-wrap: wrap;
    margin-top: -14px;
    margin-left: percentage(-16px / 1024px);
  }
}

.selectList__item {
  @include media-min {
    margin-top: 14px;
    margin-left: percentage(16px / 1040px);
    width: percentage(244px / 1040px);
  }
}

.selectList__item + .selectList__item {
  @include media-max {
    margin-top: 14px;
  }
}
</style>
