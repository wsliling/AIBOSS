<template>
	<view>
		<header-bar :title="title" titleTintColor="#fff" :bgColor='bgColor' :center='center' :isBack="true">
			<view @tap="goBack" slot="back" class="uni_btnIco iconfont icon-xiaoyufuhao"></view>
			<view slot="string">
				<!-- <view @click="clickSave" class="save-view"> -->

			</view>
		</header-bar>
		<view class="big-box fs-18">
			<view class="title">
				系统定义
			</view>
			<view class="item-list">
				<block v-for="(item,index) in list" :key='index'>
					<view @tap='clickLeixing(item,index)' class="item">
						{{ item.name }}
					</view>
				</block>

			</view>
			<view class="title">
				自定义策略
			</view>
			<view class="item-list">
				<view @tap='clickKaitong' class="item">
					自定义
				</view>
				<!-- <view class="item" @click="navigate('lianghuaSon/userDefined/index',{isEdit:0})">
					我的自定义策略
				</view> -->
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
				navigate,
				userId: '',
				token: '',
				isAut: 0, // 0是未开通, 1开通了
								
				bgColor: {
					'background': 'linear-gradient(90deg, #02D48E, #17B580)',
				},
				// title: '开通',
				title: '选择策略',
				center: true,
				isBack: true,
				timer: null,
				list: [
					// '保守',
					// '稳健',
					// '激进',
					// '保守',
					// '稳健',
					// '激进',
				]


			}
		},
		components: {

		},
		onLoad() {
			
		},
		onShow() {
			this.init()
		},
		methods: {
			init() {
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				this.GetDefaultStrategyList()
				this.GetMemberInfo()
			},
			clickLeixing(item, index) {
				this.$store.commit('update', {
					"leixing": item
				})
				uni.setStorageSync('myleixing',item)
				console.log('this.$store0',this.$store.state.leixing)
				if (this.timer != null) return
				this.timer = setTimeout(() => {
					uni.navigateBack()
				}, 100)
				this.$once('hook:beforeDestroy', () => {
					clearInterval(this.timer);
					this.timer = null;
				})
			},
			// 返回按钮
			goBack() {
				uni.navigateBack()
			},
			// 点击开通
			clickKaitong() {
				if(this.isAut == 0) {
					// 未开通
					let obj = {
						isEdit: 0
					}
					navigate('lianghuaSon/kaitong/index', obj)
				}else if(this.isAut == 1) {
					let obj = {
						// isEdit: 1
						isEdit: 0
					}
					// 开通了
					navigate('lianghuaSon/userDefined/index',obj)
				}
			},
			// 点击修改策略,是编辑
			clickUserDefinedItem() {
				let obj = {
					isEdit: 1
				}
				navigate('lianghuaSon/userDefined/index', obj)
			},
			// 网络请求start
			// 获取默认策略模版列表
			async GetDefaultStrategyList() {
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				let obj = {
					UserId: this.userId,
					Token: this.token
				}
				let res = await post('Trade/GetDefaultStrategyList', obj)
				this.list = res.data
			},
			// 个人信息
			async GetMemberInfo() {
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
			},
			// 网络请求end
		},
		
	}
</script>

<style lang="scss" scoped>
	@import "./style";
</style>
