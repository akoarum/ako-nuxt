<template>
  <div class="vBox">
    <VHeading :level="level" :visual="3" class="vBox__title">
      {{ title }}
    </VHeading>
    <div class="vBox__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { VHeading } from '~/components/atoms'

export default Vue.extend({
  components: { VHeading },
  inheritAttrs: false,
  props: {
    title: { type: String, required: true },
    level: { type: Number, default: 2 }
  }
})
</script>

<style lang="scss" scoped>
.vBox {
  border: 1px solid $color-border;

  @include media-min {
    padding: 10px 16px 14px;
  }

  @include media-max {
    padding: 8px 14px 12px;
  }
}

.vBox__title {
  border-bottom: 1px solid $color-border;

  @include media-min {
    padding: 0 2px 6px;
  }

  @include media-max {
    padding: 0 2px 3px;
  }
}

.vBox__content {
  padding: 8px 2px 0;
}
</style>
