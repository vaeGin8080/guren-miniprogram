<template>
  <div class="personal">
    <div class="top">
      <block v-if="isLogin">
        <div class="avatar">
          <open-data type="userAvatarUrl"></open-data>
        </div>
        <p class="username"><open-data type="userNickName"></open-data></p>
      </block>
      <block v-else>
        <div class="avatar">
          <img src="/static/images/user.png" mode="widthFix">
        </div>
        <van-button custom-class="loginBtn" size="small" :plain="true" :hairline="false" open-type="getUserInfo" @getuserinfo="getUserInfo">点击登录</van-button>
      </block>
      <div class="beMember">
        <span>古仁农场</span>
        <span>成为会员 <van-icon name="arrow"/></span>
      </div>
    </div>
    <div class="content">
      <van-cell-group custom-class="cell-group" :border="false">
        <van-cell title="我的订单" value="查看全部订单" is-link title-class="title-style" value-class="value-style" @click="pageTo" data-index="0"/>
        <van-cell :border="false" >
          <div class="box">
            <div @click="pageTo" data-index="1">
              <img src="/static/images/icon-dfk.png">
              <p>待付款</p>
            </div>
            <div @click="pageTo" data-index="2">
              <img src="/static/images/icon-dfh.png">
              <p>待发货</p>
            </div>
            <div @click="pageTo" data-index="3">
              <img src="/static/images/icon-dsh.png">
              <p>待收货</p>
            </div>
            <div @click="pageTo" data-index="4">
              <img src="/static/images/icon-ywc.png">
              <p>已完成</p>
            </div>
          </div>
        </van-cell>
      </van-cell-group>
      <van-cell-group custom-class="cell-group" :border="false">
        <van-cell title="客服聊天" icon="service-o" value-class="valueStyle"><button class="customBtn" open-type="contact" :plain="true"><van-icon name="arrow" custom-class="arrowBtn"/></button></van-cell>
        <van-cell title="购物车" icon="shopping-cart-o" is-link url="/pages/shoppingCart/main" link-type="switchTab"/>
        <van-cell title="收货地址" icon="location-o" is-link @click="toAddress"/>
      </van-cell-group>
      <van-cell-group custom-class="cell-group" :border="false">
        <van-cell title="个人中心" icon="manager-o" is-link/>
        <van-cell title="账号设置" icon="setting-o" is-link/>
      </van-cell-group>
    </div>
    <van-popup :show="showLoginBox" @close="closeLoginBox" custom-class="loginPop">
      <div class="login-box">
        <img src="/static/images/logo.jpg">
        <p>北京古仁原生态种植专业合作社</p>
        <div>
          <van-field :value="phoneNum" placeholder="请输入手机号" bind:change="onChange" @change="inputPhoneNum"/>
          <van-field :value="smsCode" center clearable placeholder="请输入短信验证码" :border="false" use-button-slot @change="inputSmsCode">
            <van-button slot="button" size="small" type="primary" custom-class="getSmsBtn" @click="getSms" :disabled="isSend">{{ isSend ? second : '发送验证码' }}</van-button>
          </van-field>
          <van-button type="default" size="large" custom-class="login" @click="login">登录</van-button>
        </div>
      </div>
    </van-popup>
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
import Toast from '../../../static/vant/toast/toast'
export default {
  data() {
    return {
      host: this.$host,
      isLogin: this.$store.getters.getUser.usercode ? true : false,
      showLoginBox: false,
      phoneNum: '',
      smsCode: '',
      isSend: false,
      second: 60,
      userinfo: null
    }
  },
  methods: {
    getUserInfo(e) {
      let that = this
      if (e.target.iv) {
        that.userinfo = e.mp.detail.userInfo
        that.showLoginBox = true
        wx.cloud.callFunction({ name: 'getOpenid' })
        .then(res => {
          that.userinfo.openid = res.result.openid
        })
      } 
    },
    closeLoginBox(e) {
      let that = this
      that.showLoginBox = false
    },
    getSms() {
      let that = this
      let reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/g
      if(that.isSend) return
      if (that.phoneNum.match(reg)){
        let sendData = {
          Title: "登录",
          Mobile: that.phoneNum,
          TempId: 442312
        }
        that.$fly.get("/GetSendCheckCode.asp", sendData)
        .then(res => {
          that.isSend = true
          that.countdown()
        })
      } else {
        Toast('请输入正确的手机号')
      }
    },
    toAddress() {
      let that = this
      if (that.$store.getters.getUser.usercode) {
        wx.navigateTo({
          url: '/pages/address/main'
        })
      } else {
        Toast.fail('请先登录');
      }  
    },
    inputPhoneNum(e) {
      let that = this
      that.phoneNum = e.mp.detail
      console.log(e)
    },
    inputSmsCode(e) {
      let that = this
      that.smsCode = e.mp.detail
    },
    login() {
      let that = this
      let sendData = {
        action: "GetOpenidLogin",
        WXOpenid2: that.userinfo.openid
      }
      that.$fly.get("/GetUserLogin.asp", sendData)
      .then(res => {
        let send = {
          action: "GetOpenidRegister",
          WXOpenid2: that.userinfo.openid,
          Mobile: that.phoneNum,
          CheckMobileCode: that.smsCode
        }
        that.$fly.get("/GetUserRegister.asp", send)
        .then(res2 => {
          if (res2.code === 200) {
            let user = {
              usercode: res2.usercode,
              token: res2.token
            }
            Object.assign(user, that.userinfo)
            that.$store.commit("setUser", user)
            that.showLoginBox = false
            that.isLogin = true
          } else {
            Toast('登录失败')
          }
        })
      })
    },
    countdown() {
      let that = this
      let timer = null
      if (that.second > 0) {
        timer = setInterval(() => {
          that.second --
        }, 1000)
      } else {
        that.isSend = false
        that.second = 60
        clearInterval(timer)
      }
    },
    pageTo(e) {
      if (this.$store.getters.getUser.usercode) {
        wx.navigateTo({
          url: "/pages/orderForm/main?index=" + e.mp.currentTarget.dataset.index
        })
      } else {
        Toast.fail('请先登录');
      }  
      
    }
  },
  watch: {
    second(newVal, oldVal) {
      if (newVal === 0) {
        this.countdown()
      }
    }
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: '个人中心'
    })
  }
}
</script>

<style lang="scss">
.personal{
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  flex: 1;
  .top{
    height: 340rpx;
    background-color: #11998e;
    position: relative;
    .avatar{
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      overflow: hidden;
      position: absolute;
      top: 50rpx;
      left: 50%;
      transform: translateX(-50%);
      img{
        width: 100%;
        height: 100%;
      }
    }
    .username{
      font-size: 32rpx;
      color: #fff;
      font-weight: 700;
      text-align: center;
      padding-top: 180rpx;
    }
    .beMember{
      width: 94%;
      height: 80rpx;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      justify-content: space-between;
      background-color: #125f59;
      border-top-left-radius: 10rpx;
      border-top-right-radius: 10rpx;
      padding: 0 30rpx;
      box-sizing: border-box;
      line-height: 80rpx;
      color: #fff;
      font-size: 28rpx;
      span{
        &:nth-child(1){
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      }
    }
  }
  .content{
    padding: 20rpx;

  }
}
.box{
  padding: 20rpx 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  div{
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      width: 40rpx;
      height: 38rpx;
    }
    p{
      color: #333;
      margin-top: 8rpx;
    }
  }
}
.cell-group{
  border-radius: 20rpx;
  overflow: hidden;
  margin-bottom: 20rpx;
}
.title-style{
  font-weight: 700;
}
.value-style{
  position: relative;
}
.customBtn{
  position: absolute;
  right: 30rpx;
  width: 32rpx;
  height: 48rpx;
  border:none !important;
  background: transparen;
  background-color: transparent;
  -webkit-tap-highlight-color:transparent;
  padding-left: 0;
  padding-right: 0;
  outline: none;
  border-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
button:after {
  border: none;
}
.arrowBtn{
  font-size: 30rpx !important;
  color: #999;
}
.loginBtn{
  background-color: transparent !important;
  border: none !important;
  top: 180rpx;
  left: 50%;
  transform: translateX(-50%);
}
.loginPop{
  width: 80%;
  height: 55%;
  border-radius: 10rpx;
  box-sizing: border-box;
  padding: 30rpx;
}
.login-box{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  img{
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    overflow: hidden;
  }
  p{
    font-size: 28rpx;
    font-weight: 700;
    color: #333;
  }
}
.login{
  margin-top: 30rpx;
  background-color: #11998e !important;
  color: #fff !important;
  border-radius: 10rpx !important;
}
.getSmsBtn{
  width: 160rpx !important;
}
</style>

