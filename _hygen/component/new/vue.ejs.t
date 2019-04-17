---
to: src/components/<%= category %>/<%= name %>.vue
---
<template>
  <div class="<%= h.changeCase.camelCase(name) %>"></div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.<%= h.changeCase.camelCase(name) %> {
}
</style>
