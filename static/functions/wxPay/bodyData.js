function bodyData(config, nonce_str, openid, out_trade_no, total_fee, sign) {
  let bodyData = '<xml>'
  bodyData += '<appid>' + config.appid + '</appid>'
  bodyData += '<body>' + config.body + '</body>'
  bodyData += '<mch_id>' + config.mch_id + '</mch_id>'
  bodyData += '<nonce_str>' + nonce_str + '</nonce_str>'
  bodyData += '<openid>' + openid + '</openid>'
  bodyData += '<notify_url>' + config.notify_url + '</notify_url>'
  bodyData += '<out_trade_no>' + out_trade_no + '</out_trade_no>'
  bodyData += '<spbill_create_ip>' + config.spbill_create_ip + '</spbill_create_ip>'
  bodyData += '<total_fee>' + total_fee + '</total_fee>'
  bodyData += '<trade_type>JSAPI</trade_type>'
  bodyData += '<sign>' + sign.toUpperCase() + '</sign>'
  bodyData += '</xml>'
  return bodyData
}

module.exports = bodyData