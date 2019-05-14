import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import {
  withKnobs,
  text,
  number,
  select,
  radios,
  boolean
} from '@storybook/addon-knobs'
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-router'


storiesOf('Atoms', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter({}))
