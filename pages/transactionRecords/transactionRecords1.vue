<template>
	<view>
		<view :style="{paddingTop: customBar + 20 + 'upx' }" class="header-tab">
			<view class="tab-icon iconfont icon-xiaoyufuhao" @click="back">

			</view>
			<view class="tab-center">
				交易记录
			</view>
			<view @click="openDrawer" class="tab-icon iconfont icon-shaixuan1">

			</view>
		</view>
		<view class="tabMenu" :style="{top: customBar + 20 + 25 + 40 + 'upx' }">
			<view class="tabMenu-item" @click="clickTab(0)" :class="currentIndex == 0 ? 'active' : ''">
				全部
			</view>
			<view class="tabMenu-item" @click="clickTab(1)" :class="currentIndex == 1 ? 'active' : ''">
				买入
			</view>
			<view class="tabMenu-item" @click="clickTab(2)" :class="currentIndex == 2 ? 'active' : ''">
				卖出
			</view>
		</view>
		<!-- <view class="red-bgg"   style="height: calc(100vh - 100upx - 40upx -50upx -60upx);"> -->
		<!-- <view class="red-bgg"   style="height: calc(100vh - 350upx);">
			
		</view> -->
				<swiper :current="currentIndex" @change="swiperChange" class="swiper" style="height: calc(100vh - 350upx);"  @transition='swiperTransition'>
		<!-- <swiper :current="currentIndex" @change="swiperChange" class="swiper" style="height: 100upx;"> -->
		<!-- <swiper :current="currentIndex" @change="swiperChange" class="swiper" :style="{height:  (404 + 20 + 10) * (tabList[currentIndex].list.length) + 'upx'}" @transition='swiperTransition'> -->

			<swiper-item v-for="(item,index) in tabList" :key='index' style="height: calc(100vh - 350upx);">
			<!-- <swiper-item v-for="(item,index) in tabList" :key='index'> -->
				<scroll-view scroll-y="true" class="swiperbox" :refresher-enabled='refresherEnabled' @refresherrefresh='refresherrefresh'
				 :refresher-triggered='refresherTriggered' @refresherrestore="refresherrestore" style="height: calc(100vh - 350upx);"
				 @scroll="scroll" :refresher-threshold='refresherThreshold'  @scrolltolower='scrolltolower' >
				<!-- <scroll-view scroll-y="true" class="swiperbox"   style="height: calc(100vh - 370upx);"> -->
				<!-- <view class="swiperbox" > -->
					<!-- 	<scroll-view scroll-y="true" class="swiperbox" @scrolltolower='scrolltolower' 
				 @scrolltoupper ='scrolltoupper'  style="height: calc(100vh - 350upx);" :show-scrollbar='true'> -->
				 
					<view class="box" v-for="(item2,index2) in tabList[currentIndex].list" :key='index2'  >
						<view class="box-top">
							<view class="top-left">
								<image :src="item2.logo" mode="aspectFit" class="img"></image>
								<view class="text">
									<view class="text-top">
										{{ item2.type == 1 ? '买入' : '售出'}}{{ item2.title }}
									</view>
									<view class="text-bottom mt">
										{{ item2.orderId }}
									</view>
								</view>
							</view>
							<view class="top-right">
								<view>
									{{ item2.addtime }}
								</view>
								<view class="mt">
									{{ item2.from }}
								</view>
							</view>
						</view>
						<view class="box-bottom">
							<view class="box-bottom-item">
								<view class="item-top">
									{{ item2.amount}}
								</view>
								<view class="item-bottom">
									卖出数量
								</view>
							</view>
							<view class="box-bottom-item">
								<view class="item-top">
									{{ item2.avgPrice}}
								</view>
								<view class="item-bottom">
									卖出均价
								</view>
							</view>
							<view class="box-bottom-item">
								<view class="item-top">
									{{ item2.money}}
								</view>
								<view class="item-bottom">
									卖出金额
								</view>
							</view>
							<view class="box-bottom-item">
								<view class="item-top">
									{{ item2.fee}}
								</view>
								<view class="item-bottom">
									手续费
								</view>
							</view>
							<view class="box-bottom-item">
								<view class="item-top" :class="[item2.incomeIsRed ? 'text-red' : 'text-green']">
									{{ item2.income }} USDT
								</view>
								<view class="item-bottom">
									卖出收益
								</view>
							</view>
							<view class="box-bottom-item">
								<view class="item-top" :class="[item2.incomeRatioIsRed ? 'text-red' : 'text-green']">
									{{ item2.incomeRatio }}%
								</view>
								<view class="item-bottom">
									卖出收益比
								</view>
							</view>
						</view>
					</view>
					<not-data v-if='tabList[currentIndex].list.length == 0  && tabList[currentIndex].loadMore === 2'></not-data>
					<uni-load-more v-if="tabList[currentIndex].list.length > 0  && tabList[currentIndex].loadMore !== 0" :loadingType="tabList[currentIndex].loadMore"></uni-load-more>


					</scroll-view>
				<!-- </view> -->
				
			</swiper-item>
		</swiper>
		<!-- 合计底部 -->
		<view class="foot-box">
			<view class="foot-left">
				<!-- 合计盈利：<text class="text-green">1063.057 USDT</text> -->
				合计盈利：<text :class="[ tabList[currentIndex].tongjiObj.tongjiIncomeIsRed ? 'text-red' : 'text-green']">
					{{ tabList[currentIndex].tongjiObj.income }} USDT</text>
			</view>
			<view class="foot-right">
				<!-- 交易盈利856单 -->
				交易盈利{{ tabList[currentIndex].tongjiObj.count }}单
			</view>
		</view>
		<!-- 弹窗 -->
		<uni-popup ref='drawerPop' type='right'>
			<view :style="{paddingTop: customBar + 20 + 'upx' }" class="drawerPop-box">
				<view class="drawerPop-title">
					筛选
				</view>
				<view class="drawerPop-item-wrapper">
					<view class="drawerPop-item">
						<view class="drawerPop-item-title">
							交易所
						</view>
						<view class="drawerPop-item-input">
							<input v-model="Exchange" placeholder="请输入交易所" />
						</view>
					</view>
					<view class="drawerPop-item">
						<view class="drawerPop-item-title">
							定义时间
						</view>
						<view class="time-item-wrapper">
							<view class="drawerPop-item-input my-time">
								<picker mode="date" fields="day" @cancel="cancelSelect($event,0)" :value="date" @change="bindDateChange($event,0)">
									<input class="time-item-input" v-model="StartDatetime" placeholder="开始时间" placeholder-style='color:#cccccc' />
								</picker>
							</view>
							<text>至</text>
							<view class="drawerPop-item-input my-time">
								<picker mode="date" fields="day" @cancel="cancelSelect($event,1)" :value="date" @change="bindDateChange($event,1)">
									<input class="time-item-input" v-model="EndDatetime" placeholder="结束时间" placeholder-style='color:#cccccc' />
								</picker>
							</view>
						</view>
					</view>
				</view>
				<view class="drawerPop-foot">
					<view @click="reset" class="drawerPop-foot-left">
						重置
					</view>
					<view @click="submit" class="drawerPop-foot-right">
						确定
					</view>
				</view>
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
		data() {
			return {
				// 设置自定义下拉刷新阈值,距顶部
				refresherThreshold: 0,
				// 是否开启自定义下拉刷新
				refresherEnabled: true,
				// refresherEnabled: false,
				// 现在滚动组件滚动到哪里 
				oldScroll: 0,
				// 以前的滚动到哪里
				nowScroll: 0,
				userId: '',
				token: '',
				PageIndex: 1,
				PageSize: 12,
				Type: 0, // 类型(0全部, 1:买入, 2: 售出)
				StartDatetime: '', // 开始时间
				EndDatetime: '', // 结束时间
				Exchange: '', // 交易所
				currentIndex: 0,
				customBar: this.customBar,
				exchange: '',
				startTime: '',
				endTime: '',
				date: '',
				timer: null,
				timer2: null,
				tabList: [{
						PageIndex: 1,
						PageSize: 12,
						loadMore: 0, // 0-loading前；1-loading中；2-没有更多了
						Type: 0, // 类型(0全部, 1:买入, 2: 售出)
						list: [],
						scrollTop: 0,
						tongjiObj: {
							count: '',
							income: ''
						},
					},
					{
						PageIndex: 1,
						PageSize: 12,
						loadMore: 0, // 0-loading前；1-loading中；2-没有更多了
						Type: 1, // 类型(0全部, 1:买入, 2: 售出)
						list: [],
						scrollTop: 0,
						tongjiObj: {
							count: '',
							income: ''
						},
					},
					{
						PageIndex: 1,
						PageSize: 12,
						loadMore: 0, // 0-loading前；1-loading中；2-没有更多了
						Type: 2, // 类型(0全部, 1:买入, 2: 售出)
						list: [],
						scrollTop: 0,
						tongjiObj: {
							count: 0,
							income: 0
						},
					},
				],
				refresherTriggered: false,
				clientHeight: 0,
				dx:0,
				isSwiperTransition: false
			}
		},
		onLoad() {
			this.init()
		},
		onShow() {

		},
		methods: {
			init() {
				// this.oldScroll = 0
				this.nowScroll = 0
				this.refresherTriggered = false
				this.tabList = [{
						PageIndex: 1,
						PageSize: 12,
						loadMore: 0, // 0-loading前；1-loading中；2-没有更多了
						Type: 0, // 类型(0全部, 1:买入, 2: 售出)
						list: [],
						scrollTop: 0,
						tongjiObj: {
							count: 0,
							income: 0
						},
					},
					{
						PageIndex: 1,
						PageSize: 12,
						loadMore: 0, // 0-loading前；1-loading中；2-没有更多了
						Type: 1, // 类型(0全部, 1:买入, 2: 售出)
						list: [],
						scrollTop: 0,
						tongjiObj: {
							count: 0,
							income: 0
						},
					},
					{
						PageIndex: 1,
						PageSize: 12,
						loadMore: 0, // 0-loading前；1-loading中；2-没有更多了
						Type: 2, // 类型(0全部, 1:买入, 2: 售出)
						list: [],
						scrollTop: 0,
						tongjiObj: {
							count: 0,
							income: 0
						},
					},
				]
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				this.getTradeRecordPageList(0)
				this.getTradeIncomeStatistics(0)
				this.getTradeRecordPageList(1)
				this.getTradeIncomeStatistics(1)
				this.getTradeRecordPageList(2)
				this.getTradeIncomeStatistics(2)
			},
		
			// 返回
			back() {
				uni.navigateBack()
			},
			clickTab(index) {
				this.currentIndex = index
			},
			swiperChange(e) {
				this.currentIndex = e.detail.current
				// this.isSwiperTransition = false
				console.log('变化了change',this.currentIndex,this.isSwiperTransition)
				this.refresherEnabled = true
			},
			// 	uni.pageScrollTo({
			// 		scrollTop: 99999999999
			// 	})
			swiperTransition(e) {
				// this.isSwiperTransition = true
				this.refresherEnabled = false
				// console.log('这个swiperTransition变化了',e)
				this.dx = e.detail.dx
				// console.log('这个swiperTransition变化了this.dx:',this.dx)
				// let goW = 0
				// if(this.dx < -20) {
				// 	let currentIndex = (this.currentIndex -1) < 0 ? 0 : (this.currentIndex -1)
				// 	console.log('currentIndex',currentIndex)
				// 	goW = this.tabList[currentIndex].scrollTop
				// }
				// if(this.dx > 20) {
				// 	let currentIndex = (this.currentIndex +1) > 2 ? 2 : (this.currentIndex +1) 
				// 	// goW = this.tabList[this.currentIndex +1].scrollTop
				// 	console.log('currentIndex',currentIndex)
				// 	goW = this.tabList[currentIndex].scrollTop
				// }
				// // console.log('goW:',goW)
				// uni.pageScrollTo({
				// 	scrollTop: goW,
				// 	duration: 0
				// })
				// 	// this.tabList[]
				// 	// uni.pageScrollTo({
				// 	// 	scrollTop: 99999999999
				// 	// })
			},
			reset() {
				uni.showModal({
					content: "您确定要重置筛选条件吗？",
					confirmColor: "#02D48F",
					success: (res) => {
						if (res.confirm) {
							this.exchange = ''
							this.startTime = ''
							this.endTime = ''
						} else if (res.cancel) {}
					}
				});
			},
			// 抽屉的提交按钮,点击抽屉确定
			submit() {
				this.init()
				this.closeDrawer()
			},
			// 打开抽屉
			openDrawer() {
				this.openPop('drawerPop')
			},
			// 关闭抽屉
			closeDrawer() {
				this.closePop('drawerPop')
			},
			openPop(ref) {
				console.log(this.$refs)
				this.$refs[ref].open()
			},
			closePop(ref) {
				this.$refs[ref].close()
			},
			// 开始时间和结束时间
			bindDateChange(e, isEnd) {
				console.log(e, isEnd)
				this.date = e.detail.value
				if (!!isEnd) {
					this.EndDatetime = e.detail.value
				} else {
					this.StartDatetime = e.detail.value
				}
			},
			cancelSelect() {},
			// 网络请求
			async getTradeRecordPageList(currentIndex) {
				let obj = {
					UserId: this.userId,
					Token: this.token,
					PageIndex: this.tabList[currentIndex].PageIndex,
					PageSize: this.tabList[currentIndex].PageSize,
					Type: this.tabList[currentIndex].Type, // 类型(0全部, 1:买入, 2: 售出)
					StartDatetime: this.StartDatetime, // 开始时间
					EndDatetime: this.EndDatetime, // 结束时间
					Exchange: this.Exchange, // 交易所
				}
				let res = ''
				// if (currentIndex == 2) {
				// 	res = await post('User/GetTradeRecordPageList', obj, {}, true)
				// } else {
				// 	res = await post('User/GetTradeRecordPageList', obj, {}, false)
				// }
				res = await post('User/GetTradeRecordPageList', obj, {}, false)
				if (res.code != 0) return
				res.data = res.data ? res.data : []

				if (res.data.length < this.tabList[currentIndex].PageSize) {
					console.log('没有更多的')
					// 没有更多的
					this.tabList[currentIndex].loadMore = 2;
				} else {
					// loading前
					this.tabList[currentIndex].loadMore = 0;
				}

				let tempArr = res.data.map((item, index) => {

					if (item.income < 0) {
						this.$set(item, 'incomeIsRed', true)
					} else {
						this.$set(item, 'incomeIsRed', false)
					}
					// 收益比,是否红色
					if (item.incomeRatio < 0) {
						this.$set(item, 'incomeRatioIsRed', true)
					} else {
						this.$set(item, 'incomeRatioIsRed', false)
					}
					return item
				})
				// this.tabList[this.currentIndex].list.push(...res.data)
				this.tabList[currentIndex].list.push(...tempArr)
				// this.tabList[currentIndex].list = this.tabList[currentIndex].list.slice(1,2)
				// console.log(this.tabList[this.currentIndex].list)
			},
			// 交易记录统计信息
			// User/GetTradeIncomeStatistics
			async getTradeIncomeStatistics(currentIndex) {
				let obj = {
					UserId: this.userId,
					Token: this.token,
					Type: this.tabList[currentIndex].Type, // 类型(0全部, 1:买入, 2: 售出)
					StartDatetime: this.StartDatetime, // 开始时间
					EndDatetime: this.EndDatetime, // 结束时间
					Exchange: this.Exchange, // 交易所
				}
				// let res = await post('User/GetTradeIncomeStatistics', obj, {}, false)
				let res = ''
				// if (currentIndex == 2) {
				// 	res = await post('User/GetTradeIncomeStatistics', obj, {}, true)
				// } else {
				// 	res = await post('User/GetTradeIncomeStatistics', obj, {}, false)
				// }
				res = await post('User/GetTradeIncomeStatistics', obj, {}, false)
				if (res.code != 0) return
				if (res.data.income < 0) {
					this.$set(res.data, 'tongjiIncomeIsRed', true)
				} else {
					this.$set(res.data, 'tongjiIncomeIsRed', false)
				}
				this.tabList[currentIndex].tongjiObj = res.data
			},
			// 开始下拉结束函数
			refresherrestore() {
				this.refresherTriggered = 'restore' // 关闭动画
				// this.refresherTriggered = false // 关闭动画
				console.log('结束下拉')
			},
			// 下拉刷新
			refresherrefresh() {
				this.refresherTriggered = true
				console.log('下拉刷新this.isSwiperTransition: ',this.isSwiperTransition,this.dx)
				// if((this.isSwiperTransition == true && this.dx != -394) || (this.isSwiperTransition == true && this.dx != 394) || (this.isSwiperTransition == true && this.dx != 0)) return
				// if((this.dx != -394) || (this.dx != 394) || (this.dx != 0)) return
				// if((this.isSwiperTransition == true && this.dx != -394) || (this.isSwiperTransition == true && this.dx != 394) || (this.isSwiperTransition == true && this.dx != 0)) return
				// console.log('过了isSwiperTransition 111')
				if (this.nowScroll > this.refresherThreshold) return
				console.log('过了this.nowScroll > this.refresherThreshold222')
				if (this.timer != null || this.timer2 != null) return
				console.log('过了下拉刷新333')
				clearTimeout(this.timer);
				this.timer = null;
				this.timer = setTimeout(() => {
					console.log('进入定时器')
					this.init()
					clearTimeout(this.timer);
					this.timer = null;
					// this.refresherTriggered = false // 关闭动画
				}, 50)
				this.$once('hook:beforeDestroy', () => {
					clearTimeout(this.timer);
					this.timer = null;
				})

				clearTimeout(this.timer2);
				this.timer2 = null;

				this.timer2 = setTimeout(() => {
					console.log('进入定时器2')
					this.refresherTriggered = false
					clearTimeout(this.timer2);
					this.timer2 = null;
				}, 300)
				this.$once('hook:beforeDestroy', () => {
					clearTimeout(this.timer2);
					this.timer2 = null;
				})
				uni.stopPullDownRefresh()
			},
			// scrolltoupper() {
			// 	console.log('下拉刷新', this.currentIndex)
			// 	this.init()
			// },
			// 上拉加载更多
			scrolltolower() {
				console.log('上拉加载更多', this.currentIndex)
				if (this.tabList[this.currentIndex].loadMore == 2) return
				this.tabList[this.currentIndex].PageIndex++
				this.getTradeRecordPageList(this.currentIndex)
			},
			scroll(e) {
				// console.log(e)
				this.nowScroll = e.target.scrollTop
				// console.log('现在滚动: ', this.nowScroll)
			}
		},
		// uni.stopPullDownRefresh()
		// // 下拉刷新
		// onPullDownRefresh() {
		// 	this.refresherrefresh()
		// },
		// onReachBottom() {
		// 	console.log('出地理')
		// 	this.scrolltolower()
		// },
		// onPageScroll({
		// 	scrollTop
		// }) {
		// 	// this.tabList[this.currentIndex].scrollTop = scrollTop;
		// },
	}
</script>

<style lang="scss" scoped>
	.red-bgg {
		// height: calc(100vh - 100upx);
		height: 100vh;
		width: 100vw;
		background-color: pink;
	}

	// @import url("./style.scss");
	@import './style';
</style>
