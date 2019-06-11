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
import VModal from '~/components/molecules/VModal'
import FormCheckboxes from '~/components/molecules/FormCheckboxes'
import FormSelect from '~/components/molecules/FormSelect'
import FormRadios from '~/components/molecules/FormRadios'
import FormTextarea from '~/components/molecules/FormTextarea'
import FormInput from '~/components/molecules/FormInput'

storiesOf('Molecules', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter({}))
  .add('FormInput', () => {
    const type = select('type', {
      text: 'text',
      number: 'number',
      tel: 'tel',
      email: 'email',
      password: 'password'
    }, 'text')

    return {
      components: { FormInput },
      props: {
        type: { default: type }
      },
      template: `
        <FormInput
          v-model="value"
          name="name"
          :type="type"
          @focus="focus"
          @input="input"
          @blur="blur"
          @dirty="dirty"
          @error="error"
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
        blur: action('blur'),
        dirty: action('dirty'),
        error: action('error')
      }
    }
  }, { info: {} })
  .add('FormTextarea', () => ({
    components: { FormTextarea },
    template: `
      <FormTextarea
        v-model="value"
        name="test"
        required
        @focus="focus"
        @input="input"
        @blur="blur"
        @dirty="dirty"
        @error="error"
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
      blur: action('blur'),
      dirty: action('dirty'),
      error: action('error')
    }
  }), { info: {} })
  .add('FormRadios', () => ({
    components: { FormRadios },
    template: `
      <FormRadios
        v-model="value"
        :items="items"
        name="name"
        required
        @change="change"
        @dirty="dirty"
        @error="error"
      />
    `,
    data() {
      return {
        value: '',
        items: [
          { id: 1, label: '項目1' },
          { id: 2, label: '項目2' },
          { id: 3, label: '項目3' }
        ]
      }
    },
    methods: {
      change: action('change'),
      dirty: action('dirty'),
      error: action('error')
    }
  }), { info: {} })
  .add('FormSelect', () => ({
    components: { FormSelect },
    template: `
      <FormSelect
        v-model="value"
        :options="options"
        name="name"
        required
        @change="change"
        @dirty="dirty"
        @error="error"
      />
    `,
    data() {
      return {
        value: '',
        options: [
          { id: 1, label: '項目1' },
          { id: 2, label: '項目2' },
          { id: 3, label: '項目3' }
        ]
      }
    },
    methods: {
      change: action('change'),
      dirty: action('dirty'),
      error: action('error')
    }
  }), { info: {} })
  .add('FormCheckboxes', () => ({
    components: { FormCheckboxes },
    props: {
      min: { default: number('min', 0) },
      max: { default: number('max', 0) }
    },
    template: `
      <FormCheckboxes
        v-model="value"
        :items="items"
        :min="min"
        :max="max"
        name="name"
        required
        @dirty="dirty"
        @change="change"
      />
    `,
    data() {
      return {
        value: [],
        items: [
          { id: 1, label: '項目1' },
          { id: 2, label: '項目2' },
          { id: 3, label: '項目3' }
        ]
      }
    },
    methods: {
      change: action('change'),
      dirty: action('dirty'),
      error: action('error')
    }
  }), { info: {} })
  .add('VModal', () => ({
    components: { VModal },
    template: `
      <div>
        <VModal :is-visible="isVisible" @close="isVisible = false">
          <p>吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。</p>
          <p>吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。</p>
          <p>吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。</p>
          <p>吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。</p>
          <p>吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。</p>
          <p>吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。</p>
          <p>吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。</p>
          <p>吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。</p>
          <p>吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。</p>
          <p>吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。</p>
          <p>吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。</p>
          <p>吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。</p>
          <p>吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。</p>
          <p>吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。</p>
          <p>吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。</p>
        </VModal>
        <button @click="isVisible = true">開閉</button>
      </div>
    `,
    data() {
      return {
        isVisible: false
      }
    }
  }), { info: {} })
