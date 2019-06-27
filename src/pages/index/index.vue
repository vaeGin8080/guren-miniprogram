<template>
  <div>
    <swiper :indicator-dots="indicatorDots"
  :autoplay="autoplay" :interval="interval" :duration="duration" :circular="true" :indicator-active-color="indicatorActiveColor">
      <block v-for="item in swiperArr" :key="item.A_ID">
        <swiper-item>
          <image :src="host + item.A_Image" class="slide-image" mode="scaleToFill"/>
        </swiper-item>
      </block>
    </swiper>
    <van-cell-group :border="false">
      <van-cell title="会员下单" label="Members place orders">
        <van-icon slot="right-icon" class="custom-icon" size="36px" name="http://guren.host30.voosite.com/images/guren/1.png" @click="pageTo('membersArea')"/>
      </van-cell>
      <van-cell title="非会员下单" label="Non-member Order">
        <van-icon slot="right-icon" class="custom-icon" size="36px" name="http://guren.host30.voosite.com/images/guren/2.png" @click="pageTo('noMembers')"/>
      </van-cell>
      <van-cell title="充值/购卡" label="Recharge/purchase card">
        <van-icon slot="right-icon" class="custom-icon" size="36px" name="http://guren.host30.voosite.com/images/guren/3.png" @click="pageTo('buyCard')"/>
      </van-cell>
      <van-cell title="联系我们" label="Contact us" :border="false">
        <van-icon slot="right-icon" class="custom-icon" size="36px" name="http://guren.host30.voosite.com/images/guren/4.png" @click="pageTo('contactUs')"/>
      </van-cell>
    </van-cell-group>
    <div class="ad">
      <img src="http://guren.host30.voosite.com/usr/2360/images/S_Ad/1912180_20190619180551.png">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      host: "http://guren.host30.voosite.com",
      swiperArr: [],
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 800,
      indicatorActiveColor: "#fff"
    }
  },
  methods: {
    getSwiperList() {
      let that = this
      that.$fly.get("/GetSearchAd.asp", { A_ID: '1835641', DisplyObj: 'image,field,picture' })
      .then(res => {
        that.swiperArr = res.rows
      })
    },
    pageTo(page) {
      if (page === 'membersArea') {
        wx.switchTab({
          url: '/pages/' + page + '/main'
        })
      } else {
        wx.navigateTo({
          url: '/pages/' + page + '/main'
        })
      }
    }
  },
  mounted() {
    this.getSwiperList()
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: '古仁农场'
    })
  }
}
</script>

<style lang="scss" scoped>
swiper{
  width: 100%;
  height: 500rpx;
  swiper-item{
    image{
      width: 100%;
      height: 100%;
    }
  }
}
.custom-icon{
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.ad{
  flex: 1;
  height: 240rpx;
  margin: 20rpx 30rpx;
  border-radius: 10rpx;
  overflow: hidden;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>
