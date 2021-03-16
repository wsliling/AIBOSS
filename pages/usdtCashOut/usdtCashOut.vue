<template>
	<view>
		<same-header :typetext="typetext" :headertext="headertext"></same-header>
		<view class="cashout">
			<view class="number fs-18">
				提币地址
			</view>
			<view class="number-item fs-18">
				<input type="text" placeholder="输入或长按粘贴地址" v-model="Address" />
				<view class="number-right">
					<view @tap='scanCode' class="wid iconfont icon-btn_scan bigFont">
					</view>
					<!-- <view class="borderleft wid iconfont icon-dizhibu bigFont" @click="toUSDTAddress"> -->
					<view class="wid iconfont icon-dizhibu bigFont" @click="toUSDTAddress">
					</view>
				</view>
			</view>
			<view class="number fs-18">
				数量
			</view>
			<view class="number-item fs-18">
				<!-- <input placeholder="请输入提币数量" v-model="Amount" @blur='blur' type="digit" /> -->
				<input placeholder="请输入提币数量" v-model="Amount" type="digit" />
				<view class="number-right">
					<view class="wid fs-18">
						USDT
					</view>
					<view @click="getAll()" class="borderleft wid fs-18">
						全部
					</view>
				</view>
			</view>
			<view class="numbers fs-16">
				<!-- 可用0.00000000000USDT -->
				可用 {{ usdt }} USDT
			</view>
			<view class="number fs-18">
				手续费
			</view>
			<view class="number-item fs-18">
				<view class="fs-18">
					<!-- 2.35000 -->
					{{ usdtFee }}
				</view>
				<view class="number-right">
					<view class="wid">
					</view>
					<view class="wid fs-18">
						USDT
					</view>
				</view>
			</view>
			<view class="number fs-18">
				支付密码
			</view>
			<view class="number-item fs-18">
				<input placeholder="请输入支付密码" v-model="SecondPassword" type="password" />
			</view>
			<view class="number fs-18" v-if="0">
				验证码
			</view>
			<view class="number-item fs-18" v-if="0">
				<input placeholder="请输入短信验证码" v-model="Vcode" type="digit" />
				<view class="number-right">
					<view class="wid">
					</view>
					<view class="wid">
						<view class="sendtextbtn" @click="sendMessage">
							{{ tips }}
						</view>
					</view>
				</view>
			</view>
			<view class="Type fwsmall fs-16">最小提币数量为: 100USDT(TRC20)。为保障资金安全，当账户安全策略变更、密码修改、我们会对提币进行人工审核，请耐心等待工作人员电话或邮件联系
			</view>
			<view class="bottom">
				<view class="bottom-left fs-18">
					到账数量
				</view>
				<view class="bottom-right fs-18">
					<!-- 0.0000000000000USDT -->
					{{ Amount - usdtFee < 0 ? 0 : Amount - usdtFee }}USDT
				</view>
			</view>
			<view @tap="clickSubmit" class="footer fs-20" :class="[isGreen ? 'green-bg': '']">
				提币
			</view>
		</view>

		<!-- <my-showModal ref='modal' @success='modalSuccess' :title='title' :content='content'></my-showModal> -->


	</view>
</template>

<script>
	import {
		toast,
		trim,
		verifyPhone,
		post,
		get,
		navigate
	} from '@/common/utils/index.js'
	import {
		loginTipsStatus,
		code
	} from '@/common/utils/request.js'
	import sameHeader from '@/components/sameHeader.vue'
	export default {
		data() {
			return {
				// 个人信息
				userNick: '',
				avatar: '',
				gradeName: '',
				lc: 0,
				usdt: 0,
				// 手续费
				usdtFee: 0,
				mobile2: '',
				typetext: 'USDT',
				// headertext: 'LC',
				headertext: '',
				tips: '发送',
				phone: '',
				countNum: 61,
				timer: null,
				timer3: null,
				Amount: '', // 最少提现100个
				Address: '',
				SecondPassword: '',
				Vcode: '123456',

	
				// 弹窗
				title: '',
				content: '?',
				modalSuccessUrl: 'updatePayPassword/updatePayPassword',
				
				// 是否正在转账
				isIng: false,
				timerIng:null,
			}
		},
		computed: {
			isGreen() {
				let res = this.checkAllIsGreen()
				return res
			},
		},
		components: {
			sameHeader
		},
		onLoad() {},
		onShow() {
			this.init()
		},
		methods: {
			init() {
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				this.GetMemberInfo()
				this.getUserAssetsInfo()
				this.Address = this.$store.state.address
				this.getUSDTFee()
			},

			// 扫码 
			scanCode() {
				uni.scanCode({
					success: (res) => {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						this.Address = res.result
					}
				});
			},
			//去USDT地址
			toUSDTAddress() {
				uni.navigateTo({
					url: '/pages/usdtAddress/usdtAddress'
				})
			},
			// 提现请求
			async withdrawUSDT() {
				this.isIng = true
				
				let obj = {
					UserId: this.userId,
					Token: this.token,
					Amount: this.Amount, // 最少提现100个
					Address: this.Address,
					SecondPassword: this.SecondPassword,
					Vcode: this.Vcode,
				}

				
				let res = ''
				res = await post('User/WithdrawUSDT', obj)
				// try {
				// 	res = await post('User/WithdrawUSDT', obj)
				// } catch (e) {
				// 	//TODO handle the exception
				// 	console.log('错误', e)
				// }
				// console.log(res)

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
				
				if (res.code == 0) {
					toast(res.msg)
					clearTimeout(this.timer3);
					this.timer3 = null;
					this.timer3 = setTimeout(() => {
						uni.navigateBack()
					}, 1500)
					this.$once('hook:beforeDestroy', () => {
						clearTimeout(this.timer3);
						this.timer3 = null;
					})

				}
				else if(res.code == 1) {
					// 最少提现 
					toast(res.msg)
				}
				else if(res.code == 3) {
						this.title = '未设置支付密码',
						this.content = '是否前往设置?'
						this.modalSuccessUrl = 'updatePayPassword/updatePayPassword'
				}
				else if (res.code == 4) {
					// usdt不足
					this.title = res.msg,
					this.content = '是否前往充值?'
					// this.modalSuccessUrl = 'lcInvest/lcInvest'
					this.modalSuccessUrl = 'usdtInvest/usdtInvest'
				}
				else if (res.code == 5) {
					this.title = '支付密码错误',
					this.content = '是否前往重置?'
					this.modalSuccessUrl = 'updatePayPassword/updatePayPassword'
					
					//  else if (res.msg.indexOf('支付密码错误') != -1) {
					// 	this.title = '忘记密码?',
					// 	this.content = '是否前往重置?'
					// 	this.$refs.modal.open()
					// }
				} 
				
				else if (res.code == 9) {
					// if (res.msg.indexOf('未设置') != -1) {
					this.title = 'API未授权',
				  this.content = '是否跳转到授权页面?'
					this.modalSuccessUrl = 'apiLetter/apiLetter'
					// }
					//this.$refs.modal.open()
					//  else if (res.msg.indexOf('支付密码错误') != -1) {
					// 	this.title = '忘记密码?',
					// 	this.content = '是否前往重置?'
					// }
				}
				if(res.code == 3 || res.code == 4  || res.code == 5 || res.code == 9) {
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
				// uni.request({
				//     url: 'http://lhapi.wtvxin.com/api/User/WithdrawUSDT',
				//     data: obj,
				//     method:'POST',
				//     success:(res)=>{
				//        // resolve(res)
				// 			 if(res.statusCode == code.resCode1) {
				// 				 res = res.data
				// 				 toast(res.msg)
				// 				 if (res.msg.indexOf('设置') !=-1) {
				// 				 	this.title = '未设置支付密码',
				// 				 		this.content = '是否前往设置?'
				// 				 	this.$refs.modal.open()
				// 				 } else if(res.msg.indexOf('错误') !=-1){
				// 				 	this.title = '忘记密码?',
				// 				 	this.content = '是否前往重置?'
				// 				 	this.$refs.modal.open()
				// 				 }
				// 			 }else if(res.code == code.notLogin) {
				// 				 	// 没登录或登录过期，询问是否跳转到登录页面
				// 				 	uni.setStorageSync("userId", '')
				// 				 	uni.setStorageSync("token", '')
				// 				 	if (!loginTipsStatus) {
				// 				 		loginTipsStatus = true;

				// 				 		uni.showModal({
				// 				 			title: '需要登录',
				// 				 			content: '是否跳转到登录页面？',
				// 				 			cancelColor: '#999',
				// 				 			// confirmColor: '#5cc69a',
				// 				 			confirmColor:'#02D38F',
				// 				 			success(res) {
				// 				 				if (res.confirm) {
				// 				 					navigate(LoginPath)
				// 				 				}
				// 				 			},
				// 				 			complete() {
				// 				 				loginTipsStatus = false;
				// 				 			}
				// 				 		})
				// 				 	}
				// 			 }
				// 			 else {
				// 				 toast('服务器繁忙，请稍后重试')
				// 			 }


				//     },
				//     error:(error)=>{
				//        // reject(error)
				// 			 toast('服务器繁忙，请稍后重试')
				//     }
				// })
			},
			modalSuccess(e) {
				// console.log('e',e)
				if (!e) {
					return
				}
				// console.log('点击确定')
				// navigate('updatePayPassword/updatePayPassword')
				navigate(this.modalSuccessUrl)
			},
			// 获取用户信息
			async GetMemberInfo() {
				// 初始化个人信息
				this.userNick = ''
				this.avatar = ''
				this.gradeName = ''
				let obj = {
					UserId: this.userId,
					Token: this.token
				}
				let res = await post('User/GetMemberInfo', obj)
				if (res.code != 0) {
					return
				}
				this.userNick = res.data.userNick
				// this.avatar = res.data.avatar
				this.avatar = res.data.avatar ? res.data.avatar : this.defaultImg
				this.gradeName = res.data.gradeName
				this.mobile2 = res.data.mobile2
			},
			// 资产信息
			async getUserAssetsInfo() {
				let obj = {
					userId: this.userId,
					token: this.token
				}
				let res = await post('User/GetUserAssetsInfo', obj)
				if (res.code != 0) return
				this.lc = res.data.lc
				this.usdt = res.data.usdt
				// this.usdt = 666
			},
			// 点击全部
			getAll() {
				this.Amount = String(this.usdt)
				// this.$set(this,'Amount',this.usdt)
				// console.log(this.Amount)
			},
			// 计算手续费接口
			// User/GetUSDTFee
			async getUSDTFee() {
				let obj = {
					userId: this.userId,
					token: this.token,
					// Amount: this.Amount
					Amount: 1
				}
				let res = await post('User/GetUSDTFee', obj)
				if (res.code != 0) return
				this.usdtFee = res.data
			},
			// 输入币失焦事件
			blur() {
				if (this.Amount < 100) {
					toast('提现的币最少100个')
					return
				}
				this.getUSDTFee()
			},
			// 短信以及验证模块start
			// 验证
			checkAllIsGreen() {
				let lengthAmount = this.Amount.replace(/\s/g, "").length
				let lengthAddress = this.Address.replace(/\s/g, "").length
				let lengthSecondPassword = this.SecondPassword.replace(/\s/g, "").length
				let lengthVcode = this.Vcode.replace(/\s/g, "").length
				// Amount: '', // 最少提现100个
				// Address: '',
				// SecondPassword: '',
				// Vcode: '',

				if (lengthAddress == 0) {
					return false
				}
				if (lengthAmount == 0) {
					return false
				}
				if (this.Amount < 100) {
					return false
				}
				if (lengthSecondPassword == 0) {
					return false
				}
				// if (lengthVcode == 0) {
				// 	return false
				// }
				// if (lengthVcode < 6) {
				// 	return false
				// }
				if (this.isIng) {
					return false
				}
				return true
			},
			// 验证
			checkAll() {
				let lengthAmount = this.Amount.replace(/\s/g, "").length
				let lengthAddress = this.Address.replace(/\s/g, "").length
				let lengthSecondPassword = this.SecondPassword.replace(/\s/g, "").length
				let lengthVcode = this.Vcode.replace(/\s/g, "").length
				// Amount: '', // 最少提现100个
				// Address: '',
				// SecondPassword: '',
				// Vcode: '',

				if (lengthAddress == 0) {
					toast('地址不能为空哦~')
					return false
				}
				if (lengthAmount == 0) {
					toast('提币数量不能为空哦~')
					return false
				}
				if (this.Amount < 100) {
					toast('提币数量不能少于100哦~')
					return false
				}
				if (lengthSecondPassword == 0) {
					toast('支付密码不能为空哦~')
					return false
				}
				// if (lengthVcode == 0) {
				// 	toast('验证码不能为空哦~')
				// 	return false
				// }
				// if (lengthVcode < 6) {
				// 	toast('验证码长度不足哦~')
				// 	return false
				// }
				return true
			},
			// 点击确定提币
			clickSubmit() {
				let res = this.checkAll()
				if (!res) {
					return
				}
				if(this.isIng) {
					return
				}
				this.withdrawUSDT()
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
					type: 27
				}
				let res = await get('SMS/Send', obj)
				// let res = {code : 0,msg:1}
				toast(res.msg)
				if (res.code != 0) {
					return
				}
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
			// 短信以及验证模块end
			// 发送短信
			// send() {
			// 	// let phoneRes = verifyPhone(this.phone)
			// 	// 	if (!phoneRes) return
			// 	if (this.timer !== null) {
			// 		return
			// 	}
			// 	this.countNum--
			// 	this.timer = setInterval(() => {
			// 		console.log(this.countNum)
			// 		this.countNum--
			// 		if (this.countNum <= 0) {
			// 			this.tips = '发送'
			// 			clearInterval(this.timer)
			// 		} else {
			// 			this.tips = this.countNum + 's后重新获取'
			// 		}
			// 	}, 1000)
			// 	this.$once('hook:beforeDestroy', () => {
			// 		this.timer && clearInterval(this.timer)
			// 	})
			// }
		}
	}
</script>

<style scoped>
	@import url("./style");
	@import url("~@/common/css/lcSame.css");
	.uni-input-input, .uni-input-placeholder{
		font-size: 34upx !important;
		color: #5c6b8b;
		font-weight: 700 !important;;
	}
	.uni-input-placeholder{
		font-size: 34upx !important;;
		font-weight: 700 !important;;
	}

</style>
