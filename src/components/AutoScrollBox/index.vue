<template>
  <div class="vue-auto-scroll-box-container" ref="boxContainer">
    <div class="notice-box" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <div class="notice-item" v-for="(item, index) in scrollItems" :key="index" @click="handleClick(item)">
        <slot name="item" v-bind:itemData="item">
          <p style="margin: 0">
            {{ item.title }}
          </p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AutoScrollBox',
  props: {
    interval: {
      type: Number,
      required: false,
      default: 3000,
    },
    data: {
      type: Array,
      required: true,
    },
    height: {
      type: Number,
      required: false,
      default: 30,
    },
    itemKeyName: {
      type: String,
      required: true,
      default: 'title',
    },
  },
  data() {
    return {
      boxRef: null,
    };
  },
  mounted() {
    this.boxRef = this.$refs.boxContainer;
    this.updateAnimationVar();
  },
  computed: {
    boxHeight() {
      return this.height + 'px';
    },
    itemLength() {
      return this.data.length;
    },
    loopSpeed() {
      return this.interval / 1000 + 's';
    },
    scrollItems() {
      if (this.itemLength < 1) return [];
      return [...this.data, this.data[0]];
    },
    animationVar() {
      return `${this.itemLength}${this.height}${this.loopSpeed}`;
    },
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  methods: {
    updateAnimationVar() {
      this.boxRef.style.setProperty('--STEP', this.itemLength);
      this.boxRef.style.setProperty('--ITEM-HEIGHT', this.height);
      this.boxRef.style.setProperty('--SPEED', this.loopSpeed);
    },
    handleClick(item) {
      this.$emit('click', item);
    },
    handleMouseEnter() {
      console.log('enter');
      this.boxRef.style.setProperty('--ANIMATION_STATE', 'paused');
    },
    handleMouseLeave() {
      this.boxRef.style.setProperty('--ANIMATION_STATE', 'running');
    },
  },
  watch: {
    animationVar: function () {
      this.updateAnimationVar();
    },
  },
};
</script>

<style scoped>
div.vue-auto-scroll-box-container {
  --STEP: 1;
  --ITEM-HEIGHT: 30;
  --SPEED: 0.8s;
  --ANIMATION_STATE: running;
  width: 100%;
  overflow-y: hidden;
  height: calc(var(--ITEM-HEIGHT) * 1px);
  line-height: calc(var(--ITEM-HEIGHT) * 1px);
  user-select: none;
}

.notice-box {
  width: 100%;
  height: calc(var(--ITEM-HEIGHT) * 1px);
  line-height: calc(var(--ITEM-HEIGHT) * 1px);
  animation: scroll calc(var(--SPEED) * var(--STEP)) steps(var(--STEP)) infinite;
  animation-fill-mode: forwards;
  animation-play-state: var(--ANIMATION_STATE);
}
.notice-item {
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  height: calc(var(--ITEM-HEIGHT) * 1px);
  line-height: calc(var(--ITEM-HEIGHT) * 1px);
  animation: itemScroll calc(var(--SPEED)) infinite;
  animation-fill-mode: forwards;
  animation-play-state: var(--ANIMATION_STATE);
}

@keyframes scroll {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, calc(var(--STEP) * var(--ITEM-HEIGHT) * -1px));
  }
}

@keyframes itemScroll {
  0% {
    transform: translate(0, 0);
  }
  80%,
  100% {
    transform: translate(0, calc(var(--ITEM-HEIGHT) * -1px));
  }
}
</style>
