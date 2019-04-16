<template>
  <transition name="modal" @after-enter="updateFocus">
    <div v-show="isVisible">
      <div ref="start" tabindex="0" @keyup.9.16="$refs.end.focus()" />
      <div ref="container" :style="containerStyled" class="modalContainer">
        <button
          ref="close"
          type="button"
          class="modalContainer__close"
          @click="handleClose"
        >
          <VClose class="modalContainer__closeIcon" title="閉じる" />
        </button>
        <VContainer class="modalContainer__content">
          <div class="modalContainer__inner">
            <slot />
          </div>
        </VContainer>
      </div>
      <div ref="end" tabindex="0" @keyup.9="$refs.start.focus()" />
      <VMask class="modalContainer__mask" @click="handleClose" />
    </div>
  </transition>
</template>

<script>
import WindowSize from '~/utils/WindowSize'
import { VClose } from '~/components/icons'
import { VContainer, VMask } from '~/components/atoms'

export default {
  components: { VClose, VContainer, VMask },
  props: {
    isVisible: { type: Boolean, required: true }
  },
  data() {
    return {
      windowSize: new WindowSize().initialize(),
      originalHeight: 0
    }
  },
  computed: {
    windowWidth() {
      return this.windowSize.width
    },
    windowHeight() {
      return this.windowSize.height
    },
    containerStyled() {
      const styles = {}
      if (this.windowHeight < this.originalHeight) {
        styles.height = `${this.windowHeight}px`
      }
      return styles
    }
  },
  watch: {
    isVisible(visible) {
      if (visible) {
        window.addEventListener('keyup', this.handleEscKey)
        this.$nextTick(() => {
          this.originalHeight = this.$refs.container.clientHeight
        })
      } else {
        window.removeEventListener('keyup', this.handleEscKey)
      }
    }
  },
  mounted() {
    window.addEventListener('keyup', this.handleKeyup)
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleEscKey(e) {
      if (e.keyCode !== 27) return
      e.preventDefault()
      this.$emit('close')
    },
    updateFocus() {
      if (this.isVisible) {
        this.$refs.close.focus()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modalContainer {
  position: fixed;
  top: 50%;
  left: 50%;
  padding-top: 38px;
  width: 100%;
  max-width: 768px;
  z-index: 101;
  transform: translate(-50%, -50%);
}
.modalContainer__close {
  position: absolute;
  top: 0;
  right: 0;
  width: 32px;
  height: 32px;
  color: #fff;
}
.modalContainer__closeIcon {
  width: 24px;
  height: 24px;
}
.modalContainer__content {
  width: 100%;
}
.modalContainer__mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
}

.modal {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.6s $easing;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }
}
</style>
