<template>
	<view>
		<header-bar :title="title" titleTintColor="#fff" :bgColor='bgColor' :center='center' :isBack="true">
			<view @tap="goBack" slot="back" class="uni_btnIco iconfont icon-xiaoyufuhao"></view>
			<view slot="string">
				<view @click="clickSave" class="save-view">
					确认
				</view>
			</view>
		</header-bar>
		<view class="big-box">
			<view class="item fs-18">
				<view class="item-left">
					<view class="iconfont icon-qian">
					</view>
					<view class="">
						本金预算
					</view>
				</view>
				<view class="item-right">
					<input v-model="usdt" type="digit" placeholder="请输入预算" />
					<view class="unit">
						USDT
					</view>
				</view>

			</view>
			<view class="item fs-18">
				<view class="item-left">
					<view class="iconfont icon-dengpao">
					</view>
					<view class="">
						策略类型
					</view>
				</view>
				<view @tap='clickSelectStrategy' class="item-right">
					<!-- <view class="gary"> -->
					<view class="" :class="[leixing.name? '' : 'gary']">
						{{ leixing.name ? leixing.name : '请选择' }}
					</view>
					<view class="iconfont icon-dayuhao" :class="[leixing.length ? '' : 'gary']">

					</view>
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
				
				userId: '',
				token: '',
				
				bgColor: {
					'background': 'linear-gradient(90deg, #02D48E, #17B580)',
				},
				// title: '开通',
				title: '选择策略',
				center: true,
				isBack: true,
				
				usdt: '',
				leixing: '',
				
				timer: null

			}
		},
		components: {

		},
		onLoad(e) {
			
		},
		onShow() {
			// console.log('aathis.$store.state.leixing',this.$store.state.leixing)
			// this.leixing = this.$store.state.leixing
			let  FirstAmount  = uni.getStorageSync('myFirstAmount')
			// console.log(FirstAmount,Number(FirstAmount))
			this.usdt = FirstAmount ? Number(FirstAmount) : ''
			this.leixing = uni.getStorageSync('myleixing')
		},
		methods: {
			// 开通自定义
			clickKaitong() {
				let obj = {
					isEdit: 0
				}
				navigate('lianghuaSon/kaitong/index', obj)
			},
			clickSelectStrategy() {
				navigate('lianghuaSon/selectStrategy/index')
			},
			// 返回按钮
			goBack() {
				uni.navigateBack()
			},
			// 点击确认
			async clickSave() {
				if(this.usdt.length == 0) {
					toast('请输入预算')
					return
				}
				if(this.leixing.length == 0) {
					toast('请选择策略')
					return
				}
				// 设置默认策略请求
					this.userId = uni.getStorageSync('userId')
					this.token = uni.getStorageSync('token')
					
				let obj = {
						UserId: this.userId,
						Token: this.token,
						TypeId: 3, // 平台类型：现在写死为 3(火币网) 即可
						FirstAmount:  this.usdt, // 首单金额
						DefaultStrategyId: this.leixing.id // 策略模版id
				}
				let res = await post('User/SetDefaultStrategy',obj)
				
				if(res.code != 0)  {
					return
				}
				uni.setStorageSync('myFirstAmount',this.usdt)
				uni.setStorageSync('myleixing',this.leixing)
				toast(res.msg)
				this.timer = setTimeout(() => {
					uni.navigateBack()
				}, 2000)
				this.$once('hook:beforeDestroy', () => {
					clearInterval(this.timer);
					this.timer = null;
				})
				
				
				
			},
			// 点击修改策略,是编辑
			clickUserDefinedItem() {
				let obj = {
					isEdit: 1
				}
				navigate('lianghuaSon/userDefined/index', obj)
			},
			// 网络请求start
			myStrategy() {

			}
			// 网络请求end


		}
	}
</script>
<style lang="scss" scoped>
	@import "./style";
</style>
