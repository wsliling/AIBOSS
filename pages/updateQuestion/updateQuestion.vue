<template>
	<view class="box fs-18">
		<view class="main">

			<view v-if="myMibaoList.length" class="main-item bb" @click="getWenti(1)">
				<view class="text" style="width: auto;">
					原密保问题: {{ mibaoWenti1 }}
				</view>
				<view class="iconfont icon-zhcc_xiangxia">

				</view>
			</view>
			<view v-if="myMibaoList.length" class="main-item bb">
				<view class="text">
					原密保答案
				</view>
				<view class="input">
					<input v-model="oldMibao" placeholder="输入密保答案" />
				</view>
			</view>
			<view class="main-item bb" @click="getWenti(2)">
				<view class="text">
					新密保问题: {{ mibaoWenti2 }}
				</view>
				<view class="iconfont icon-zhcc_xiangxia">

				</view>
			</view>
			<view class="main-item bb">
				<view class="text">
					新密保答案
				</view>
				<view class="input">
					<input v-model="newMibao" placeholder="输入密保答案" />
				</view>
			</view>
		</view>
		<view @click="submit" class="bottom_btn">
			<button class="btn">确认</button>
		</view>
	</view>
</template>

<script>
	// import updatePassword from '@/components/updatePassword.vue'
	import {
		toast,
		trim,
		verifyPhone,
		post,
		get
	} from '@/common/utils/index.js'
	export default {
		data() {
			return {
				userId: '',
				token: '',
				mibaoList: [], // 密保问题
				myMibaoList: [], // 我的密保问题
				isLoadMibaoList: false, // 我的密保问题是否加载出来了
				mibaoWenti1: '',
				mibaoWenti2: '',
				oldMibao: '',
				newMibao: '',
				OldGuardList: [{
					Id: '',
					Secretid: ''
				}, ],
				NewGuardList: [{
					Id: '',
					Secretid: ''
				}],
				
				// 是否正在转账
				isIng: false,
				timerIng:null,

			}
		},
		components: {
			// updatePassword
		},
		onShow() {
			this.GetSecurity()
			
		},
		methods: {
			// 获取密保问题
			async GetSecurity() {
				// Login2021/GetSecurity
				let res = await post('Login2021/GetSecurity')
				if(res.code != 0) {
					return
				}
				this.mibaoList = res.data
				
				this.GetSecuritystatus()
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
						 res.data.guards.map((item2, index2) => {
							if(item2 == item.code) {
								this.myMibaoList.push(item)
							}
						})
				})
				if(this.myMibaoList.length) {
					this.mibaoWenti1 = this.myMibaoList[0].message
					this.mibaoWenti2 = this.myMibaoList[0].message
					this.OldGuardList[0].Id = this.myMibaoList[0].code
					this.NewGuardList[0].Id = this.myMibaoList[0].code
				}
				this.isLoadMibaoList = true
			},
			getWenti(number) {
				let tempArrr = []
				if(number == 1 && this.myMibaoList.length != 0) {
						tempArrr = this.myMibaoList.map((item, index) => {
						return item.message
					})
				}else if(number == 2 || this.myMibaoList.length == 0) {
					tempArrr = this.mibaoList.map((item, index) => {
							return item.message
						})
				}
				
				uni.showActionSheet({
					itemList: tempArrr,
					success: (res) => {
						console.log(res)
						// this.sex=res.tapIndex
						let string = 'mibaoWenti' + number
						if (number == 1) {
							this.OldGuardList[0].Id = this.myMibaoList[res.tapIndex].code
							this[string] = this.myMibaoList[res.tapIndex].message
						}
						if (number == 2) {
							this.NewGuardList[0].Id = this.mibaoList[res.tapIndex].code
							this[string] = this.mibaoList[res.tapIndex].message
						}
						// let string = 'mibaoWenti' + number
						// this[string] = this.mibaoList[res.tapIndex].message
					},
					fail(res) {
						console.log(res.errMsg);
					}
				})
			},
			checkAll() {
				
				if (this.mibaoWenti1 == "" && this.myMibaoList.length != 0) {
					uni.showToast({
						title: "原密保问题不能为空!",
						icon: "none",
						duration: 2000
					});
					return false;
				}
				if (this.oldMibao == "" && this.myMibaoList.length != 0) {
					uni.showToast({
						title: "原密保问题答案不能为空!",
						icon: "none",
						duration: 2000
					});
					return false;
				}
				
				if (this.mibaoWenti2 == "") {
					uni.showToast({
						title: "新密保问题不能为空!",
						icon: "none",
						duration: 2000
					});
					return false;
				}
				
				if (this.newMibao == "") {
					uni.showToast({
						title: "新密保问题答案不能为空!",
						icon: "none",
						duration: 2000
					});
					return false;
				}
				return true;
			},
			async submit() {
				let res = this.checkAll()
				if (!res) {
					return false
				}
				if(this.isIng) {
					return
				}
				
				this.isIng = true
				
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				
				this.OldGuardList[0].Secretid = this.oldMibao
				this.NewGuardList[0].Secretid = this.newMibao
				let obj = {
					UserId: this.userId,
					Token: this.token,
					OldGuardList: this.OldGuardList,
					NewGuardList: this.NewGuardList
				}

				let data = await post('Login2021/ResetSecurity', obj)
				
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
				
				
				toast(data.msg)
				if(data.code != 0) {
					return
				}
				//修改完登录密码返回上级
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				},1000)

			}

		}
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
		/* width: 200upx; */
		width: auto;
	}

	.box .main .main-item .input {
		flex: 1;
		padding-left: 20upx;
	}

	.box .main .main-item .iconfont {
		margin-left: 10upx;
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

	.uni-input-input,
	.uni-input-placeholder {
		font-size: 34upx;
		color: #5c6b8b;
	}
</style>
