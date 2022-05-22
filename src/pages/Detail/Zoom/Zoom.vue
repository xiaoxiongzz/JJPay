<template>
  <div class="spec-preview">
    <!-- 左边的图 -->
    <img :src="skuImageList[showIndex].imgUrl" />
    <!-- 鼠标事件活动范围 -->
    <div class="event" @mousemove="handler"></div>
    <!-- 放大的图 -->
    <div class="big">
      <img :src="skuImageList[showIndex].imgUrl" ref="big" />
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data() {
    return {
      showIndex: 0,
    };
  },
  props: ["skuImageList"],
  methods: {
    handler(e) {
      //要获取盒子的left,,top
      let mask = this.$refs.mask;
      //鼠标的坐标减去遮罩盒子的宽度一半，就是遮罩盒子的left,top值
      let left = e.offsetX - mask.offsetWidth / 2;
      let top = e.offsetY - mask.offsetHeight / 2;
      //加上边缘条件限制
      if (left <= 0) left = 0;
      if (left >= mask.offsetWidth) left = mask.offsetWidth;
      if (top <= 0) top = 0;
      if (top >= mask.offsetHeight) top = mask.offsetHeight;
      //给定位的left,top值
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      //todo放大后的图片
      let big = this.$refs.big;
      //因为放大镜的图片是原来图片二倍大小
      big.style.left = -2 * left + "px";
      big.style.top = -2 * top + "px";
    },
  },
  mounted() {
    this.$bus.$on("getIndex", (index) => {
      this.showIndex = index;
    });
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>