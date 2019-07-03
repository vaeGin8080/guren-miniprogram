function non_str() {
  let data = ''
  let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  for (let i = 0; i< 32; i++) {
    let id = parseInt(Math.random() * (chars.length - 1))
    data += chars[id]
  }
  return data
}

module.exports = non_str