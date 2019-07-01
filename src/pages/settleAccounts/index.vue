<template>
  <div class="settle-accounts">
    <block v-if="isChooseAdd">
      <van-cell :title="'收货人：' + address.name" :label="'收货地址：' + address.area + address.notes" custom-class="add-style" title-class="shr" label-class="shdz" value-class="phone" is-link icon="location-o" url="/pages/address/main" :value="address.phone"/>
    </block>
    <block v-else>
      <van-cell title="选择收货地址" title-class="xzshr" is-link icon="plus" url="/pages/address/main?back=true"/>
    </block>
    <div class="list">
      <van-cell title="平台自营" :border="false"/>
      <van-card v-for="(item, i) in list" :key="i" :num="item.count" :price="item.P_MarketPrice" :desc="'规格：' + item.OVF_Field1" :title="item.P_Name" :thumb="host + item.P_LImage"/>
    </div>
    <van-cell title="运费" value="￥0" value-class="val-style"/>
    <van-field :value="msg" label="买家留言" type="textarea" placeholder="请填写备注" autosize/>
    <van-submit-bar :price="totalMoney" button-text="提交订单" button-class="btnStyle" @submit="commitForm"/>
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
import Toast from '../../../static/vant/toast/toast'
export default {
  data() {
    return {
      host: this.$host,
      list: [],
      totalMoney: 0,
      msg: '',
      isChooseAdd: false,
      address: null
    }
  },
  methods: {
    getCartList() {
      let that = this
      let arr = []
      that.$store.state.cart.map(item => {
        if (item.selected) {
          arr.push(item)
        }
      })
      that.list = arr
    },
    getTotalPrice() {
      let that = this
      that.totalMoney = (that.$store.getters.getTotalPrice) * 100
    },
    commitForm() {
      if (isChooseAdd) {
        let sendData = {
          
        }
      } else {
        Toast('请先选择收货地址');
      }
    }
  },
  onLoad() {
    let that = this
    if(that.$store.getters.getAddress) {
      that.isChooseAdd = true
      that.address = that.$store.getters.getAddress()
    } else {
      that.isChooseAdd = false
    }
  },
  onShow() {
    let that = this
    that.getCartList()
    that.getTotalPrice()
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: '确认订单'
    })
  },
  watch: {
    '$store.getters.getAddress': function() {
      console.log('address change')
      if(this.$store.getters.getAddress) {
        this.isChooseAdd = true
        this.address = this.$store.getters.getAddress
      } else {
        this.isChooseAdd = false
      }
    }
  }
}
</script>

<style lang="scss">
.settle-accounts{
  width: 100%;
  height: 100%;
  background-color: #fff;
  flex: 1;
  position: relative;
  padding-bottom: 100rpx;
  .list{
    background-color: #fff;
    .item{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .checkbox{
        margin-left: 0;
        margin-right: 30rpx;
      }
    }
  }
}
.van-icon-plus{
  background-color: #4b86f6;
  color: #fff;
  padding: 6rpx;
}
.btnStyle{
  background-color: #11998e !important;
  border-color: #11998e !important;
}
.val-style{
  color: #ec0404 !important;
}
.add-style{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}
.shr, .phone{
  font-size: 28rpx;
  font-weight: 700;
  color: #333 !important;
}
.shr{
  padding-left: 40rpx;
}
.phone{
  position: absolute;
  top: 20rpx;
  right: 70rpx;
}
.shdz{
  font-weight: 24rpx;
}
.van-cell__left-icon-wrap{
  position: absolute;
  top: 20rpx;
  left:30rpx;
}
.xzshr{
  padding-left: 60rpx;
}
</style>

