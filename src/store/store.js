import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cart: wx.getStorageSync('cart') || [],
    user: wx.getStorageSync('user') || {}
  },
  mutations: {
    // 保存用户登录信息
    setUser(state, userObj) {
      wx.setStorageSync('user', userObj)
    },
    // 添加商品到购物车
    addToCart(state, goodsInfo) {
      let flag = false
      state.cart.map(item => {
        if (item.pid === goodsInfo.pid) {
          item.count ++
          flag = true
          return true
        }
      })
      if (!flag) {
        goodsInfo.count = 1
        state.cart.push(goodsInfo)
      }
      wx.setStorageSync('cart', state.cart)
    },
    // 通过 pid 删除或减少购物车商品
    decrFromCart(state, pid) {
      state.cart.map((item, i) => {
        if (item.pid === pid) {
          if(item.count !== 0){
            item.count --
          } else {
            state.cart.splice(i, 1)
          }
          return true
        }
      })
      wx.setStorageSync('cart', state.cart)
    },
    // 根据 pid 改变购物车商品的数量
    updateShopCount(state, arr) {
      state.cart.map((item, i) => {
        if (item.pid === arr[0]) {
          if (arr[1] !== 0) {
            item.count = arr[1]
          } else {
            state.cart.splice(i, 1)
          }
          return true
        }
      })
      wx.setStorageSync('cart', state.cart)
    },
    // 更新单个商品在购物车的选择状态
    updateShopSelected(state, pid) {
      state.cart.map(item => {
        if (item.pid === pid) {
          item.selected = !item.selected
          return true
        }
      })
      wx.setStorageSync('cart', state.cart)
    },
    // 更新所有商品在购物车的选中状态
    updateAllShopSelected(state, flag) {
      state.cart.map(item => {
        item.selected = flag
      })
      wx.setStorageSync('cart', state.cart)
    },
    // 从购物车删除商品
    deletShop(state, pid) {
      state.cart.map((item, i) => {
        if (item.pid === pid) {
          state.cart.splice(i, 1)
        }
        return true
      })
      wx.setStorageSync('cart', state.cart)
    }
  },
  getters: {
    // 获取登录用户的信息
    getUser: (state) => {
      return state.user
    },
    // 根据 pid 获取购物车商品的数量
    getCountByPid: (state) => (pid) => {
      let count = 0
      state.cart.map(item => {
        if (item.pid === pid) {
          count = item.count
        }
      })
      return count
    },
    // 获取购物车所有选择商品的总价
    getTotalPrice: (state) => {
      let totalPrice = 0
      state.cart.map(item => {
        if (item.selected) {
          totalPrice += item.count * item.price
        }
      })
      return totalPrice
    },
    // 获取购物车所有选择商品的总数
    getTotalCount: (state) => {
      let totalCount = 0
      state.cart.map(item => {
        if (item.selected) {
          totalCount += item.count
        }
      })
      return totalCount
    }
  }
})

export default store