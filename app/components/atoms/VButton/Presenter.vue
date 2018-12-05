<script>
export default {
  props: {
    label: { type: String, required: true },
    primary: { type: Boolean },
    secondary: { type: Boolean },
    small: { type: Boolean }
  },
  computed: {
    appearanceClasses() {
      const classes = []

      if (this.primary) {
        classes.push('-primary')
      }

      if (this.secondary) {
        classes.push('-secondary')
      }

      if (this.small) {
        classes.push('-small')
      }

      return classes
    }
  }
}
</script>
