<script>
export default {
  props: {
    items: { type: Array, required: true },
    tag: { type: String, default: 'ul' },
    ordered: { type: Boolean }
  },
  computed: {
    styledClass() {
      if (this.ordered) return '-ordered'
      return ''
    }
  },
  render(h) {
    const Tag = this.tag
    const classes = ['vList'].concat([this.styledClass])
    return (
      <Tag class={classes.join(' ')}>
        {this.items.map(item => (
          <li class="vList__item" key={item.id}>
            {item.display}
          </li>
        ))}
      </Tag>
    )
  }
}
</script>

<style lang="scss" scoped>
.vList {
  @include media-min {
    font-size: $fontSize-pc;
  }

  @include media-max {
    font-size: $fontSize-sp;
  }
}

.vList__item {
  position: relative;

  &::before {
    position: absolute;
    left: 2px;
    content: '';
    border-radius: 50%;
    width: 5px;
    height: 5px;
    background: $color-theme;
  }

  @include media-min {
    padding-left: 16px;

    &::before {
      top: 0.55em;
    }
  }

  @include media-max {
    padding-left: 14px;

    &::before {
      top: 0.6em;
    }
  }
}

.vList__item + .vList__item {
  @include media-min {
    margin-top: 4px;
  }

  @include media-max {
    margin-top: 3px;
  }
}

.-ordered .vList {
  counter-reset: count;
}

.-ordered .vList__item {
  padding-left: 1.4em;
  counter-increment: count;

  &::before {
    top: 0.05em;
    left: 0;
    content: counter(count) '.';
    border-radius: 0;
    width: auto;
    height: auto;
    background: transparent;
  }
}
</style>
