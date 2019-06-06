<script lang="ts">
import Vue, { CreateElement, VNode } from 'vue'

export default Vue.extend({
  props: {
    level: { type: Number, default: 2 },
    visual: { type: Number, default: 2 }
  },
  computed: {
    styledClass(): string {
      return `-lv${this.visual}`
    }
  },
  render(createElement: CreateElement): VNode {
    return createElement(
      `h${this.level}`,
      { class: `vHeading ${this.styledClass}` },
      this.$slots.default
    )
  }
})
</script>

<style lang="scss" scoped>
.vHeading.-lv2 {
  @include media-min {
    font-size: 2.3rem;
    line-height: 1.4;
  }

  @include media-max {
    font-size: 2.2rem;
    line-height: 1.5;
  }
}

.vHeading.-lv3 {
  font-size: 2rem;
  line-height: 1.5;
}

.vHeading.-lv4 {
  font-size: 1.8rem;
  line-height: 1.5;
}
</style>
