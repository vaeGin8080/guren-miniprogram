<template>
  <div class="personal">
    <div class="top">
      <div class="avatar">
        <img src="/static/images/user.png" mode="widthFix">
      </div>
      <p class="username">叶寒</p>
      <div class="beMember">
        <span>古仁农场</span>
        <span>成为会员 <i class="fa fa-angle-right"></i></span>
      </div>
    </div>
    <div class="content">
      <van-cell-group custom-class="cell-group" :border="false">
        <van-cell title="我的订单" value="查看全部订单" is-link title-class="title-style" value-class="value-style" url="/pages/orderForm/main" link-type="switchTab"/>
        <van-cell :border="false" >
          <div class="box">
            <div>
              <img src="/static/images/icon-dfk.png">
              <p>待付款</p>
            </div>
            <div>
              <img src="/static/images/icon-dfh.png">
              <p>待发货</p>
            </div>
            <div>
              <img src="/static/images/icon-dsh.png">
              <p>待收货</p>
            </div>
            <div>
              <img src="/static/images/icon-ywc.png">
              <p>已完成</p>
            </div>
          </div>
        </van-cell>
      </van-cell-group>
      <van-cell-group custom-class="cell-group" :border="false">
        <van-cell title="客服聊天" icon="service-o" value-class="valueStyle"><button class="customBtn" open-type="contact" :plain="true"><van-icon name="arrow" custom-class="arrowBtn"/></button></van-cell>
        <van-cell title="购物车" icon="shopping-cart-o" is-link url="/pages/shoppingCart/main" link-type="switchTab"/>
        <van-cell title="收货地址" icon="location-o" is-link/>
      </van-cell-group>
      <van-cell-group custom-class="cell-group" :border="false">
        <van-cell title="个人中心" icon="manager-o" is-link/>
        <van-cell title="账号设置" icon="setting-o" is-link/>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      host: this.$host
    }
  },
  methods: {
    contact() {

    }
  },
  mounted() {
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: '个人中心'
    })
  }
}
</script>

<style lang="scss">
.personal{
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  flex: 1;
  .top{
    height: 340rpx;
    background-color: #11998e;
    position: relative;
    .avatar{
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      overflow: hidden;
      position: absolute;
      top: 50rpx;
      left: 50%;
      transform: translateX(-50%);
      img{
        width: 100%;
        height: 100%;
      }
    }
    .username{
      font-size: 32rpx;
      color: #fff;
      font-weight: 700;
      text-align: center;
      padding-top: 180rpx;
    }
    .beMember{
      width: 94%;
      height: 80rpx;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      justify-content: space-between;
      background-color: #125f59;
      border-top-left-radius: 10rpx;
      border-top-right-radius: 10rpx;
      padding: 0 30rpx;
      box-sizing: border-box;
      line-height: 80rpx;
      color: #fff;
      font-size: 28rpx;
    }
  }
  .content{
    padding: 20rpx;

  }
}
.box{
  padding: 20rpx 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  div{
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      width: 40rpx;
      height: 38rpx;
    }
    p{
      color: #333;
      margin-top: 8rpx;
    }
  }
}
.cell-group{
  border-radius: 20rpx;
  overflow: hidden;
  margin-bottom: 20rpx;
}
.title-style{
  font-weight: 700;
}
.value-style{
  position: relative;
}
.customBtn{
  position: absolute;
  right: 30rpx;
  width: 32rpx;
  height: 48rpx;
  border:none !important;
  background: transparen;
  background-color: transparent;
  -webkit-tap-highlight-color:transparent;
  padding-left: 0;
  padding-right: 0;
  outline: none;
  border-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
button:after {
  border: none;
}
.arrowBtn{
  font-size: 30rpx !important;
  color: #999;
}
</style>

