<template>
  <div class="memberArea">
    <swiper :indicator-dots="indicatorDots"
  :autoplay="autoplay" :interval="interval" :duration="duration" :circular="true" :indicator-active-color="indicatorActiveColor">
      <block v-for="item in swiperArr" :key="item.A_ID">
        <swiper-item>
          <image :src="host + item.A_Image" class="slide-image" mode="scaleToFill"/>
        </swiper-item>
      </block>
    </swiper>
    <div class="content">
      <div class="left-menu">
        <div class="item" :class="{ active: currentMenu === itemIndex ? true : false }" v-for="(item, itemIndex) in leftMenu" :key="itemIndex" @click="selectMenu(itemIndex, item.C_ID)">{{ item.C_Name }}</div>
        <div class="left-line" :style="{ top: 20 +(currentMenu * 80) + 'rpx' }"></div>
      </div>
      <div class="right-con">
        <scroll-view class="scroll-view" :scroll-y="true" :style="{ height: scrollViewHeight + 'rpx' }" enable-back-to-top="true" :scroll-into-view="scrollTarget" :scroll-with-animation="true" @scroll="scroll">
          <div class="block" v-for="(item, index) in shopList" :key="index" :id="'item' + index">
            <div :id="'item' + item.id" class="tit"><span class="name">{{ item.name }}</span><span class="block-line"></span></div>
            <div class="shop-item" v-for="(shop, i) in item.rows" :key="i" >
              <div class="shop-img" @click="showDetail(shop.P_ID, item.rows, i)">
                <img :src="host + shop.P_LImage" mode="widthFix">
              </div>
              <div class="shop-info">
                <p class="title">{{ shop.P_Name }}</p>
                <p class="desc">规格：<span>{{ shop.OVF_Field1 }}</span></p>
                <div>
                  <span class="price">￥<b>{{ shop.P_MarketPrice }}</b></span>
                  <cart-btn :shopObj="putShop(shop)"></cart-btn>
                </div>
              </div>
            </div>
          </div>
        </scroll-view>
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
  </div>
</template>

<script>
import Toast from '../../../static/vant/toast/toast'
import CartBtn from '../../components/cartBtn'
import wxParse from 'mpvue-wxparse'
export default {
  data() {
    return {
      host: this.$host,
      swiperArr: [],
      indicatorDots: true,
      autoplay: false,
      interval: 3000,
      duration: 800,
      indicatorActiveColor: "#fff",
      scrollViewHeight: "",
      leftMenu: [],
      currentMenu: 0,
      shopList: [],
      scrollTarget: '',
      showPopup: false,
      popScrollHeight: '',
      shopDetail: null,
      detailList: '',
      detailIndex: null,
      imgObj: {
        mode: "aspectFill",
        padding: 0,
        lazyLoad: true,
        domain: "www.51yst.cn"
      }
    }
  },
  methods: {
    getSwiperList() {
      let that = this
      that.$fly.get("/GetSearchAd.asp", { A_ID: '1884536', DisplyObj: 'image,field,picture' })
      .then(res => {
        that.swiperArr = res.rows.slice(0,2)
      })
    },
    getLeftMenu() {
      let that = this
      that.$fly.get("/GetColumn.asp", { Column_ID: '3416' })
      .then(res => {
        that.leftMenu = res.rows
        that.currentMenuCol = that.leftMenu[0].C_ID
        that.getGoodsList()
      })
    },
    selectMenu(index, column) {
      let that = this
      that.currentMenu = index
      that.currentMenuCol = column
      that.scrollTarget = 'item' + column
    },
    getGoodsList() {
      let that = this
      let arr = []
      Toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0
      });
      let promiseArr = []
      that.leftMenu.map(item => {
        let req = that.$fly.get("/GetSearchProduct.asp", { rows: 9999, column: item.C_ID, DisplyObj: 'field1,field2,field3,CartQuantity' })
        promiseArr.push(req)
      })
      Promise.all(promiseArr)
      .then(res => {
        res.map((item, i) => {
          item.id = that.leftMenu[i].C_ID
          item.name = that.leftMenu[i].C_Name
        })
        that.shopList = res
        Toast.clear()
      })
    },
    scroll(e) {
      let that = this
      var scrollTop = e.mp.detail.scrollTop
      let top = []
      let size = 0
      that.shopList.map(item => {
        size += item.rows.length * 80 + 40
        top.push(size)
      })
      top.unshift(0)
      top.map((item, i) => {
        if (scrollTop - top[i] >= 0 && top[i + 1] - scrollTop > 0) {
          that.currentMenu = i
        }
      })
    },
    showDetail(pid, detailList, i) {
      let that = this
      let sendData = {
        Action: "GetShow",
        P_ID: pid,
        DisplyObj: "field,picture,CartQuantity,detail"
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
    let that = this
    that.firstLoad = false
    that.getSwiperList()
    that.getLeftMenu()
  },
  onReady() {
    let that = this
    let windowHeight = wx.getSystemInfoSync().windowHeight
    let windowWidth = wx.getSystemInfoSync().windowWidth
    that.scrollViewHeight = windowHeight * 750 / windowWidth - 280
    that.popScrollHeight = (windowHeight * 750 / windowWidth) * 0.65 - 360
    wx.setNavigationBarTitle({
      title: '会员区'
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
.memberArea{
  flex: 1;
  display: flex;
  flex-direction: column;
  swiper{
    width: 100%;
    height: 280rpx;
    swiper-item{
      image{
        width: 100%;
        height: 100%;
      }
    }
  }
  .content{
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: space-between;
    .left-menu{
      text-align: center;
      width: 25%;
      flex: 1;
      background-color: #f3f4f5;
      position: relative;
      .item{
        height: 80rpx;
        line-height: 80rpx;
        color: #999;
        font-size: 28rpx;
        &.active{
          background-color: #fff;
          color: #11998e;
        }
      }
      .left-line{
        position: absolute;
        left: 0;
        width: 8rpx;
        border-radius: 4rpx;
        height: 40rpx;
        background-color: #11998e;
      }
    }
    .right-con{
      width: 75%;
      padding-left: 20rpx;
      display: flex;
      height: 100%;
      flex-direction: column;
      scroll-view{
        display: flex;
        flex-direction: column;
        .block{
          .tit{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding-top: 30rpx;
            padding-bottom: 20rpx;
            .name{
              font-size: 24rpx;
              color: #333;
              padding-right: 20rpx;
              font-weight: 700;
            }
            .block-line{
              flex: 1;
              height: 2rpx;
              background-color: #f5f5f5;
            }
          }
          .shop-item{
            padding-right:30rpx;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 160rpx;
            .shop-img{
              width: 160rpx;
              height: 140rpx;
              margin-right: 20rpx;
              overflow: hidden;
              img{
                width: 100%;
              }
            }
            .shop-info{
              height: 140rpx;
              flex: 1;
              font-size: 28rpx;
              display: flex;
              justify-content: space-between;
              flex-direction: column;
              .title{
                color: #333;
                font-weight: 700;
              }
              .desc{
                color: #999;
              }
              div{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .price{
                  display: flex;
                  justify-content: flex-start;
                  align-items: flex-end;
                  color: #ec0404;
                  b{
                    font-size: 32rpx;
                  }
                } 
              }
            }
          }
        }
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

