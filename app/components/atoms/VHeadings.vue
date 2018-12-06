<script>
export default {
  props: {
    level: { type: Number, required: true },
    text: { type: String, required: true },
    visualLevel: { type: Number }
  },
  // eslint-disable-next-line no-unused-vars
  render(h) {
    const Tag = `h${this.level}`
    const visualClass = this.visualLevel
      ? `-lv${this.visualLevel}`
      : `-lv${this.level}`

    return <Tag class={['heading', visualClass]}>{this.text}</Tag>
  }
}
</script>

<style lang="scss" scoped>
.heading {
  &.-lv4 {
    font-size: 1.8rem;
    line-height: 1.4;
  }

  @media screen and (min-width: 768px) {
    &.-lv2 {
      font-size: 2.4rem;
      line-height: 1.2;
    }
    &.-lv3 {
      font-size: 2.1rem;
      line-height: 1.3;
    }
  }

  @media screen and (max-width: 767px) {
    &.-lv2 {
      font-size: 2.2rem;
      line-height: 1.3;
    }
    &.-lv3 {
      font-size: 2rem;
      line-height: 1.3;
    }
  }
}
</style>
