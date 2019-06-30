<template>
  <div class="shopping-cart">
    <div class="container">
      <block v-if="cartList.length === 0">
        <div class="no-content">
          <img src="/static/images/shopcart.png" mode="widthFix">
          <p>您的购物车还空空如也呢~</p>
        </div>
      </block>
      <block v-else>
        <scroll-view class="scroll-view" :scroll-y="true" :style="{ height: scrollViewHeight + 'rpx;' }" enable-back-to-top="true">
          <div v-for="(item, itemIndex) in cartList" :key="itemIndex">
            <van-swipe-cell :right-width="80">
              <van-cell>
                <div class="item">
                  <van-checkbox :value="item.selected" checked-color="#11998e" @change="changeOne" :data-pid="item.P_ID" custom-class="checkOneBtn"></van-checkbox>
                  <div class="shop-item">
                    <img :src="host + item.P_LImage" mode="widthFix">
                    <div class="shop-info">
                      <p class="title">{{ item.P_Name }}</p>
                      <p class="desc">规格：<span>{{ item.OVF_Field1 }}</span></p>
                      <div>
                        <span class="price">￥<b>{{ item.P_MarketPrice }}</b></span>
                        <span class="cartBtn">
                          <van-stepper :value="item.count" @change="changeCount" :data-pid="item.P_ID"/>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </van-cell>
              <view slot="right" class="rightbtn">
                <div class="right-del" @click="delet" :data-pid="item.P_ID">删除</div>
              </view>
            </van-swipe-cell>
          </div>
          <div class="bottom-line">我购物车也是有底线的~</div>
        </scroll-view>
      </block>
    </div>
    <van-toast id="van-toast"/>
    <van-submit-bar
      :price="totalMoney"
      button-text="结算"
      @submit="onClickButton"
      :tip="true"
      button-class="btnStyle"
    >
      <van-checkbox :value="selectAll" checked-color="#11998e" @change="changeAll" custom-class="checkBtn">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import Toast from '../../../static/vant/toast/toast'
export default {
  data() {
    return {
      host: this.$host,
      selectAll: true,
      cartList: [],
      totalMoney: 0,
      scrollViewHeight: null
    }
  },
  methods: {
    changeAll() {
      let that = this
      that.selectAll = !that.selectAll
      that.$store.commit("updateAllShopSelected", that.selectAll)
      that.getTotalPrice()
    },
    changeCount(e) {
      let that = this
      that.$store.commit("updateShopCount", [e.target.dataset.pid, e.mp.detail])
      that.getTotalPrice()
    },
    getCartList() {
      let that = this
      let arr = []
      that.$store.state.cart.map(item => {
        arr.push(item)
      })
      that.cartList = arr
    },
    changeOne(e) {
      let that = this
      that.selectAll = false
      that.$store.commit("updateShopSelected", e.target.dataset.pid)
      that.getTotalPrice()
    },
    getTotalPrice() {
      let that = this
      that.totalMoney = (that.$store.getters.getTotalPrice) * 100
    },
    delet(e) {
      let that = this
      that.$store.commit("deletShop", e.target.dataset.pid)
      that.getCartList()
      that.getTotalPrice()
    },
    onClickButton() {
      let that = this
      if (wx.getStorageSync('user').usercode) {
        wx.navigateTo({
          url: '/pages/settleAccounts/main'
        })
      } else {
        Toast.fail('请先登录');
      }  
    }
  },
  onLoad() {
    this.getCartList()
  },
  onShow() {
    let that = this
    that.getCartList()
    that.$store.commit("updateAllShopSelected", that.selectAll)
    that.getTotalPrice()
  },
  onReady() {
    let windowHeight = wx.getSystemInfoSync().windowHeight
    let windowWidth = wx.getSystemInfoSync().windowWidth
    this.scrollViewHeight = windowHeight * 750 / windowWidth - 100
    wx.setNavigationBarTitle({
      title: '购物车'
    })
  }
}
</script>

<style lang="scss">
.shopping-cart{
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  flex: 1;
  position: relative;
}
.checkBtn{
  margin-left: 30rpx;
}
.checkOneBtn{
  margin-left: 0;
  margin-right: 30rpx;
}
.btnStyle{
  background-color: #11998e !important;
  border-color: #11998e !important;
}
.item{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .shop-item{
    display: flex;
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    img{
      width: 160rpx;
      height: 140rpx;
      margin-right: 20rpx;
    }
    .shop-info{
      display: flex;
      flex: 1;
      justify-content: space-between;
      flex-direction: column;
      font-size: 28rpx;
      color: #333;
      .title{
        font-size: 28rpx;
        text-align: left;
      }
      .desc{
        font-size: 24rpx;
        color: #999;
        text-align: left;
      }
      div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .price{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          color: #ec0404;
        }
      }
    }
  }
}
.rightbtn{
  width: 160rpx;
  height: 100%;
  background-color: #f44;
}
.right-del{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f44;
  color: #fff;
  font-size: 28rpx;
}
</style>

