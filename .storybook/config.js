import { configure, addDecorator } from '@storybook/vue'
import Vue from 'vue'
import Vuex from 'vuex'
import Decorator from './Decorator.vue'
import windowSize from '../src/plugins/windowSize/index.ts'

Vue.use(Vuex)
Vue.use(windowSize)

addDecorator(() => ({
  components: { Decorator },
  template: `
    <Decorator>
      <story slot="story" />
    </Decorator>
  `
}))

const context = require.context('../stories/', true, /^.*?\.js$/)

function loadStories() {
  context.keys().forEach(filename => {
    context(filename)
  })
}

configure(loadStories, module)
