<template>
  <div class="index-page">
    <swiper :indicator-dots="indicatorDots"
  :autoplay="autoplay" :interval="interval" :duration="duration" :circular="true">
      <block v-for="item in swiperArr" :key="item.A_ID">
        <swiper-item>
          <image :src="host + item.A_Image" class="slide-image" mode="scaleToFill"/>
        </swiper-item>
      </block>
    </swiper>
    <van-notice-bar left-icon="volume-o" :text="noticeContent" mode="link" backgroundColor="#e6857d" color="#fff" speed="25" custom-class="notice-style"/>
    <div class="menus">
      <div class="item" @click="pageTo('membersArea')">
        <div class="imgbox">
          <img src="https://www.51yst.cn/images/guren/1.png" mode="widthFix">
        </div>
        <p>会员下单</p>
      </div>
      <div class="item" @click="pageTo('noMembers')">
        <div class="imgbox">
          <img src="https://www.51yst.cn/images/guren/2.png" mode="widthFix">
        </div>
        <p>非会员</p>
      </div>
      <div class="item" @click="pageTo('buyCard')">
        <div class="imgbox">
          <img src="https://www.51yst.cn/images/guren/3.png" mode="widthFix">
        </div>
        <p>充值购卡</p>
      </div>
      <div class="item" @click="pageTo('contactUs')">
        <div class="imgbox">
          <img src="https://www.51yst.cn/images/guren/4.png" mode="widthFix">
        </div>
        <p>联系我们</p>
      </div>
    </div>
    <van-search :value="searchtext" placeholder="搜索关键词" background="#f7f8fa" field-class="search-style" input-class="input-style"/>
    <div class="video" @click="showVideo">
      <video id="indexVideo" object-fit="fill" :controls="showControl" poster="https://www.51yst.cn/images/guren/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190629190152_02.png" src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"></video>
    </div>
    <div class="block">
      <van-cell is-link link-type="navigateTo" value="更多" url="/pages/dashboard/index" :border="false" custom-class="cell-style">
        <div slot="title" class="title-style">
          <div class="line"></div><p>叶菜系列</p><div class="line"></div>
        </div>
      </van-cell>
      <div class="shoplist">
        <div class="item">
          <div class="imgbox">
            <img src="https://www.51yst.cn/usr/2360/images/Products/L/451560097_L.jpg" mode="widthFix">
          </div>
          <div class="tit">大白菜规格：2000克</div>
          <p class="price">￥35.00</p>
        </div>
        <div class="item">
          <div class="imgbox">
            <img src="https://www.51yst.cn/usr/2360/images/Products/L/451560097_L.jpg" mode="widthFix">
          </div>
          <div class="tit">大白菜规格：2000克</div>
          <p class="price">￥35.00</p>
        </div>
        <div class="item">
          <div class="imgbox">
            <img src="https://www.51yst.cn/usr/2360/images/Products/L/451560097_L.jpg" mode="widthFix">
          </div>
          <div class="tit">大白菜规格：2000克</div>
          <p class="price">￥35.00</p>
        </div>
        <div class="item">
          <div class="imgbox">
            <img src="https://www.51yst.cn/usr/2360/images/Products/L/451560097_L.jpg" mode="widthFix">
          </div>
          <div class="tit">大白菜规格：2000克</div>
          <p class="price">￥35.00</p>
        </div>
        <div class="item">
          <div class="imgbox">
            <img src="https://www.51yst.cn/usr/2360/images/Products/L/451560097_L.jpg" mode="widthFix">
          </div>
          <div class="tit">大白菜规格：2000克</div>
          <p class="price">￥35.00</p>
        </div>
        <div class="item">
          <div class="imgbox">
            <img src="https://www.51yst.cn/usr/2360/images/Products/L/451560097_L.jpg" mode="widthFix">
          </div>
          <div class="tit">大白菜规格：2000克</div>
          <p class="price">￥35.00</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      host: this.$host,
      swiperArr: [],
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 800,
      noticeContent: "足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。",
      searchtext: '',
      showControl: false,
      videoAutoplay: false
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
    },
    showVideo() {
      let that = this
      that.showControl = true
      wx.createVideoContext('indexVideo', this).play()
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

<style lang="scss">
.index-page{
  background-color: #f8f8f8;
  flex: 1;
  height: 100%;
}
swiper{
  width: 100%;
  height: 400rpx;
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
.notice-style{
  padding-right: 60rpx !important;
}
.van-notice-bar__right-icon{
  right: 10rpx !important;
}
.van-notice-bar__content{
  letter-spacing: 4rpx;
}
.menus{
  width: 100%;
  height: 200rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  .item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .imgbox{
      width: 85rpx;
      height: 85rpx;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%
      }
    }
    p{
      margin-top: 24rpx;
      font-size: 24rpx;
      color: #333;
      font-weight: 700;
    }
  }
}
.search-style{
  background-color: #fff;
  border-radius: 10rpx !important;
}
.van-search{
  background: #f7f8fa !important;
}
.van-search__content{
  padding-left: 0 !important;
}
.input-style{
  text-align: center !important;
}
.van-cell__left-icon-wrap{
  display: none !important;
}
.video{
  width: 100%;
  height: 400rpx;
  overflow: hidden;
  video{
    width: 100%;
    height: 100%;
  }
}
.cell-style{
  position: relative;
  box-sizing: border-box;
}
.title-style{
  position: absolute;
  flex: 1;
  width: 92%;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  .line{
    width: 60rpx;
    height: 2rpx;
    background-color: #bbb;
  }
  p{
    margin: 0 44rpx;
    color: #555;
    font-size: 28rpx;
    font-weight: 700;
  }
}
.block{
  margin-top: 10rpx;
  .shoplist{
    border-top: 1rpx solid #eee;
    background-color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    box-sizing: border-box;
    .item{
      width: 33.333333%;
      overflow: hidden;
      box-sizing: border-box;
      padding: 20rpx;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      .imgbox{
        width: 100%;
        img{
          width: 100%;
        }
      }
      .tit{
        width: 100%;
        font-size: 28rpx;
        color: #333;
      }
      .price{
        width: 100%;
        text-align: right;
        color: #ea4851;
        font-size: 28rpx;
      }
    }
  }
}
</style>
