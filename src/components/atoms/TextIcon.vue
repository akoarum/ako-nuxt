<template>
  <i :class="styledClass" class="textIcon"><slot /></i>
</template>

<script>
export default {
  props: {
    primary: { type: Boolean },
    secondary: { type: Boolean },
    caution: { type: Boolean }
  },
  computed: {
    styledClass() {
      if (this.primary) return '-primary'
      if (this.secondary) return '-secondary'
      if (this.caution) return '-caution'
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.textIcon {
  display: inline-block;
  background: #eaeaea;
  line-height: 1;
  font-style: normal;

  @include media-min {
    padding: 5px 7px;
    font-size: 1.4rem;
  }

  @include media-max {
    padding: 3px 7px;
    font-size: 1.2rem;
  }
}

.-primary {
  background: $color-theme;
  color: #fff;
}

.-secondary {
  background: $color-secondary;
  color: #fff;
}

.-caution {
  background: $color-caution;
  color: #fff;
}
</style>
