const config = require('./config.js')
const bodyData = require('./bodyData.js')
const strRandom = require('./non_str_random.js')
const crypto = require('crypto')
const request = require('request')
const xml2js = require('xml2js')

const xmlParse = new xml2js.Parser({ explicitArray: false, ignoreAttrs: true })
const out_trade_no = Date.parse(new Date())
const nonce_str = strRandom()

exports.main = async(event, context) => {
  let str = 'appid=' + config.appid + '&body=' + config.body + '&mch_id=' + config.mch_id + '&nonce_str=' + nonce_str + '&notify_url=' + config.notify_url + '&openid=' + event.openid + '&out_trade_no=' + out_trade_no + '&spbill_create_ip=' + config.spbill_create_ip + '&total_fee=' + event.total_fee + '&trade_type=JSAPI' + '&key=' + config.key
  let sign = crypto.createHash('md5').update(str).digest('hex')
  let temp_body_data = bodyData(config, nonce_str, event.openid, out_trade_no, event.total_fee, sign)
  return new Promise((resolve, reject) => {
    request({
      url: config.url,
      method: 'POST',
      body: temp_body_data
    }, (err, res, body) => {
      xmlParse.parseString(body, (err, res) => {
        let prepay_id = res.xml.prepay_id
        let str = 'appId=' + config.appid + '&nonceStr=' + nonce_str + '&package=prepay_id=' + prepay_id + '&signType=MD5&timeStamp=' + out_trade_no + '&key=' + config.key
        let paySign = crypto.createHash('md5').update(str).digest('hex')
        return resolve({
          success: true,
          data: {
            timeStamp: out_trade_no.toString(),
            nonceStr: nonce_str,
            package: 'prepay_id=' + prepay_id,
            paySign: paySign,
            outTradeNo: out_trade_no
          }
        })
      })
    })
  })
    
}