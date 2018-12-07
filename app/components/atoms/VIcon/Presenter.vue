<script>
export default {
  props: {
    title: { type: String },
    primary: { type: Boolean },
    secondary: { type: Boolean }
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

      return classes
    }
  }
}
</script>
