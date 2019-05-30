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
import VSelect from '~/components/atoms/VSelect'
import VCheckbox from '~/components/atoms/VCheckbox'
import VRadio from '~/components/atoms/VRadio'
import VTextarea from '~/components/atoms/VTextarea'
import VInput from '~/components/atoms/VInput'
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
  .add('VInput', () => {
    const type = select('type', {
      text: 'text',
      number: 'number',
      email: 'email',
      tel: 'tel',
      password: 'password'
    }, 'text')
    return {
      components: { VInput },
      props: {
        type: { default: type }
      },
      template: `
        <VInput
          :type="type"
          v-model="value"
          @focus="focus"
          @input="input"
          @blur="blur"
        />
      `,
      data() {
        return {
          value: ''
        }
      },
      methods: {
        focus: action('focus'),
        input: action('input'),
        blur: action('blur')
      }
    }
  }, { info: {} })
  .add('VTextarea', () => ({
    components: { VTextarea },
    template: `
      <VTextarea v-model="value" @focus="focus" @input="input" @blur="blur" />
    `,
    data() {
      return {
        value: ''
      }
    },
    methods: {
      focus: action('focus'),
      input: action('input'),
      blur: action('blur')
    }
  }), { info: {} })
  .add('VRadio', () => ({
    components: { VRadio },
    props: {
      label: { default: text('ラベル', 'ラジオ項目') }
    },
    template: `
      <VRadio v-model="value" value="value" @change="change">{{ label }}</VRadio>
    `,
    data() {
      return {
        value: ''
      }
    },
    methods: {
      change: action('change')
    }
  }), { info: {} })
  .add('VCheckbox', () => ({
    components: { VCheckbox },
    template: `
      <VCheckbox v-model="model" :value="1" @change="change">項目1</VCheckbox>
    `,
    data() {
      return {
        value: false
      }
    },
    computed: {
      model: {
        set() {
          this.value = !this.value
        },
        get() {
          return this.value
        }
      }
    },
    methods: {
      change: action('change')
    }
  }), { info: {} })
  .add('VSelect', () => ({
    components: { VSelect },
    template: `
      <VSelect v-model="value" :options="options" @change="change" />
    `,
    data() {
      return {
        options: [
          { id: 1, label: '項目1' },
          { id: 2, label: '項目2' },
          { id: 3, label: '項目3' }
        ],
        value: null
      }
    },
    methods: {
      change: action('change')
    }
  }), { info: {} })
