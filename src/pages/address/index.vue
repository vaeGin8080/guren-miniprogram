<template>
  <div class="address">
    <block v-if="addressList.length === 0">
      <div class="no-content">
        <img src="/static/images/shdz.png" mode="widthFix">
        <p>您还没有收获地址呢~</p>
      </div>
    </block>
    <block v-else>
      <van-cell-group>
        <van-cell v-for="(item, i) in addressList" :key="i" :title="item.UA_Name + '，' + item.UA_Mobile" :label="'收货地址：' + item.UA_Province + item.UA_City + item.UA_Area + item.UA_Address" :data-id="item.ID" :data-uid="item.UA_ID" title-class="title-style" label-class="label-style" @click="editAddress(item)">
          <van-icon slot="right-icon" name="edit" custom-class="icon-style"/>
        </van-cell>
      </van-cell-group>
    </block>
    <van-button type="primary" size="large" custom-class="addAddress" :hairline="false" @click="addAddress">新增地址</van-button>
  </div>
</template>

<script>
import Toast from '../../../static/vant/toast/toast'
export default {
  data() {
    return {
      addressList: [],
      back: false
    }
  },
  methods: {
    editAddress(item) {
      wx.navigateTo({
        url: '/pages/addressDetail/main?back=' + this.back + '&type=1&obj=' + JSON.stringify(item)
      })
    },
    addAddress() {
      wx.navigateTo({
        url: '/pages/addressDetail/main?back=' + this.back + '&type=2'
      })
    },
    getAddressList() {
      let that = this
      let sendData = {
        action: 'GetList',
        UserToken: that.$store.getters.getUser.token
      }
      that.$fly.get("/GetUserAddress.asp", sendData)
      .then(res => {
        if (res.code === 200) {
          that.addressList = res.rows
        }
      })
    }
  },
  onLoad(option) {
    let that = this
    if (option.back) {
      that.back = option.back
    }
  },
  onShow() {
    let that = this
    that.getAddressList()
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: '收货地址'
    })
  }
}
</script>

<style lang="scss">
.address{
  background-color: #f9f9f9;
  width: 100%;
  height: 100%;
  flex: 1;
  position: relative;
}
.title-style{
  font-weight: 700;
  color: #333;
  padding-right: 30rpx;
}
.label-style{
  font-weight: normal;
}
.icon-style{
  display: flex !important;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.addAddress{
  position: absolute !important;
  bottom: 0 !important;
  background-color: #11998e !important;
  border: none !important;
  color: #fff !important;
}
</style>

