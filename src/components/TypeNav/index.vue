<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件的委派 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 添加过渡动画  必须要有v-show/v-if-->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item bo"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
              >
                <h3
                  :class="{ cur: currentIndex == index }"
                  @mouseenter="changeIndex(index)"
                >
                  <a
                    :data-category1Id="c1.categoryId"
                    :data-categoryName="c1.categoryName"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-category2Id="c2.categoryId"
                          :data-categoryName="c2.categoryName"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-category3Id="c3.categoryId"
                            :data-categoryName="c3.categoryName"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <!-- <h1>{{ categoryList }}</h1> -->
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
//引入节流
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      //决定了哪个h3上有cur类名
      currentIndex: -1,
      //刚开始挂载为true,此时在home组件显示
      show: true,
    };
  },
  mounted() {
    //当路由跳转的不是home组件的时候show为false,隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
    this.GetCategoryList();
  },
  computed: {
    //传入三级联动数据
    ...mapState("home", ["categoryList"]),
  },
  methods: {
    ...mapActions("home", ["GetCategoryList"]),
    //一级分类索引+节流
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 20),
    leaveIndex() {
      this.currentIndex = -1;
      // 鼠标移除其他非home路由组件,一级联动隐藏
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    //三级路由
    goSearch(event) {
      //获取节点
      let element = event.target;
      //解构赋值,节点有个dataset属性可以获取节点的自定义属性和属性值
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      //判断如果节点身上有categoryname则一定是a标签
      if (categoryname) {
        //传给search路由组件
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        //分一级分类，二级分类，三级分类
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        //如果有params参数，点击三级联动列表的时候也会传入params参数
        if (this.$route.params) {
          location.params = this.$route.params;
          location.query = query;
          this.$router.push(location);
        }
      }
    },
    //当鼠标移入到尚品分类上的时候，当前一级联动显示
    enterShow() {
      this.show = true;
    },
  },
  //三级联动，a节点的路由跳转
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 505px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    //过渡动画的样式
    //动画起始状态
    .sort-enter,
    .sort-leave-to {
      height: 0;
    }
    //动画结束状态
    .sort-enter-to,
    .sort-leave {
      height: 461px;
    }
    .sort-enter-active,
    .sort-leave-active {
      transition: all 0.1s;
    }
  }
}
</style>