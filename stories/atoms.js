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
import VList from '~/components/atoms/VList'
import TextIcon from '~/components/atoms/TextIcon'
import VLabel from '~/components/atoms/VLabel'
import VBalloon from '~/components/atoms/VBalloon'
import VMask from '~/components/atoms/VMask'
import VContainer from '~/components/atoms/VContainer'
import VLink from '~/components/atoms/VLink'
import VCheckbox from '~/components/atoms/VCheckbox'
import VSelect from '~/components/atoms/VSelect'
import VRadio from '~/components/atoms/VRadio'
import VTextarea from '~/components/atoms/VTextarea'
import VInput from '~/components/atoms/VInput'
import VHeading from '~/components/atoms/VHeading'
import VTexts from '~/components/atoms/VTexts'
import VButton from '~/components/atoms/VButton/index'

storiesOf('Atoms', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter({}))
  .add('VButton', () => ({
    components: { VButton },
    props: {
      label: { default: text('ラベル', 'ボタン') },
      disabled: { default: boolean('非活性', false) },
      secondary: { default: boolean('スタイル - secondary', false) },
      caution: { default: boolean('スタイル - caution', false) }
    },
    template: `
      <VButton :disabled="disabled" :secondary="secondary" :caution="caution" @click="action">{{ label }}</VButton>
    `,
    methods: {
      action: action('click')
    }
  }), { info: {} })
  .add('VTexts', () => ({
    components: { VTexts },
    props: {
      text: {
        default: text('テキスト', '吾輩は猫である。名前はまだ無い。\nどこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャー')
      },
      caution: { default: boolean('スタイル - caution', false) },
      small: { default: boolean('スタイル - small', false) }
    },
    template: `
      <VTexts :caution="caution" :small="small">{{ text }}</VTexts>
    `
  }), { info: {} })
  .add('VHeading', () => ({
    components: { VHeading },
    props: {
      text: { default: text('テキスト', '吾輩は猫である') },
      level: { default: number('レベル', 2) },
      visual: { default: number('見た目のレベル', 2) }
    },
    template: `
      <VHeading :level="level" :visual="visual">{{ text }}</VHeading>
    `
  }), { info: {} })
  .add('VInput', () => ({
    components: { VInput },
    props: {
      type: { default: text('Type', 'text') }
    },
    template: `
      <VInput v-model="value" :type="type" />
    `,
    data() {
      return {
        value: ''
      }
    }
  }), { info: {} })
  .add('VTextarea', () => ({
    components: { VTextarea },
    template: `
      <VTextarea v-model="value" />
    `,
    data() {
      return {
        value: ''
      }
    }
  }), { info: {} })
  .add('VRadio', () => ({
    components: { VRadio },
    template: `
      <VRadio v-model="value" name="name" id="id" value="1" required>
        ラベル
      </VRadio>
    `,
    data() {
      return {
        value: ''
      }
    }
  }), { info: {} })
  .add('VSelect', () => ({
    components: { VSelect },
    template: `
      <VSelect v-model="value" :options="options" />
    `,
    data() {
      return {
        options: [
          { id: 1, label: '項目1', value: '1' },
          { id: 2, label: '項目2', value: '2' },
          { id: 3, label: '項目3', value: '3' }
        ],
        value: ''
      }
    }
  }), { info: {} })
  .add('VCheckbox', () => ({
    components: { VCheckbox },
    template: `
      <VCheckbox v-model="value" name="name" value="1">ラベル</VCheckbox>
    `,
    data() {
      return {
        value: []
      }
    }
  }), { info: {} })
  .add('VLink', () => ({
    components: { VLink },
    props: {
      label: {
        default: text('リンクラベル', 'リンク')
      }
    },
    template: `
      <VLink href="https://google.co.jp" target="_blank" rel="noopener">{{ label }}</VLink>
    `
  }), { info: {} })
  .add('VContainer', () => ({
    components: { VContainer, VTexts },
    props: {
      texts: {
        default: text('コンテンツテキスト', '吾輩は猫である。名前はまだ無い。\nどこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャー')
      },
      maxWidth: {
        default: text('maxWidth', '1024px')
      }
    },
    template: `
      <VContainer :max-width="maxWidth">
        <VTexts>{{ texts }}</VTexts>
      </VContainer>
    `
  }), { info: {} })
  .add('VMask', () => ({
    components: { VMask },
    props: {
      transparent: { default: boolean('透明', false) }
    },
    template: `
      <VMask :style="styles" :transparent="transparent" @click="click" />
    `,
    computed: {
      styles() {
        return {
          border: '1px solid #ccc',
          width: '100px',
          height: '100px'
        }
      }
    },
    methods: {
      click: action('click')
    }
  }), { info: {} })
  .add('VBalloon', () => ({
    components: { VBalloon, VTexts },
    template: `
      <VBalloon>
        <VTexts small>吾輩は猫である。名前はまだ無い。</VTexts>
      </VBalloon>
    `
  }), { info: {} })
  .add('VLabel', () => {
    const tag = select('要素', {
      label: 'label',
      span: 'span'
    }, 'label')
    return {
      components: { VLabel },
      props: {
        label: { default: text('ラベル', '名前') },
        tag: { default: tag },
        htmlFor: { default: text('for', 'test') },
        id: { default: text('ID', 'label') }
      },
      template: `
        <VLabel :tag="tag" :for="htmlFor" :id="id">{{ label }}</VLabel>
      `
    }
  }, { info: {} })
  .add('TextIcon', () => ({
    components: { TextIcon },
    props: {
      label: { default: text('ラベル', 'ラベル') },
      primary: { default: boolean('プライマリカラー', false) },
      secondary: { default: boolean('セカンダリカラー', false) },
      caution: { default: boolean('警告カラー', false) }
    },
    template: `
      <TextIcon :primary="primary" :secondary="secondary" :caution="caution">{{ label }}</TextIcon>
    `
  }), { info: {} })
  .add('VList', () => {
    const tags = select('要素', {
      ul: 'ul',
      ol: 'ol'
    }, 'ul')

    return {
      components: { VList },
      props: {
        tag: { default: tags },
        ordered: { default: boolean('ナンバリングスタイル', false) }
      },
      template: `
        <VList :items="items" :tag="tag" :ordered="ordered" />
      `,
      data() {
        return {
          items: [
            { id: 1, display: '吾輩は猫である' },
            { id: 2, display: '坊ちゃん' },
            { id: 3, display: '人間失格' }
          ]
        }
      }
    }
  }, { info: {} })
