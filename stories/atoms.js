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
import VTexts from '~/components/atoms/VTexts'
import VButton from '~/components/atoms/VButton'

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
  .add('VTexts', () => ({
    components: { VTexts },
    props: {
      texts: {
        default: text('テキスト', '吾輩は猫である。名前はまだ無い。\nどこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャー')
      },
      caution: { default: boolean('スタイル - caution', false) },
      small: { default: boolean('スタイル - small', false) }
    },
    template: `
      <VTexts :caution="caution" :small="small">{{ texts }}</VTexts>
    `
  }), { info: {} })
