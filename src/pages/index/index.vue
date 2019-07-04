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
      <video id="indexVideo" object-fit="fill" :controls="showControl" poster="https://www.51yst.cn/images/guren/video.jpg" src="https://www.51yst.cn/usr/2360/古仁宣传片.mp4"></video>
    </div>
    <div class="block" v-for="(item, i) in shopList" :key="i">
      <van-cell is-link link-type="navigateTo" value="更多" :url="'/pages/noMembers/main?index=' + (i + 1)"  :border="false" custom-class="cell-style" :data-id="item.id">
        <div slot="title" class="title-style">
          <div class="line"></div><p>{{ item.name }}</p><div class="line"></div>
        </div>
      </van-cell>
      <div class="shoplist">
        <div class="item" v-for="(shop, index) in item.rows" :key="index">
          <div class="imgbox" @click="showDetail(shop.P_ID, item.rows, index)">
            <img :src="host + shop.P_LImage" mode="widthFix">
          </div>
          <div class="tit">大白菜规格：{{ shop.OVF_Field1 }}</div>
          <p class="price">￥{{ shop.P_MarketPrice }}</p>
        </div>
      </div>
    </div>
    <van-toast id="van-toast"/>
    <van-popup :show="showPopup" @close="closePop" custom-class="pop-style">
        <block v-if="showPopup">
          <div class="pop-container">
            <div class="top-info">
              <div class="imgbox"><img :src="host + shopDetail.P_LImage" mode="widthFix"></div>
              <div class="right-con">
                <p class="title">{{ shopDetail.P_Name }}</p>
                <p class="shopid">货号：{{ shopDetail.P_Code }}</p>
                <p class="param">规格：{{ shopDetail.OVF_Field1 }}</p>
              </div>
            </div>
            <div class="center" :style="{ height: popScrollHeight + 'rpx' }">
              <scroll-view class="shop-desc" :scroll-y="true" :style="{ height: popScrollHeight + 'rpx' }">
                <p class="tit">商品简介</p>
                <p>{{ shopDetail.P_Brief }}</p>
                <p class="tit">商品描述</p>
                <p><wxParse :content="shopDetail.OVD_Description0" @preview="preview" @navigate="navigate" :imageProp="imgObj"></wxParse></p>
              </scroll-view>
            </div>
            <div class="shop-bottom">
              <div class="left">
                <p class="price">￥35</p>
                <p>每项限购两份</p>
              </div>
              <div class="right">
                <cart-btn :shopObj="putShop(shopDetail)"></cart-btn>
              </div>
            </div>
          </div>
        </block>
      </van-popup>
  </div>
</template>

<script>
import Toast from '../../../static/vant/toast/toast'
import CartBtn from '../../components/cartBtn'
import wxParse from 'mpvue-wxparse'
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
      videoAutoplay: false,
      columns: [],
      shopList: [],
      shopDetail: null,
      showPopup: false,
      detailList: '',
      detailIndex: null,
      popScrollHeight: ''
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
    },
    getColumns() {
      let that = this
      that.$fly.get("/GetColumn.asp", { Column_ID: '3416' })
      .then(res => {
        that.columns = res.rows
        that.getGoodsList()
      })
    },
    getGoodsList() {
      let that = this
      Toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0
      });
      let promiseArr = []
      that.columns.map(item => {
        let req = that.$fly.get("/GetSearchProduct.asp", { rows: 6, column: item.C_ID, DisplyObj: 'field1,field2,field3,CartQuantity' })
        promiseArr.push(req)
      })
      Promise.all(promiseArr)
      .then(res => {
        
        res.map((item, i) => {
          item.id = that.columns[i].C_ID
          item.name = that.columns[i].C_Name
        })
        that.shopList = res
        Toast.clear()
      })
    },
    showDetail(pid, detailList, i) {
      let that = this
      let sendData = {
        Action: "GetShow",
        P_ID: pid,
        DisplyObj: "field1,field2,field3,picture,CartQuantity,detail"
      }
      that.$fly.get("/GetSearchProduct.asp", sendData)
      .then(res => {
        if (res.code === 200) {
          that.shopDetail = res
          that.showPopup = true
          that.detailList = detailList
          that.detailIndex = i
        } else {
          return
        }
      })
    },
    closePop() {
      let that = this
      that.showPopup = false
    },
    putShop(obj) {
      let that = this
      obj.count = that.$store.getters.getCountByPid(obj.P_ID)
      return obj
    }
  },
  onLoad() {
    this.getSwiperList()
    this.getColumns()
  },
  onReady() {
    let that = this
    let windowHeight = wx.getSystemInfoSync().windowHeight
    let windowWidth = wx.getSystemInfoSync().windowWidth
    that.scrollViewHeight = windowHeight * 750 / windowWidth - 280
    that.popScrollHeight = (windowHeight * 750 / windowWidth) * 0.65 - 360
    wx.setNavigationBarTitle({
      title: '古仁农场'
    })
  },
  components: {
    "cart-btn": CartBtn,
    "wxParse": wxParse
  }
}
</script>

<style lang="scss">
@import url("~mpvue-wxparse/src/wxParse.css");
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
  height: 320rpx;
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
        height: 200rpx;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
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
.pop-style{
  width: 88%;
  height: 65%;
  border-radius: 10rpx;
  box-sizing: border-box;
}
.pop-container{
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 20rpx;
  border-radius: 10rpx;
  background-color: #fff;
  box-sizing: border-box;
  .top-info{
    width: 94%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 200rpx;
    position: absolute;
    top: 20rpx;
    .imgbox{
      width: 200rpx;
      height: 200rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
    .right-con{
      height: 200rpx;
      p{
        font-size: 28rpx;
        color: #999;
        &.title{
          font-size: 32rpx;
          font-weight: 700;
          color: #333;
        }
      }
    }
  }
  .center{
    overflow: hidden;
    width: 94%;
    box-sizing: border-box;
    position: absolute;
    top: 200rpx;
    margin: 20rpx 0;
    border-top: 20rpx solid #fff;
    border-bottom: 20rpx solid #fff;
    .shop-desc{
      box-sizing: border-box;
      width: 100%;
      p{
        font-size: 28rpx;
        color: #333;
        &.tit{
          font-weight: 700;
          padding: 10rpx;
        }
      }
    }
  }
  .shop-bottom{
    width: 94%;
    position: absolute;
    bottom: 20rpx;
    height: 120rpx;
    border-top: 1rpx solid #ccc;
    padding-top: 20rpx;
    padding-bottom: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30rpx;
    box-sizing: border-box;
    .left{
      p{
        font-size: 20rpx;
        &.price{
          font-weight: 700;
          font-size: 40rpx;
          color: #f54e52;
        }
      }
    }
  }
}
</style>
