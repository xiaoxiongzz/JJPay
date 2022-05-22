<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="pageNo != 1">···</button>
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-if="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>
    <button v-if="pageNo != totalPage">···</button>

    <button
      v-if="startNumAndEndNum.end != totalPage"
      :class="{ active: pageNo == totalPage }"
      @click="$emit('getPageNo', totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共{{ totalPage }}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      //页码数，向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    //计算出连续页码的起始数字start和结尾数字end  --要求连续页码最少是5
    startNumAndEndNum() {
      //解构赋值一下从this
      const { pageNo, totalPage, continues } = this;
      //先定义起始结尾两个变量
      let start = 0,
        end = 0;
      //?如果页码小于连续页码(5页)
      if (totalPage < continues) {
        start = 1;
        end = totalPage;
      }
      //?页码大于连续页码(大于5页)
      else {
        //开始数字
        start = pageNo - parseInt(continues / 2);
        //结尾数字
        end = pageNo + parseInt(continues / 2);
        //?如果pageNo(连续页码中间数)等于第一页 --减去2，则start就等于-1
        if (start < 1) {
          start = 1;
          //结尾就等于连续页码数5
          end = continues;
        }
        //?如果pageNo(连续页码中间数)等于最后一页 --加上2，超出了最大页码数(totalPage)
        if (end > totalPage) {
          start = totalPage - continues + 1;
          end = totalPage;
        }
      }
      //因为返回两个数，所以用对象的写法
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #ff4079;
      color: #fff;
    }
  }
}
</style>
