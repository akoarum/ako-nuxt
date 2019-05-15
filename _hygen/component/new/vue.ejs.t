---
to: src/components/<%= category %>/<%= name %>.vue
---
<template>
  <div class="<%= h.changeCase.camelCase(name) %>"></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.<%= h.changeCase.camelCase(name) %> {
}
</style>
