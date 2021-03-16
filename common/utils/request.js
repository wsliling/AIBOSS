// const commonUrl = '';//公共路径
// //post 封装
// function postRequest(url,data){
//     var promise = new Promise((resolve,reject)=>{
//         var that = this;
//         var params = data;
//         uni.request({
//             url:commonUrl+url,
//             data:params,
//             method:'POST',
//             header:{
//                'content-type':'application/x-www-form-urlencoded',
//                'token':uni.getStorageSync('token')
//             },
//             success:function(res){
//                resolve(res)
//             },
//             error:function(error){
//                reject('error')
//             }
//         })
//     })
//     return promise
// }

// //get 封装
// function getRequest(url,data){
//    var promise = new Promise((resolve,reject)=>{
//        var that = this;
//        var params = data;
//        uni.request({
//             url:commonUrl + url,
//             data:params,
//             method:'GET'，
//             header:{
//                'content-type':'application/json'
//             },
//             success:function(res){
//                resolve(res)
//             },
//             error:function(error){
//                reject(error)
//             }
//        })
//    })
//    return promise
// }
// module.exports = {
//    postRequest,
//    getRequest
// }


import {
	host,
	judgeLogin,
	toast,
	navigate,
	LoginPath,
	navigateBack
} from '@/common/utils/index.js'


// get请求；
// statusObj ---isLogin，是否需要判断登录，
export function get(url, data = {}, statusObj = {}) {
	if ((statusObj.isLogin) && !judgeLogin()) {
		return Promise.reject()
	} else {
		return request(url, 'GET', data, statusObj)
	}
}
// post请求
export function post(url, data = {}, statusObj = {}, isShowLoading = true) {
	if ((statusObj.isLogin) && !judgeLogin()) {
		return Promise.reject()
	} else {
		return request(url, 'POST', data, statusObj, isShowLoading)
	}
}


let loginTipsStatus = false; //未登录弹窗，如果存在多个请求，只弹出一次弹窗
// 统一请求返回code
const code = {
	success: 0, //成功
	fail: 1, //失败
	notLogin: 2, //未登录||登录过期
	resCode1: 200, //成功特别方式
}
export {
	loginTipsStatus,
	code
}
//请求封装
function request(url, method, data, statusObj = {}, isShowLoading = false) {
	isShowLoading = false
	if (isShowLoading) {
		// console.log(isShowLoading)
		uni.showLoading({
			title: '加载中' //数据请求前loading
		})
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: host + url, //仅为示例，并非真实的接口地址
			method: method,
			data: data,
			header: {
				'content-type': 'application/json;charset=utf-8', // 默认值
				// "Access-Control-Allow-Origin": "*"
				// 'content-type': 'application/json' // 默认值
			},
			success: function(res) {
				uni.hideLoading();
				if (res.statusCode === 200) {
					const ret = res.data;
					switch (ret.code) {
						case code.success:
							resolve(ret);
							break;
						case code.resCode1:
							resolve(ret);
							break;
						case code.notLogin:
							// 没登录或登录过期，询问是否跳转到登录页面
							uni.setStorageSync("userId", '')
							uni.setStorageSync("token", '')
							if (!loginTipsStatus) {
								loginTipsStatus = true;

								uni.showModal({
									title: '需要登录',
									content: '是否跳转到登录页面？',
									cancelColor: '#999',
									// confirmColor: '#5cc69a',
									confirmColor: '#4387ea',
									success(res) {
										if (res.confirm) {
											navigate(LoginPath)
										}
									},
									complete() {
										loginTipsStatus = false;
									}
								})
							}
							break;
						case code.fail:
							if ((url == 'User/WithdrawUSDT' && ret.msg.indexOf('未设置') != -1) ||(url == 'User/WithdrawUSDT' && ret.msg.indexOf('支付密码错误') != -1)) {
								resolve(ret);
							} else {
								toast(ret.msg)
								// reject(ret)
								resolve(ret);
							}
							break;
						default:
							toast(ret.msg)
							// reject(ret)
							resolve(ret);
					}
				} else {
					toast('服务器繁忙，请稍后重试')
					// navigateBack();
					reject()
				}
			},
			fail: function(error) {
				uni.hideLoading();
				toast('服务器繁忙，请稍后重试')
				// navigateBack();
				reject(error)
			}
		})
	}).catch(e => {})
}

//请求封装,隐藏加载
export function requestHideLoading(url, data, method) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: host + url, //仅为示例，并非真实的接口地址
			method: method,
			data: data,
			header: {
				'content-type': 'application/json;charset=utf-8' // 默认值
			},
			success: function(res) {
				const ret = res.data;
				if (ret.code === code.success) {
					console.log(123)
					resolve(ret)
				} else
				if (ret.code === code.notLogin) {

					// 没登录或登录过期，询问是否跳转到登录页面
					uni.setStorageSync("userId", '')
					uni.setStorageSync("token", '')
					if (!loginTipsStatus) {
						loginTipsStatus = true;

						uni.showModal({
							title: '需要登录',
							content: '是否跳转到登录页面？',
							cancelColor: '#999',
							// confirmColor: '#5cc69a',
							confirmColor: '#D0A072',
							success(res) {
								if (res.confirm) {
									navigate(LoginPath)
								}
							},
							complete() {
								loginTipsStatus = false;
							}
						})
					}
				} else {
					toast(ret.msg)
					reject(ret)
				}
			},
			fail: function(error) {
				toast('服务器繁忙，请稍后重试')
				reject(error)
			}
		})
	})
}
