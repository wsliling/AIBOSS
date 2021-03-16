<template>
	<view class="deal-item-box">
		<view class="mainList-item" :class="[dealItem.active ? '' : 'my-bg-gary']">

			<view class="mainList-item-left">
	
				<view class="image">
					<easy-loadimage mode="aspectFit" :scroll-top="scrollTop" :image-src="dealItem.Logo"></easy-loadimage>
				</view>
		
			</view>
			<view @tap='toDealDetail(dealItem)' class="mainList-item-right border-bottom-1">
				<view class="coin-logo">
		
				</view>
				<!-- 名字和百分比 -->
				<view class="coin-name-baifenbi">
					<view class="coin-name-baifenbi-left">
						<view class="coin-name text fs-18">
							{{ dealItem.Name }}
						</view>
						
						<view class="button-theme-bg-color leixing2" v-if="dealItem.active && dealItem.myTypeName.length">
							{{ dealItem.myTypeName }}
						</view>
					</view>

					<view class="coin-name-baifenbi-right">
						<view  v-if="isShowAllProfit || dealItem.order == null" class="mainList-item-right-top fs-17" :class="[dealItem.active ? '' : 'bg-gray',dealItem.EtcPercent < 0 ?  'bg-red' : 'bg-green']">
							{{ dealItem.EtcPercent | four(2) }}%
						</view>
						<view  v-else class="mainList-item-right-top fs-17" :class="[dealItem.active ? '' : 'bg-gray',dealItem.order.EtcPercent < 0 ?  'bg-red' : 'bg-green']">
							
							{{ dealItem.order.EtcPercent | four(2) }}%
						</view>
					</view>
					
					
					
					
				</view>
				<!-- 总数量和盈利 -->
				<view class="shuliang-yingli">
					<!-- <view class="mainList-item-left-content-bottom fs-14" :class="[dealItem.active ? '' : 'my-bg-gary']"> -->
					<view class="shuliang fs-14" :class="[dealItem.active ? '' : 'my-bg-gary']">
							总数量:
							<!-- {{ dealItem.EtcAmount | four(8) }}123456789123456789 -->
							{{ dealItem.EtcAmount  | four13(8) }}
					</view>
					<!-- <view class="mainList-item-right-bottom fs-14"> -->
					<view class="yingli fs-14">
						预计盈利:
						<!-- {{ dealItem.EtcProfit  | four }}123456789123456789 -->
						{{ dealItem.EtcProfit  | four10 }}
					</view>
				</view>
				
				
				
				
				<!-- <view class="my-centent">
					<view class="mainList-item-left-content-top">
						<view class="text fs-18">
							{{ dealItem.Name }}
						</view>
						
						<view class="icon button-theme-bg-color leixing" v-if="dealItem.active && dealItem.myTypeName.length">
							
							{{ dealItem.myTypeName }}
						</view>
					</view>
					<view class="mainList-item-left-content-bottom fs-14" :class="[dealItem.active ? '' : 'my-bg-gary']">
						
						<view class="text">
							总数量:
							
							{{ dealItem.EtcAmount | four(8) }}
						</view>
						
					</view>
				</view> -->
				<!-- <view class="mainList-item-right-top-bottom-box">
					
					<view  v-if="isShowAllProfit || dealItem.order == null" class="mainList-item-right-top fs-17" :class="[dealItem.active ? '' : 'bg-gray',dealItem.EtcPercent < 0 ?  'bg-red' : 'bg-green']">
					
						{{ dealItem.EtcPercent | four(2) }}%
					</view>
					<view  v-else class="mainList-item-right-top fs-17" :class="[dealItem.active ? '' : 'bg-gray',dealItem.order.EtcPercent < 0 ?  'bg-red' : 'bg-green']">
						
						{{ dealItem.order.EtcPercent | four(2) }}%
					</view>
					
					<view class="mainList-item-right-bottom fs-14">
						预计盈利:
						
						{{ dealItem.EtcProfit  | four }}		
						
					</view>
					
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
		props: {
			dealItem: {
				type: Object,
				default: ()=>{
					return {}
				}
			},
			scrollTop: {
				type: Number,
				default: 0
			},
			isShowAllProfit: {
				type: Boolean,
				default: true
			}
		},
		created() {
			// console.log('创建了')
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
		}
	}
</script>

<style lang="scss" scoped>
	// @import url("./style");
	// @import url("./style.scss");
	@import "./style.scss";
	// @import './style';
	.deal-item-box {
		width: 100%;
	}
</style>
