
// 线上地址
const host = 'http://api.aiboss.club/api/'; 
const webSocketPath = "ws://api.aiboss.club/WebSocketServer.ashx";//ws路径
// 测试地址
// const host = 'http://lhapi.szyscjd.com/api/'; 
// const webSocketPath = "ws://lhapi.szyscjd.com/WebSocketServer.ashx";//ws路径

const LoginPath = "login/login";//登录路径
const RegisterPath = "login/register";//注册路径

import {get,post,requestHideLoading} from './request';
import {editTime,dateUtils,timeDiff,formatNumber,initDate} from './date-tools';
export {
  host,
	LoginPath,RegisterPath,webSocketPath,
  get,post,requestHideLoading,
  editTime,dateUtils,timeDiff,formatNumber,initDate
}

// icon--是否显示图标，mask--是否显示防触摸穿透蒙层
export function toast(title,data={icon:false,mask:false,time:2000}){
  uni.showToast({
    title:title,
    icon:data.icon?'success':'none',
    mask:data.mask||false,
    duration:data.time||2000
  })
}
//判断是否登录，未登录做弹窗跳转登录页面
export function judgeLogin(){
  // 未登录false，已登录true
  if (!uni.getStorageSync("userId") || !uni.getStorageSync("token")) {
	  
      uni.showModal({
        title:'未登录',
        content:'是否跳转到登录页面？',
        cancelColor:'#999',
        confirmColor:'#4387ea',
        success(res){
          if(res.confirm){
            navigate(LoginPath,{'isResgister':false})
          }
        }
      })
      return false;
  }else{
    return true;
  }
}
// 去空字符串
export function trim(str) {
  // return str.replace(/(^\s*)|(\s*$)/g, "");
	
	return str.replace(/<\/?[^>]*>/gim,"");//去掉所有的html标记
	
}
//验证手机号
export function verifyPhone(tel) {
  var r_phone = /^1(3|4|5|6|7|8|9)\d{9}$/;
  // var phoneNumber = $.trim($('#phoneNumber').val());
  if (trim(tel) == "") {
    toast( "手机号不能为空!");
    return false;
  }
  if (!r_phone.test(tel)) {
    toast("请输入正确的手机格式!");
    return false;
  }
  return true;
}
export function isNumber(num){
	let reg = /^[0-9]*[1-9][0-9]*$/
	if(reg.test(num)){
		return true
	}else{
		return false
	}
}
export function isIdCard(idCard){
	let reg = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/
	if(reg.test(idCard)){
		return true
	}else{
		return false
	}
}
// 函数防抖,多少秒内只允许执行一次，重复点击会重新计时
let timeout = null
export function debounce(fn, wait = 500) {
  if (timeout !== null) clearTimeout(timeout)
  timeout = setTimeout(fn, wait)
}

// 函数节流,多少秒内只允许执行一次，重复点击会无视
let throtteStatus = false
export function throtte(fn, wait = 500) {console.log(throtteStatus)
  if (throtteStatus) return;
  throtteStatus = true;
  fn()
  // setTimeout(fn, wait)
  setTimeout(() => {
    throtteStatus = false;
  }, wait)
}
// 上传文件
export function upFile(filePath) {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: host + 'Area/VoiceUpload',
      filePath,
      name: 'file',
      success(res) {
        console.log('文件上传', res)
        resolve(res);
      },
      fail(err) {
        console.log('文件上传失败', err)
        uni.showToast({
          title: '文件上传失败，请重试！',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}
// 保存文件
export function saveFile(filePath){
  // downloadFile下载文件，然后saveFile保存
  uni.downloadFile({   
     url: filePath,   
     success: (res) => {  
        if (res.statusCode === 200) { 
          // h5端
		      if (typeof window === 'object' && 'document' in window) {
            var oA = document.createElement("a");
            oA.download = '';// 设置下载的文件名，默认是'下载'
            oA.href = res.tempFilePath;
            document.body.appendChild(oA);
            oA.click();
            oA.remove(); // 下载之后把创建的元素删除
          }else{
            uni.saveFile({  
                 tempFilePath: res.tempFilePath,  
                 complete(res) {  
                   console.log(res)  
                 }  
               });
          }  
        }  
     }  
 });
}

// 更改图片展示，判断是否带链接图片
export function autoImg(img) {
  if (img.indexOf('http') === -1) {
    return filePath + img
  }
  return img;
}

// 后退到上一页,防抖
export function navigateBack(time=200){
	debounce(function(){uni.navigateBack();console.log('回退了一次')},time)
}
// 跳转url,带参
export function navigate(url,params,isLogin){
  console.log('要跳转到的地址'+url)
  // 判断是否已登录
  if(isLogin&&!judgeLogin()){
    return;
  }
  let p ='';
  if(params){
    let arr = Object.keys(params);
    arr.map((item,index)=>{
      p+=`${item}=${params[item]}`;
      if(index<arr.length-1){p+='&'};
    })
  }
  uni.navigateTo({
    url:`/pages/${url}?${p}`,
		// animationType: 'pop-in',
		// animationDuration: 200
  })
}
// 跳转url,带参
export function switchTab(url,params,isLogin){
  if(isLogin&&!judgeLogin()){
    return;
  }
  let p ='';
  if(params){
    let arr = Object.keys(params);
    arr.map((item,index)=>{
      p+=`${item}=${params[item]}`;
      if(index<arr.length-1){p+='&'};
    })
  }
  uni.switchTab({
    url:`/pages/${url}?${p}`
  })
}

// 关闭当前页面跳转url,带参
export function redirect(url,params,isLogin){
  console.log(url,'url')
  if(isLogin&&!judgeLogin()){
    return;
  }
  let p ='';
  if(params){
    let arr = Object.keys(params);
    arr.map((item,index)=>{
      p+=`${item}=${params[item]}`;
      if(index<arr.length-1){p+='&'};
    })
  }
  uni.redirectTo({
    url:`/pages/${url}?${p}`
  })
}

//产生不相同的字符串
export function CreatOnlyVal() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}
// 复制
export function copy(data){
  uni.setClipboardData({
    data,
    success(){ 
      toast('复制成功',{icon:true})
    },
    fail(){
      toast('复制失败，请重试！')
    }
  })
}
export function call(phone){
  uni.makePhoneCall({
    phoneNumber:phone+'',
    success(res){

    },
    fail(){
      toast('呼叫失败，请重试！')
    }
  })
}
// 获取当前地址
export function getCurrentPageUrlWithArgs() {
  const pages = getCurrentPages();
  console.log(pages,'pages')
  const currentPage = pages[pages.length - 1];
  const url = currentPage.route;
  // #ifndef H5
  const options = currentPage.options;
  // #endif
  // #ifdef H5
  const options = currentPage.$mp.query;
  // #endif
  
  let urlWithArgs = `/${url}?`;
  for (let key in options) {
    const value = options[key]
    urlWithArgs += `${key}=${value}&`
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
  return urlWithArgs
}
// 获取当前屏幕宽度,去app的onshow调用,存储vuex
export function getSystemInfoWidth() {
  let w = 0;
  uni.getSystemInfo({
    success: function (res) {
  		console.log(res)
      w = res.windowWidth / 375;//按照750的屏宽
    },
  })
  return w
}


// 定时器

export function TNT({timer,that,delay = 1000,type,callBack}) {
	// 引入后,在页面使用示例
	// TNT({
	// 	timer: 'timer2', // 变量名
	// 	that: this, // 页面的this实例
	// 	delay: 1000, // 默认1000,不写也行
	// 	type: 'setTimeOut', // setTimeOut是定时器,setInterval是计时器
	// 	callBack:()=> { // 回调
	// 		console.log('我是回调')
	// 	} 
	// })
	if(that[timer] != null) {
		console.log('别点了')
		return
	}
	
	// 统一一下大小写
	type = String(type).toLowerCase()
	console.log('type',type)
	if(type == 'settimeout'){
		that[timer] = setTimeout(() => {
			// 清除定时器
			clearTimeout(that[timer]);
			that[timer] = null;
			// 回调
			callBack()
		}, delay)
		console.log('timer,this.timer2:: ',that[timer])
		that.$once('hook:beforeDestroy', () => {
			// console.log('我被销毁了呀呀呀呀呀呀')
			clearTimeout(that[timer]);
			that[timer] = null;
		})
	}else if(type == 'setinterval'){
		that[timer] = setInterval(() => {
			// 清除定时器
			clearInterval(that[timer]);
			that[timer] = null;
			// 回调
			callBack()
		}, delay)
		console.log('timer,this.timer2:: ',that[timer])
		that.$once('hook:beforeDestroy', () => {
			// console.log('我被销毁了呀呀呀呀呀呀')
			clearInterval(that[timer]);
			that[timer] = null;
		})
	}
	
}