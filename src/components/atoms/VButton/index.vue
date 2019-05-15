<template>
  <button
    v-bind="$attrs"
    :class="styledClasses"
    type="button"
    class="vButton"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class VButton extends Vue {
  @Prop() private secondary?: boolean
  @Prop() private caution?: boolean
  @Prop() private small?: boolean

  public get styledClasses(): string[] {
    const classes: string[] = []

    if (this.secondary) {
      classes.push('-secondary')
    }

    if (this.caution) {
      classes.push('-caution')
    }

    if (this.small) {
      classes.push('-small')
    }

    return classes
  }
}
</script>

<style lang="scss" scoped>
.vButton {
  display: inline-block;
  border-radius: 2px;
  box-sizing: border-box;
  width: 100%;
  background: $color-theme;
  font-size: $fontSize-pc;
  line-height: 1.3;
  color: #fff;
  text-align: center;
  transition: background 0.3s $easing;

  @include media-min {
    padding: 9px 14px 8px;
    max-width: 160px;

    &:hover,
    &:focus {
      background: #5dc5e8;
    }
  }

  @include media-max {
    padding: 10px 16px 9px;
  }
}

.-secondary {
  background: $color-secondary;

  @include media-min {
    &:hover,
    &:focus {
      background: #49bb99;
    }
  }
}

.-caution {
  background: $color-caution;

  @include media-min {
    &:hover,
    &:focus {
      background: #f75656;
    }
  }
}

.btn:disabled {
  background: $color-notice;
  cursor: default;

  &:hover,
  &:focus {
    background: $color-notice;
  }
}
</style>
