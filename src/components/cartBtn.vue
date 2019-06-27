<template>
    <span class="cartBtn">
        <block v-if="goodsList[itemIndex].selectNum && goodsList[itemIndex].selectNum > 0">
            <div @click="decrFromCart(itemIndex, goodsList)" class="decrBtn">-</div>
            <b>{{ goodsList[itemIndex].selectNum }}</b>
        </block>
        <div @click="addToCart(itemIndex, goodsList)" class="addBtn">+</div>
    </span>
</template>

<script>
import Toast from '../../static/vant/toast/toast'
export default {
    methods: {
        addToCart(itemIndex, goodsList) {
            if (goodsList[itemIndex].selectNum ===2) {
                Toast('每样商品最多只能选择两件！');
            } else {
                goodsList[itemIndex].selectNum ++
                let goodsInfo = {
                    pid: goodsList[itemIndex].P_ID,
                    count: goodsList[itemIndex].selectNum,
                    price: goodsList[itemIndex].P_MarketPrice,
                    title: goodsList[itemIndex].P_Title,
                    image: goodsList[itemIndex].P_LImage,
                    desc: goodsList[itemIndex].OVF_Field1,
                    selected: true
                }
                this.$store.commit("addToCart", goodsInfo)
            }
        },
        decrFromCart(itemIndex, goodsList) {
            if (goodsList[itemIndex].selectNum > 0) {
                this.$store.commit("decrFromCart", goodsList[itemIndex].P_ID)
                this.goodsList[itemIndex].selectNum --
            }
        },
    },
    props: ["itemIndex", "goodsList"]
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

