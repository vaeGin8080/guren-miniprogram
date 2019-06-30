<template>
  <div class="noMember">
    <div class="top">
      <van-tabs :active="activeTab"  @change="currentTab" :border="false" color="#11998e" :animated="true" :swipeable="true">
        <van-tab :title="tab.name" v-for="(tab, i) in tabList" :key="i"></van-tab>
      </van-tabs>
    </div>
    <div class="container">
      <div class="card" v-for="(item, index) in goodsList" :key="index">
        <div class="imgbox"><img :src="host + item.P_LImage" mode="widthFix" @click="showDetail(item.P_ID, goodsList, index)"></div>
        <div class="infobox">
          <p class="title">{{ item.P_Name }}</p>
          <p class="desc">规格：<span>{{ item.OVF_Field1 }}</span></p>
          <div>
            <span class="price">￥<b>{{ item.P_MarketPrice }}</b></span>
            <cart-btn :shopObj="putShop(item)"></cart-btn>
          </div>
        </div>
      </div>
    </div>
    <van-toast id="van-toast" />
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
               <p>该产品供应周期为10--3月，请至少提前一周与客服进行预定该产品供应周期为10--3月，请至少提前一周与客服进行预定该产品供应周期为10--3月，请至少提前一周与客服进行预定该产品供应周期为10--3月，请至少提前一周与客服进行预定</p>
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
import CartBtn from '../../components/cartBtn'
import wxParse from 'mpvue-wxparse'
export default {
  data() {
    return {
      currentCol: '3416',
      tabList: [],
      activeTab: 0,
      host: this.$host,
      page: 1,
      rows: 10,
      goodsList: [],
      showPopup: false,
      popScrollHeight: '',
      shopDetail: null,
      detailList: '',
      detailIndex: null
    }
  },
  methods: {
    getTabList() {
      let that = this
      that.$fly.get("/GetColumn.asp", { Column_ID: '3416' })
      .then(res => {
        let tabArr = []
        res.rows.map((item, index) => {
          let o = {}
          o.cid = item.C_ID
          o.name = item.C_Name
          tabArr.push(o)
        })
        tabArr.unshift({ cid: '3416', name: '全部' })
        that.tabList = tabArr
        that.getGoodsList(tabArr[0].cid, 1, that.rows, false)
      })
    },
    getGoodsList(column, page, rows, flag) {
      let that = this
      that.$fly.get("/GetSearchProduct.asp", { page: page, rows: rows, Column: column, DisplyObj: 'field1,field2,field3,CartQuantity' })
      .then(res => {
        res.rows.map(item => {
          item.selectNum = this.$store.getters.getCountByPid(item.P_ID) ? this.$store.getters.getCountByPid(item.P_ID) : 0
        })
        flag ? res.rows.length !== 0 ? that.goodsList = that.goodsList.concat(res.rows) : that.isBottom = true : that.goodsList = res.rows
      })
    },
    currentTab(e) {
      let that = this
      that.activeTab = e.mp.detail.index
      that.currentCol = that.tabList[that.activeTab].cid
      that.getGoodsList(that.currentCol, 1, that.rows, false)
      wx.setNavigationBarTitle({
        title: event.target.title
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
  onLoad(option) {
    let that = this
    that.getTabList()
    console.log(option.index)
    that.activeTab = option.index
  },
  onShow() {
    let that = this  
  },
  onReady() {
    let that = this
    let windowHeight = wx.getSystemInfoSync().windowHeight
    let windowWidth = wx.getSystemInfoSync().windowWidth
    that.popScrollHeight = (windowHeight * 750 / windowWidth) * 0.65 - 360
    wx.setNavigationBarTitle({
      title: '非会员区'
    })
  },
  onReachBottom() {
    let that = this
    that.getGoodsList(that.currentCol, that.page, that.rows, true)
  },
  components: {
    "cart-btn": CartBtn,
    "wxParse": wxParse
  }
}
</script>

<style lang="scss">
@import url("~mpvue-wxparse/src/wxParse.css");
.container{
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  box-sizing: border-box;
  background-color: #fafafa;
  padding: 15rpx;
  .card{
    width: 50%;
    border: 1rpx solid #fafafa;
    box-sizing: border-box;
    background-color: #fff;
    padding: 12rpx;
    .imgbox{
      width: 100%;
      height: 330rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      img{
        width: 100%;
      }
    }
    .infobox{
      font-size: 28rpx;
      color: #333;
      .title{
        font-weight: 700;
      }
      .desc{
        color: #999;
        font-size: 24rpx; 
      }
      div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .price{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          color: #f54e52;
          font-weight: 700;
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

