<script>
export default {
  onShow(){
    let that = this
    let sendData = {
      action: "GetOpenidLogin",
      WXOpenid2: that.$store.getters.getOpenid
    }
    that.$fly.get("/GetUserLogin.asp", sendData)
    .then(res => {
      if(res.code === 200) {
        that.$store.commit('updateToken', res.token)
      } else {
        return
      }
    })
    if (this.$store.getters.getTotalCount > 0) {
      wx.setTabBarBadge({
        index: 2,
        text: this.$store.getters.getTotalCount.toString()
      })
    }
  },
  watch: {
    '$store.getters.getTotalCount': function() {
      if(this.$store.getters.getTotalCount > 0) {
        wx.setTabBarBadge({
          index: 2,
          text: this.$store.getters.getTotalCount.toString()
        })
      } else {
        wx.removeTabBarBadge({
          index: 2
        })
      }
    }
  }
}
</script>

<style lang="scss">
page{
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.bottom-line{
  text-align: center;
  font-size: 20rpx;
  color: #999;
  padding: 30rpx 0 60rpx 0;
}
button::after{
border:none;
}
input{
outline:none;
border:none;
list-style: none;
}
.no-content{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%,-50%);
  img{
    width: 160rpx;
  }
  p{
    margin-top: 30rpx;
    font-size: 24rpx;
    color: #999;
  }
}
</style>
