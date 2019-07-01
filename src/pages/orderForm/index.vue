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
      <div class="order-item" v-for="(item, i) in orderList" :key="i">
        <van-cell :title="'订单编号：' + item.O_ID" title-class="ddbh" value-class="order-status" :value="item.O_State" :border="false"/>
        <van-card v-for="(subitem, subi) in item.detail" :key="subi" :num="subitem.OD_Quantity" :price="subitem.OD_Price" :desc="subitem.OD_Title" :title="subitem.OD_Title" :thumb="host + subitem.OD_Image"/>
        <van-cell :value="'合计：￥' + item.O_OrderAmount" :border="false" custom-class="border-bottom"/>
        <van-cell :border="false">
          <van-button type="default" size="small">取消</van-button>
          <van-button type="warning" size="small" custom-class="payBtn" @click="pay">付款</van-button>
        </van-cell>
      </div>
    </block>
  </div>
</template>

<script>
import utils from '../../utils/index'
export default {
  data() {
    return {
      host: this.$host,
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
    },
    getOrderList() {
      let that = this
      let sendData = {
        action: 'GetList',
        UserToken: that.$store.getters.getUser.token,
        DisplyObj: "confirmed,detail"
      }
      that.$fly.get("/GetUserOrders.asp", sendData)
      .then(res => {
        that.orderList = res.rows
        console.log(res)
      })
    },
    pay() {
      wx.requestPayment({
        'timeStamp': new Date().getTime().toString(),
        'nonceStr': utils.randomStr(),
        'package': '',
        'signType': 'MD5',
        'paySign': '',
        'success':function(res){
          console.log(res)
        },
        'fail':function(res){
          console.log(res)
        },
        'complete':function(res){
          console.log(res)
        }
      })
    }
  },
  onLoad(option) {
    let that = this
    that.active = option.index
  },
  onShow() {
    let that = this
    that.getOrderList()
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: '全部订单'
    })
  },
  computed: {
    
  }
}
</script>

<style lang="scss">
.orderForm{
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: #f9f9f9;
  position: relative;
  .order-item{
    margin-top: 20rpx;
  }
}
.content{
  width: 100%;
  padding: 20rpx 30rpx;;
  text-align: center;
  box-sizing: border-box;
}
.ddbh {
  color: #999 !important;
  font-size: 24rpx !important;
}
.order-status{
  color: #11998e !important;
  font-size: 28rpx !important;
}
.border-bottom{
  border-bottom: 1rpx solid #eee;
}
.payBtn{
  margin-left: 10rpx;
}
</style>

