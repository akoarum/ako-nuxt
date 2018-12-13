<script>
import VTabs from '~/components/atoms/VTabs'

export default {
  components: { VTabs },
  props: {
    tabs: { type: Array, required: true }
  },
  data() {
    return {
      current: ''
    }
  },
  computed: {
    id() {
      return this._uid
    }
  },
  created() {
    this.current = this.tabs[0].id
  },
  methods: {
    updateCurrent(id) {
      this.current = id
    }
  },
  // eslint-disable-next-line no-unused-vars
  render(h) {
    const panels = this.$slots.default
      .filter(panel => /VTabPanel/i.test(panel.tag))
      .map((panel, i) => {
        const handler = this.tabs[i]
        return (
          <div
            id={`tabpanel-${this.id}-${handler.id}`}
            class="tab__panel"
            role="tabpanel"
            aria-hidden={this.current === handler.id ? 'false' : 'true'}
            aria-labelledby={`tab-${this.id}-${handler.id}`}
            hidden={this.current !== handler.id}
          >
            {panel}
          </div>
        )
      })

    return (
      <div class="tab">
        <VTabs
          id={this.id}
          tabs={this.tabs}
          current={this.current}
          onUpdate={this.updateCurrent}
          class="tab__list"
        />
        {panels}
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.tab {
  @media screen and (min-width: 768px) {
    &__list {
      margin-bottom: 14px;
    }
  }
  @media screen and (max-width: 767px) {
    &__list {
      margin-bottom: 12px;
    }
  }
}
</style>
