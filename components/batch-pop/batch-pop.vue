<template>
	<view class="">
		<uni-popup ref='popup' type="bottom">
			<view class="popup-box" :class="[isSearch ? 'is-search' : '']">
				<view class="popup-box-title">
					<view class="popup-box-title-left fs-18">
						当前账户剩余USDT：{{ surplusUsdt | four }}
					</view>
					<view @tap="closePop" class="popup-box-title-right theme-color">
						×
					</view>
				</view>
				<!-- 策略循环 --> 
				<view class="popup-box-content">
					<view class="popup-box-content-item button-theme-bg-color" :class="[paternBtn == item.id ? '' : 'active']" @tap="switchChange(item,index)" v-for="(item,index) in list" :key='index'>
						<image class="img" src="/static/jiaoyi/jixu.png" mode="widthFix"></image>
						<view class="text">
							{{ item.name }}
						</view>
					</view>
				</view>
				<!-- <view class="popup-box-content">
					<view class="popup-box-content-item" :class="[paternBtn == 1 ? '' : 'active']" @tap="switchChange(1)">
						<image class="img" src="/static/jiaoyi/jixu.png" mode="widthFix"></image>
						<view class="text">
							继续策略循环
						</view>
					</view>
					<view class="popup-box-content-item" :class="[paternBtn == 2 ? '' : 'active']" @tap="switchChange(2)">
						<image class="img" src="/static/jiaoyi/danci.png" mode="widthFix"></image>
						<view class="text">
							执行单次策略
						</view>
					</view>
					<view class="popup-box-content-item" :class="[paternBtn == 3 ? '' : 'active']" @tap="switchChange(3)">
						<image class="img" src="/static/jiaoyi/zanting.png" mode="widthFix"></image>
						<view class="text">
							暂停策略循环
						</view>
					</view>
					<view class="popup-box-content-item" :class="[paternBtn == 4 ? '' : 'active']" @tap="switchChange(4)">
						<image class="img" src="/static/jiaoyi/qingcang.png" mode="widthFix"></image>
						<view class="text">
							清仓卖出
						</view>
					</view>
				</view> -->
			</view>
		</uni-popup>

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
		props: {
			surplusUsdt: {
				type: Number,
				default: 0
			},
			paternBtn: {
				type: Number,
				default: 0
			},
			isSearch: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				list: [{
						name: '继续策略循环',
						id: 1,
						logo: '/static/jiaoyi/jixu.png'
					},
					{
						name: '执行单次策略',
						id: 2,
						logo: '/static/jiaoyi/danci.png'
					},
					{
						name: '暂停策略循环',
						id: 3,
						logo: '/static/jiaoyi/zanting.png'
					},
					{
						name: '清仓卖出',
						id: 4,
						logo: '/static/jiaoyi/qingcang.png'
					},

				]
			}
		},
		methods: {
			goPage(url) {
				console.log('跳转到:' + url)
				let obj = {
					src: url
				}
				if (!url) return
				// console.log(url)
				navigate('ad/index', obj)
			},
			
			toDealDetail(item) {
				uni.navigateTo({
					url: `/pages/dealSon/dealDetail/index?CurrencyId=${item.CurrencyId}&Type=${item.Type}`
				})
				//navigate('dealSon/dealDetail/index')
			},
			// 打开弹窗
			// openBatchPop() {
			open() {
				this.$refs.popup.open()
			},
			closePop() {
				this.$refs.popup.close()
			},
			close() {
				this.$refs.popup.close()
			},
			switchChange(item,index){
				this.$emit("changeModel", item.id);
			}
		}
	}
</script>

<style scoped>
	@import url("./style");

	.deal-item-box {
		width: 100%;
	}
</style>
