import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, select } from '@storybook/addon-knobs'
import VueInfoAddon from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-router'

import VButton from '~/components/atoms/VButton/VButton'
import VButtonLink from '~/components/atoms/VButton/VButtonLink'
import VHeadings from '~/components/atoms/VHeadings'
import VTexts from '~/components/atoms/VTexts'
import VInputText from '~/components/atoms/VInputText'
import VTextarea from '~/components/atoms/VTextarea'

storiesOf('Atoms', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter({}))
  .add('VButton', () => {
    const label = text('ラベル', 'ボタン')
    const disabled = select('活性 / 非活性', {
        'false': 'false',
        'true': 'true'
    }, 'false')
    const color = select('カラー', {
      'default': '',
      'primary': 'primary',
      'secondary': 'secondary'
    }, '')
    const size = select('サイズ', {
      'medium': '',
      'small': 'small'
    }, '')

    return {
      components: { VButton },
      template: `
        <VButton label="${label}" ${color} ${size} ${disabled === 'true' ? 'disabled': ''} @click="action" />
      `,
      methods: {
        action: action('action')
      }
    }
  })
  .add('VButtonLink', () => {
    const label = text('ラベル', 'ボタン')
    const color = select('カラー', {
      'default': '',
      'primary': 'primary',
      'secondary': 'secondary'
    }, '')
    const size = select('サイズ', {
      'medium': '',
      'small': 'small'
    }, '')

    return {
      components: { VButtonLink },
      template: `
        <VButtonLink to="/" label="${label}" ${color} ${size} />
      `
    }
  })
  .add('VHeadings', () => {
    const level = select('レベル', {
      '2': '2',
      '3': '3',
      '4': '4'
    }, '2')
    const visual = select('見た目レベル', {
      '2': '2',
      '3': '3',
      '4': '4'
    }, '2')
    const texts = text('テキスト', 'あのイーハトーヴォのすきとおった風')

    return {
      components: { VHeadings },
      template: `
        <VHeadings :level="${Number(level)}" :visual-level="${Number(visual)}" text="${texts}" />
      `
    }
  })
  .add('VTexts', () => {
    const texts = text('テキスト', 'あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、\nうつくしい森で飾られたモリーオ市。')

    return {
      components: { VTexts },
      template: `<VTexts text="${texts}" />`
    }
  })
  .add('VInputText', () => {
    const type = select('TYPE', {
      'text': 'text',
      'number': 'number',
      'email': 'email',
      'tel': 'tel'
    }, 'text')
    const error = select('エラー', {
      'なし': 'false',
      'あり': 'true'
    }, 'false')

    return {
      components: { VInputText },
      template: `
        <VInputText :value="value"
                    type="${type}"
                    name="test"
                    id="test-input"
                    ${error === 'true' ? 'error' : ''}
                    @focus="focusHandler"
                    @blur="blurHandler"
                    @input="inputHandler" />`,
      data() {
        return {
          value: ''
        }
      },
      methods: {
        focusHandler: action('focus'),
        blurHandler: action('blur'),
        inputHandler: action('input')
      }
    }
  })
  .add('VTextarea', () => {
    const error = select('エラー', {
      'なし': 'false',
      'あり': 'true'
    }, 'false')

    return {
      components: { VTextarea },
      template: `
        <VTextarea :value="value"
                    name="test"
                    id="test-input"
                    ${error === 'true' ? 'error' : ''}
                    @focus="focusHandler"
                    @blur="blurHandler"
                    @input="inputHandler" />`,
      data() {
        return {
          value: ''
        }
      },
      methods: {
        focusHandler: action('focus'),
        blurHandler: action('blur'),
        inputHandler: action('input')
      }
    }
  })
