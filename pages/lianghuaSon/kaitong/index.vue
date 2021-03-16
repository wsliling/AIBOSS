<template>
	<view class="big-box">
		<header-bar :title="title" titleTintColor="#000" :bgColor='bgColor' :center='center' :isBack="true">
			<view @tap="goBack" slot="back" class="uni_btnIco iconfont icon-xiaoyufuhao"></view>

		</header-bar>
		<view class="">
			<view class="content-box">
				<image class="content-img" src="/static/lianghua/no-tong.png" mode="widthFix"></image>
				<view class="text">
					您还未开通，开通后可自定义
				</view>
				<!-- <view @click="clickKaitong" class="button-box"> -->
				<!-- <view @click="SubmitAudit" class="button-box"> -->
				<view @click="GetMemberInfo" class="button-box">
					立即开通
				</view>
			</view>
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
	export default {
		data() {
			return {
				timer: null,
				userId: '',
				token: '',
				bgColor: {
					'background': '#fff',
				},
				// title: '开通',
				title: '自定义策略',
				center: true,
				isBack: true,
				
				isAut: 0, // 0是未开通, 1开通了
				
			}
		},
		components: {

		},
		onLoad() {
			this.userId = uni.getStorageSync('userId')
			this.token = uni.getStorageSync('token')
		},
		onShow() {

		},
		methods: {
			// 返回按钮
			goBack() {
				uni.navigateBack()
			},
			// 点击开通
			clickKaitong() {
				let obj = {
					isEdit: 0,
					id: 5,
				}
				navigate('lianghuaSon/userDefined/index', obj)
				// this.SubmitAudit()
			},
			// 点击修改策略,是编辑
			clickUserDefinedItem() {
				let obj = {
					isEdit: 1,
					id: 5,
				}
				navigate('lianghuaSon/userDefined/index', obj)
			},
			// 网络请求start
			// 立即开通请求
			async SubmitAudit() {
				let obj = {
					UserId: this.userId,
					Token: this.token
				}
				let res = await post('User/SubmitAudit', obj)
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration: 1000
				})
				//toast(res.msg)
				setTimeout(() => {
					uni.navigateBack()
				},1000)
				//toast(res.msg)
			},
			// 个人信息
			async GetMemberInfo() {
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				let obj = {
					UserId: this.userId,
					Token: this.token
				}
				let res = await post('User/GetMemberInfo', obj,{},false)
				if (res.code != 0) {
					return
				}
				uni.setStorageSync('grade',res.data.grade)
				// isAut: 0, // 0是未开通, 1开通了
				this.isAut = res.data.isAut
				if(this.isAut == 0) {
					// 未开通
					// let obj = {
					// 	isEdit: 0
					// }
					// navigate('lianghuaSon/kaitong/index', obj)
					this.SubmitAudit()
				}else if(this.isAut == 1) {
					uni.showToast({
					  title:'已开通',
					  icon: 'none',
					  mask: false,
					  duration: 1000
					})
					if(this.timer != null) return
					this.timer = setTimeout(() => {
						let obj = {
							isEdit: 0
						}
						
						// 开通了
						navigate('lianghuaSon/userDefined/index',obj)
						
						
						clearTimeout(this.timer);
						this.timer = null;
					}, 1000)
									
					this.$once('hook:beforeDestroy', () => {
						clearTimeout(this.timer);
						this.timer = null;
					})
					
					// let obj = {
					// 	isEdit: 0
					// }
					
					// // 开通了
					// navigate('lianghuaSon/userDefined/index',obj)
				}
			},
			// 网络请求end
		}
	}
</script>

<style lang="scss" scoped>
	@import "./style";
</style>
