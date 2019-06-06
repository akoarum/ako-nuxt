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
import VClose from '~/components/icons/VClose'
import VCaret from '~/components/icons/VCaret'

storiesOf('Icons', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter({}))
  .add('VCaret', () => ({
    components: { VCaret },
    props: {
      width: { default: number('width', 8) },
      height: { default: number('height', 6) },
      color: { default: color('カラー', '#333') }
    },
    template: `
      <div :style="{ color: color }">
        <VCaret :width="width" :height="height" />
      </div>
    `
  }), { info: {} })
  .add('VClose', () => ({
    components: { VClose },
    props: {
      color: { default: color('カラー', '#333') }
    },
    template: `
      <div :style="{ color: color }">
        <VClose />
      </div>
    `
  }), { info: {} })
