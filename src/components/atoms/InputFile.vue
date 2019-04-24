<template>
  <label class="inputFile">
    <input
      v-bind="$attrs"
      :name="name"
      :required="required"
      type="file"
      class="inputFile__input"
      @input="handleInput"
    />
    <span class="inputFile__btn">{{ label }}</span>
    <span class="inputFile__name">{{ fileName }}</span>
  </label>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    name: { type: String, required: true },
    label: { type: String, default: 'アップロードする' },
    required: { type: Boolean }
  },
  data() {
    return {
      fileName: ''
    }
  },
  methods: {
    handleInput(event) {
      const file = event.target.files[0]

      if (!file) {
        this.$emit('input', null)
        this.fileName = ''
        return
      }

      this.$emit('input', file)
      this.fileName = file.name
    }
  }
}
</script>

<style lang="scss" scoped>
.inputFile {
  position: relative;
}
.inputFile__input {
  position: absolute;
  left: 0;
  top: 0;
  width: 5px;
  height: 5px;
  opacity: 0;
}
.inputFile__btn {
  display: inline-block;
  border-radius: 2px;
  background: $color-theme;
  line-height: 1;
  color: #fff;
  transition: background 0.3s $easing;

  @include media-min {
    padding: 6px 12px;
    font-size: $fontSize-pc;

    &:hover,
    &:focus {
      background: #5dc5e8;
    }
  }

  @include media-max {
    padding: 7px 10px;
    font-size: $fontSize-sp;

    &:hover,
    &:focus {
      background: #5dc5e8;
    }
  }
}
.inputFile__name {
  display: inline;
  margin-left: 6px;
  font-size: 1.4rem;
}
</style>
