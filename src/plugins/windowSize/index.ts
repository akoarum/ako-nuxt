import Vue, { VueConstructor } from 'vue'
import { mixin, windowSize } from './mixin'

export const windowSizeMixin = mixin
export const windowSizeApi = {
  init(): void {
    windowSize.init()
  },
  destroy(): void {
    windowSize.destroy()
  }
}

function install(Vue: VueConstructor) {
  Vue.mixin({
    mixins: [mixin]
  })
}

const plugin = { install }

Vue.use(plugin)

export default plugin
