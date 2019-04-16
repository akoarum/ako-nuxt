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
import ModalContainer from '~/components/molecules/ModalContainer'
import FormCheckboxes from '~/components/molecules/FormCheckboxes'
import FormTextarea from '~/components/molecules/FormTextarea'
import FormSelect from '~/components/molecules/FormSelect'
import FormRadios from '~/components/molecules/FormRadios'
import FormInput from '~/components/molecules/FormInput'

storiesOf('Molecules', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter({}))
  .add('FormInput', () => ({
    components: { FormInput },
    template: `
      <FormInput
        v-model="value"
        type="text"
        name="name"
        required
        @error="error"
        @dirty="dirty"
      />
    `,
    data() {
      return {
        value: ''
      }
    },
    methods: {
      error: action('error'),
      dirty: action('dirty')
    }
  }), { info: {} })
  .add('FormRadios', () => ({
    components: { FormRadios },
    template: `
      <FormRadios
        v-model="value"
        name="name"
        :selects="selects"
        required
        @error="error"
        @dirty="dirty"
      />
    `,
    data() {
      return {
        selects: [
          { id: 1, label: '項目1', value: '1' },
          { id: 2, label: '項目2', value: '2' },
          { id: 3, label: '項目3', value: '3' }
        ],
        value: ''
      }
    },
    methods: {
      error: action('error'),
      dirty: action('dirty')
    }
  }), { info: {} })
  .add('FormSelect', () => ({
    components: { FormSelect },
    template: `
      <FormSelect
        v-model="value"
        name="name"
        :options="options"
        required
        @error="error"
        @dirty="dirty"
      />
    `,
    data() {
      return {
        options: [
          { id: 0, label: '', value: '' },
          { id: 1, label: '項目1', value: '1' },
          { id: 2, label: '項目2', value: '2' },
          { id: 3, label: '項目3', value: '3' },
        ],
        value: ''
      }
    },
    methods: {
      error: action('error'),
      dirty: action('dirty')
    }
  }), { info: {} })
  .add('FormTextarea', () => ({
    components: { FormTextarea },
    template: `
      <FormTextarea
        v-model="value"
        name="name"
        :minlength="5"
        required
        @error="error"
        @dirty="dirty"
      />
    `,
    data() {
      return {
        value: ''
      }
    },
    methods: {
      error: action('error'),
      dirty: action('dirty')
    }
  }), { info: {} })
  .add('FormCheckboxes', () => ({
    components: { FormCheckboxes },
    props: {
      min: {
        default: number('min', 0, { min: 0 })
      },
      max: {
        default: number('max', 0, { min: 0 })
      },
    },
    template: `
      <FormCheckboxes
        v-model="value"
        name="name"
        :selects="selects"
        :min="min"
        :max="max"
        required
        @error="error"
        @dirty="dirty"
      />
    `,
    data() {
      return {
        selects: [
          { id: 1, label: '項目1', value: '1' },
          { id: 2, label: '項目2', value: '2' },
          { id: 3, label: '項目3', value: '3' }
        ],
        value: []
      }
    },
    methods: {
      error: action('error'),
      dirty: action('dirty')
    }
  }), { info: {} })
  .add('ModalContainer', () => ({
    components: { ModalContainer },
    template: `
      <div>
        <ModalContainer :is-visible="visible" @close="handleClose">
          <p>吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャー</p>
        </ModalContainer>
        <button ref="handler" type="button" @click="visible = true">表示する</button>
      </div>
    `,
    data() {
      return {
        visible: false
      }
    },
    methods: {
      handleClose() {
        this.$refs.handler.focus()
        this.visible = false
      }
    }
  }), { info: {} })
