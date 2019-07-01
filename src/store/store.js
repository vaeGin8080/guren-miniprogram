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
      state.user = userObj
      wx.setStorageSync('user', state.user)
    },
    // 保存收货地址
    setUserAddress(state, address) {
      state.user.address = address
      wx.setStorageSync('user', state.user)
    },
    // 添加商品到购物车
    addToCart(state, shopObj) {
      if (shopObj.count && shopObj.count !== 0) {
        state.cart.map(item => {
          if (item.P_ID === shopObj.P_ID) {
            item.count ++
            return true
          }
        })
      } else {
        shopObj.count = 1
        state.cart.push(shopObj)
      }
      wx.setStorageSync('cart', state.cart)
    },
    // 通过 pid 删除或减少购物车商品
    decrFromCart(state, pid) {
      state.cart.map((item, i) => {
        if (item.P_ID === pid) {
          if(item.count > 1){
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
        if (item.P_ID === arr[0]) {
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
        if (item.P_ID === pid) {
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
        if (item.P_ID === pid) {
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
    getAddress: (state) => {
      return state.user.address
    },
    // 根据 pid 获取购物车商品的数量
    getCountByPid: (state) => (pid) => {
      let count = 0
      state.cart.map(item => {
        if (item.P_ID === pid) {
          count = item.count
          return true
        }
      })
      return count
    },
    // 获取购物车所有选择商品的总价
    getTotalPrice: (state) => {
      let totalPrice = 0
      state.cart.map(item => {
        if (item.selected) {
          totalPrice += item.count * item.P_MarketPrice
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
    },
    getCount: (state) => {
      let count = 0
      state.cart.map(item => {
        count += item.count
      })
      return count
    }
  }
})

export default store