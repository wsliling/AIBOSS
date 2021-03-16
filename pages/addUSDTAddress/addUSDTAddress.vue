<template>
	<view>
		<view class="header">
			<view class="title fs-20">
				地址
			</view>
			<view class="content bb">
				<input placeholder="输入或粘贴USDT(点卡链)地址" class="input" v-model="Address" />
				<view @tap='scanCode' class="wid iconfont icon-btn_scan bigFont">
				</view>
			</view>
			<view class="title fs-20">
				备注 
			</view>
			<view class="content bb">
				<input placeholder="USDT(LC20) Address Name 1" class="input" v-model="Name" />
			</view>
		</view>
		<view class="bottom_btn" @tap='submit'>
			确定
		</view>
		<!-- 短信验证弹窗 -->
		<phone-pop ref='phonePop' :Name='Name' :Address='Address' :mobile2='mobile2' :mobile='mobile' :type='type'
		 @clickConfirmMessage='clickConfirmMessage'></phone-pop>
	</view>
</template>

<script>
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
				timer: null,
				type: 26, // 验证码类型,添加地址
				userId: '',
				token: '',
				Id: '',
				Name: '',
				Address: '',
				Vcode: '',
				mobile: '',
				mobile2: '',
				isEdit: false
			}
		},
		onLoad(e) {
			this.Id = e.id
			this.Name = e.name
			this.Address = e.address
			this.isEdit = Number(e.isEdit) ? e.isEdit : false
			console.log('this.name,',this.Name)
			console.log('this.Address,',this.Address)
			console.log('this.isEdit,',this.isEdit)
		},
		onShow() {
			this.init()
		},
		methods: {
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
			init() {
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				if(this.isEdit) return
				this.GetMemberInfo()
			},
			checkAll() {
				let lengthName = this.Name.replace(/\s/g, "").length
				let lengthAddress = this.Address.replace(/\s/g, "").length

				if (lengthAddress == 0) {
					toast('地址不能为空哦~')
					return false
				}
				if (lengthName == 0) {
					toast('备注不能为空哦~')
					return false
				}

				return true
			},
			// 获取个人信息
			async GetMemberInfo() {

				let obj = {
					UserId: this.userId,
					Token: this.token
				}
				let res = await post('User/GetMemberInfo', obj)
				if (res.code != 0) {
					return
				}
				let reg = new RegExp("(\\d{3})(\\d{4})(\\d{4})");
				let tel = res.data.mobile2.replace(reg, "$1****$3");
				this.mobile = tel
				this.mobile2 = res.data.mobile2
			},
			
			clickConfirmMessage(e) {
				this.timer = setTimeout(() => {
					uni.navigateBack()
				}, 500)

				this.$once('hook:beforeDestroy', () => {
					clearInterval(this.timer);
					this.timer = null;
				})

			},
			async editUSDTAddress() {
				let obj = {
						UserId: this.userId,
						Token: this.token,
						Name: this.Name,
						Address: this.Address,
						Id: this.Id,
				}
				let res = await post('Address/EditUSDTAddress',obj)
				toast(res.msg)
				if(res.code != 0) return
				this.timer = setTimeout(() => {
					uni.navigateBack()
				}, 500)
				
				this.$once('hook:beforeDestroy', () => {
					clearInterval(this.timer);
					this.timer = null;
				})
			},
			submit() {
				let res = this.checkAll()
				if (!res) return
				if(this.isEdit) {
					this.editUSDTAddress()
					return
				}
				this.$refs.phonePop.openPop()
			},

		}
	}
</script>

<style scoped>
	@import url("./style");
	.uni-input-input, .uni-input-placeholder{
		font-size: 30upx;
		color: #5c6b8b;
	}
</style>
