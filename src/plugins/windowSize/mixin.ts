import Vue from 'vue'
import WindowSize from './WindowSize'

export const windowSize = new WindowSize().init()

const vm = new Vue({ data: { windowSize } })

export const mixin = {
  computed: {
    windowWidth(): number {
      return vm.windowSize.width
    },
    windowHeight(): number {
      return vm.windowSize.height
    }
  }
}
