export function toJS(ob) {
  let res = {}

  try {
    res = JSON.parse(JSON.stringify(ob))
  } catch (error) {
    console.log('解析Observer对象出错：', error)
  }

  return res
}
