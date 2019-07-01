<template>
  <span class="cartBtn">
    <block v-if="shopObj.count > 0">
      <div @click="decrFromCart" class="decrBtn">-</div>
      <b>{{ shopObj.count }}</b>
    </block>
    <div @click="addToCart" class="addBtn">+</div>
  </span>
</template>

<script>
import Toast from '../../static/vant/toast/toast'
export default {
  methods: {
    addToCart() {
      let that = this
      if (this.selectNum >= 2) {
        Toast('每样商品最多只能选择两件！');
      } else {
        that.shopObj.count = that.$store.getters.getCountByPid(that.shopObj.P_ID)
        that.shopObj.selected = true
        that.$store.commit("addToCart", that.shopObj)
        that.$forceUpdate();
      }
    },
    decrFromCart() {
      let that = this
      that.$store.commit("decrFromCart", that.shopObj.P_ID)
    }
  },
  props: ["shopObj"]
}
</script>

<style lang="scss" scoped>
.cartBtn{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  div{
    padding: 0;
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    color: #fff;
    background-color: #11998e;
    font-size: 36rpx;
    font-weight: 700;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    padding-bottom: 6rpx;
    box-sizing: border-box;
    &.decrBtn{
      background-color: #fff;
      border: 1px solid #11998e;
      color: #11998e;
    }
  }
  b{
    margin: 0 20rpx;
  }
}
</style>

