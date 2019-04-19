<template>
  <div class="decorator">
    <slot name="story"></slot>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default Vue.extend({
  name: 'Decorator',
  store: new Vuex.Store({
    state: {},
    actions: {
      LOGIN() {},
      UPDATE_ANSWER() {}
    },
    getters: {
      getAnswerById: () => (id) => {
        if (id < 4) return ''
        if (id === 4) return []
      }
    }
  })
})
</script>

<style lang="scss">
@import '../src/assets/scss/normalize';
</style>
