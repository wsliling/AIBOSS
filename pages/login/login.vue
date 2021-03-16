<template>
	<view class="content">
		<view class="topbox">
			<image class="" src="/static/logo.png" mode="widthFix"></image>
			<view class="title">
				<view class="">AI BOSS</view>
				<view style="font-size: 30upx;margin-top: 10upx;">让资产增值变得简单</view>
			</view>
			<!-- <image src="/static/ai.png" mode="widthFix" class="ai"></image> -->
		</view>
		<view class="regLoginBox">
			<!-- <view class="logo">
				<view class="img">
					<image class="logoimg" src="/static/logo.png" mode="widthFix"></image>
					<view class="Title">量化APP</view>
				</view>
			</view> -->
			<view class="from pd10">
				<view class="from-line">
					<view class="iconfont icon-icon_account"></view>
					<input type="text" class="ipt" v-model="tel" maxlength="11" placeholder="请输入手机号码" />
				</view>
				<view class="from-line" v-show="logintype">
					<view class="iconfont icon-mima"></view>
					<input type="password" class="ipt" v-model="pwd" maxlength="18" placeholder="请输入密码" />
				</view>
				<view class="from-line" v-show="!logintype">
					<view class="iconfont icon-yanzhengma" style="transform: scale(0.8);"></view>
					<input type="text" class="ipt" maxlength="6" v-model="code" placeholder="请输入验证码" />
					<view class="getcode" @click="getCode">{{codeMsg}}</view>
				</view>
			<!-- 	<view class="from-line myYanzhengma" v-show="logintype">
					<view class="iconfont icon-dun" style="transform: scale(0.8);"></view>
					<input type="text" class="ipt" maxlength="6" v-model="gifCode" placeholder="请输入验证码" />
					<view class="shuzi-yanzhengma">
						<image class="shadow1" @tap="changeGifCodeSrc" :src="gifCodeSrc" mode="widthFix"></image>
					</view>
				</view> -->
						<!-- <image class="shadow1" @tap="CreateSecurityCode" src="http://lhapi.wtvxin.com//api/Login/CreateSecurityCode" mode="widthFix"></image> -->
						<!-- <image class="shadow1" @tap="CreateSecurityCode" :src="require(gifCodeSrc)" mode="widthFix"></image> -->
				<view class="from-line myYanzhengma" v-show="logintype&&false">
					<view class="iconfont icon-dun" style="transform: scale(0.8);"></view>
					<input type="text" class="ipt" maxlength="6" v-model="verCode" placeholder="请输入验证码" />
					<view class="shuzi-yanzhengma">
						<view class="canvas-img-code" @click="refresh()">
							<canvas :style="{width:width+'px',height:height+'px'}" canvas-id="imgcanvas" @error="canvasIdErrorCallback"></canvas>
						</view>
					</view>
					
				</view>
						
				<view class="from-line text_r" style="margin:0; background: none; display: none;" @click="changeWay">
					<text class="c_theme" v-if="logintype">手机验证码登录</text>
					<text class="c_theme" v-if="!logintype">密码登录</text>
				</view>
				<view class="ftbtn" style="padding:40upx 0 20upx 0;">
					<button type="primary" @click="btnSubmit" class="btn">登录</button>
				</view>
				<view class="form-line aLine" style="margin:0 30upx;">
					<view @click="register" class="inline-block aline">没有账号？注册账号</view>
					<view v-if="logintype" @click="getPassword" class="inline-block aline fr">忘记密码?</view>
				</view>
				<view class="downapp" @click="golink('/pages/dowmApp/dowmApp')">———<label>下载 AIBOSS</label>———</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		checkTelphone
	} from '@/common/js/methodSet.js'
	import {
		login,
		sendCode,
		MemberLoginByCode
	} from '@/common/js/http.js'
	import {
		post,
		get,
		navigate,
		switchTab,
		judgeLogin,
		toast,
		trim,
	} from '@/common/utils/index.js';
	// import {
	// 	base64,
	// 	_utf8_decode
	// }
	// from './base64.js'
	export default {
		onLoad(e) {
			// // 获取图片验证码
			// this.CreateSecurityCode()
		},
		onShow() {
			this.verCodeTimer = setTimeout(()=>{
				this.init()
			},500)
			
			this.$once('hook:beforeDestroy', () => {
				clearTimeout(this.verCodeTimer);
				this.verCodeTimer = null;
			})
		},
		data() {
			return {
				tel: "",
				pwd: "",
				askUrl: "",
				code: "",
				codeMsg: "获取验证码",
				timer: null,
				count: "",
				has_click: false,
				isRegister: false,
				isIndex: false,
				logintype: true, //true表示密码登录，false手机验证码登录
				clickLogin: false,
				timer2: null,
				// 数字验证码
				gifCodeSrc: 'http://lhapi.wtvxin.com/api/Login/CreateSecurityCode?t='+ new Date().getTime(),
				// gifCodeSrc: '',
				gifCode: '',
				// 前端生成的验证码
				width: 120,
				height: 45,
				verCode: "",
				verCodeTimer: null,
			};
		},
		methods: {
			golink(url){
				uni.navigateTo({
					url
				})
			},
			changeWay() {
				this.pwd = ''
				this.code = ''
				this.gifCode = ''
				this.logintype = !this.logintype;
			},
			//获取验证码
			getCode() {
				if (!checkTelphone(this.tel)) return uni.showToast({
					title: '手机号格式不合法',
					duration: 2000,
					icon: 'none'
				});
				!this.has_click && this.sendCode();
			},
			async sendCode() {
				if (this.timer !== null) {
					return
				}
				let params = {
					Mobile: this.tel,
					type: 1
				}
				let {
					data
				} = await sendCode(params)
				console.log(data)
				// toast(data.msg)
				if (data.code != 0) {
					return
				}
				uni.showToast({
					title: data.msg,
					duration: 2000,
					icon: 'none'
				})
				this.has_click = true;
				const TIME_COUNT = 90; // 90s后重新获取验证码
				this.count = TIME_COUNT;

				this.timer = setInterval(() => {
					if (this.count > 0 && this.count <= TIME_COUNT) {
						this.count--;
						this.codeMsg = this.count + "s后重新获取";
					} else {
						clearInterval(this.timer);
						this.timer = null;
						this.codeMsg = "获取验证码";
						this.has_click = false
					}
				}, 1000);
			},
			valOther() {
				if (this.logintype) {
					if (this.pwd == "") {
						uni.showToast({
							title: "请输入密码!",
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
					// if (this.gifCode == "") {
					// 	uni.showToast({
					// 		title: "请输入验证码!",
					// 		icon: "none",
					// 		duration: 2000
					// 	});
					// 	return false;
					// }
					
					// 验证前端的验证码start
					// if (this.verCode.length != 4) {
					// 	uni.showToast({
					// 		icon: 'none',
					// 		position: 'bottom',
					// 		title: '验证码不正确'
					// 	});
					// 	// 刷新验证码
					// 	this.refresh()
					// 	return false;
					// }
					// if (this.verCode.toLowerCase() != uni.getStorageSync('imgcode').toLowerCase()) {
					// 	uni.showToast({
					// 		icon: 'none',
					// 		position: 'bottom',
					// 		title: '验证码不正确'
					// 	});
					// 	// 刷新验证码
					// 	this.refresh()
					// 	return false;
					// }
					// 验证前端的验证码end

				} else {
					if (this.code == "") {
						uni.showToast({
							title: "请输入验证码!",
							icon: "none",
							duration: 2000
						});
						return false;
					}
				}
				return true;
			},
			btnSubmit() {
				if (!checkTelphone(this.tel)) return uni.showToast({
					title: '手机号格式不合法',
					duration: 2000,
					icon: 'none'
				})
				this.valOther() && this.login();
			},
			async login() {
				if (this.clickLogin) return
				this.clickLogin = true
				setTimeout(() => {
					this.clickLogin = false
				}, 2000)
				let data
				if (this.logintype) {
					//密码登录参数
					let params = {
						Mobile: this.tel,
						PassWord: this.pwd,
						// Vcode: this.gifCode
					}
					data = await login(params)
				} else {
					//验证码登录参数
					let params = {
						Mobile: this.tel,
						VerifyCode: this.code
					}
					data = await MemberLoginByCode(params)
				}
				// uni.showToast({
				// 	title: data.data.msg,
				// 	duration: 500,
				// 	icon: 'none',})
				// 	this.changeGifCodeSrc()
				// return
				if (data.data.code == 0) {
					uni.setStorageSync('token', data.data.data.Token);
					uni.setStorageSync('userId', data.data.data.UserId);
					uni.showToast({
						title: '登录成功',
						duration: 500,
						icon: 'success',
						success: () => {
							if (this.timer2 != null) return
							this.timer2 = setTimeout(() => {
								clearInterval(this.timer2);
								this.timer2 = null;
								// uni.switchTab({
								// 	url: '/pages/tabbar/home/home'
								// })
								uni.navigateBack()
							}, 500)
							this.$once('hook:beforeDestroy', () => {
								clearInterval(this.timer2);
								this.timer2 = null;
							})
						}
					})
				} else {
					uni.showToast({
						title: data.data.msg,
						duration: 2000,
						icon: 'none'
					})
				}
			},
			//注册
			register() {
				uni.navigateTo({
					url: '/pages/register/register'
				})
			},
			//忘记密码
			getPassword() {
				uni.navigateTo({
					url: '/pages/getBackLoginPass/getBackLoginPass'
				})
			},
			toback() {
				if (this.isIndex) {
					uni.switchTab({
						url: "/pages/tabBar/index/index"
					})
				} else if (this.isRegister) {
					uni.switchTab({
						url: "/pages/tabBar/my/my"
					});
				} else {
					uni.navigateBack();
				}
			},

			// 获取gif验证码,获取数字验证码
			async CreateSecurityCode() {
				let res = await get('Login/CreateSecurityCode')
				this.gifCodeSrc = res
				// this.gifCodeSrc = JSON.stringify(res)
				console.log(this.gifCodeSrc)
				
				// let res = await get('Login/CreateSecurityCode', {}, {}, false)
				// this.gifCodeSrc = res
				// console.log('this.gifCodeSrc.replace(/[\r\n]/g)',this.gifCodeSrc.replace(/[\r\n]/g,''))
				// this.gifCodeSrc = this.gifCodeSrc.replace(/[\r\n]/g,'')
				// this.gifCodeSrc = res.replace(/[\r\n]/g, '')
				
				// this.gifCodeSrc = base64(res)

			},
			changeGifCodeSrc() {
				let date = new Date().getTime()
				console.log('时间戳', date)
				this.gifCodeSrc = 'http://lhapi.wtvxin.com/api/Login/CreateSecurityCode?t='+ date
			},
			
			// 前端生成验证码start
			init() {
				console.log('start');
				var context = uni.createCanvasContext('imgcanvas', this),
					w = this.width,
					h = this.height;
				context.setFillStyle("white");
				context.setLineWidth(5);
				context.fillRect(0, 0, w, h);
				var pool = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "I", "M", "N", "O", "P", "Q", "R", "S",
						"T", "U", "V", "W", "S", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
					],
					str = '';
				for (var i = 0; i < 4; i++) {
					var c = pool[this.rn(0, pool.length - 1)];
					var deg = this.rn(-30, 30);
					context.setFontSize(18);
					context.setTextBaseline("top");
					context.setFillStyle(this.rc(80, 150));
					context.save();
					context.translate(30 * i + 15, parseInt(h / 1.5));
					context.rotate(deg * Math.PI / 180);
					context.fillText(c, -15 + 5, -15);
					context.restore();
					str += c;
				}
				uni.setStorage({
					key: 'imgcode',
					data: str,
				});
				// 干扰线
				/**绘制干扰线**/
				for (var i = 0; i < 6; i++) {
					// context.strokeStyle = this.rc(40, 180);
					context.strokeStyle = this.rc(40, 180);
					context.beginPath();
					context.moveTo(this.rn(0, w), this.rn(0, h));
					context.lineWidth=1;
					context.lineTo(this.rn(0, w), this.rn(0, h));
				
					context.stroke();
				
				}
				// 干扰点
				for (var i = 0; i < 40; i++) {
					context.beginPath();
					context.arc(this.rn(0, w), this.rn(0, h), 1, 0, 2 * Math.PI);
					context.closePath();
					context.setFillStyle(this.rc(150, 200));
					context.fill();
				}
				context.draw();
				console.log('end');
			},
			rc(min, max) {
				var r = this.rn(min, max);
				var g = this.rn(min, max);
				var b = this.rn(min, max);
				return "rgb(" + r + "," + g + "," + b + ")";
			},
			rn(max, min) {
				return parseInt(Math.random() * (max - min)) + min;
			},
			refresh() {
				this.init();
			},
			canvasIdErrorCallback(e) {
				console.error(e.detail.errMsg)
			}
			// 前端生成验证码end
			
			
			
		}
	}
</script>
<style lang="scss" scoped>
	@import '@/common/login.css';

	.logo {
		padding: 0 0 80upx;
	}

	.logo .img {
		width: 200upx;
		height: 200upx;
		margin: 0 auto;

	}

	.logo .img image {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		/* border-radius: 25upx; */
	}

	.fr {
		float: right;
	}

	.text_r {
		text-align: right;
	}

	.c_theme {
		color: #ff3333;
	}

	.content {
		height: 100vh;
		position: relative;
		box-sizing: border-box;
	}

	.regLoginBox {
		width: 90%;
		position: absolute;
		top: 55vh;
		left: 5%;
		transform: translateY(-50%);
		border-radius: 20rpx;
		box-sizing: border-box;
	}

	.from-line {
		background: #fff;
		border-radius: 40rpx;
	}

	.nav {
		height: 88upx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 12;
		box-sizing: content-box;
		background: #ffffff !important;
	}

	.head_l,
	.head_r {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 88rpx;
		height: 88rpx;
	}

	.mine {
		font-size: 32rpx;
		font-family: PingFang;
		font-weight: 700;
		color: #000;
	}

	/* 数字验证码 */
	.from-line.myYanzhengma {
		width: 308upx;

		.iconfont {
			font-size: 48upx;
		}

	}

	.shuzi-yanzhengma {
		position: absolute;
		z-index: 3333;
		top: 0upx;
		right: -358upx;
		width: 308upx;
		height: 90upx;

		image {
			width: 230upx;
			height: 90upx;
		}

		// img {

		// 	width: 100upx;
		// 	height: 80upx;
		// }
	}

	.topbox{
		width: 100%;
		position: fixed;
		top: 0;
		// height: 400upx;
		height: calc(50vh - 400upx);
		background-color: #4387ea;
		display: flex;
		align-items: center;
		image{
			width: 160upx;
			height: 160upx;
			margin: 0 30upx 0 50upx;
			border-radius: 50%;
		}
		.ai{
			width: 80upx;
			// height: 120upx;
			position: absolute;
			bottom: 0;
			right: 100upx;
			border-radius: 0;
		}
		.title{
			color: #fff;
			font-size: 42upx;
			font-weight: 600;
			view{
				font-size: 42upx;
			}
		}
	}
	.downapp{
		width: 100%;
		text-align: center;
		margin-top: 80upx;
		color: #4387ea;
		font-weight: 500;
		// text-decoration:underline;
		label{
			color: #4387ea;
			margin: 0 10upx;
		}
	}
</style>
