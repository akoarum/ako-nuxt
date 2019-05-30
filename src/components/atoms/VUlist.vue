<template>
  <ul :class="styledClass" class="list">
    <template v-for="item in items">
      <li :key="item.id" class="list__item">{{ item.label }}</li>
    </template>
  </ul>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { ListItem } from '~/types/models'

export default Vue.extend({
  props: {
    items: { type: Array as PropType<ListItem[]>, required: true },
    ordered: { type: Boolean }
  },
  computed: {
    styledClass(): string {
      if (this.ordered) return '-ordered'
      return ''
    }
  }
})
</script>

<style lang="scss" scoped>
@import './styles/list';
</style>
