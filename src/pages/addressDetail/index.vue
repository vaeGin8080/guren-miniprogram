<template>
  <div class="address">
    <van-cell-group>
      <van-field :value="name" clearable label="姓名" placeholder="收货人姓名" @blur="getName"/>
      <van-field :value="phone" clearable label="电话" placeholder="收货人手机号" type="number" maxlength="11" @blur="getPhone"/>
      <van-field :value="area" clearable readonly label="地区" placeholder="选择省 / 市 / 区" @click="chooseArea"/>
      <van-field :value="notes" clearable label="详细地址" type="textarea" :border="false" autosize placeholder="街道办门牌、楼层房间号等信息" @blur="getNotes"/>
    </van-cell-group>
    <div class="btns">
      <van-button type="primary" size="large" custom-class="addAddress" :hairline="false" @click="addAddress">保存并使用</van-button>
      <block v-if="type === '1'">
        <van-button type="default" :plain="true" size="large" custom-class="deletAddress" :hairline="true" @click="deletAddress">删除收货地址</van-button>
      </block>
    </div>
    <van-popup :show="showPop" position="bottom" @close="closePop">
      <van-area :area-list="areaList" value="110101" @confirm="confirmArea" @cancel="closePopBox"/>
    </van-popup>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import Toast from '../../../static/vant/toast/toast'
export default {
  data() {
    return {
      barTitle: '',
      addressList: [],
      type: '',
      name: '',
      phone: '',
      area: '',
      notes: '',
      showPop: false,
      addressId: null,
      areaList: {
        province_list: {
          110000: '北京市',
          120000: '天津市'
        },
        city_list: {
          110100: '北京市',
          110200: '县',
          120100: '天津市',
          120200: '县'
        },
        county_list: {
          110101: '东城区',
          110102: '西城区',
          110105: '朝阳区',
          110106: '丰台区',
          120101: '和平区',
          120102: '河东区',
          120103: '河西区',
          120104: '南开区',
          120105: '河北区'
        }
      }
    }
  },
  methods: {
    addAddress() {
      let that = this
      if (that.addressId) {
        let sendData = {
          UserToken: that.$store.getters.getUser.token,
          action: "GetEdit",
          UA_ID:that.addressId,
          Name:that.name,
          Province:that.area.split('/')[0],
          City:that.area.split('/')[1],
          Area:that.area.split('/')[2],
          Address:that.notes,
          Mobile:that.phone
        }
        that.$fly.get("/GetUserAddress.asp", sendData)
        .then(res => {
          if (res.code === 200) {
            Toast.success({
              message: '修改成功',
              duration: '1000'
            })
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          }
        })
      } else {
        let sendData = {
          UserToken: that.$store.getters.getUser.token,
          action: "GetAdd",
          Name:that.name,
          Province:that.area.split('/')[0],
          City:that.area.split('/')[1],
          Area:that.area.split('/')[2],
          Address:that.notes,
          Mobile:that.phone
        }
        that.$fly.get("/GetUserAddress.asp", sendData)
        .then(res => {
          if (res.code === 200) {
            Toast.success({
              message: '添加成功',
              duration: '1000'
            })
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          }
        })
      }
    },
    deletAddress() {
      let that = this
      let sendData = {
        UserToken: that.$store.getters.getUser.token,
        action: "GetDel",
        UA_ID:that.addressId,
      }
      that.$fly.get("/GetUserAddress.asp", sendData)
      .then(res => {
        if (res.code === 200) {
          Toast.success({
            message: '删除成功',
            duration: '1000'
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        }
      })
    },
    closePop() {
      let that = this
      that.showPop = false
    },
    chooseArea() {
      let that = this
      that.showPop = true
    },
    confirmArea(e) {
      let that = this
      that.area = e.mp.detail.values[0].name + '/' + e.mp.detail.values[1].name + '/' + e.mp.detail.values[2].name
      that.closePopBox()
    },
    closePopBox() {
      let that = this
      that.showPop = false
    },
    getName(e) {
      let that = this
      that.name = e.mp.detail.value
    },
    getPhone(e) {
      let that = this
      that.phone = e.mp.detail.value
    },
    getArea(e) {
      let that = this
      that.area = e.mp.detail.value
    },
    getNotes(e) {
      let that = this
      that.notes = e.mp.detail.value
    }
  },
  onLoad(option) {
    let that = this
    console.log(option)
    that.type = option.type
    if (option.type === '1') {
      that.barTitle = "编辑地址"
      let address = JSON.parse(option.obj)
      that.name = address.UA_Name
      that.phone = address.UA_Mobile
      that.area = address.UA_Province + '/' + address.UA_City + '/' + address.UA_Area
      that.notes = address.UA_Address
      that.addressId = address.UA_ID
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

