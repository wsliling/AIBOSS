<template>
	<view style="padding-top: 30upx;">
		<!-- <view class="lc-usdt-change-box">
			<view v-for="(item,index) in typeList" :key='index' class="zhuanhuan-item">
				<view @click="changeType(item,index)" class="type-item">
					<view class="type-title" :class="[item.active ? 'visible' : 'hidden']">
						转换为
					</view>
					<view class="type-name" :class="[item.active ? 'active' : '']">
						{{ item.name }}
					</view>
				</view>
			</view>
		</view> -->
		<view class="lc-usdt-change-newbox">
			<view class="left-box">
				<view class="ball blue"></view>
				<view class="ball"></view>
				<view class="ball"></view>
				<view class="ball"></view>
				<view class="ball red"></view>
			</view>
			<view class="center-box" v-if="fromshouyi">
				<view class="item">
					<view class="show-box">
						<view style="color: #ccc;margin-right: 20upx;">从</view>
						<view class="">收益</view>
						<!-- <view class="iconfont icon-dayuhao"></view> -->
					</view>
				</view>
				<view class="item">
					<view class="show-box" @click="show_select_box=true">
						<view style="color: #ccc;margin-right: 20upx;">到</view>
						<view class="">{{show_text}}</view>
						<view class="iconfont icon-dayuhao"></view>
					</view>
					<view class="select-box" v-if="show_select_box">
						<view class="" @click="newchangeType(0)">点卡</view>
						<view class="" @click="newchangeType(1)">USDT</view>
					</view>
				</view>
			</view>
			<view class="center-box" v-else>
				<view class="item">
					<view class="show-box">
						<view style="color: #ccc;margin-right: 20upx;">从</view>
						<view class="">USDT</view>
						<!-- <view class="iconfont icon-dayuhao"></view> -->
					</view>
				</view>
				<view class="item">
					<view class="show-box">
						<view style="color: #ccc;margin-right: 20upx;">到</view>
						<view class="">点卡</view>
						<!-- <view class="iconfont icon-dayuhao"></view> -->
					</view>
				</view>
			</view>
			<view class="right-box">
				<image src="/static/zhuanhuan.png" mode=""></image>
			</view>
		</view>
		<view class="cashout fs-18">
			<view class="number">
				数量
			</view>
			<view class="number-item fs-18">
				<input type="digit" placeholder="请输入转换数量" v-model="availableLCs" @blur="calcLC" />
				<view class="number-right">
					<!-- <view class="wid">
						USDT
					</view> -->
					<view class="borderleft wid" @click="getAll">
						全部
					</view>
				</view>
			</view>
			<view class="numbers fs-16">
				可转换 {{ availableLC }}
			</view>
			<view class="number">
				支付密码
			</view>
			<view class="number-item">
				<input placeholder="请输入支付密码" type="password" v-model="payPassword" />
			</view>
			<view class="Type fwsmall fs-16">
				为保障资金安全，该账户安全策略变更，密码修改，我们会对转换进行人工审核，请耐心等待工作人员电话或邮件联系
			</view>
			<view class="bottom">
				<view class="bottom-left">
					到账数量
				</view>
				<view class="bottom-right">
					{{ changeNum }}
				</view>
			</view>
			<view class="footer" @click="Change" :class="[isGreen ? 'green-bg': '']">
				转换
			</view>
		</view>
	</view>
</template>

<script>
	import {
		GetUserAssetsInfo,
		RechargeLC,
		USTD2LC
	} from '@/common/js/http.js'
	import sameHeader from '@/components/sameHeader.vue'
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
				title: '',
				content: '',
				isLC: true,
				UserId: '',
				Token: '',
				availableLC: 0,
				changeNum: 0,
				availableLCs: '',
				payPassword: '',
				timer: null,
				typeList: [{
						name: '点卡',
						active: true,
					},
					{
						name: 'USDT',
						active: false,
					}
				],
				show_select_box: false,
				fromshouyi: 0,
				show_text: "点卡"
			}
		},
		components: {
			sameHeader
		},
		computed: {
			isGreen() {
				let res = true
				if (!this.availableLCs) {
					res = false
				}
				if (!this.payPassword) {
					res = false
				}
				console.log('res', res)
				return res
			},
		},
		onLoad(e) {
			this.fromshouyi = e.fromshouyi ? e.fromshouyi : 0
		},
		onShow() {
			this.UserId = uni.getStorageSync('userId')
			this.Token = uni.getStorageSync('token')
			// this.getUserInfo()
			this.getUserAssetsInfo()
		},
		methods: {
			// 资产明细
			// 资产信息
			async getUserAssetsInfo() {
				let obj = {
					userId: this.UserId,
					token: this.Token
				}
				let res = await post('User/GetUserAssetsInfo', obj, {}, false)
				if (res.code != 0) return
				this.lc = res.data.lc
				this.usdt = res.data.usdt
				this.availableLC = this.fromshouyi ? res.data.availableLC : res.data.usdt
			},
			// 切换类型
			changeType(item, index) {
				this.typeList.map((item2, index2) => {
					this.typeList[index2].active = false
				})
				this.typeList[index].active = true
				if (this.typeList[index].active == true && index == 0) {
					// 是活动lc转lc
					this.isLC = true
				} else {
					// 活动lc转usdt
					this.isLC = false
					this.calcLC()
				}
			},
			newchangeType(index) {
				this.isLC = index == 0 ? true : false;
				this.show_text = index == 0 ? "点卡" : "USDT";
				this.show_select_box = false
				if (this.isLC == false) {
					this.calcLC()
				}
			},
			//计算预计提现多少lc
			async calcLC() {
				let params = {
					amount: this.availableLCs || 0
				}
				// let {
				// 	data
				// } = await USTD2LC(params)
				// 判断是活动lc转lc,还是活动lc转usdt
				// let isLC = false
				// this.typeList.map((item, index) => {
				// 	if (this.typeList[index].active == true && index == 0) {
				// 		// 是活动lc转lc
				// 		isLC = true
				// 	} else {
				// 		// 活动lc转usdt
				// 		isLC = false
				// 	}
				// })
				if (this.isLC) {
					// 是活动lc转lc
					this.changeNum = this.availableLCs
				} else {
					// 活动lc转usdt
					if (!this.availableLCs) {
						return
					}
					let data = await get('User/LC2USDT', params, {}, false)
					if (data.code != 0) return this.changeNum = 0
					this.changeNum = data.data
				}


			},
			async Change() {
				// if(this.availableLC == 0){
				// 	toast('你的推广收益不足,请推广后再来转换吧')
				// 	return
				// }
				let date = new Date()
				let today = date.getDate();
				console.log(today)
				// let msg = '推广收益每月1号正式结算,转换日期为每月1号到3号,未到日期不能转换'
				// if(today == 1 || today == 2 || today == 3) {
				if (!this.availableLCs) return uni.showToast({
					title: '请输入转换数量',
					icon: 'none',
					duration: 2000
				})
				if (!this.payPassword) return uni.showToast({
					title: '请输入支付密码',
					icon: 'none',
					duration: 2000
				})

				let params = {
					UserId: this.UserId,
					Token: this.Token,
					Amount: this.availableLCs,
					SecondPassWord: this.payPassword
				}
				// let {
				// 	data
				// } = await RechargeLC(params)
				let data
				if (this.fromshouyi == 0) {
					params = {
						UserId: this.UserId,
						Token: this.Token,
						USDT: this.availableLCs,
						SecondPassWord: this.payPassword
					}
					data = await post('Recharge/RechargeLC', params)
				} else {
					if (this.isLC == true) {
						data = await post('User/AvailableLC2LC', params)
					} else {
						data = await post('User/AvailableLC2USDT', params)
					}
				}
				uni.showToast({
					title: data.msg,
					icon: 'none',
					duration: 2000
				})
				if (data.code == 0) {
					// this.timer = setTimeout(() => {
					// 	uni.navigateBack()
					// }, 2000)
					// this.$once('hook:beforeDestroy', () => {
					// 	clearInterval(this.timer);
					// 	this.timer = null;
					// })
				} else if (data.code == 1) {
					// 最少提现 
					toast(data.msg)
				} else if (data.code == 3) {
					this.title = '未设置支付密码',
						this.content = '是否前往设置?'
					this.modalSuccessUrl = 'updatePayPassword/updatePayPassword'
				} else if (data.code == 4) {
					// usdt不足
					this.title = data.msg,
						this.content = '是否前往充值?'
					this.modalSuccessUrl = 'lcInvest/lcInvest'
				} else if (data.code == 5) {
					this.title = '支付密码错误',
						this.content = '是否前往重置?'
					this.modalSuccessUrl = 'updatePayPassword/updatePayPassword'

					//  else if (data.msg.indexOf('支付密码错误') != -1) {
					// 	this.title = '忘记密码?',
					// 	this.content = '是否前往重置?'
					// 	this.$refs.modal.open()
					// }
				} else if (data.code == 9) {
					// if (data.msg.indexOf('未设置') != -1) {
					this.title = 'API未授权',
						this.content = '是否跳转到授权页面?'
					this.modalSuccessUrl = 'apiLetter/apiLetter'
					// }
					//this.$refs.modal.open()
					//  else if (data.msg.indexOf('支付密码错误') != -1) {
					// 	this.title = '忘记密码?',
					// 	this.content = '是否前往重置?'
					// }
				}
				if (data.code == 3 || data.code == 4 || data.code == 5 || data.code == 9) {
					uni.showModal({
						title: this.title,
						content: this.content,
						success: (res) => {
							if (res.confirm) {
								this.modalSuccess(true)
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
				// }else {
				// 	toast(msg)
				// 	return
				// }


				// else if (data.code == 1) {
				// 	if (data.msg.indexOf('不足') != -1) {
				// 		// 	this.title = res.msg,
				// 		// 	this.content = '是否前往充值?'

				// 		// 	this.modalSuccessUrl = 'usdtInvest/usdtInvest'
				// 		//this.$refs.modal.open()
				// 		uni.showModal({
				// 			title: data.msg,
				// 			content: '是否前往充值?',
				// 			success: (res) => {
				// 				if (res.confirm) {
				// 					navigate('usdtInvest/usdtInvest')
				// 				} else if (res.cancel) {
				// 					console.log('用户点击取消');
				// 				}
				// 			}
				// 		});
				// 	}
				// } else if (data.code == 3) {
				// 	uni.hideLoading()
				// 	uni.showModal({
				// 		title: '未设置密码',
				// 		content: '是否前往设置',
				// 		cancelColor: '#999',
				// 		// confirmColor: '#5cc69a',
				// 		confirmColor: '#02D38F',
				// 		success(res) {
				// 			if (res.confirm) {
				// 				navigate('updatePayPassword/updatePayPassword')

				// 			}
				// 		},
				// 		complete() {

				// 		}
				// 	})
				// }
				// if(data.code != 0) return uni.showToast({
				// 	title: data.msg,
				// 	icon: 'none',
				// 	duration: 2000
				// })
			},
			modalSuccess() {
				navigate(this.modalSuccessUrl)
			},
			getAll() {
				this.availableLCs = this.availableLC
				this.calcLC()
			},
			// async getUserInfo() {
			// 	let params = {
			// 		UserId: this.UserId,
			// 		Token: this.Token
			// 	}
			// 	let {
			// 		data
			// 	} = await GetUserAssetsInfo(params)
			// 	if (data.code != 0) return
			// 	this.availableLC = data.data.usdt
			// }
		}
	}
</script>

<style scoped lang="scss">
	@import url("./style");
	@import url("~@/common/css/lcSame.css");

	.footer.green-bg {
		background-color: #02d48f;
	}

	.uni-input-placeholder {
		font-size: 32upx;
	}

	.Type {
		width: 690upx;
		/* margin: 30upx auto 0 auto; */
		margin: 30upx auto 0 auto;
		background-color: #f6f5fa;
		box-sizing: border-box;
		padding: 30upx;
		line-height: 1.5;
	}

	.fwbig {
		font-weight: bold;
	}

	.topheader {
		height: 110upx;
		width: 690upx;
		margin: 0 auto;
		display: flex;
		align-items: center;
	}

	.topheader .text {
		display: inline-block;
		border: 1px solid #02d48f;
		padding: 10upx 0;
		width: 125upx;
		border-radius: 10upx;
		color: #02d48f;
		text-align: center;
	}

	.lc-usdt-change-box {
		display: flex;
		justify-content: space-between;

		.type-title {
			margin-top: 20upx;

			&.visible {
				visibility: visible;
			}

			&.hidden {
				visibility: hidden;
			}
		}

		.type-item {
			width: 350upx;
			font-size: 30upx;
			font-weight: 700;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.type-name {
			width: 200upx;
			margin-top: 20upx;
			font-size: 30upx;
			font-weight: 700;
			padding: 10upx;
			display: flex;
			justify-content: center;
			align-items: center;

			&.active {
				border: 1px solid #0266eb;
				color: #0266eb;
			}
		}

	}

	.lc-usdt-change-newbox {
		width: 690upx;
		height: 200upx;
		margin: 0 auto;
		border: 1px #ddd solid;
		border-radius: 12upx;
		display: flex;
		align-items: center;

		.left-box {
			width: 100upx;
			height: 108upx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;

			.ball {
				width: 10upx;
				height: 10upx;
				background-color: #ddd;
				border-radius: 50%;
			}

			.blue {
				background-color: #0266eb;
				width: 16upx;
				height: 16upx;
			}

			.red {
				background-color: #FF3333;
				width: 18upx;
				height: 18upx;
			}
		}

		.center-box {
			flex: 1;
			color: #000;

			.item {
				height: 100upx;
				line-height: 100upx;
				font-weight: 600;
				position: relative;

				.iconfont {
					font-size: 30upx;
					color: #666;
					margin-left: auto;
					margin-right: 30upx;
					transform: rotate(90deg);
				}

				.show-box {
					display: flex;
					align-items: center;
				}

				.select-box {
					position: absolute;
					top: 100upx;
					width: 100%;
					box-sizing: border-box;
					background-color: #e7f0fd;
					z-index: 9;

					view {
						padding-left: 50upx;
						line-height: 80upx;
					}

					view:last-child {
						border-top: 1px #ddd solid;
					}
				}
			}

			.item:last-child {
				border-top: 1px #ddd solid;
			}
		}

		.right-box {
			border-left: 1px #ddd solid;
			width: 140upx;
			height: 200upx;
			// background-color: #e7f0fd;
			background-color: #eee;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 66upx;
				height: 50upx;
				transform: rotate(90deg);
				filter: grayscale(90%);
				filter: gray;
			}
		}
	}
</style>
