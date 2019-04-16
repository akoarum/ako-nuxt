<script>
export default {
  props: {
    level: { type: Number, default: 2 },
    visual: { type: Number, default: 2 }
  },
  render(h) {
    const Tag = `h${this.level}`
    return <Tag class={`vHeading${this.visual}`}>{this.$slots.default}</Tag>
  }
}
</script>

<style lang="scss" scoped>
.vHeading2 {
  @include media-min {
    font-size: 2.3rem;
    line-height: 1.4;
  }
  @include media-max {
    font-size: 2.2rem;
    line-height: 1.5;
  }
}

.vHeading3 {
  font-size: 2rem;
  line-height: 1.5;
}

.vHeading4 {
  font-size: 1.8rem;
  line-height: 1.5;
}
</style>
