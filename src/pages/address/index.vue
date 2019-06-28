<template>
  <div class="address">
    <van-cell-group>
      <van-cell title="叶寒，18888888888" label="收货地址：北京市丰台区大成路北京市丰台区大成路北京市丰台区大成路" title-class="title-style" label-class="label-style" @click="editAddress">
        <van-icon slot="right-icon" name="edit" custom-class="icon-style"/>
      </van-cell>
      <van-cell title="叶寒，18888888888" label="收货地址：北京市丰台区大成路北京市丰台区大成路北京市丰台区大成路" title-class="title-style" label-class="label-style" @click="editAddress">
        <van-icon slot="right-icon" name="edit" custom-class="icon-style"/>
      </van-cell>
      <van-cell title="叶寒，18888888888" label="收货地址：北京市丰台区大成路北京市丰台区大成路北京市丰台区大成路" title-class="title-style" label-class="label-style" @click="editAddress">
        <van-icon slot="right-icon" name="edit" custom-class="icon-style"/>
      </van-cell>
      <van-cell title="叶寒，18888888888" label="收货地址：北京市丰台区大成路北京市丰台区大成路北京市丰台区大成路" title-class="title-style" label-class="label-style" @click="editAddress">
        <van-icon slot="right-icon" name="edit" custom-class="icon-style"/>
      </van-cell>
    </van-cell-group>
    <van-button type="primary" size="large" custom-class="addAddress" :hairline="false" @click="addAddress">新增地址</van-button>
  </div>
</template>

<script>
import Toast from '../../../static/vant/toast/toast'
export default {
  data() {
    return {
      addressList: []
    }
  },
  methods: {
    editAddress() {
      wx.navigateTo({
        url: '/pages/addressDetail/main?type=1'
      })
    },
    addAddress() {
      wx.navigateTo({
        url: '/pages/addressDetail/main?type=2'
      })
    }
  },
  mounted() {
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

