<template>
  <transition name="modal" @after-enter="updateFocus">
    <div v-show="isVisible">
      <div class="modal">
        <button
          ref="close"
          type="button"
          class="modal__close"
          @click="handleClose"
        >
          <VClose class="modal__closeIcon" title="閉じる" />
        </button>
        <div ref="start" tabindex="0" @keyup.9.16="$refs.end.focus()" />
        <VContainer ref="content" :style="contentStyled" class="modal__content">
          <div class="modal__inner">
            <slot />
          </div>
        </VContainer>
        <div ref="end" tabindex="0" @keyup.9="$refs.start.focus()" />
      </div>
      <VMask class="modal__mask" @click="handleClose" />
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
      resizeTime: null,
      originalHeight: 0,
      contentPosition: 0,
      closePosition: 0
    }
  },
  computed: {
    windowWidth() {
      return this.windowSize.width
    },
    windowHeight() {
      return this.windowSize.height
    },
    contentStyled() {
      const styles = {}

      if (this.originalHeight + this.closePosition > this.windowHeight) {
        styles['--height'] = `${this.windowHeight + this.closePosition * 2}px`
        styles.overflowY = 'scroll'
      }

      return styles
    }
  },
  watch: {
    isVisible(visible) {
      if (visible) {
        window.addEventListener('keyup', this.handleEscKey)
        window.addEventListener('resize', this.handleResize)
        this.$nextTick(() => {
          this.updateSize()
        })
      } else {
        window.removeEventListener('keyup', this.handleEscKey)
        window.removeEventListener('resize', this.handleResize)
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
    handleResize() {
      clearTimeout(this.resizeTime)
      this.resizeTime = setTimeout(() => {
        this.updateSize()
      }, 80)
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
    },
    updateSize() {
      this.$refs.content.$el.style.height = 'auto'
      this.originalHeight = this.$refs.content.$el.clientHeight
      this.contentPosition = this.$refs.content.$el.getBoundingClientRect().y
      this.closePosition = parseFloat(
        window.getComputedStyle(this.$refs.close).top
      )
      this.$refs.content.$el.style.height = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  width: 100%;
  max-width: 768px;
  z-index: 101;
  transform: translate(-50%, -50%);
}
.modal__content {
  --height: auto;
  width: 100%;
  max-width: 768px;
  height: var(--height);
  -webkit-overflow-scrolling: touch;
  z-index: 101;
}
.modal__close {
  position: absolute;
  top: -40px;
  right: 0;
  width: 32px;
  height: 32px;
  color: #fff;
  z-index: 101;
}
.modal__closeIcon {
  width: 24px;
  height: 24px;
}
.modal__content {
  width: 100%;
}
.modal__mask {
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
