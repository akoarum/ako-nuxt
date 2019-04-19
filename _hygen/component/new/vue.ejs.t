---
to: src/components/<%= category %>/<%= name %>.vue
---
<template>
  <div class="<%= h.changeCase.camelCase(name) %>"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class <%= name %> extends Vue {}
</script>

<style lang="scss" scoped>
.<%= h.changeCase.camelCase(name) %> {
}
</style>
