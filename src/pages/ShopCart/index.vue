<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cart, index) in cartInfoList"
          :key="cart.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @change="CheckedCartById(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('down', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('middle', $event.target.value, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('up', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ -cart.skuNum * -cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllCheck && cartInfoList.length != 0"
          @change="CheckedAllCartById($event)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ checkNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
//引入节流
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  computed: {
    //产品的数据
    ...mapGetters("shopcart", ["shopcartlist"]),
    cartInfoList() {
      return this.shopcartlist.cartInfoList || [];
    },
    //购买产品总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
    //选择产品总数
    checkNum() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        if (item.isChecked) sum++;
      });
      return sum;
    },
    //todo判断是否 全选
    isAllCheck() {
      // every遍历，只要有一个不满足条件就返回false
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
  methods: {
    //todo获取(更新 )购物车商品列表
    getData() {
      this.$store.dispatch("shopcart/getShopCartList");
    },
    //todo删除购物车商品
    async deleteCartById(cart) {
      try {
        await this.$store.dispatch("shopcart/getDeleteCartId", cart.skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //todo删除选中商品
    async deleteAllCart() {
      try {
        await this.$store.dispatch("shopcart/deleteAllCart");
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //todo  修改商品数量
    // type-区分这三个元素、disNum，加减是变化量，以1正负为单位，cart是当前的商品
    handler: throttle(async function (type, disNum, cart) {
      switch (type) {
        case "up":
          disNum = 1; //这是传给服务器的数据，服务器判断正负，来进行加减
          break;
        case "down":
          cart.skuNum > 1 ? (disNum = -1) : (disNum = 0); //disNum=0,服务器不进行减的操作
          break;
        case "middle":
          //非法字符
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0; //不变
          } else {
            // 输入变化量是浮点型，要转化为整数 ，是数字，且大于1
            //disNum是用户输入进来的 减去原来的 就是带给服务器的变化量，disNum可以多次赋值
            disNum = parseInt(disNum - cart.skuNum);
          }
          break;
      }
      try {
        //修改成功
        await this.$store.dispatch("detail/GetShopCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        //重新更新购物车商品列表
        this.getData();
      } catch (error) {
        //错误
        alert(error.message);
      }
    }, 700),
    //todo选中状态
    async CheckedCartById(cart, e) {
      try {
        let checked = e.target.checked ? "1 " : "0";
        await this.$store.dispatch("shopcart/getCheckedCartById", {
          skuId: cart.skuId,
          isChecked: checked,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //todo修改全部商品的选中状态
    async CheckedAllCartById(e) {
      try {
        let isChecked = e.target.checked ? "1" : "0";
        //派发Actions
        await this.$store.dispatch("shopcart/getCheckedAllCartById", isChecked);
        this.getData();
      } catch (error) {
        e.target.disabled = true;
        alert(error.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 16%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 11%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>