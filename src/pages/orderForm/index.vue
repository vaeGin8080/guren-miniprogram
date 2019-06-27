<template>
  <div class="orderForm">
    <van-tabs :active="active" @change="onChange" sticky custom-class="tabs" :color="tabColor">
      <van-tab title="全部订单" tab-class="tab">
        <div class="content">
          没有更多内容了！
        </div>
      </van-tab>
      <van-tab title="未完成">
        <div class="content">
          没有更多内容了！
        </div>
      </van-tab>
      <van-tab title="已完成">
        <div class="content">
          没有更多内容了！
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      tabColor: '#11998e'
    }
  },
  methods: {
    onChange(event) {
      wx.setNavigationBarTitle({
        title: event.target.title
      })
    }
  },
  mounted() {

  },
  onReady() {
    wx.setNavigationBarTitle({
      title: '全部订单'
    })
  }
}
</script>

<style lang="scss" scoped>
.orderForm{
  width: 100%;
  height: 100%;
  flex: 1;
  .tabs{
    width: 100%;
    height: 100%;
    .tab{
      width: 100%;
    }
  }
}
.content{
  width: 100%;
  padding: 20rpx 30rpx;;
  text-align: center;
  box-sizing: border-box;
}
</style>

