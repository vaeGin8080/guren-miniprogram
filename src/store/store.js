import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cart: wx.getStorageSync('cart') || []
  },
  mutations: {
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
    updateShopSelected(state, pid) {
      state.cart.map(item => {
        if (item.pid === pid) {
          item.selected = !item.selected
          return true
        }
      })
      wx.setStorageSync('cart', state.cart)
    },
    updateAllShopSelected(state, flag) {
      state.cart.map(item => {
        item.selected = flag
      })
      wx.setStorageSync('cart', state.cart)
    }
  },
  getters: {
    getCountByPid: (state) => (pid) => {
      let count = 0
      state.cart.map(item => {
        if (item.pid === pid) {
          count = item.count
        }
      })
      return count
    },
    getTotalPrice: (state) => {
      let totalPrice = 0
      state.cart.map(item => {
        if (item.selected) {
          totalPrice += item.count * item.price
        }
      })
      return totalPrice
    }
  }
})

export default store