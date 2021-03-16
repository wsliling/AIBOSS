<template>
	<view class="box fs-18">
		<view class="main">
			<view class="main-item bb">
				<view class="text">
					手机号
				</view>
				<view class="input">
					<input v-model="phone" maxlength="11" placeholder="输入您的手机号" />
				</view>
			</view>
			<view class="main-item bb">
				<view class="text">
					验证码
				</view>
				<view class="input">
					<input v-model="code" placeholder="输入验证码" />
				</view>
				<view @click="sendMessage" class="sendBtn">
					<!-- 发送验证码 -->
					{{ tips }}
					<!-- 	<view class="sendBtn" @click="send">
						{{ sendText }} -->
				</view>
			</view>
			<view class="main-item bb">
				<view class="text">
					新密码
				</view>
				<view class="input">
					<input v-model="password0" placeholder="输入您的新密码" :password='password0NoShow' />
				</view>
			</view>
			<view class="main-item bb">
				<view class="text">
					确认密码
				</view>
				<view class="input">
					<input v-model="password1" placeholder="请确认您的密码" :password='password1NoShow' />
				</view>
			</view>
		</view>
		<view @click="submit" class="bottom_btn">
			<button class="btn">确认</button>
		</view>
	</view>
</template>

<script>
	import {
		toast,
		trim,
		verifyPhone
	} from '@/common/utils/index.js'
	import { sendCode, changeLoginPwd, UpdatePayPwd, UpdatePassword } from '@/common/js/http.js'
	export default {
		props: {
			types: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				tips: '发送验证码',
				countNum: 60,
				timer: null,
				phone: '',
				code: '',
				password0: '',
				password1: '',
				password0NoShow: true,
				password1NoShow: true,
				Token: '',
				UserId: ''
			};
		},
		mounted() {
			this.Token = uni.getStorageSync('token')
			this.UserId = uni.getStorageSync('userId')
		},
		methods: {
			checkAll() {
				let phoneRes = verifyPhone(this.phone)
				if (!phoneRes) {
					return false
				}
				if (this.code.length === 0) {
					toast('验证码不能为空哦~')
					return false
				} else if (this.password0.length === 0) {
					toast('密码不能为空哦~')
					return false
				} else if (this.password0 !== this.password1) {
					toast('两次输入的密码不一致')
					return false
				}
				return true
			},
			// 发送短信
			async sendMessage() {
				if (this.timer !== null) {
					return
				}
				let phoneRes = verifyPhone(this.phone)
				if (!phoneRes) return
				if (this.timer !== null) {
					return
				}
				let params = {
					Mobile: this.phone,
					type: this.types == 'payPassword' ? 8 : 2 //登录传2 支付传8
				}
				let { data } = await sendCode(params)
				console.log(data)
				if(data.code != 0) return 
				uni.showToast({
					title: data.msg,
					duration: 2000,
					icon: 'none'
				})
				this.timer = setInterval(() => {
					console.log(this.countNum)
					this.countNum--
					if (this.countNum <= 0) {
						this.tips = '发送验证码'
						clearInterval(this.timer)
					} else {
						this.tips = this.countNum + 's后重新获取'
					}
				}, 1000)
				this.$once('hook:beforeDestroy',()=>{
					this.timer && clearInterval(this.timer)
					this.timer = null;
				})
			},
			submit(){
				if(!this.checkAll()) return
				switch(this.types){
					case 'BackloginPassword': this.getBackLogin();break;
					case 'loginPassword': this.updateLogin();break;
					case 'payPassword': this.updatePay();break;
				}
			},
			//找回登录密码
			async getBackLogin(){
				let params = {
					Mobile: this.phone,
					PassWord: this.password0,
					VerifyCode: this.code
				}
				let { data } = await changeLoginPwd(params)
				uni.showToast({
					title: data.msg,
					duration: 2000,
					icon: 'none'
				})
				if(data.code != 0) return 
				
				//修改完登录密码重新登录
				setTimeout(() => {
					uni.reLaunch({
					    url: '/pages/login/login'
					});
				},1000)
				
			},
			//修改登录密码
			async updateLogin(){
				let params = {
					Mobile: this.phone,
					SecondPassWord: this.password0,
					VerifyCode: this.code,
					UserId: this.UserId,
					Token: this.Token
				}
				let { data } = await UpdatePassword(params)
				if(data.code != 0) return
				 uni.showToast({
					title: data.msg,
					duration: 2000,
					icon: 'none'
				})
				//修改完登录密码返回上级
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				},1000)
			},
			//修改支付密码
			async updatePay(){
				let params = {
					Mobile: this.phone,
					SecondPassWord: this.password0,
					VerifyCode: this.code,
					UserId: this.UserId,
					Token: this.Token
				}
				let { data } = await UpdatePayPwd(params)
				if(data.code != 0) return 
				uni.showToast({
					title: data.msg,
					duration: 2000,
					icon: 'none'
				})
				//修改完支付密码返回上级页面
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				},1000)
			}
		},
		destroyed() {
			//this.timer = null
			// console.log('销毁了',this.timer)
		}
		// methods: {
		// 		send() {
		// 			if (!this.isSend) return
		// 			this.isSend = false
		// 			this.sendText = 60
		// 			uni.showToast({
		// 				title: '验证码发送成功',
		// 				duration: 2000
		// 			});
		// 			this.timer = setInterval(() => {
		// 				this.sendText--
		// 				if (this.sendText <= 0) {
		// 					this.isSend = true
		// 					this.sendText = '发送验证码' >>>
		// 						clearInterval(this.timer)
		// 				} else {
		// 					this.tips = this.countNum + 's后重新获取'
		// 				}
		// 			}, 1000)
		// 		},

		// 		// sendText: '发送验证码',
		// 		// timer: null,
		// 		// isSend: true
		// 		// };
		// 	},

		// methods:{
		// 	send(){
		// 		if(!this.isSend)return
		// 		this.isSend = false
		// 		this.sendText = 10
		// 		uni.showToast({
		// 		    title: '验证码发送成功',
		// 		    duration: 2000
		// 		});
		// 		this.timer = setInterval(() => {
		// 			this.sendText --
		// 			console.log(this.sendText)
		// 			if(this.sendText <= 0){
		// 				this.isSend = true
		// 				this.sendText = '发送验证码'
		// 				clearInterval(this.timer)
		// 			}
		// 		},1000)
		// 		this.$once('hook:beforeDestroy',()=>{
		// 			this.timer && clearInterval(this.timer)
		// 		})
		// 	}
		// }
	}
</script>

<style scoped>
	.bb {
		border-bottom: 1px solid #ececec;
	}

	.box {
		background-color: #f7f6fb;
		font-size: 32upx;
	}

	.box .main {
		width: 100%;
		background-color: #FFFFFF;
	}

	.box .main .main-item {
		width: 95%;
		margin: 0 auto;
		height: 110upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.box .main .main-item .text {
		width: 200upx;
	}

	.box .main .main-item .input {
		flex: 1;
	}

	.box .main .main-item .sendBtn {
		padding: 0 20upx;

		/* width: 200upx; */
		text-align: center;
		border-left: 1px solid #e6e6e6;
		color: red;
	}

	.bottom_btn {
		width: 690upx;
		margin: 100upx auto 0upx;
	}

	.bottom_btn .btn {
		background-image: linear-gradient(#4387ea, #4387ea);
		color: #FFFFFF;
	}
	.uni-input-input, .uni-input-placeholder{
		font-size: 32upx;
		color: #5c6b8b;
	}
</style>
