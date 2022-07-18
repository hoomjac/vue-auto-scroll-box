<template>
  <div class="scroll-container">
    <div>
      <div
        class="notice-box"
        :style="{ height: boxHeight }"
        @mouseenter="mouseEnter"
        @mouseleave="mouseLeave"
        @click="handleClick"
      >
        <transition name="notice-slide" @before-enter="onBeforeEnter" @enter="enter" @leave="leave">
          <div class="notice-item" :style="{ height: boxHeight, lineHeight: boxHeight }" :key="currentItem.id">
            <slot name="item" v-bind:itemData="currentItem">
              <p style="margin: 0">
                {{ currentItem.title }}
              </p>
            </slot>
          </div>
        </transition>
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
      timer: null,
      itemIndex: 0,
    };
  },
  computed: {
    boxHeight() {
      return this.height + 'px';
    },
    currentItem() {
      return {
        id: this.itemIndex,
        title: this.data[this.itemIndex][this.itemKeyName],
      };
    },
  },
  mounted() {
    this.scrollMove();
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  methods: {
    onBeforeEnter(el) {
      el.style.top = this.boxHeight;
    },
    enter(el) {
      setTimeout(() => {
        el.style.top = 0;
      }, 0);
    },
    leave(el) {
      el.style.top = '-' + this.boxHeight;
    },
    handleClick() {
      this.$emit('click', this.currentItem);
    },
    //滚动函数
    scrollMove() {
      this.timer = setTimeout(() => {
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
        if (this.itemIndex === this.data.length - 1) {
          this.itemIndex = 0;
        } else {
          this.itemIndex += 1;
        }
        this.scrollMove();
      }, this.interval);
    },
    //鼠标进入
    mouseEnter() {
      clearTimeout(this.timer);
    },
    //鼠标离开
    mouseLeave() {
      this.scrollMove();
    },
  },
};
</script>

<style scoped>
.notice-box {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.notice-item {
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  top: 0;
}
.notice-slide-enter-active,
.notice-slide-leave-active {
  transition: all 0.8s linear;
}
</style>
