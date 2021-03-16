<template>
	<view class="big-box"  :style="'height:' +pageHeight1+'px'">
		<view class="headerTab  fs-17">
			<!-- <view class="tab-item" v-for="(item,index) in tabList" :key='index'>
				<text class="tab-btn" :class="currentIndex == index ? 'active' : ''" @click="clickTab(index)">{{ item.title }}</text>
			</view> -->
			<view class="tab-item">
				<text class="tab-btn fs-22" :class="currentIndex == 0 ? 'active' : ''" @tap="clickTab(0)">充币</text>
			</view>
			<view class="tab-item">
				<text class="tab-btn fs-22" :class="currentIndex == 1 ? 'active' : ''" @tap="clickTab(1)">转换</text>
			</view>
		</view>
		<view class="timer">
			<picker mode="date" fields="month" @cancel="cancelSelect" :value="date" @change="bindDateChange" :end="myNowDate">
				<view class="timebox" @click="selectTime">
					<text class="fs-18">{{ date }}</text>
					<text class="iconfont" :class="isOpen ? 'icon-xiangshang1' : 'icon-xiangxia'"></text>
				</view>
			</picker>
		</view>
		<swiper class="swiper" :current="currentIndex" @change="swiperChange" :style="'height:' +pageHeight+'px'">
			<!-- <swiper-item v-for="(item,index) in tabList" :key='index'  style="height: calc(100vh - 100upx);"> -->
			<swiper-item v-for="(item,index) in tabList" :key='index'>
				<scroll-view scroll-y="true" class="main"  :refresher-enabled='true' v-if='tabList[currentIndex].length > 0' @refresherrefresh='refresherrefresh' :refresher-triggered='refresherTriggered' :refresher-threshold='200' @scrolltolower='scrolltolower'  :style="'height:' +pageHeight+'px'">
					<view class="main-item" v-for="(item2,index2) in tabList[currentIndex]" :key='index2'>
						<view class="item-left">
							<view class="left-top one-line fs-20">
								{{ item2.title }}
							</view>
							<view class="left-bottom  fs-15">
								{{ item2.addtime }}
							</view>
						</view>
						<!-- 0: 收入 1: 支出 -->
						<view class="item-right  fs-20" :class="[item2.direction == 0 ? 'fzcolorgreen' : 'fzcolorred']">
							{{ item2.direction == 0 ? '+' : '-' }}{{ item2.money  | four}}
						</view>
					</view>
					
					<!-- <view class="mt90"> -->
					<view class="">
						<!-- <uni-load-more v-if="tabList.length > 0  && loadMore !== 0" :loadingType="loadMore"></uni-load-more> 
						<not-data  v-if='tabList.length == 0'></not-data>
						-->
						 <uni-load-more v-if="tabList[currentIndex].length > 0  && loadMore0 !== 0 && currentIndex == 0" :loadingType="loadMore0"></uni-load-more> 
						 <uni-load-more v-if="tabList[currentIndex].length > 0  && loadMore1 !== 0 && currentIndex == 1" :loadingType="loadMore1"></uni-load-more>
					</view>
				</scroll-view>
				<not-data  v-if='tabList[currentIndex].length == 0'></not-data>
			</swiper-item>
		</swiper>
		
		<!-- <my-showModal ref='modal' @success='modalSuccess' :title='title' :content='content'></my-showModal> -->
		
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
	import { GetUSDTRecordPageList } from '@/common/js/http.js'
	export default {
		props: ['LcList'],
		data() {
			return {
				
				customBar: this.customBar,
				statusBarH: this.statusBar,
				
				loadMore0: 0, // 0-loading前；1-loading中；2-没有更多了
				loadMore1: 0, // 0-loading前；1-loading中；2-没有更多了
				
				PageIndex: 1,
				PageIndex0: 1,
				PageIndex1: 1,
				PageSize: 12,
				
				refresherTriggered: false,
				timer: null,
				timer2: null,

				currentIndex: 0,
				isOpen: false,
				date: '',

				Year: '',
				Month: '',

				tabList: [[],[]],

				// 弹窗
				title: '',
				content: '?',
				myNowDate: ''
				
			};
		},
		mounted() {

		},
		onShow() {
			this.getPageHeight()
			this.myReset()
			this.tabList = [[],[]]
			this.PageIndex0 = 1
			this.PageIndex1 = 1
			
			this.loadMore0 = 0
			this.loadMore1 = 0
			
			this.reset()
			this.init()
		},
		methods: {
			getPageHeight() {
				this.pageHeight1 = uni.getSystemInfoSync().windowHeight -50 -15; // 减去可视窗口除swiper的盒子的高度即为swiper高度
				// this.pageHeight = uni.getSystemInfoSync().windowHeight - this.customBar - this.statusBarH - -50 - 15 - 44; // 减去可视窗口除swiper的盒子的高度即为swiper高度
				this.pageHeight = uni.getSystemInfoSync().windowHeight  -50 -45; // 减去可视窗口除swiper的盒子的高度即为swiper高度
			},
			myReset() {
				let data = new Date()
				let mon = data.getMonth()+1
				let month = mon <10 ? '0'+mon : mon
				this.myNowDate = data.getFullYear()+"-"+month
			},
			modalSuccess(e) {
				// console.log('e',e)
				if (!e) {
					return
				}
				// console.log('点击确定')
				// navigate('updatePayPassword/updatePayPassword')
				navigate(this.modalSuccessUrl)
			},
			reset() {
				let data = new Date()
				let mon = data.getMonth() + 1
				let month = mon < 10 ? '0' + mon : mon
				this.date = data.getFullYear() + "-" + month
				this.Month = month
				this.Year = data.getFullYear()
				// console.log(this.Month)
				// console.log(this.Year)

			},
			getList() {
				let params = {
					PageIndex: this.PageIndex,
					Year: +this.date.split('-')[0],
					Month: +this.date.split('-')[1],
					Type: this.currentIndex + 1
				}
				this.$emit('getLcList', params)
			},
			clickTab(index) {
				// this.reset()
				// this.PageIndex = 1
				this.currentIndex = index
				console.log('this.currentIndex:',this.currentIndex)
			},
			swiperChange(e) {
				this.reset()
				this.currentIndex = e.detail.current
				
				// 初始化
				this.tabList = [[],[]]
				this.PageIndex0 = 1
				this.PageIndex1 = 1
				
				this.loadMore0 = 0
				this.loadMore1 = 0
				
				this.getUSDTRecordPageLists()
				// this.getList()
			},
			selectTime() {
				this.isOpen = !this.isOpen
			},
			bindDateChange(e) {
				// 初始化
				
				this.tabList = [[],[]]
				this.PageIndex0 = 1
				this.PageIndex1 = 1
				
				this.loadMore0 = 0
				this.loadMore1 = 0
				
				this.date = e.target.value
				this.Year = e.target.value.split('-')[0]
				this.Month = e.target.value.split('-')[1]
				console.log(e)
				this.isOpen = !this.isOpen
				// this.getList()
				this.init()
			},
			cancelSelect() {
				this.isOpen = !this.isOpen
			},
			// 初始化
			init() {
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				this.getUSDTRecordPageLists()
			},
			// 获取USDT提现,充值记录
			async getUSDTRecordPageLists() {
				let myPageIndex = 'PageIndex' + this.currentIndex
				let obj = {
					UserId: this.userId,
					Token: this.token,
					Year: this.Year,
					Month: this.Month,
					Type: this.currentIndex + 1,
					PageIndex: this[myPageIndex],
					PageSize: this.PageSize
				}
				// console.log(obj)
				let { data } = await GetUSDTRecordPageList(obj)
				
				this.refresherTriggered = false
				// 未授权
				if(data.code == 9) {
					console.log('1111212')
					// uni.showModal({
					// 	title:'api未授权',
					// 	content:'是否跳转到授权页面？',
					// 	icon: 'none',
					// 	cancelColor:'#999',
					// 	confirmColor:'#16B680',
					// 	success:(res)=>{
					// 	  if(res.confirm){
					// 	    navigate('apiLetter/apiLetter')
					// 	  }
					// 	}
					// })
					this.title = 'API未授权',
					this.content = '是否跳转到授权页面?'
					this.modalSuccessUrl = 'apiLetter/apiLetter'
					uni.showModal({
					    title: this.title,
					    content: this.content,
					    success: (res) => {
					        if (res.confirm) {
					            this.modalSuccess(true)
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
					//this.$refs.modal.open()
				}
				if (data.code != 0) return 
				
				// uni.showToast({
				// 	title: data.msg,
				// 	icon: 'none',
				// 	duration: 2000
				// })
				data.data = data.data || []
				if(this.currentIndex == 0 && data.data.length == 0) {
					this.loadMore0 = 2
				}else if(this.currentIndex == 1 && data.data.length == 0) {
					this.loadMore1 = 2
				}
				this.tabList[this.currentIndex].push(...data.data)
				
			},
			// 滚动条start
			// 上拉刷新
			refresherrefresh() {
				if(this.refresherTriggered) return
				this.refresherTriggered = true
				// 初始化
				this.tabList = [[],[]]
				this.PageIndex0 = 1
				this.PageIndex1 = 1
				this.loadMore0 = 0
				this.loadMore1 = 0
				this.getUSDTRecordPageLists()
			},
			scrolltolower() {
				if(this.currentIndex == 0 && this.loadMore0 == 2) {
					return
				}else {
					this.PageIndex0++
				}
				if(this.currentIndex == 1 && this.loadMore1 == 2) {
					return
				}else {
					this.PageIndex1++
					this.getUSDTRecordPageLists()
				}
			}
		}
	}
</script>

<style scoped>
	.big-box {
		height: 100vh;
		overflow: hidden;
	}
	.mt90 {
		margin-top: 90upx;
	}
	.headerTab {
		height: 90upx;
		width: 100vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32upx;
		/* #ifdef APP-PLUS */
/* 		position: fixed;
		left: 0;
		top: 0; */
		/* #endif */
	}

	.headerTab .tab-item {
		width: 50%;
		text-align: center;
	}

	.headerTab .tab-item .tab-btn {
		height: 90upx;
		line-height: 90upx;
		display: inline-block;
		position: relative;
		z-index: 6;
	}

	.active {
		border-bottom: 5upx solid #4387ea;
		color: #4387ea;
	}

	.timer {
		/* #ifdef APP-PLUS */
/* 		position: fixed;
		left: 0;
		top: 90upx; */
		/* #endif */
		width: 750upx;
		height: 100upx;
		box-sizing: border-box;
		padding-left: 30upx;
		background-color: #f7f6fb;
		display: flex;
		align-items: center;
		z-index: 6;
	}

	.timer .timebox {
		background-color: #FFFFFF;
		padding: 10upx;
		color: #999999;
	}

	.main-item {
		height: 130upx;
		width: 690upx;
		margin: 0 auto;
		border-bottom: 1px solid #ececec;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.main-item .item-left {
		word-break: break-all;
		width: 500upx;
	}
	.one-line {
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
	.main-item .item-right {
		flex-shrink: 0;
	}
	.main-item .item-left .left-top {
		font-weight: bold;
		font-size: 30upx;
	}

	.main-item .item-left .left-bottom {
		color: #999999;
		font-size: 20upx;
		margin-top: 10upx;
	}

	.fzcolorgreen {
		color: #4387ea;
	}

	.fzcolorred {
		color: #FF0000;
	}

	.swiper {
		/* height: calc(100vh - 300upx); */
		height: calc(100vh - 200upx);
	}

	.swiper .main {
		height: 100%;
	}

	.red-bg {
		width: 100vw;
		height: 100vh;
		background-color: #ffcde1;
	}
.empty-box {
	width: 750upx;
}
.empty-box .empty-img {
	width: 300upx;
	height: 220upx;
	display: block;
	margin: 200upx auto 0upx;
}
.empty-box .text {
	margin-top: 38upx;
	font-size: 28upx;
	color: #999999;
	text-align: center;
}
/* 	.main {
		height: calc(100vh - 100upx);
	} */
</style>
