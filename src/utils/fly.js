import Fly from 'flyio/dist/npm/wx'

const fly = new Fly()
fly.config.baseURL = "http://guren.host30.voosite.com/Json/"
fly.interceptors.request.use((request) => {
  return request
})
fly.interceptors.response.use(
  (response, promise) => {
    return promise.resolve(response.data)
  },
  (err, promise) => {
    wx.showToast({
      title: err.message,
      icon: 'none'
    })
    return promise.resolve()
  }
)

export default fly