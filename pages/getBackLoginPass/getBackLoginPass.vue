<!-- <template>
	<view>
		<update-password types="BackloginPassword"></update-password>
	</view>
</template>

<script>
	import updatePassword from '@/components/updatePassword.vue'
	export default {
		data() {
			return {
				
			}
		},
		components:{
			updatePassword
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
 -->
 
 <!-- loginPassword -->
 <!-- <template>
 	<view>
 		<update-password types="loginPassword"></update-password>
 	</view>
 </template>
 
 <script>
 	import updatePassword from '@/components/updatePassword.vue'
 	export default {
 		data() {
 			return {
 				
 			}
 		},
 		components:{
 			updatePassword
 		},
 		methods: {
 			
 		}
 	}
 </script>
 
 <style scoped>
 
 </style> -->
 <template>
 	<view class="box fs-18">
 		<view class="main">
 			<view class="main-item bb" v-if="!isLogin">
 				<view class="text">
 					手机号
 				</view>
 				<view class="input">
 					<input v-model="phone" maxlength="11" placeholder="输入您的手机号" />
 				</view>
 			</view>
 			<view class="main-item bb" @click="getWenti(1)">
 				<view class="text" style="width: auto;margin-right: 10upx;">
 					密保问题： {{ mibaoWenti1 }}
 				</view>
 				<view class="iconfont icon-zhcc_xiangxia">
 					
 				</view>
 			</view>
 			<view class="main-item bb">
 				<view class="text">
 					密保答案
 				</view>
 				<view class="input">
 					<input v-model="mibao1" placeholder="输入密保答案" />
 				</view>
 				
 			</view>
 			<view class="main-item bb" v-if="0">
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
 		get,
 		post,
 		verifyPhone,
 		navigate
 	} from '@/common/utils/index.js'
 	import { sendCode, changeLoginPwd, UpdatePayPwd, UpdatePassword } from '@/common/js/http.js'
 	export default {
 		// props: {
 		// 	types: {
 		// 		type: String,
 		// 		default: ''
 		// 	}
 		// },
 		data() {
 			return {
 				isLogin: false,
 				types: 'BackloginPassword',
 				mibaoWenti1: '',
 				mibaoList: [], // 密保问题
 				myMibaoList: [],
 				isLoadMibaoList: false,
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
 				UserId: '',
 				mibao1: '',
 				GuardList: [
 					{
 						Id:'',
 						Secretid: ''
 					},
 				],
				
				// 是否正在转账
				isIng: false,
				timerIng:null,
 			};
 		},
 		onShow() {
 			this.Token = uni.getStorageSync('token')
 			this.UserId = uni.getStorageSync('userId')			
 			this.GetSecurity()
 			console.log('进来了。',this.Token)
 			if(this.Token) {
 				console.log("进来了")
 				this.isLogin = true
 				// this.GetMemberInfo()
 			}
 		},
 		methods: {			
 			// 获取个人信息
 			// async GetMemberInfo() {
 			// 	this.userId = uni.getStorageSync('userId')
 			// 	this.token = uni.getStorageSync('token')
 			// 	let obj = {
 			// 		UserId: this.userId,
 			// 		Token: this.token
 			// 	}
 			// 	let res = await post('User/GetMemberInfo', obj)
 			// 	if(res.code != 0) {
 			// 		return
 			// 	}
 			// 	this.phone = res.data.mobile2
 			// },
 			// 获取密保问题
 			async GetSecurity() {
 				// Login2021/GetSecurity
 				let res = await post('Login2021/GetSecurity')
 				if(res.code != 0) {
 					return
 				}
 				this.mibaoList = res.data
 				if(this.isLogin) {	
 					console.log('进来了')
 					this.GetSecuritystatus()
 				}else {
 					this.myMibaoList = this.mibaoList
 				}
 			},
 			// 获取密保状态
 			async GetSecuritystatus() {
 				this.userId = uni.getStorageSync('userId')
 				this.token = uni.getStorageSync('token')
 				let obj = {
 					UserId: this.userId,
 					Token: this.token
 				}
 				let res = await post('Login2021/GetSecuritystatus', obj)
 				if(res.code != 0) {
 					return
 				}
 				// this.myMibaoList = res.data
 				this.myMibaoList = []
 				this.mibaoList.map((item, index) => {
 						 res.data.map((item2, index2) => {
 							if(item2 == item.code) {
 								this.myMibaoList.push(item)
 							}
 						})
 				})
 				if(this.myMibaoList.length) {
 					this.mibaoWenti1 = this.myMibaoList[0].message
					
 				}
 				this.isLoadMibaoList = true
 			},
 			getWenti(number){
 				if(this.mibaoList.length == 0) {
 					// 去密保重置页面
 					toast('您未设置密保')
 					setTimeout(()=>{
 						navigate('updateQuestion/updateQuestion')
 					},2000)
 					return
 				}
 				let tempArrr = this.myMibaoList.map((item,index)=>{
 					return item.message
 				})
 				uni.showActionSheet({
 					itemList: tempArrr,
 					success: (res) => {
 						console.log(res)
 						// this.sex=res.tapIndex
 						let string = 'mibaoWenti' + number
						
						this.GuardList[0].Id = this.myMibaoList[res.tapIndex].code
 						this[string] = this.myMibaoList[res.tapIndex].message
 					},
 					fail(res) {
 					  console.log(res.errMsg);
 					}
 				})
 			},
 			checkAll() {
 				if(!this.isLogin) {
 					let phoneRes = verifyPhone(this.phone)
 					if (!phoneRes) {
 						return false
 					}
 				}
 				// if (this.code.length === 0) {
 				// 	toast('验证码不能为空哦~')
 				// 	return false
 				// } else 
 				if (this.mibao1.length === 0) {
 					toast('密保答案不能为空哦~')
 					return false
 				}
 				if (this.password0.length === 0) {
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

				
 				this.GuardList[0].Secretid = this.mibao1
 				let params = {
 					Mobile: this.phone,
 					PassWord: this.password0,
 					VerifyCode: this.code,
 					GuardList: this.GuardList
 				}
				
				
				if(this.isIng) {
					return
				}
				
				this.isIng = true
 				// let { data } = await changeLoginPwd(params)
 				let data = await post('Login2021/ChangeLoginPwd',params)
 				
 				uni.showToast({
 					title: data.msg,
 					duration: 2000,
 					icon: 'none'
 				})
				
				clearTimeout(this.timerIng);
				this.timerIng = null;
				this.isIng = true
				this.timerIng = setTimeout(() => {
					this.isIng = false
				}, 3000)
				this.$once('hook:beforeDestroy', () => {
					clearTimeout(this.timerIng);
					this.timerIng = null;
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
 				// let params = {
 				// 	Mobile: this.phone,
 				// 	SecondPassWord: this.password0,
 				// 	VerifyCode: this.code,
 				// 	UserId: this.UserId,
 				// 	Token: this.Token
 				// }
 				// let { data } = await UpdatePassword(params)
 				this.GuardList[0].Secretid = this.mibao1
 				let params = {
 					UserId: this.UserId,
 					Token: this.Token,
 					Mobile: this.phone,
 					PassWord: this.password0,
 					VerifyCode: this.code,
 					GuardList: this.GuardList
 				}
 				// let { data } = await changeLoginPwd(params)
 				let data = await post('Login2021/ChangeLoginPwd',params)
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
 				// let params = {
 				// 	Mobile: this.phone,
 				// 	SecondPassWord: this.password0,
 				// 	VerifyCode: this.code,
 				// 	UserId: this.UserId,
 				// 	Token: this.Token
 				// }
 				// let { data } = await UpdatePayPwd(params)
 				this.GuardList[0].Secretid = this.mibao1
 				let params = {
 					UserId: this.UserId,
 					Token: this.Token,
 					Mobile: this.phone,
 					SecondPassWord: this.password0,
 					VerifyCode: this.code,
 					GuardList: this.GuardList
 				}
 				// let { data } = await changeLoginPwd(params)
 				let data = await post('Login2021/SecurityPayPwd',params)
 				if(data.code != 0) return
 				 uni.showToast({
 					title: data.msg,
 					duration: 2000,
 					icon: 'none'
 				})
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
 		/* justify-content: space-between; */
 		justify-content: flex-start;
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
 		background-image: linear-gradient(#418cf1, #0065eb);
 		color: #FFFFFF;
 	}
 	.uni-input-input, .uni-input-placeholder{
 		font-size: 34upx;
 		color: #5c6b8b;
 	}
 </style>
 