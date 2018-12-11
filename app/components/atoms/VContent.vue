<script>
export default {
  props: {
    tag: { type: String, default: 'div' }
  },
  // eslint-disable-next-line no-unused-vars
  render(h) {
    const Tag = this.tag
    return <Tag class="content">{this.$slots.default}</Tag>
  }
}
</script>

<style lang="scss" scoped>
.content {
  background: #fff;
}
</style>
