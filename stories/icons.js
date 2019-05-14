import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import {
  withKnobs,
  text,
  number,
  select,
  boolean,
  color
} from '@storybook/addon-knobs'
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-router'

storiesOf('Icons', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter({}))
