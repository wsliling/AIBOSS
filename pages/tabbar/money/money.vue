<template>
	<view class="big-box">
		<view class="box grey">
			<view class="box-top">
				<view class="top-header">
					<view class="btns hidden">
						明细
					</view>
					<view class="text fs-20">
						当前可用余额(USDT)
					</view>
					<view class="btns topbox" @click="toUSDTDetail">
						明细
					</view>
				</view>
				<view class="top-number">
					<!-- 0.0000 -->
					{{ usdt  | four  }}
				</view>
			</view>
			<view class="box-btn">
				<view class="btn topbox" @click="toUSDTInvest">
					充值
				</view>
				<view class="btn topbox" @click="toUSDTCashOut">
					提现
				</view>
			</view>
		</view>
		<view class="box green">
			<view class="box-top">
				<view class="top-header">
					<view class="btns hidden">
						明细
					</view>
					<view class="text fs-20">
						当前可用余额(点卡)
					</view>
					<view class="secondbtns btns secondbox" @click="toLCDetail">
						明细
					</view>
				</view>
				<view class="top-number">
					<!-- 0.0000 -->
					{{ lc  | four  }}

				</view>
			</view>
			<view class="box-btn">
				<view class="btn secondbox" @click="toLCInvest">
					充币
				</view>
				<!-- <view class="btn secondbox" @click="toLCCashOut">
					转换
				</view> -->
			</view>
		</view>

		<!-- 转换 -->
		<view v-if="1" class="box bg-three">
			<view class="box-top">
				<view class="top-header">
					<view class="btns hidden">
						<!-- 明细 -->
					</view>
					<view class="text fs-20">
						<!-- 当前可用余额(LC) -->
						推广收益
						<text>(USDT)</text>
					</view>

					<!-- <view class="secondbtns btns secondbox my-one-box" @click="toAllEarn">
						累计
					</view>
					<view class="secondbtns btns secondbox  my-two-box" @click="toNowMonth">
						当月
					</view> -->
					<view class="secondbtns btns secondbox" @click="toConvertDetail(3)">
						明细
					</view>

				</view>
				<view class="top-number">
					<!-- 0.0000 -->
					<!-- {{ availableLC  | four  }} -->
				</view>
			</view>
			<view class="box-btn my-button">
				<view class="btn secondbox no-bg">
					累计: <text class="count-mr10">{{ sumAvailableLC }}</text>
			
				</view>
				<view class="btn secondbox no-bg">
					当月: <text class="count-mr10">{{ sumAvailableLCOnMonth }}</text>
					
				</view>
				<view class="btn secondbox" @click="toConvert">
					转换
				</view>
				<!-- <view class="btn secondbox" @click="toLCCashOut">
					转换
				</view> -->
			</view>
		</view>
		<view class="my-tab-empty-box">

		</view>
		<tabbar :grade='grade' :current='3'></tabbar>

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
	} from '@/common/utils/index.js';
	export default {
		data() {
			return {
				grade: 1, // 1游客, 2体验用户,3正式用户,4初级交易员,5中级交易员,6高级交易员,7社区
				lc: 0,
				usdt: 0,
				availableLC: 0,
				// 累计lc
				sumAvailableLC: 0,
				// 当月lc
				sumAvailableLCOnMonth: 0,
			}
		},
		onLoad() {
			uni.hideTabBar()
		},
		onUnload() {
			Object.assign(this.$data, this.$options.data())
		},
		onShow() {
			uni.hideTabBar()
			this.GetMemberInfo()
			this.getUserAssetsInfo()
		},
		methods: {
			//去usdt明细页
			toUSDTDetail() {
				if (!judgeLogin()) return
				uni.navigateTo({
					url: '/pages/usdtDetail/usdtDetail'
				})
			},
			//去usdt充值页
			toUSDTInvest() {
				if (!judgeLogin()) return
				uni.navigateTo({
					url: '/pages/usdtInvest/usdtInvest'
				})
			},
			//去usdt提现页
			toUSDTCashOut() {
				if (!judgeLogin()) return
				uni.navigateTo({
					url: '/pages/usdtCashOut/usdtCashOut'
				})
			},
			toLCDetail() {
				if (!judgeLogin()) return
				uni.navigateTo({
					url: '/pages/lcDetail/lcDetail'
				})
			},
			toLCInvest() {
				if (!judgeLogin()) return
				uni.navigateTo({
					url: '/pages/lcInvest/lcInvest'
				})
			},
			// 跳转到累计收益
			toAllEarn() {

			},
			// 跳转到当月收益
			toNowMonth() {

			},
			// 跳转转换详情(转换明细)
			toConvertDetail() {
				if (!judgeLogin()) return
				uni.navigateTo({
					url: '/pages/convertDetail/convertDetail'
				})
			},
			// 跳转转换页面
			toConvert() {
				let date = new Date()
				let today = date.getDate();
				console.log(today)
				// if(today != 1 || today != 2 || today != 3) {

				let content = '推广收益每月1号正式结算,转换日期为每月1号到3号,未到日期不能转换'
				uni.showModal({
					title: '注意',
					content: content,
					success: (res) => {
						if (res.confirm) {
							if (!judgeLogin()) return
							uni.navigateTo({
								url: '/pages/convert/convert'
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			toLCCashOut() {
				if (!judgeLogin()) return
				uni.navigateTo({
					url: '/pages/lcCashOut/lcCashOut'
				})
			},
			// 资产信息
			async getUserAssetsInfo() {
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				let obj = {
					userId: this.userId,
					token: this.token
				}
				let res = await post('User/GetUserAssetsInfo', obj)
				if (res.code != 0) return
				this.lc = res.data.lc
				this.usdt = res.data.usdt
				this.availableLC = res.data.availableLC
				this.sumAvailableLC = res.data.sumAvailableLC
				this.sumAvailableLCOnMonth = res.data.sumAvailableLCOnMonth

			},
			// 个人信息
			async GetMemberInfo() {
				uni.removeStorageSync('grade')
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				let obj = {
					UserId: this.userId,
					Token: this.token
				}
				let res = await post('User/GetMemberInfo', obj, {}, false)
				if (res.code != 0) {
					return
				}
				uni.setStorageSync('grade', res.data.grade)
				this.grade = res.data.grade
			},

		}
	}
</script>

<style scoped>
	@import url("./style");
</style>
