<template>
	<view class="content">
		<view class="regLoginBox">
			<view class="logo">
				<view class="img">
					<image src="/static/logo.png" mode="widthFix"></image>
					<view class="Title"></view>
				</view>
			</view>
			<view class="from pd10">
				<view class="from-line">
					<view class="iconfont icon-icon_account"></view>
					<input type="text" class="ipt" v-model="tel" maxlength="11" placeholder="请输入手机号码" />
				</view>
				<view class="mibao-wenti" @click="getWenti(1)">
					{{ mibaoWenti1 }}
					<view class="iconfont icon-zhcc_xiangxia">
						
					</view>
				</view>
				<view class="from-line">
					<view class="iconfont icon-dun" style="transform: scale(0.8);"></view>
					<input type="text" class="ipt" v-model="mibao1" placeholder="请输入密保问题1" />
				</view>
				<view class="mibao-wenti" @click="getWenti(2)">
					{{ mibaoWenti2 }}
					<view class="iconfont icon-zhcc_xiangxia">
						
					</view>
				</view>
				<view class="from-line">
					<view class="iconfont icon-dun" style="transform: scale(0.8);"></view>
					<input type="text" class="ipt" v-model="mibao2" placeholder="请输入密保问题2" />
				</view>
				
				<view class="from-line" v-if="0">
					<view class="iconfont icon-yanzhengma" style="transform: scale(0.8);"></view>
					<input type="text" class="ipt" v-model="code" maxlength="6" placeholder="请输入验证码" />
					<view class="getcode" @click="getCode">{{codeMsg}}</view>
				</view>
				<view class="from-line">
					<view class="iconfont icon-icon_account"></view>
					<input type="text" class="ipt" v-model="userName" maxlength="11" placeholder="请输入真实姓名" />
				</view>
				<!-- <view class="from-line">
					<view class="iconfont icon-idCard"></view>
					<input type="text" class="ipt" v-model="IDCardNo" maxlength="18" placeholder="请输入身份证号码" />
				</view> -->
				<view class="from-line">
					<view class="iconfont icon-mima"></view>
					<input type="password" class="ipt" v-model="pwd"  placeholder="请输入密码" />
				</view>
				<view class="from-line">
					<view class="iconfont icon-mima"></view>
					<input type="password" class="ipt" v-model="pwd2" placeholder="请再次输入密码" />
				</view>
				<view class="from-line">
					<view class="iconfont icon-mima"></view>
					<input type="password" class="ipt" v-model="pwd3" placeholder="请设置支付密码" />
				</view>
				<view class="from-line" style="position: relative;">
					<view class="iconfont icon-yaoqingma"></view>
					<input type="text" class="ipt"  v-model="inviteCode" placeholder="好友邀请码(必填)" />
					<text class="inviteTips">好友邀请码</text>
				</view>
				<view class="from-txt">
					<view  @click="shiftAgree" style="display: inline-block;vertical-align: middle;"><view class="IconsCK IconsCK-radio" :class="{'checked':isAgree}" style="margin-right: 8upx;"></view><text>我已阅读并同意</text></view>
					<navigator url="/pages/agreement/agreement" class="inline-block" style="color:#004098;">《用户协议》</navigator>
				</view>
				<view class="ftbtn" style="padding:40upx 0 20upx 0;">
					<button class="btn" @click="btnSubmit">确认注册</button>
				</view>
			</view>
			<!-- #ifdef H5 -->
			<view class="downapp" @click="golink('/pages/dowmApp/dowmApp')">下载AIBOSS app</view>
			<!-- #endif -->
		</view>
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
	import { checkTelphone } from '@/common/js/methodSet.js'
	import { sendCode, register } from '@/common/js/http.js'
	export default {
		onLoad(e) {
			this.inviteCode=e.inviteCode
			this.GetSecurity()
		},
		onShow() {
		},
		data() {
			return {
				tel: "",
				pwd: "",
				pwd2: "",
				pwd3: "", // 支付密码
				code: "123456",
				inviteCode: "", //邀请码
				userName: '',
				IDCardNo: '',
				timer: null,
				codeMsg: "获取验证码",
				count: "",
				TIME_COUNT: 60,
				has_click: false,
				isAgree:true,
				disabled: false,
				mibaoWenti1: '请选择密保问题1',
				mibaoWenti2: '请选择密保问题2',
				mibao1: '',
				mibao2: '',
				GuardList: [
					{
						Id: '',
						Secretid: ''
					},
					{
						Id: '',
						Secretid: ''
					},
				],
				mibaoList: [] // 密保问题
			};
		},
		methods: {
			// 弹窗问题
			getWenti(number){
				let tempArrr = this.mibaoList.map((item,index)=>{
					return item.message
				})
				
				uni.showActionSheet({
					itemList: tempArrr,
					success: (res) => {
						console.log(res)
						// this.mibaoID = this.mibaoList[res.tapIndex].code
						// console.log(this.GuardList[(number-1)],this.mibaoList[res.tapIndex])
						this.GuardList[(number-1)].Id =  this.mibaoList[res.tapIndex].code
						let string = 'mibaoWenti' + number
						this[string] = this.mibaoList[res.tapIndex].message
					},
					fail(res) {
					  console.log(res.errMsg);
					}
				})
			},
			// 获取密保问题
			async GetSecurity() {
				// Login2021/GetSecurity
				let res = await post('Login2021/GetSecurity')
				if(res.code != 0) {
					return
				}
				this.mibaoList = res.data
			},
			golink(url){
				uni.navigateTo({
					url
				})
			},
			getCode() {
				if (!checkTelphone(this.tel)) return uni.showToast({
					title: '手机号格式不正确',
					duration: 2000,
					icon: 'none'
				})
				!this.has_click && this.sendCode();
			},
			shiftAgree(){
				this.isAgree = !this.isAgree;
			},
			regResetPwdValOther() {
				// if (this.code == "") {
				// 	uni.showToast({
				// 		title: "验证码不能为空!",
				// 		icon: "none",
				// 		duration: 2000
				// 	});
				// 	return false;
				// }
				if (this.mibaoWenti1 == "请选择密保问题1") {
					uni.showToast({
						title: "密保问题1不能为空!",
						icon: "none",
						duration: 2000
					});
					return false;
				}
				if (this.mibao1 == "") {
					uni.showToast({
						title: "密保问题1答案不能为空!",
						icon: "none",
						duration: 2000
					});
					return false;
				}
				if (this.mibaoWenti2 == "请选择密保问题2") {
					uni.showToast({
						title: "密保问题2不能为空!",
						icon: "none",
						duration: 2000
					});
					return false;
				}
				if (this.mibao2 == "") {
					uni.showToast({
						title: "密保问题2答案不能为空!",
						icon: "none",
						duration: 2000
					});
					return false;
				}
				if (this.userName == "") {
					uni.showToast({
						title: "姓名不能为空!",
						icon: "none",
						duration: 2000
					});
					return false;
				}
				// let reg = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
				// if (!reg.test(this.IDCardNo)) {
				// 	uni.showToast({
				// 		title: "身份证号格式不合法!",
				// 		icon: "none",
				// 		duration: 2000
				// 	});
				// 	return false;
				// }
				if (this.pwd == "" || this.pwd2 == "") {
					uni.showToast({
						title: "密码不能为空!",
						icon: "none",
						duration: 2000
					});
					return false;
				}
				if (this.pwd != this.pwd2) {
					uni.showToast({
						title: "两次输入密码不同!",
						icon: "none",
						duration: 2000
					});
					return false;
				}
				if (this.pwd.length < 6) {
					uni.showToast({
						title: "密码长度不能小于6个字符!",
						icon: "none",
						duration: 2000
					});
					return false;
				}
				
				if (this.pwd3 == "") {
					uni.showToast({
						title: "支付密码不能为空!",
						icon: "none",
						duration: 2000
					});
					return false;
				}
				if (this.pwd3.length < 6) {
					uni.showToast({
						title: "支付密码长度不能小于6个字符!",
						icon: "none",
						duration: 2000
					});
					return false;
				}
				if (!this.inviteCode) {
					uni.showToast({
						title: "好友邀请码不能为空!",
						icon: "none",
						duration: 2000
					});
					return false;
				}
				if (!this.isAgree) {
					uni.showToast({
						title: "请勾选同意用户协议!",
						icon: "none",
						duration: 2000
					});
					return false;
				}
				return true;
			},
			async sendCode() {
				let params = {
					Mobile: this.tel,
					type: 0
				}
				let { data } = await sendCode(params)
				console.log(data)
				if(data.code != 0) return uni.showToast({
					title: data.msg,
					duration: 2000,
					icon: 'none'
				})
				this.has_click = true;
				this.count = 60;
				uni.showToast({
					title: "发送成功，请注意查收!",
					icon: "none",
					duration: 2000
				});
				this.timer = setInterval(() => {
					if (this.count > 0) {
						this.count--;
						this.codeMsg = this.count + "s后重新获取";
					} else {
						clearInterval(this.timer);
						this.has_click = false;
						this.timer = null;
						this.codeMsg = "获取验证码";
					}
				}, 1000);
				this.$once('hook:beforeDestroy',()=>{
					this.timer && clearInterval(this.timer)
					this.timer = null
				})
			},
			async phoneNumberRegister() {
				// let params = {
				// 	Mobile: this.tel,
				// 	VerifyCode: this.code,
				// 	PassWord: this.pwd,
				// 	InviteCode: this.inviteCode || null	,
				// 	NickName: this.userName,
				// 	Idcard: this.IDCardNo
				// }
				// let { data } = await register(params)
				this.GuardList[0].Secretid = this.mibao1
				this.GuardList[1].Secretid = this.mibao2
				let obj = {
					Mobile: this.tel,
					VerifyCode: this.code,
					PassWord: this.pwd,
					SecondPassword: this.pwd3, // 支付密码
					InviteCode: this.inviteCode || null,
					NickName: this.userName,
					// Idcard: this.IDCardNo,
					GuardList: this.GuardList
				}
				let data = await post('Login2021/MobileRegister',obj)
				if(data.code == 0){
					uni.setStorageSync('token', data.data.Token);
					uni.setStorageSync('userId', data.data.UserId);
					// #ifndef H5
					uni.showToast({
						title: '登录成功',
						duration: 500,
						icon: 'success',
						success:()=> {
							uni.switchTab({
								url: '/pages/tabbar/home/home'
							})
						}
					})
					// #endif
					// #ifdef H5
					uni.showModal({
						title: '注册成功',
						content: '是否跳转到APP下载页面？',
						cancelColor: '#999',
						confirmColor: '#02D38F',
						success(res) {
							if (res.confirm) {
								this.timer2 = setTimeout(() => {
									uni.navigateTo({
										url: '/pages/dowmApp/dowmApp'
									})
								}, 500)
								this.$once('hook:beforeDestroy', () => {
									clearInterval(this.timer2);
									this.timer2 = null;
								})
							}
						},
						complete() {
							loginTipsStatus = false;
						}
					})
					// #endif
				}else{
					uni.showToast({
						title: data.msg,
						duration: 2000,
						icon: 'none'
					})
				}
			},
			btnSubmit(){
				if(!checkTelphone(this.tel)) return uni.showToast({
					title: '手机号格式不合法',
					duration: 2000,
					icon: 'none'
				})
				this.regResetPwdValOther() && this.phoneNumberRegister()
			}
		},
		
	}
</script>

<style>
	@import '../../common/login.css';
	
	.mibao-wenti {
		line-height: 2;
		margin: 0upx 0upx 20upx 20upx;
		display: flex;
		align-items: center;
	}
	.mibao-wenti .iconfont {
		margin-left: 10upx;
	}
	.content {
			background: #fff;
	/* 		background-size: 100% 100%;
			min-height: 100%;
			height: auto;
			position: relative;
			box-sizing: border-box; */
		}
	
		.regLoginBox {
			padding-top: 50upx;
			/* background: rgba(0,0,0,0.5); */
	/* 		width: 90%;
			position: absolute;
			top: 50vh;
			left: 5%;
			transform: translateY(-50%);
			border-radius: 20rpx;
			box-sizing: border-box; */
		}
	
	.from-line{
		  background: #fff;
		  border-radius: 40rpx;
	}
	.from .from-txt {
	    font-size: 14px;
	    /* color: #fff; */
	}
	.inviteTips{ position: absolute; right: 30upx; top: 0; color: #bbb; line-height: 80upx;text-decoration: underline;}
	.downapp{
		width: 100%;
		text-align: center;
		margin-top: 60upx;
		color: #4387ea;
		text-decoration:underline
	}
</style>
