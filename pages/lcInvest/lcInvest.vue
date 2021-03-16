<template>
	<view style="padding-top: 30upx;">
		<!-- <same-header :typetext="typetext" :headertext="headertext"></same-header> -->
		<view class="lc-usdt-change-newbox">
			<view class="left-box">
				<view class="ball blue"></view><view class="ball"></view><view class="ball"></view><view class="ball"></view><view class="ball red"></view>
			</view>
			<view class="center-box">
				<view class="item">
					<view class="show-box" @click="show_select_box=true">
						<view style="color: #ccc;margin-right: 20upx;">从</view>
						<view class="">{{show_text}}</view>
						<view class="iconfont icon-dayuhao"></view>
					</view>
					<view class="select-box" v-if="show_select_box">
						<view class="" @click="newchangeType(0)">收益</view>
						<view class="" @click="newchangeType(1)">USDT</view>
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
				<input type="digit" placeholder="请输入提币数量" v-model="USDTNums" @blur="calcLC" />
				<view class="number-right">
					<view class="wid">
						USDT
					</view>
					<view class="borderleft wid" @click="getAll">
						全部
					</view>
				</view>
			</view>
			<view class="numbers fs-16">
				可用 {{ USDTNum }} USDT
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
					{{ LCNum }} 点卡
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
				typetext: '点卡',
				headertext: 'USDT',
				UserId: '',
				Token: '',
				USDTNum: 0,
				LCNum: 0,
				USDTNums: '',
				payPassword: '',
				timer: null,
				show_select_box:false,
				fromshouyi:0,
				show_text:"USDT"
			}
		},
		components: {
			sameHeader
		},
		computed: {
			isGreen() {
				let res = true
				if (!this.USDTNums) {
					res = false
				}
				if (!this.payPassword) {
					res = false
				}
				console.log('res', res)
				return res
			},
		},
		onLoad() {
			this.UserId = uni.getStorageSync('userId')
			this.Token = uni.getStorageSync('token')
			this.getUserInfo()
		},
		methods: {
			newchangeType(index){
				this.show_text = index==0?"收益":"USDT";
				this.show_select_box = false
			},
			//计算预计提现多少lc
			async calcLC() {
				let params = {
					amount: this.USDTNums || 0
				}
				let {
					data
				} = await USTD2LC(params)
				if (data.code != 0) return this.LCNum = 0
				this.LCNum = data.data
			},
			async Change() {
				if (!this.USDTNums) return uni.showToast({
					title: '请输入提币数量',
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
					USDT: this.USDTNums,
					SecondPassWord: this.payPassword
				}
				let {
					data
				} = await RechargeLC(params)
				uni.showToast({
					title: data.msg,
					icon: 'none',
					duration: 2000
				})
				if (data.code == 0) {
					this.timer = setTimeout(() => {
						uni.navigateBack()
					}, 2000)
					this.$once('hook:beforeDestroy', () => {
						clearInterval(this.timer);
						this.timer = null;
					})
				}
				else if(data.code == 1){
					if (data.msg.indexOf('不足') != -1) {
					// 	this.title = res.msg,
					// 	this.content = '是否前往充值?'
					
					// 	this.modalSuccessUrl = 'usdtInvest/usdtInvest'
						//this.$refs.modal.open()
						uni.showModal({
						    title: data.msg,
						    content: '是否前往充值?',
						    success: (res) => {
						        if (res.confirm) {
						            navigate('usdtInvest/usdtInvest')
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						});
					}
				}
				else if (data.code == 3) {
					uni.hideLoading()
					uni.showModal({
						title: '未设置密码',
						content: '是否前往设置',
						cancelColor: '#999',
						// confirmColor: '#5cc69a',
						confirmColor: '#02D38F',
						success(res) {
							if (res.confirm) {
								navigate('updatePayPassword/updatePayPassword')

							}
						},
						complete() {

						}
					})
				}
				// if(data.code != 0) return uni.showToast({
				// 	title: data.msg,
				// 	icon: 'none',
				// 	duration: 2000
				// })
			},
			getAll() {
				this.USDTNums = this.USDTNum
				this.calcLC()
			},
			async getUserInfo() {
				let params = {
					UserId: this.UserId,
					Token: this.Token
				}
				let {
					data
				} = await GetUserAssetsInfo(params)
				if (data.code != 0) return
				this.USDTNum = data.data.usdt
			}
		}
	}
</script>

<style scoped lang="scss">
	@import url("./style");
	@import url("~@/common/css/lcSame.css");

	.footer.green-bg {
		background-color: #02d48f;
	}
	.uni-input-placeholder{
		font-size: 34upx;
	}
	.Type{
		line-height: 1.5;
	}
	.lc-usdt-change-newbox{
		width: 690upx;
		height: 200upx;
		margin: 0 auto;
		border: 1px #ddd solid;
		border-radius: 12upx;
		display: flex;
		align-items: center;
		.left-box{
			width: 100upx;
			height: 108upx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			.ball{
				width: 10upx;
				height: 10upx;
				background-color: #ddd;
				border-radius: 50%;
			}
			.blue{
				background-color: #0266eb;
				width: 16upx;
				height: 16upx;
			}
			.red{
				background-color: #FF3333;
				width: 18upx;
				height: 18upx;
			}
		}
		.center-box{
			flex: 1;
			color: #000;
			.item{
				height: 100upx;
				line-height: 100upx;
				font-weight: 600;
				position: relative;
				.iconfont{
					font-size: 30upx;
					color: #666;
					margin-left: auto;
					margin-right: 30upx;
					transform:rotate(90deg);
				}
				.show-box{
					display: flex;
					align-items: center;
				}
				.select-box{
					position: absolute;
					top: 100upx;
					width: 100%;
					box-sizing: border-box;
					background-color: #e7f0fd;
					z-index: 9;
					view{
						padding-left: 50upx;
						line-height: 80upx;
					}
					view:last-child{
						border-top: 1px #ddd solid;
					}
				}
			}
			.item:last-child{
				border-top: 1px #ddd solid;
			}
		}
		.right-box{
			border-left: 1px #ddd solid;
			width: 140upx;
			height: 200upx;
			// background-color: #e7f0fd;
			background-color: #eee;
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				width: 66upx;
				height: 50upx;
				transform:rotate(90deg);
				filter: grayscale(90%);
				filter: gray;
			}
		}
	}
</style>
