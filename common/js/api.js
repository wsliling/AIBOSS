// const commonUrl = 'http://api.luokeyun1313.com'

// //post 封装
// function postRequest(url,data){
//     return new Promise((resolve,reject)=>{
//         uni.request({
//             url: commonUrl+url,
//             data: data,
//             method:'POST',
//             success:function(res){
//                resolve(res)
//             },
//             error:function(error){
//                reject(error)
//             }
//         })
//     })
// }

// //get 封装
// function getRequest(url,data){
//    return new Promise((resolve,reject)=>{
//        uni.request({
//             url:commonUrl + url,
//             data: data,
//             method:'GET',
//             success:function(res){
//                resolve(res)
//             },
//             error:function(error){
//                reject(error)
//             }
//        })
//    })
// }
// module.exports = {
//    postRequest,
//    getRequest
// }

// 版本二
import {
	host,
	judgeLogin,
	toast,
	navigate,
	LoginPath,
	navigateBack
} from '@/common/utils/index.js'

 // 测试地址
 // const commonUrl = 'http://lhapi.szyscjd.com'; 
 // 线上地址
const commonUrl = 'http://api.aiboss.club'

let loginTipsStatus = false; //未登录弹窗，如果存在多个请求，只弹出一次弹窗
// 统一请求返回code
const code = {
	success: 0, //成功
	fail: 1, //失败
	notLogin: 2, //未登录||登录过期
	resCode1: 200, //成功特别方式
}

//post 封装
function postRequest(url,data){
    return new Promise((resolve,reject)=>{
        uni.request({
            url: commonUrl+url,
            data: data,
            method:'POST',
            success:function(res){
               // resolve(res)
							 if (res.statusCode === 200) {
							 const ret = res.data;
							 const ret2 = res;
							 	switch (ret.code) {
							 		case code.success:
							 			resolve(ret2);
							 			break;
							 		case code.resCode1:
							 			resolve(ret2);
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
									// console.log('16664')
							 			if ((url == 'User/WithdrawUSDT' && ret.msg.indexOf('未设置') != -1) ||(url == 'User/WithdrawUSDT' && ret.msg.indexOf('支付密码错误') != -1)) {
							 				resolve(ret2);
							 			} else {
							 				toast(ret.msg)
							 				// reject(ret)
							 				resolve(ret2);
							 			}
							 			break;
							 		default:
							 			// toast(ret.msg)
							 			// reject(ret)
							 			resolve(ret2);
							 	}
							 } else {
							 	toast('服务器繁忙，请稍后重试')
							 	// navigateBack();
							 	reject()
							 }
            },
            error:function(error){
							 toast('服务器繁忙，请稍后重试')
               reject(error)
							 // navigateBack();
            }
        })
    })
}

//get 封装
function getRequest(url,data){
   return new Promise((resolve,reject)=>{
       uni.request({
            url:commonUrl + url,
            data: data,
            method:'GET',
            success:function(res){
							 // console.log('ress',res)
               // resolve(res)
							 if (res.statusCode === 200) {
							 	const ret = res.data;
								const ret2 = res;
							 	switch (ret.code) {
							 		case code.success:
							 			resolve(ret2);
							 			break;
							 		case code.resCode1:
							 			resolve(ret2);
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
							 				resolve(ret2);
							 			} else {
							 				toast(ret.msg)
							 				// reject(ret)
							 				resolve(ret2);
							 			}
							 			break;
							 		default:
							 			// toast(ret.msg)
							 			// reject(ret)
							 			resolve(ret2);
							 	}
							 } else {
							 	toast('服务器繁忙，请稍后重试')
							 	// navigateBack();
							 	reject()
							 }
            },
            error:function(error){
               toast('服务器繁忙，请稍后重试')
               reject(error)
            }
       })
   })
}
module.exports = {
   postRequest,
   getRequest
}