<template>
  <div class="vTooltip">
    <button
      ref="btn"
      :aria-controls="`balloon-${componentId}`"
      :aria-expanded="String(isVisible)"
      type="button"
      class="vTooltip__btn"
      @click="updateVisible(true)"
    >
      <span>{{ label }}</span>
    </button>
    <FadeTransition>
      <div v-show="isVisible">
        <VBalloon
          :id="`balloon-${componentId}`"
          ref="content"
          :aria-hidden="String(!isVisible)"
          :tabindex="isVisible ? '0' : '-1'"
          :style="contentStyled"
          class="vTooltip__content"
        >
          <slot />
        </VBalloon>
        <VMask
          class="vTooltip__mask"
          transparent
          @click="updateVisible(false)"
        />
      </div>
    </FadeTransition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import WindowSize from '~/utils/WindowSize.ts'
import { FadeTransition } from '~/components/presenter'
import { VBalloon, VMask } from '~/components/atoms'

@Component({
  components: { FadeTransition, VBalloon, VMask }
})
export default class VTooltip extends Vue {
  @Prop() public label!: string
  public isVisible: boolean = false
  public windowSize = new WindowSize().initialize()
  public contentSize = {
    width: 0,
    height: 0
  }
  public btnRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }
  public resizeTime = null

  public get componentId(): number {
    return this._uid
  }

  public get windowWidth(): number {
    return this.windowSize.width
  }

  public get contentStyled(): { [index: string]: string } {
    let styles: { [index: string]: string } = {}

    styles = Object.assign({}, styles, this.leftPositionStyled)
    styles = Object.assign({}, styles, this.verticalPositionStyled)

    return styles
  }

  public get basePosition(): { [index: string]: number } {
    return {
      x: this.btnRect.x + this.btnRect.width / 2,
      y: this.btnRect.y
    }
  }

  public get leftPositionStyled(): { [index: string]: string } {
    const styles: { [index: string]: string } = {}

    if (this.basePosition.x - this.contentSize.width / 2 > 0) {
      if (this.basePosition.x + this.contentSize.width / 2 > this.windowWidth) {
        const position =
          this.windowWidth - this.contentSize.width - this.btnRect.x
        styles.left = `${position}px`
      } else {
        styles.left = '50%'
        styles.transform = 'translateX(-50%)'
      }
    } else {
      styles.left = `-${this.btnRect.x}px`
    }

    return styles
  }

  public get verticalPositionStyled(): { [index: string]: string } {
    const styles: { [index: string]: string } = {}

    if (this.basePosition.y - this.contentSize.height - 14 > 0) {
      styles.top = `-${this.contentSize.height + 14}px`
    } else {
      styles.top = 'calc(100% + 14px)'
    }

    return styles
  }

  @Watch('isVisible')
  public toggleVisible(newValue: boolean) {
    if (newValue) {
      window.addEventListener('resize', this.handleResize)
      window.addEventListener('keyup', this.handleEscKey)
      this.$nextTick(() => {
        this.updatePositionData()
        this.$refs.content.$el.focus()
      })
    } else {
      window.removeEventListener('resize', this.handleResize)
      window.removeEventListener('keyup', this.handleEscKey)
    }
  }

  public handleResize() {
    clearTimeout(this.resizeTime)
    this.resizeTime = setTimeout(() => {
      this.updatePositionData()
    }, 80)
  }

  public handleEscKey(e) {
    if (e.keyCode !== 27) return
    e.preventDefault()
    this.updateVisible(false)
  }

  public updateVisible(newValue) {
    this.isVisible = newValue
  }

  public updatePositionData() {
    if (!this.$refs.btn) return false
    const btnRect = this.$refs.btn.getBoundingClientRect()
    this.contentSize.width = this.$refs.content.$el.clientWidth
    this.contentSize.height = this.$refs.content.$el.clientHeight
    this.btnRect.x = btnRect.x
    this.btnRect.y = btnRect.y
    this.btnRect.width = btnRect.width
    this.btnRect.height = btnRect.height
  }
}
</script>

<style lang="scss" scoped>
.vTooltip {
  position: relative;
  display: inline-block;
}
.vTooltip__content {
  position: absolute;
  z-index: 11;
  transition: left 0.3s $easing;
}
.vTooltip__btn {
  display: inline-block;
  border-radius: 2px;
  background: $color-base;
  font-weight: bold;
  line-height: 1;
  color: #fff;

  @include media-min {
    padding: 5px;
    font-size: 1.4rem;
  }

  @include media-max {
    padding: 3px;
    font-size: 1.5rem;
  }
}
.vTooltip__text {
  white-space: nowrap;
}
.vTooltip__mask {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
}
</style>
