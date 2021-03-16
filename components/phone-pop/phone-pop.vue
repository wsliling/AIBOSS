<template>
	<view>
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
	} from '@/common/utils/index.js';
	export default {
		props: {
			APIKey: '',
			SecretKey: '',
			mobile: '',
			mobile2: '',
			type: {
				type: [Number],
				default: 25
			},
			Name: '',
			Address: ''
		},
		data() {
			return {
				tips: '发送',
				countNum: 61,
				timer: null,
				code: '',
			};
		},
		methods: {
			// 短信点击确定了
			clickConfirmMessage(e) {

			},
			// 授权接口
			async allowAuthoriztion() {
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				let obj = {
					userId: this.userId,
					token: this.token,
					TypeId: 1,
					APIKey: this.APIKey,
					SecretKey: this.SecretKey,
					Vcode: this.code
				}
				let res = await post('User/AllowAuthoriztion', obj)
				toast(res.msg)
				if (res.code != 0) return
				// 授权成功了,父组件接收
				// this.$emit("clickConfirmMessage")
				this.$emit("clickConfirmMessage")


			},
			// 验证
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
				this.closePop()
				if(this.APIKey && this.SecretKey) {
					// 授权api
					this.allowAuthoriztion()
				} else {
					// 添加地址
					this.addUSDTAddress()
				}
			},
			// 添加地址
			async addUSDTAddress() {
					this.userId = uni.getStorageSync('userId')
					this.token = uni.getStorageSync('token')
				let obj = {
						UserId: this.userId,
						Token: this.token,
						Name: this.Name,
						Address: this.Address,
						Vcode: this.code
				}
				let res = await post('Address/AddUSDTAddress', obj)
				toast(res.msg)
				if (res.code != 0) return
				this.$emit("clickConfirmMessage")
			},
			// 发送短信
			sendMessage() {
				if (this.timer !== null) {
					return
				}
				this.countNum = 61
				this.sendMsg()
			},
			// 短信接口
			async sendMsg() {
				let obj = {
					Mobile: this.mobile2,
					// type: 25
					type: this.type
				}
				let res = await get('SMS/Send', obj)
				toast(res.msg)
				if (res.code != 0) return
				clearInterval(this.timer);
				this.timer = null;
				this.countNum--
				this.timer = setInterval(() => {
					this.countNum--
					if (this.countNum == 0) {
						this.tips = '发送'
						clearInterval(this.timer)
						this.timer = null
					} else {
						this.tips = this.countNum + 's后重新获取'
					}
				}, 1000)
				this.$once('hook:beforeDestroy', () => {
					clearInterval(this.timer);
					this.timer = null;
				})
			},
			// 点击取消
			cancel() {
				this.closePop()
			},
			// 打开
			openPop() {
				this.$refs.phonePop.open()
			},
			// 关闭
			closePop() {
				this.$refs.phonePop.close()
			},
			
		},
	}
</script>

<style lang="scss" scoped>
	.phone-popup-box {
		width: 750upx;
		// height: 455upx;
		background-color: #FFFFFF;

		.popup-title {
			height: 88upx;
			border-bottom: 1upx solid #ECECEC;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30upx;
		}

		.popup-title-left {
			font-size: 32upx;
			font-weight: 700;
		}

		.popup-title-right {
			font-size: 30upx;
			font-weight: 500;
			color: #666666;
		}

		.popup-content {
			padding: 60upx 30upx 30upx;
		}

		.phone-num {
			font-size: 30upx;
			font-weight: 500;
		}

		.send-box {
			margin-top: 25upx;
			width: 690upx;
			height: 60upx;
			border-bottom: 1upx solid #ECECEC;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.uni-input-input, .uni-input-placeholder{
				font-size: 30upx;
				color: #5c6b8b;
			}
			
			input {
				flex: 1;
				width: 300upx;
				height: 60upx;
			}
		}

		// .send {
		// 	box-sizing: border-box;
		// 	flex-shrink: 0;
		// 	padding: 0upx 20upx;
		// 	height: 45upx;
		// 	border: 1px solid #FF3333;
		// 	border-radius: 8upx;
		// 	color: #FF3333;
		// 	font-size: 28upx;
		// 	line-height: 45upx;
		// }
		
		.send {
			box-sizing: border-box;
			flex-shrink: 0;
			padding: 10upx 30upx;
			height: 60upx;
			border: 1px solid #FF3333;
			border-radius: 8upx;
			color: #FF3333;
			font-size: 28upx;
			line-height: 45upx;
			font-size: 36upx;
		}
		
		.submit {
			width: 690upx;
			height: 88upx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 80upx auto 0upx;
			background: linear-gradient(to right, #2decad, #17b580);
			color: #FFFFFF;

			&.op06 {
				opacity: 0.6;
			}
		}
	}
</style>
