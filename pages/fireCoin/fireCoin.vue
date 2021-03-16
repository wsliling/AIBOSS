<template>
	<view>
		<!-- <view :style="{'padding-top':customBar+'upx'}" class="header">
			<view class="header-left width iconfont icon-xiaoyufuhao" @click="back">

			</view>
			<view class="header-center">
				{{ coinName }}
			</view>
			<view class="header-right width" @click="toLookCourse">
				查看教程
			</view>
		</view> -->
		<header-bar :title="title" titleTintColor="#000" :bgColor='bgColor' :center='center' :isBack="true">
			<view @tap="goBack" slot="back" class="uni_btnIco iconfont icon-xiaoyufuhao"></view>
			<view slot="string">
				<view @click="toLookCourse" class="save-view">
					查看教程
				</view>
			</view>
		</header-bar>
		<view class="header-box fs-16">
			<view class="header-box-item">
				1,获取到火币的API Key：用于同步持仓和交易数据
			</view>
			<view class="header-box-item">
				2,输入或复制粘贴您的API Key
			</view>
		</view>
		<view class="menu fs-18">
			<view class="menu-top">
				API Key
			</view>
			<view class="menu-input">
				<input v-model="APIKey" type="text" placeholder-style="color:#cccccc" placeholder="输入或粘贴API Key" />
			</view>
		</view>
		<view class="menu fs-18">
			<view class="menu-top">
				Secret Key
			</view>
			<view class="menu-input">
				<input v-model="SecretKey" placeholder-style="color:#cccccc" type="text" placeholder="输入或粘贴Secret Key" />
			</view>
		</view>
		<view class="bottom_btn">
			<!-- <button @click="clickIn" class="btn">导入</button> -->
			<button @click="submit" class="btn fs-18">导入</button>
		</view>
		<uni-popup ref='phonePop' type="bottom">
			<view class="phone-popup-box">
				<view class="popup-title">
					<view class="popup-title-left fs-18">
						安全验证
					</view>
					<view @click="cancel" class="popup-title-right fs-16">
						取消
					</view>
				</view>
				<view class="popup-content">
					<view class="phone-num fs-16">
						<!-- 186****7686 -->
						{{ mobile }}
					</view>
					<view class="send-box">
						<input maxlength="6" type="text" v-model="code" placeholder="请输入验证码" />
						<view @click="sendMessage" class="send">
							{{ tips }}
						</view>
					</view>
					<view @click="clickSubmit" class="submit" :class="[code.length < 6 ? 'op06' : '']">
						确定
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		post,
		get,
		navigate,
		switchTab,
		judgeLogin,
		toast,
		trim,
		TNT
	} from '@/common/utils/index.js';
	import {
		AllowAuthoriztion
	} from '@/common/js/http.js'
	export default {
		data() {
			return {

				bgColor: {
					'background': '#fff',
				},
				// title: '开通',
				title: '火币',
				center: true,
				isBack: true,

				coinName: '',
				isLook: 0,
				customBar: this.customBar,
				tips: '发送',
				countNum: 61,
				timer: null,
				code: '123456',
				APIKey: '',
				SecretKey: '',
				mobile: '',
				mobile2: '',
				timer2: null // 定时器,为了显示提示成功或者失败
			}
		},
		onLoad(e) {
			this.coinName = e.coinName
			this.isLook = e.isLook
			uni.setNavigationBarTitle({
				title: this.coinName
			});
			this.title = this.coinName
			// this.init()
			// TNT({
			// 	timer: 'timer2',
			// 	that: this,
			// 	delay: 1000, // 默认1000,不写也行
			// 	type: 'setTimeOut',
			// 	callBack:()=> {
			// 		console.log(this.tips)
			// 	} 
			// })
		},
		onShow() {
			this.init()
		},
		methods: {
			/**
			* @param {obj} item 一个对象
			* @return {string} key 返回值是字符串
			* @see setValue
			* @desc 根据key获取对应的值
			*/
			init(item) {
				this.GetMemberInfo()
				if (this.isLook == 0) {
					return
				}
				this.GetAuthoriztionInfoList()
			},
			goBack() {
				uni.navigateBack()
			},
			toLookCourse() {
				// console.log('外面的',this.timer2)
				// TNT({
				// 	timer: 'timer2', // 变量名
				// 	that: this, // 页面的this实例
				// 	delay: 1000, // 默认1000,不写也行
				// 	type: 'setTimeOut', // setTimeOut是定时器,setInterval是计时器
				// 	callBack:()=> { // 回调
				// 			// this.timer2 = null;
				// 			console.log('里面的',this.timer2)
				// 			// 如果正确的短信
				// 			// if (data.code != 0) return
				// 			// this.closePop()
				// 			// this.code = ''
				// 			// // 返回上一页
				// 			// uni.navigateBack()	
				// 	} 
				// })
				// return
				uni.navigateTo({
					url: '/pages/lookCourse/lookCourse'
				})
			},
			back() {
				uni.navigateBack()
			},
			// 点击导入
			clickIn() {
				// 验证手机
				// this.openPop()
			},
			checkAll() {
				let length = this.code.replace(/\s/g, "").length
				if (length == 0) {
					toast('验证码不能为空哦~')
					return false
				}
				if (length < 6) {
					toast('验证码长度不足哦~')
					return false
				}
				return true
			},
			// 点击确定短信
			clickSubmit() {
				let res = this.checkAll()
				if (!res) return
				this.allowAuth()
			},
			// 发送短信
			sendMessage() {
				if (this.timer !== null) {
					return
				}
				this.countNum = 61
				this.sendMsg()
				


			},
			// 点击取消
			cancel() {
				this.closePop()
			},
			openPop() {
				this.$refs.phonePop.open()
			},
			closePop() {
				this.$refs.phonePop.close()
			},
			checkAPKAll() {
				if (this.APIKey.length == 0) {
					toast('API Key不能为空!')
					return false
				}
				if (this.SecretKey.length == 0) {
					toast('Secret Key不能为空!')
					return false
				}
				return true
			},
			// 点击导入
			submit() {
				let res = this.checkAPKAll()
				if (!res) return
				// this.clickIn()
				this.allowAuth()
			},
			// 授权接口
			async allowAuth() {
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				let obj = {
					userId: this.userId,
					token: this.token,
					TypeId: 3, // 平台类型：现在写死为 3(火币网) 即可
					APIKey: this.APIKey,
					SecretKey: this.SecretKey,
					Vcode: this.code
				}
				let {
					data
				} = await AllowAuthoriztion(obj)
				// 先显示提示,然后再进行下面的处理和操作
				toast(data.msg)
				// 定时器的销毁
				TNT({
					timer: 'timer2', // 变量名
					that: this, // 页面的this实例
					delay: 1000, // 默认1000,不写也行
					type: 'setTimeOut', // setTimeOut是定时器,setInterval是计时器
					callBack:()=> { // 回调
							this.timer2 = null;
							// 如果正确的短信
							if (data.code != 0) return
							this.closePop()
							this.code = ''
							// 返回上一页
							uni.navigateBack()	
					} 
				})
				// this.timer2 = setTimeout(() => {
				// 	// 清除定时器
				// 	clearTimeout(this.timer2);
				// 	this.timer2 = null;
				// 	// 如果正确的短信
				// 	if (data.code != 0) return
				// 	this.closePop()
				// 	this.code = ''
				// 	// 返回上一页
				// 	uni.navigateBack()	
				// }, 1000)

				// this.$once('hook:beforeDestroy', () => {
				// 	clearTimeout(this.timer2);
				// 	this.timer2 = null;
				// })
					
				
				
				
			},
			// 封装定时器
			// TNT({timer,that,delay = 1000,type,callBack}) {
			// 	// 引入后,在页面使用示例
			// 	// TNT({
			// 	// 	timer: 'timer2',
			// 	// 	that: this,
			// 	// 	delay: 1000, // 默认1000,不写也行
			// 	// 	type: 'setTimeOut',
			// 	// 	callBack:()=> {
			// 	// 		console.log('我是回调')
			// 	// 	} 
			// 	// })
			// 	// 统一一下大小写
			// 	type = String(type).toLowerCase()
			// 	console.log('type',type)
			// 	if(type == 'settimeout'){
			// 		that[timer] = setTimeout(() => {
			// 			// 清除定时器
			// 			clearTimeout(that[timer]);
			// 			that[timer] = null;
			// 			// 回调
			// 			callBack()
			// 		}, delay)
			// 		console.log('timer,this.timer2:: ',that[timer])
			// 		that.$once('hook:beforeDestroy', () => {
			// 			// console.log('我被销毁了呀呀呀呀呀呀')
			// 			clearTimeout(that[timer]);
			// 			that[timer] = null;
			// 		})
			// 	}else if(type == 'setInterval'){
			// 		that[timer] = setTimeout(() => {
			// 			// 清除定时器
			// 			clearTimeout(that[timer]);
			// 			that[timer] = null;
			// 			// 回调
			// 			callBack()
			// 		}, delay)
			// 		console.log('timer,this.timer2:: ',that[timer])
			// 		that.$once('hook:beforeDestroy', () => {
			// 			// console.log('我被销毁了呀呀呀呀呀呀')
			// 			clearTimeout(that[timer]);
			// 			that[timer] = null;
			// 		})
			// 	}
				
			// }
			// 短信接口
			async sendMsg() {
				let obj = {
					Mobile: this.mobile2,
					type: 25
				}
				let res = await get('SMS/Send', obj)
				// let res = {code : 0,msg:1}
				toast(res.msg)
				if (res.code != 0) {
					return
				}
				this.timer = null;
				this.countNum--
				this.timer = setInterval(() => {
					this.countNum--
					if (this.countNum == 0) {
						this.tips = '发送'
						clearInterval(this.timer);
						this.timer = null;
					} else {
						this.tips = this.countNum + 's后重新获取'
					}
				}, 1000)
				
				this.$once('hook:beforeDestroy', () => {
					clearInterval(this.timer);
					this.timer = null;
				})
			},
			// 获取个人信息
			async GetMemberInfo() {
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')

				let obj = {
					UserId: this.userId,
					Token: this.token
				}
				let res = await post('User/GetMemberInfo', obj)
				if (res.code != 0) {
					return
				}
				// this.mobile = res.data.mobile
				let reg = new RegExp("(\\d{3})(\\d{4})(\\d{4})");
				let tel = res.data.mobile2.replace(reg, "$1****$3");
				this.mobile = tel
				this.mobile2 = res.data.mobile2
			},
			// 获取授权信息
			async GetAuthoriztionInfoList() {
				this.UserId = uni.getStorageSync('userId')
				this.Token = uni.getStorageSync('token')
				let params = {
					UserId: this.UserId,
					Token: this.Token,
					TypeId: 3 // 平台类型：现在写死为 3(火币网) 即可
				}
				// let { data } = await GetAuthoriztionInfo(params)
				let res = await post('User/GetAuthoriztionInfo', params)
				// if(data.code != 0) return uni.showToast({
				// 	title: data.msg,
				// 	duration: 2000,
				// 	icon: 'none'
				// })
				if(res.code == 3) {
					toast(res.msg)
				}
				if (res.code != 0) return
				// this.list = data.data || this.list
				// this.list = res.data
				if (res.data == null) return
				this.APIKey = res.data.apiKey
				this.SecretKey = res.data.secretKey

				// console.log('this.list:', this.list)
			},
			
		},
	}
</script>

<style lang="scss" scoped>
	/* @import url("./style"); */
	@import "./style";

	.send-box {

		.uni-input-input,
		.uni-input-placeholder {
			font-size: 30upx;
			color: #5c6b8b;
		}
	}
</style>
