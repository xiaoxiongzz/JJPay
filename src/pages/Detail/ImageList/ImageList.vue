<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(image, index) in skuImageList"
        :key="index"
      >
        <img
          :src="image.imgUrl"
          :class="{ active: currentIndex == index }"
          @click="addActive(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    addActive(index) {
      this.currentIndex = index;
      //$emit发数据，给Zoom兄弟组件传递数据(全局事件总线)
      this.$bus.$emit("getIndex", this.currentIndex);
    },
  },
  props: ["skuImageList"],
  watch: {
    skuImageList(newValue, oldValue) {
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          //一次展示几个轮播图
          slidesPerView: 3,
          //几个图为一组，进行轮播
          slidesPerGroup: 1,
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;
      //轮播图高亮
      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      /*  &:hover {
        border: 2px solid #f60;
        padding: 1px;
      } */
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>