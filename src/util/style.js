/**
 * 解析json字符串->style 字符串
 * @return {[type]} [description]
 */
export default function(style = style || {}) {
   // json 字符串去掉 ｛｝
  let styleSTR = style ? JSON.stringify(style) : ''

  return  styleSTR.length > 0 
          ? styleSTR.substr(1,styleSTR.length - 2).replace(new RegExp('"',"gm"),'') 
          : ''
}
