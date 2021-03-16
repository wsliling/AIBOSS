<template>
	<view class="deal-item-box">
		<view class="mainList-item" :class="[dealItem.active ? '' : 'my-bg-gary']">
			<!-- <view @click="clickCheck(dealItem,index2)" class="mainList-item-left"> -->
			<!-- <view @tap="clickCheck(dealItem,index2)" class="mainList-item-left"> -->
			<view class="mainList-item-left">
				<!-- <checkbox @change='change' value="r2" class="radio" /> -->
				<!-- <view @tap="clickCheck(dealItem,index2)" class="mainList-item-left-yuan" :class="[selectClist.indexOf(dealItem.CurrencyId) != -1 ? 'active' : '']"> -->
				<!-- <view class="mainList-item-left-yuan" :class="[selectClist.indexOf(dealItem.CurrencyId) != -1 ? 'active' : '']"> -->
				<!-- <view class="mainList-item-left-yuan" :class="[dealItem.active ? 'active' : '']">
					<view class="iconfont icon-dui">
					</view>
				</view> -->
				<!-- <image class="" :src="dealItem.Logo" mode="widthFix"></image> -->
				<!-- <image :lazy-load='lazyLoad' class="" :src="dealItem.Logo" mode="aspectFit"></image> -->
				<!-- <image class="" :src="dealItem.Logo" mode="aspectFit"></image> -->
				<view class="image">
					<easy-loadimage mode="aspectFit" :scroll-top="scrollTop" :image-src="dealItem.Logo"></easy-loadimage>
				</view>
		
			</view>
			<view @tap='toDealDetail(dealItem)' class="mainList-item-right border-bottom-1">
				<view class="coin-logo">
		
				</view>
				<view class="my-centent">
					<view class="mainList-item-left-content-top">
						<view class="text fs-18">
							{{ dealItem.Name }}
						</view>
						<!-- v-if="selectClist.indexOf(dealItem.CurrencyId) != -1" -->
						<!-- <view class="icon fs-15" v-if="selectClist.indexOf(dealItem.CurrencyId) != -1 &&dealItem.Type != null"> -->
						<!-- <view class="icon fs-15" v-if="selectClist.indexOf(dealItem.CurrencyId) != -1 && dealItem.Type != null && dealItem.myTypeName != ''"> -->
						<view class="icon button-theme-bg-color leixing" v-if="dealItem.active && dealItem.myTypeName.length">
							<!-- {{ dealItem.Type | TradingTypeName }} -->
							{{ dealItem.myTypeName }}
						</view>
					</view>
					<view class="mainList-item-left-content-bottom fs-14" :class="[dealItem.active ? '' : 'my-bg-gary']">
						<!-- 数量:{{ dealItem.EtcAmount }} -->
						<!-- <view v-if="isShowAllProfit || dealItem.order == null" class="text"> -->
						<view class="text">
							总数量:
							<!-- </br> -->
							{{ dealItem.EtcAmount | four(8) }}
						</view>
						<!-- <view v-else class="text">
							最后一仓数量:</br>
							{{ dealItem.order.EtcAmount | four(8) }}
						</view> -->
						<!-- <view class="text">
							总金额:{{ dealItem.EtcUsdt | four }}
						</view> -->
					</view>
				</view>
				<view class="mainList-item-right-top-bottom-box">
					<!-- <view class="mainList-item-right-top bg-gray"> -->
					<!-- <view class="mainList-item-right-top fs-17" :class="[selectClist.indexOf(dealItem.CurrencyId) != -1 ? '' : 'bg-gray']"> -->
					<view  v-if="isShowAllProfit || dealItem.order == null" class="mainList-item-right-top fs-17" :class="[dealItem.active ? '' : 'bg-gray',dealItem.EtcPercent < 0 ?  'bg-red' : 'bg-green']">
						<!-- {{ dealItem.EtcAmount == 0 ? '0' : dealItem.EtcProfit / dealItem.EtcAmount }}% -->
						<!-- {{ dealItem.EtcPercent | four(2) }}% -->
						{{ dealItem.EtcPercent | four(2) }}%
					</view>
					<view  v-else class="mainList-item-right-top fs-17" :class="[dealItem.active ? '' : 'bg-gray',dealItem.order.EtcPercent < 0 ?  'bg-red' : 'bg-green']">
						<!-- {{ dealItem.EtcAmount == 0 ? '0' : dealItem.EtcProfit / dealItem.EtcAmount }}% -->
						<!-- {{ dealItem.EtcPercent | four(2) }}% -->
						{{ dealItem.order.EtcPercent | four(2) }}%
					</view>
					<!-- <view v-if="isShowAllProfit || dealItem.order == null" class="mainList-item-right-bottom fs-14"> -->
					<view class="mainList-item-right-bottom fs-14">
						预计盈利:
						<!-- </br> -->
						{{ dealItem.EtcProfit  | four }}		
						<!-- 预计盈利:{{ dealItem.EtcProfit  | four(6) }}		 -->
						<!-- 预计盈利:{{ dealItem.EtcProfit }} -->
						<!-- 预计盈利:{{ dealItem.EtcProfit }} -->
					</view>
					<!-- <view v-else class="mainList-item-right-bottom fs-14">
						最后一仓预计盈利:</br>
						{{ dealItem.order.EtcProfit  | four }}		
					</view> -->
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

<style scoped>
	@import url("./style");
	.deal-item-box {
		width: 100%;
	}
</style>
