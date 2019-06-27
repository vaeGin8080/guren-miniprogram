<template>
  <div class="container">
    <div class="card" v-for="(item, index) in goodsList" :key="index">
      <div class="imgbox"><img :src="host + item.P_LImage" mode="widthFix"></div>
      <div class="infobox">
        <p class="title">{{ item.P_Name }}</p>
        <p class="desc">规格：<span>{{ item.OVF_Field1 }}</span></p>
        <div>
          <span class="price">￥<b>{{ item.P_MarketPrice }}</b></span>
          <cart-btn :itemIndex="index" :goodsList="goodsList"></cart-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartBtn from './cartBtn'
export default {
  components: {
    "cart-btn": CartBtn
  },
  props: ["goodsList"]
}
</script>

<style lang="scss" scoped>

</style>

