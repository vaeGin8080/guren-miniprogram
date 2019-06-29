<template>
  <div class="orderForm">
    <van-tabs :active="active" @change="onChange" sticky custom-class="tabs" :color="tabColor" swipe-threshold="5">
      <van-tab title="全部订单"></van-tab>
      <van-tab title="待付款"></van-tab>
      <van-tab title="待发货"></van-tab>
      <van-tab title="待收货"></van-tab>
      <van-tab title="已完成"></van-tab>
    </van-tabs>
    <block v-if="orderList.length === 0">
      <div class="no-content">
        <img src="/static/images/order.png" mode="widthFix">
        <p>您的购物车还空空如也呢~</p>
      </div>
    </block>
    <block v-else>
      123
    </block>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      tabColor: '#11998e',
      orderList: []
    }
  },
  methods: {
    onChange(event) {
      wx.setNavigationBarTitle({
        title: event.target.title
      })
    }
  },
  onLoad(option) {
    let that = this
    that.active = option.index
  },
  onShow() {

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
  background-color: #f9f9f9;
  position: relative;
}
.content{
  width: 100%;
  padding: 20rpx 30rpx;;
  text-align: center;
  box-sizing: border-box;
}
</style>

