import { configure, addDecorator } from '@storybook/vue'
import Vue from 'vue'
import Vuex from 'vuex'
import Decorator from './Decorator'
import '../app/plugins/displayDate'

Vue.use(Vuex)

addDecorator((story) => ({
  components: { Decorator },
  template: `
    <Decorator>
      <story slot="story"></story>
    </Decorator>
  `
}))

const context = require.context('../stories/', true, /^.*?\.js$/)

function loadStories() {
  context.keys().forEach((filename) => {
    context(filename)
  })
}

configure(loadStories, module)
