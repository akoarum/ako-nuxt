<script>
export default {
  props: {
    tag: { type: String, default: 'ul' },
    visual: { type: String, default: 'bullet' },
    items: { type: Array, required: true }
  },
  // eslint-disable-next-line no-unused-vars
  render(h) {
    const Tag = this.tag
    const visualClass = `-${this.visual}`
    const items = this.items.map(item => <li>{item}</li>)

    return <Tag class={['list', visualClass]}>{items}</Tag>
  }
}
</script>

<style lang="scss" scoped>
.list {
  font-size: $fontSize-base;

  > li {
    position: relative;

    &::before {
      position: absolute;
    }

    + li {
      margin-top: 5px;
    }
  }

  &.-bullet {
    > li {
      padding-left: 16px;

      &::before {
        left: 4px;
        top: 0.6em;
        content: '';
        border-radius: 50%;
        width: 4px;
        height: 4px;
        background: currentColor;
      }
    }
  }
  &.-number {
    counter-reset: number;

    > li {
      padding-left: 28px;

      &::before {
        left: 0;
        counter-increment: number;
        content: counter(number) '.';
      }
    }
  }
}
</style>
