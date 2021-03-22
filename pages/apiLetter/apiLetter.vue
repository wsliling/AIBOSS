<template>
	<view>
		<!-- <view v-for="(item,index) in list" :key='index' class="menu-item"> -->
		<header-bar :title="title" titleTintColor="#000" :bgColor='bgColor' :center='center' :isBack="true">
			<view @tap="goBack" slot="back" class="uni_btnIco iconfont icon-xiaoyufuhao"></view>
			<!-- <view slot="string">
				<view @click="toLookCourse" class="save-view">
					查看教程
				</view>
			</view> -->
		</header-bar>
		<view style="background-color: #f2f2f2;height: 30upx;width: 100%;"></view>
		<view class="menu-item">
			<image src="@/static/coin/fire-coin.png" class="img" mode="aspectFit"></image>
			<view class="text">
				<view class="top fs-18">
					火币
				</view>
				<view v-if="list !== null" class="bottom  fs-15">
					上次同步时间：{{ list ? list.updatetime : '' }}
				</view>
			</view>
			<text class="iconfont icon-gengduo more" @click="checkMore"></text>
		</view>
		<view class="menu-item">
			<image src="@/static/coin/bian-coin.png" class="img" mode="aspectFit"></image>
			<view class="text">
				<view class="top fs-18">
					币安
				</view>
				<view v-if="list !== null" class="bottom  fs-15">
					上次同步时间：{{ list ? list.updatetime : '' }}
				</view>
			</view>
			<text class="iconfont icon-gengduo more" @click="checkMoreTip"></text>
		</view>
		<view class="menu-item">
			<image src="@/static/coin/okew.png" class="img" mode="aspectFit"></image>
			<view class="text">
				<view class="top fs-18">
					okex
				</view>
				<view v-if="list !== null" class="bottom  fs-15">
					上次同步时间：{{ list ? list.updatetime : '' }}
				</view>
			</view>
			<text class="iconfont icon-gengduo more" @click="checkMoreTip"></text>
		</view>
		<uni-popup ref='morePop' type="bottom">
			<view class="morePop-box">
				<view class="more-item-wrapper">
					<!-- <view @click="clickApiKey" class="more-item">
						查看API Key
					</view> -->
					<view @click="clickDel" class="more-item">
						从服务器删除
					</view>
					<view @click="clickReset" class="more-item">
						重置
					</view>
				</view>
				<view @click="clickCancel" class="cancel">
					取消
				</view>
			</view>
		</uni-popup>
		<!-- <phone-pop ref='phonePop' :APIKey='APIKey' :SecretKey='SecretKey' :mobile2='mobile2' :mobile='mobile'
		 @clickConfirmMessage='clickConfirmMessage'></phone-pop> -->
		<!-- <uni-popup ref='phonePop' type="bottom">
			<view class="phone-popup-box">
				<view class="popup-title">
					<view class="popup-title-left">
						安全验证
					</view>
					<view @click="cancel" class="popup-title-right">
						取消
					</view>
				</view>
				<view class="popup-content">
					<view class="phone-num">

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
		</uni-popup> -->
	</view>
</template>

<script>
	import {
		navigate
	} from '@/common/utils/index.js'
	import {
		GetAuthoriztionInfo
	} from '@/common/js/http.js'
	import {
		toast,
		get,
		post
	} from '@/common/utils/index'
	export default {
		data() {
			return {
				
				bgColor: {
					'background': '#fff',
				},
				// title: '开通',
				title: 'API授权',
				center: true,
				isBack: true,
				
				
				currentIndex: 0,
				list: null,
				UserId: '',
				Token: '',
				APIKey: '',
				SecretKey: '',
				mobile: '',
				mobile2: ''
				// list: [{
				// 		name: '火币',
				// 		pic: '/static/coin/fire-coin.png',
				// 		date: '2020-08-09 18:47:33'
				// 	},
				// 	{
				// 		name: '比特儿',
				// 		pic: '/static/coin/bite-coin.png',
				// 		date: '2020-08-09 18:47:33'
				// 	},
				// 	{
				// 		name: '币安',
				// 		pic: '/static/coin/bian-coin.png',
				// 		date: '2020-08-09 18:47:33'
				// 	}
				// ],
			}
		},
		onLoad() {
			// //获取授权信息
			// this.UserId = uni.getStorageSync('userId')
			// this.Token = uni.getStorageSync('token')
			// this.GetAuthoriztionInfoList()
		},
		onShow() {
			this.init()
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			// clickConfirmMessage() {
			// 	// uni.navigateBack()
			// 	clearInterval(this.timer);
			// 	this.timer = null;
			// 	this.timer = setTimeout(() => {

			// 		this.init()
			// 		this.$refs.morePop.close()
			// 	}, 1000)

			// 	this.$once('hook:beforeDestroy', () => {
			// 		clearInterval(this.timer);
			// 		this.timer = null;
			// 	})
			// },

			init() {
				this.GetMemberInfo()
				//获取授权信息
				this.GetAuthoriztionInfoList()
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
				if (res.code != 0) {
					return
				}
				// this.list = data.data || this.list
				this.list = res.data
				if (res.data == null) return
				this.APIKey = res.data.apiKey
				this.SecretKey = res.data.secretKey

				console.log('this.list:', this.list)
			},
			// 授权接口也是重置接口
			async allowAuthoriztion() {
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
				let res = await post('User/AllowAuthoriztion', obj)
				toast(res.msg)
				if (res.code != 0) return
			},
			// 删除授权
			async cancelAuthoriztion() {
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
				let res = await post('User/CancelAuthoriztion', obj)
				toast(res.msg)
				if (res.code != 0) return
				this.init()
			},
			// 短信接口
			async sendMsg() {
				let obj = {
					Mobile: this.mobile2,
					type: 25
				}
				let res = await get('SMS/Send', obj)
				toast(res.msg)
				if (res.code != 0) return
			},
			// checkMore(item,index) {
			// 点击三个点
			checkMore() {
				// this.currentIndex = index
				if (this.list === null) {
					// 跳转火币
					this.clickApiKey()
					return
				}
				this.$refs.morePop.open()
			},
			// 查看API Key
			clickApiKey() {
				this.$refs.morePop.close()
				// navigate('fireCoin/fireCoin', {
				// 	// coinName: this.list[this.currentIndex].name
				// 	coinName: '火币'
				// })
				navigate('fireCoin/fireCoin', {
					// coinName: this.list[this.currentIndex].name
					coinName: '火币',
					isLook: 1
				})
			},
			// 从服务器删除
			clickDel() {
				this.$refs.morePop.close()
				uni.showModal({
					title: `即将删除(火币)的API授权`,
					// content: `即将删除(${this.list[this.currentIndex].name})的API授权`,
					content: `您确定吗?`,
					confirmColor: '#02D48F',
					success: (res) => {
						if (res.confirm) {
							this.cancelAuthoriztion()
							// this.ProductExchange(item, index)

						} else if (res.cancel) {}
					}
				});
			},
			// 重置
			clickReset() {
				this.$refs.morePop.close()
				uni.showModal({
					title: `前往重置(火币)的API授权`,
					// content: `即将重置(${this.list[this.currentIndex].name})的API授权`,
					content: `您确定吗?`,
					confirmColor: '#02D48F',
					success: (res) => {
						if (res.confirm) {
							// 确定重置
							// this.$refs.phonePop.openPop()
							navigate('fireCoin/fireCoin', {
								// coinName: this.list[this.currentIndex].name
								coinName: '火币',
								isLook: 0
							})
							// 验证手机
							// this.openPop()
							// this.allowAuthoriztion()
							// this.ProductExchange(item, index)
						} else if (res.cancel) {}
					}
				});
			},
			// 待开放提示
			checkMoreTip(){
				uni.showToast({
					icon:'none',
					title: '待开放',
					duration: 2000
				})
			},

			openPop() {
				this.$refs.phonePop.open()
			},
			// 取消
			clickCancel() {
				this.$refs.morePop.close()
			},

			// 去火币页面
			toUrl() {
				uni.navigateTo({
					url: '/pages/fireCoin/fireCoin'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// @import url("./style.scss");
	@import './style';
</style>
