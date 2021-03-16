<template>
	<view>
		<!-- <view v-if="1">
			<view class="item" v-for="(item,index) in 6" :key='index'>
				<view class="item-top fs-22">
					2020-09-02
				</view>
				<view class="item-bottom">
					<view class="content">
						<view class="content-item-wrapper">
							<block  v-for="(item2,index2) in 6" :key='index2'>
								<view class="content-item">
									<text class="time content-item-left">10:10:10</text>
									<text class="content-item-right" :class="[ item2.isRed ? 'text-red' : '']">大号打哈哈</text>
								</view>
								<view :class="[index2 % 3 != 0 || index2 == 0  ? '' : 'border1-bottom']">
								</view>
							</block>
						</view>
					</view>
				</view>
			</view>
		</view> -->
		<view v-if="list.length>0">
			<view class="item" v-for="(item,index) in list" :key='index'>
				<view class="item-top" v-if="list[index-1] ? item.date != list[index-1].date : true">
				<!-- <view class="item-top" :class="[list[index-1] ? (item.date != list[index-1].date ? '' : 'no-date') : '']"> -->
					<!-- 2020-09-02 -->
					{{ item.date }}
				</view>
				<view class="item-bottom"  :class="[list[index-1] ? (item.date != list[index-1].date ? '' : 'no-date') : '']">
					<view class="content">
						<view class="content-item-wrapper">
							
								<view class="content-item">
									<text class="time content-item-left">{{ item.time }} </text>
									<text class="content-item-right" :class="[ item.isRed ? 'text-red' : '']">{{ item.content }}</text>
								</view>
							
									<!-- :key='index2'  :class="[index2 != (item.recordList.length -1) ? '' : 'border1-bottom']"> -->
							<!-- <block  v-for="(item2,index2) in item.recordList" :key='index2'>
								<view class="content-item">
									<text class="time content-item-left">{{ item2.time }} </text>
									<text class="content-item-right" :class="[ item2.isRed ? 'text-red' : '']">{{ item2.content }}</text>
								</view>
								<view :class="[index2 % 3 != 0 || index2 == 0  ? '' : 'border1-bottom']">
								</view>
							</block> -->
							<view :class="[index % 3 != 0 || index == 0  ? '' : 'border1-bottom']">
							</view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		<uni-load-more  v-if="list.length>0" :loadingType="loadMore"></uni-load-more>
		
		<view v-if="list.length == 0 && loadMore == 2">
			<not-data></not-data>
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
	import notData from '@/components/not-data/not-data.vue'
	export default {
		data() {
			return {
				loadMore: 0,
				userId: '',
				token: '',
				list: [],
				PageIndex: 1,
				PageSize: 12,
			}
		},
		components:{
			notData
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				this.loadMore = 0
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				this.getTradeLogList()
			},
			async getTradeLogList() {
				let obj = {
					UserId: this.userId,
					Token: this.token,
					PageIndex: this.PageIndex,
					PageSize: this.PageSize,
				}
				// let res = await post('User/GetTradeLogList', obj)
				let res = await post('User/GetTradeLogPageList', obj)
				// this.loadMore = 2
				if (res.code != 0) return
				res.data = res.data ? res.data : [];
				if(res.data < this.PageSize) {
					this.loadMore = 2
				}
				let tempArr = res.data.map((item, index) => {
					// item.recordList.map((item2, index2) => {
					// 	if (item2.content.indexOf('失败') != -1 || item2.content.indexOf('error') != -1 || item2.content.indexOf('不足') != -1) {
					// 		this.$set(item2, 'isRed', true)
					// 	} else {
					// 		this.$set(item2, 'isRed', false)
					// 	}
					// 	return item2
					// })
					if (item.content.indexOf('失败') != -1 || item.content.indexOf('error') != -1 || item.content.indexOf('不足') != -1) {
						this.$set(item, 'isRed', true)
					} else {
						this.$set(item, 'isRed', false)
					}
					return item
				})
				this.list = [...this.list,...tempArr]

			},
		},
		// 上拉加载更多
		onReachBottom() {
			console.log('到底了')
			if (
				this.loadMore === 2
			) return;
			this.PageIndex++
			this.getTradeLogList()
			// if(this.isLoad) {
			// 	this.PageIndex++
			// 	this.getTradeLogList()
			// }
		}
	}
</script>

<style lang="scss" scoped>
	/* @import url("./style"); */
	@import "./style";
</style>
