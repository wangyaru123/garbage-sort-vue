/**
 * 解析仓库数据，将字符串转换为二位数组，按字节索引和位索引排列
 *
 * @param {*} str 仓库数据字符串
 * @returns 执行结果
 */
export function resolveRepositoryData(str) {
  //  转换为大写str.toLocaleUpperCase()
  var data = str.toLocaleUpperCase()
  //  获取字符串的长度
  var length = data.length
  var result = []
  if (length % 2 !== 0) {
    console.log('接收的数据格式有误，为奇数个字符')
    return result
  }
  for (var i = 0; i < length; i = i + 2) {
    //  高位字符，将每个字符转换为对应的bool数组
    var hchar = transferDataByByte(str.charAt(i))
    //  低位字符，将每个字符转换为对应的bool数组
    var lchar = transferDataByByte(str.charAt(i + 1))
    //  将两个bool数组连接起来，低位在前高位在后
    var total = lchar.concat(hchar)
    //  将8个bool数据的数组存入大数组中
    result.push(total)
  }
  return result
}

/**
 * 按16进制的字节编码将字符转换为4位bool数组
 *
 * @param {*} oneChar 1个字符
 * @returns
 */
function transferDataByByte(oneChar) {
  var result = []
  switch (oneChar) {
    case '0':
      result = [false, false, false, false]
      break
    case '1':
      result = [true, false, false, false]
      break
    case '2':
      result = [false, true, false, false]
      break
    case '3':
      result = [true, true, false, false]
      break
    case '4':
      result = [false, false, true, false]
      break
    case '5':
      result = [true, false, true, false]
      break
    case '6':
      result = [false, true, true, false]
      break
    case '7':
      result = [true, true, true, false]
      break
    case '8':
      result = [false, false, false, true]
      break
    case '9':
      result = [true, false, false, true]
      break
    case 'A':
      result = [false, true, false, true]
      break
    case 'B':
      result = [true, true, false, true]
      break
    case 'C':
      result = [false, false, true, true]
      break
    case 'D':
      result = [true, false, true, true]
      break
    case 'E':
      result = [false, true, true, true]
      break
    case 'F':
      result = [true, true, true, true]
      break
  }
  return result
}
