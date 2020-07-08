// 验证手机号码
function validatePhoneNumber(str){
	const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
	return reg.test(str);
}
//带参数跳转页面
function GetRequest(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURIComponent(r[2]);
	return null;
}
// 当前时间戳
function CurTime(){
	return Date.parse(new Date())/1000
}
// 日期转时间戳
function DateToUnix(string){
	var f = string.split(' ', 2);
	var d = (f[0] ? f[0] : '').split('-', 3);
	var t = (f[1] ? f[1] : '').split(':', 3);
	return (new Date(
	  parseInt(d[0], 10) || null,
	  (parseInt(d[1], 10) || 1) - 1,
	  parseInt(d[2], 10) || null,
	  parseInt(t[0], 10) || null,
	  parseInt(t[1], 10) || null,
	  parseInt(t[2], 10) || null
	)).getTime() / 1000;
}
//时间戳转日期
function UnixToDate(unixTime,isFull,timeZone){
	 if (typeof (timeZone) == 'number')
	  {
		unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
	  }
	  var time = new Date(unixTime * 1000);
	  var ymdhis = "";
	  ymdhis += time.getUTCFullYear() + "-";
	  ymdhis += ((time.getUTCMonth()+1) < 10 ? "0" + (time.getUTCMonth()+1) : (time.getUTCMonth()+1)) + "-";
	  ymdhis += (time.getUTCDate() < 10 ? "0" + time.getUTCDate() : time.getUTCDate()) + " ";
	  ymdhis += (time.getHours() < 10 ? "0" + time.getHours() : time.getHours()) + ":";
	  ymdhis += (time.getUTCMinutes() < 10 ? "0" + time.getUTCMinutes() : time.getUTCMinutes()) + ":";
	  ymdhis += (time.getUTCSeconds() < 10 ? "0" + time.getUTCSeconds() : time.getUTCSeconds());
	  if (isFull === true)
	  {
		ymdhis += (time.getHours() < 10 ? "0" + time.getHours() : time.getHours()) + ":";
		ymdhis += (time.getUTCMinutes() < 10 ? "0" + time.getUTCMinutes() : time.getUTCMinutes()) + ":";
		ymdhis += (time.getUTCSeconds() < 10 ? "0" + time.getUTCSeconds() : time.getUTCSeconds());
	  }
	  return ymdhis;
}
// 转换成分秒
//时分秒换算
function test(time_distance){
	//分秒换算
	var int_minute = Math.floor(time_distance/60)
	time_distance = time_distance - int_minute * 60; 
	return int_minute+'分'+time_distance+'秒';
};
//判断为空
function validateEmpty(keyVal) {
  if(keyVal == undefined || keyVal=="" || keyVal==null || keyVal.replace(/\s*/g, "") == ""){
    return false
  }else{
    return true
  }
}
//判断姓名
function validateName(str) {
  var reg = /^([\u4e00-\u9fa5]|[a-zA-Z]| |•|-|‧|•|⋅|ㆍ|・|●|(\（+\）)|(\（[\u4e00-\u9fa5]+\）)|(\（[a-zA-Z]+\）))+$/;
  if(str.length>20 || str.length<2){
    return false;
  }else{
    return reg.test(str)
  }
}
//判断民族
function validateNation(str) {
  var reg = /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/;
  return reg.test(str)
}
//判断电子邮箱
function validateEmail(str) {
  var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return reg.test(str)
}
//判断身份证
function IdentityCodeValid(code) {
  var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外", 99: "香港" };
  var pass = true;
  //验证身份证格式（6个地区编码，8位出生日期，3位顺序号，1位校验位）
  if ( code.length == 18 && (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code))) {
    pass = false;
  } else if(code.length == 15 && (!code || !/^\d{6}?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}$/i.test(code))){
    pass = false;
  } else if(code.length != 15 && code.length != 18){
    pass = false;
  } else if (!city[code.substr(0, 2)]) {
    pass = false;
  } else {
    //18位身份证需要验证最后一位校验位
    if (code.length == 18) {
      code = code.split('');
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      //最后一位不区分大小写
      if (code[17] == 'x') code[17] = code[17].toUpperCase();
      if (parity[sum % 11] != code[17]) {
        pass = false;
      }
    }
  }
  // if(!pass) alert(tip);
  return pass;
}
export default {  
  validatePhoneNumber,
  GetRequest,
  CurTime,
  DateToUnix,
  UnixToDate,
  test,
  IdentityCodeValid,
  validateEmail,
  validateName,
  validateEmpty,
  validateNation
}