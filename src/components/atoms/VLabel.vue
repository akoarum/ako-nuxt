<script>
export default {
  props: {
    span: { type: Boolean },
    for: { type: String },
    id: { type: String }
  },
  render(h) {
    const Tag = this.span ? 'span' : 'label'
    return (
      <Tag class="vLabel" for={this.for} id={this.id}>
        {this.$slots.default}
      </Tag>
    )
  }
}
</script>

<style lang="scss" scoped>
.vLabel {
  font-weight: bold;

  @include media-min {
    font-size: $fontSize-pc;
  }

  @include media-max {
    font-size: $fontSize-sp;
  }
}
</style>
