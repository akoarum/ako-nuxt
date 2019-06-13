<template>
  <article class="top">
    <h1>Hello Nuxt!</h1>
    <p>{{ token }}</p>
    <VButton @click="handleClick">ボタン</VButton>
  </article>
</template>

<script lang="ts">
import { VButton } from '~/components/atoms'

export default {
  components: { VButton },
  computed: {
    token(): string {
      return this.$getters['auth/getToken']
    }
  },
  methods: {
    handleClick() {
      this.$dispatch('auth/setToken', { token: 'test' })
    }
  }
}
</script>

<style lang="scss" scoped></style>
