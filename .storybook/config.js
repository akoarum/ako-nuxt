import { configure, addDecorator } from '@storybook/vue'
import Vue from 'vue'
import Vuex from 'vuex'
import Decorator from './Decorator'

Vue.use(Vuex)

addDecorator(() => ({
  components: { Decorator },
  template: `
    <Decorator>
      <story slot="story" />
    </Decorator>
  `
}))

const context = require.context('../src/stories/', true, /^.*?\.js$/)

function loadStories() {
  context.keys().forEach(filename => {
    context(filename)
  })
}

configure(loadStories, module)
