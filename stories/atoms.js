import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, select } from '@storybook/addon-knobs'
import VueInfoAddon from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-router'

import VButton from '~/components/atoms/VButton/VButton'
import VButtonLink from '~/components/atoms/VButton/VButtonLink'

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
