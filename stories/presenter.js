import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import {
  withKnobs,
  text,
  number,
  select,
  boolean
} from '@storybook/addon-knobs'
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-router'
import FadeTransition from '~/components/presenter/FadeTransition'

storiesOf('Presenter', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter({}))
  .add('FadeTransition', () => ({
    components: { FadeTransition },
    template: `
      <FadeTransition />
    `
  }), { info: {} })
