import Vue, { CreateElement, VNode } from 'vue'

export default Vue.extend({
  props: {
    level: { type: Number, default: 2 },
    visual: { type: Number, default: 2 }
  },
  render(h: CreateElement): VNode {
    const Tag: string = `h${this.level}`
    const classes: string[] = ['vHeading']
    const content = this.$slots.default ? this.$slots.default[0].text : ''

    classes.push(`lv${this.visual}`)

    return <h2 { ...{ style: styles[`lv${this.visual}`] }}>{content}</h2>
  }
})

const styles: { [key: string]: any } = {
  lv2: {
    fontSize: '2.3rem',
    lineHeight: '1.4'
  },
  lv3: {
    fontSize: '2rem',
    lineHeight: '1.5'
  },
  lv4: {
    fontSize: '1.8rem',
    lineHeight: '1.5'
  }
}
