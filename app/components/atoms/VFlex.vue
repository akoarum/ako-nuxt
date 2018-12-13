<script>
export default {
  props: {
    pcColumns: { type: Number, default: 3 },
    spColumns: { type: Number, default: 1 }
  },
  // eslint-disable-next-line no-unused-vars
  render(h) {
    const items = this.$slots.default
      .filter(item => /VFlexItem/i.test(item.tag))
      .map(item => <div class="flex__item">{item}</div>)
    const classes = []

    classes.push('flex')
    classes.push(`-pc-${this.pcColumns}`)
    classes.push(`-sp-${this.spColumns}`)

    return <div class={classes.join(' ')}>{items}</div>
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-wrap: wrap;

  @media screen and (min-width: 768px) {
    margin: -6px;
    .flex__item {
      padding: 6px;
    }

    &.-pc-2 {
      .flex__item {
        width: 50%;

        &:first-child,
        &:nth-child(2) {
          margin-top: 0;
        }
      }
    }
    &.-pc-3 {
      .flex__item {
        width: 33.3%;

        &:first-child,
        &:nth-child(2),
        &:nth-child(3) {
          margin-top: 0;
        }
      }
    }
    &.-pc-4 {
      .flex__item {
        width: 25%;

        &:first-child,
        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(4) {
          margin-top: 0;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    display: block;

    &.-sp-2,
    &.-sp-3 {
      display: flex;
      margin: -8px;

      .flex__item {
        padding: 8px;
      }
    }

    &.-sp-2 {
      .flex__item {
        width: 50%;
      }
    }
    &.-sp-3 {
      .flex__item {
        width: 33.3%;
      }
    }
  }
}
</style>
