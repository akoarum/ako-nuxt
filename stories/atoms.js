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
import VButton from '~/components/atoms/VButton/index'

storiesOf('Atoms', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter({}))
  .add('VButton', () => ({
    components: { VButton },
    props: {
      label: { default: text('ラベル', 'ボタン') },
      secondary: { default: boolean('secondary', false) },
      caution: { default: boolean('caution', false) },
      small: { default: boolean('small', false) }
    },
    template: `
      <VButton :secondary="secondary" :caution="caution" :small="small" @click="click">{{ label }}</VButton>
    `,
    methods: {
      click: action('click')
    }
  }), { info: {} })
