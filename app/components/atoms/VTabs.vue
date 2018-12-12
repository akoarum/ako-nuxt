<template>
  <ul role="tablist" class="tabs">
    <li v-for="tab in tabs" :key="tab.id" role="presentation">
      <button
        :id="`tab-${id}-${tab.id}`"
        :ref="tab.id"
        :aria-controls="`tabpanel-${id}-${tab.id}`"
        :aria-selected="String(tab.id === current)"
        :tabindex="tab.id === current ? '0' : '-1'"
        role="tab"
        type="button"
        @click="$emit('update', tab.id)"
        @keyup.39.37="keyupHandler($event, tab)"
      >
        {{ tab.display }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    id: { type: Number, required: true },
    current: { type: String, required: true },
    tabs: { type: Array, required: true }
  },
  computed: {
    tabIds() {
      return this.tabs.map(tab => tab.id)
    }
  },
  watch: {
    current() {
      this.$refs[this.current][0].focus()
    }
  },
  methods: {
    keyupHandler(event) {
      const index = this.tabIds.indexOf(this.current)

      if (event.keyCode === 37) {
        if (index === 0) return
        this.$emit('update', this.tabIds[index - 1])
      }

      if (event.keyCode === 39) {
        if (index === this.tabIds.length - 1) return
        this.$emit('update', this.tabIds[index + 1])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  background: $color-primary;

  > li {
    button {
      position: relative;
      padding: 9px 16px 8px;
      font-size: 1.4rem;
      color: #abdafb;
      transition: color $transition-duration $transition-easing;

      &::before {
        position: absolute;
        left: 0;
        bottom: 0;
        content: '';
        width: 100%;
        height: 2px;
        background: $color-secondary;
        opacity: 0;
        transition: opacity $transition-duration $transition-easing;
      }

      &[aria-selected='true'] {
        color: #fff;

        &::before {
          opacity: 1;
        }
      }
    }
  }

  @media screen and (min-width: 768px) {
    > li {
      button {
        &:hover,
        &:focus {
          color: #fff;
        }
      }
    }
  }
}
</style>
