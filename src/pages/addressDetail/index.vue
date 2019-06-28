<template>
  <div class="address">
    <van-cell-group>
      <van-field :value="name" clearable label="姓名" placeholder="收货人姓名"/>
      <van-field :value="phone" clearable label="电话" placeholder="收货人手机号"/>
      <van-field :value="area" clearable label="地区" placeholder="选择省 / 市 / 区"/>
      <van-field :value="notes" clearable label="详细地址" type="textarea" :border="false" autosize placeholder="街道办门牌、楼层房间号等信息"/>
    </van-cell-group>
    <div class="btns">
      <van-button type="primary" size="large" custom-class="addAddress" :hairline="false" @click="addAddress">保存并使用</van-button>
      <block v-if="type === '1'">
        <van-button type="default" :plain="true" size="large" custom-class="deletAddress" :hairline="true" @click="addAddress">删除收货地址</van-button>
      </block>
    </div>
  </div>
</template>

<script>
import Toast from '../../../static/vant/toast/toast'
export default {
  data() {
    return {
      barTitle: '',
      addressList: [],
      type: ''
    }
  },
  methods: {
    saveAddress() {
      
    },
    deletAddress() {

    }
  },
  onLoad(option) {
    let that = this
    that.type = option.type
    if (option.type === '1') {
      that.barTitle = "编辑地址"
    } else if (option.type === '2') {
      that.barTitle = "新增地址"
    }
  },
  onShow() {
    let that = this
    wx.setNavigationBarTitle({
      title: that.barTitle
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
}
.addAddress{
  background-color: #11998e !important;
  border: none !important;
  color: #fff !important;
  margin-bottom: 40rpx;
}
.btns{
  margin-top: 80rpx;
  padding: 0 30rpx;
}
</style>

