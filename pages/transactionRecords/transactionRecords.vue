<template>
	<view class="big-box">
		<!-- <view :style="{paddingTop: customBar + 20 + 'upx' }" class="header-tab">
			<view class="tab-icon iconfont icon-xiaoyufuhao" @click="back">

			</view>
			<view class="tab-center">
				交易记录
			</view>
			<view @click="openDrawer" class="tab-icon iconfont icon-shaixuan1">

			</view>
		</view> -->
		<header-bar :title="tabTitle" titleTintColor="#000" :bgColor='bgColor' :center='center' :isBack="true">
			<view @tap="back" slot="back" class="uni_btnIco iconfont icon-xiaoyufuhao"></view>
			<view slot="string">
				<view @tap="openDrawer" class="header-right iconfont icon-shaixuan1">

				</view>
			</view>
		</header-bar>
		<view class="tabMenu fs-18">
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
		<!-- <swiper :current="currentIndex" @change="swiperChange" class="swiper" style="height: calc(100vh - 330upx);"> -->
		<swiper :current="currentIndex" @change="swiperChange" class="swiper" :style="'height:' +pageHeight+'px'">


			<!-- <swiper-item v-for="(item,index) in tabList" :key='index' style="height: calc(100vh - 330upx);"> -->
			<swiper-item v-for="(item,index) in tabList" :key='index'>
				<!-- 有下拉刷新 -->
				<!-- 	<scroll-view scroll-y="true" class="swiperbox" @scrolltolower='scrolltolower' :refresher-enabled='true'
				 @refresherrefresh='refresherrefresh' :refresher-triggered='refresherTriggered' style="height: calc(100vh - 330upx);" :refresher-threshold='refresherThreshold' @scroll="scroll"> -->
				<!-- ban掉下拉刷新 -->
				<!--  :refresher-enabled='true' @refresherrefresh='refresherrefresh' :refresher-triggered='refresherTriggered'  -->
				<!-- <scroll-view scroll-y="true" class="swiperbox" @scrolltolower='scrolltolower' style="height: calc(100vh - 330upx);" -->
				<scroll-view scroll-y="true" class="swiperbox" @scrolltolower='scrolltolower' :style="'height:' +pageHeight+'px'"
				 :refresher-threshold='refresherThreshold' @scroll="scroll">
					<!-- 	<scroll-view scroll-y="true" class="swiperbox" @scrolltolower='scrolltolower' 
				 @scrolltoupper ='scrolltoupper'  style="height: calc(100vh - 350upx);" :show-scrollbar='true'> -->
					<view class="box shadow1" v-for="(item2,index2) in tabList[currentIndex].list" :key='index2'>
						<!-- <view class="box-top">
							<view class="top-left">
								<image :src="item2.logo" mode="widthFix" class="img"></image>
								<view class="text">
									<view class="text-top">
										{{ item2.type == 1 ? '买入' : '卖出'}}{{ item2.title }}
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
						</view> -->
						<view class="coin-info">
							<view class="logo-box">
								<image :src="item2.logo" mode="widthFix" class="logo-img"></image>

							</view>
							<view class="coin-info-center">
								<view class="coin-title">
									{{ item2.type == 1 ? '买入' : '卖出'}}{{ item2.title }}
								</view>
							</view>
							<view class="coin-info-right">
								<view class="coin-info-right-top">
									<view class="coin-addtime">
										{{ item2.addtime }}
									</view>
								</view>
								
								<view class="from-text">
									来自: {{ item2.from  }}
								</view>
							</view>
							<!-- <view class="coin-info-right">
								<view class="coin-info-right-top">
									<view class="coin-title">
										{{ item2.type == 1 ? '买入' : '卖出'}}{{ item2.title }}
									</view>
									<view class="coin-addtime">
										{{ item2.addtime }}
									</view>
								</view>
								<view class="coin-orderId">
									{{ item2.orderId }}
								</view>
								
								<view class="from-text">
									来自: {{ item2.from  }}
								</view>
							</view> -->
						</view>
						<view class="box-bottom">
							<view class="box-bottom-item left">
								<view class="item-bottom">
									<!-- 卖出数量 -->
									{{ item2.type == 1 ? '买入' : '卖出'}}数量:
								</view>
								<view class="item-top">
									{{ item2.amount  }}
								</view>
							</view>
							<view class="box-bottom-item">
								<view class="item-bottom">
									<!-- 卖出均价 -->
									{{ item2.type == 1 ? '买入' : '卖出'}}均价:
								</view>
								<view class="item-top">
									{{ item2.avgPrice  }}
								</view>
								
							</view>
							<view class="box-bottom-item left">
								<view class="item-bottom">
									<!-- 卖出金额 -->
									{{ item2.type == 1 ? '买入' : '卖出'}}金额:
								</view>
								<view class="item-top">
									{{ item2.money }}
								</view>
								
							</view>
							<view class="box-bottom-item">
								<view class="item-bottom">
									手续费:
								</view>
								<view class="item-top">
									{{ item2.fee }}
								</view>
								
							</view>
							<!-- 买入 -->
							<view v-if="item2.type == 1" class="box-bottom-item left">
								<view class="item-bottom">
									已做单数:
								</view>
								<view class="item-top" :class="[item2.incomeIsRed ? 'text-red' : 'text-green']">
									{{ item2.seat1 }} 
								</view>
								
							</view>
							<!-- 累计买入金额 -->
							<view v-if="item2.type == 1"  class="box-bottom-item">
								<view class="item-bottom">
									<!-- {{ item2.type == 1 ? '买入' : '卖出'}}收益比 -->
									总计金额:
								</view>
								<view class="item-top" :class="[item2.incomeRatioIsRed ? 'text-red' : 'text-green']">
									{{ item2.seat2  }} U
								</view>
								
							</view>
							<!-- 卖出 -->
							<view v-if="item2.type == 2" class="box-bottom-item left">
								<view class="item-bottom">
									卖出收益:
								</view>
								<view class="item-top" :class="[item2.incomeIsRed ? 'text-red' : 'text-green']">
									<!-- {{ item2.income  | four }} USDT -->
									{{ item2.seat1 }} U
								</view>
								
							</view>
							
							<!-- 卖出收益比 -->
							<view v-if="item2.type == 2"  class="box-bottom-item">
								<view class="item-bottom">
									<!-- {{ item2.type == 1 ? '买入' : '卖出'}}收益比 -->
									卖出收益比:
								</view>
								<view class="item-top" :class="[item2.incomeRatioIsRed ? 'text-red' : 'text-green']">
									<!-- {{ item2.incomeRatio  | four }}% -->
									{{ item2.seat2 }}%
								</view>
								
							</view>
						</view>
					</view>
					<not-data v-if='tabList[currentIndex].list.length == 0  && tabList[currentIndex].loadMore === 2'></not-data>
					<uni-load-more v-if="tabList[currentIndex].list.length > 0  && tabList[currentIndex].loadMore !== 0" :loadingType="tabList[currentIndex].loadMore"></uni-load-more>

			<view class="my-tab-empty-box">
				
			</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 合计底部 -->
		<view class="foot-box fs-18 shadow1">
			<view class="foot-left">
				<!-- 合计盈利：<text class="text-green">1063.057 USDT</text> -->
				合计盈利：
				<text :class="[ tabList[currentIndex].tongjiObj.tongjiIncomeIsRed ? 'text-red' : 'text-green']">
					{{ tabList[currentIndex].tongjiObj.income }} USDT
				</text>
			</view>
			<view class="foot-right">
				<!-- 交易盈利856单 -->
				交易{{ tabList[currentIndex].tongjiObj.count }}单
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
								<picker mode="date" fields="day" @cancel="cancelSelect($event,0)" :value="date" @change="bindDateChange($event,0)" :end="nowTime">
									<input :disabled="true" class="time-item-input" v-model="StartDatetime" placeholder="开始时间" placeholder-style='color:#cccccc'
									 :start='StartDatetime' :end="nowTime" />
								</picker>
							</view>
							<text>至</text>
							<view class="drawerPop-item-input my-time">
								<picker mode="date" fields="day" @cancel="cancelSelect($event,1)" :value="date" @change="bindDateChange($event,1)"
								 :start="StartDatetime" :end="nowTime">
								 <!-- :start="StartDatetime" :end="nowTime"> -->
									<input :disabled="true" class="time-item-input" v-model="EndDatetime" placeholder="结束时间" placeholder-style='color:#cccccc' />
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
				bgColor: {
					'background': '#fff',
				},
				tabTitle: '交易记录',
				center: true,
				isBack: true,

				pageHeight: 300,
				// 设置自定义下拉刷新阈值,距顶部
				refresherThreshold: 0,
				nowScroll: 0,
				userId: '',
				token: '',
				PageIndex: 1,
				PageSize: 12,
				Type: 0, // 类型(0全部, 1:买入, 2: 卖出)
				StartDatetime: '', // 开始时间
				EndDatetime: '', // 结束时间
				Exchange: '', // 交易所
				currentIndex: 0,
				customBar: this.customBar,
				statusBarH: this.statusBar,
				exchange: '',
				startTime: '',
				endTime: '',
				date: '',
				timer: null,
				timer2: null,
				loadMore: 0, // 0-loading前；1-loading中；2-没有更多了
				tabList: [{
						PageIndex: 1,
						PageSize: 12,
						loadMore: 0, // 0-loading前；1-loading中；2-没有更多了
						Type: 0, // 类型(0全部, 1:买入, 2: 卖出)
						list: [],
						tongjiObj: {
							count: '',
							income: ''
						},
					},
					{
						PageIndex: 1,
						PageSize: 12,
						loadMore: 0, // 0-loading前；1-loading中；2-没有更多了
						Type: 1, // 类型(0全部, 1:买入, 2: 卖出)
						list: [],
						tongjiObj: {
							count: '',
							income: ''
						},
					},
					{
						PageIndex: 1,
						PageSize: 12,
						loadMore: 0, // 0-loading前；1-loading中；2-没有更多了
						Type: 2, // 类型(0全部, 1:买入, 2: 卖出)
						list: [],
						tongjiObj: {
							count: 0,
							income: 0
						},
					},
				],
				refresherTriggered: false,
				// nowTime: '1980-01-01',
				nowTime: '',
			}
		},
		onLoad(e) {
			// this.Exchange = e.CurrencyCode
			this.Exchange = e.Symbol
			// this.init()
		},
		onShow() {
			this.init()
		},
		methods: {
			// 格式化时间 YY-MM--DD
			 getFormatDate() {
				var date = new Date();
				var seperator = "-";
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var nowDate = date.getDate();
				if(month >=1 && month <=9) {
					month = "0" + month;
				}
				if(nowDate >=0 && nowDate <=9) {
					nowDate = "0" + nowDate;
				}
				var newDate = year + seperator + month + seperator + nowDate;
				return newDate;
			},
			init() {

				// this.pageHeight = uni.getSystemInfoSync().windowHeight - 171; //减去可视窗口除swiper的盒子的高度即为swiper高度
				// this.pageHeight = uni.getSystemInfoSync().windowHeight - 171 - 45; //减去可视窗口除swiper的盒子的高度即为swiper高度
				this.pageHeight = uni.getSystemInfoSync().windowHeight  -50 - 20 - this.statusBarH  - this.customBar; //减去可视窗口除swiper的盒子的高度即为swiper高度
			
				var myDate = new Date();
				this.nowTime = myDate.toLocaleDateString().split('/').join('-'); //将1970/08/08转化成1970-08-08
				this.nowTime = this.getFormatDate()
				
				console.log('time:', this.nowTime)
				this.tabList = [{
						PageIndex: 1,
						PageSize: 12,
						loadMore: 0, // 0-loading前；1-loading中；2-没有更多了
						Type: 0, // 类型(0全部, 1:买入, 2: 卖出)
						list: [],
						tongjiObj: {
							count: 0,
							income: 0
						},
					},
					{
						PageIndex: 1,
						PageSize: 12,
						loadMore: 0, // 0-loading前；1-loading中；2-没有更多了
						Type: 1, // 类型(0全部, 1:买入, 2: 卖出)
						list: [],
						tongjiObj: {
							count: 0,
							income: 0
						},
					},
					{
						PageIndex: 1,
						PageSize: 12,
						loadMore: 0, // 0-loading前；1-loading中；2-没有更多了
						Type: 2, // 类型(0全部, 1:买入, 2: 卖出)
						list: [],
						tongjiObj: {
							count: 0,
							income: 0
						},
					},
				]
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				// this.clickTab(0)
				// this.getTradeRecordPageList(0)
				// this.getTradeIncomeStatistics(0)
				this.clickTab(this.currentIndex)
				this.getTradeRecordPageList(this.currentIndex)
				this.getTradeIncomeStatistics(this.currentIndex)
				// this.getTradeRecordPageList(1)
				// this.getTradeIncomeStatistics(1)
				// this.getTradeRecordPageList(2)
				// this.getTradeIncomeStatistics(2)
			},
			// 返回
			back() {
				uni.navigateBack()
			},
			clickTab(index) {
				this.currentIndex = index

				// this.tabList[this.currentIndex] = {
				// 		PageIndex: 1,
				// 		PageSize: 12,
				// 		loadMore: 0, // 0-loading前；1-loading中；2-没有更多了
				// 		Type: this.currentIndex, // 类型(0全部, 1:买入, 2: 卖出)
				// 		list: [],
				// 		tongjiObj: {
				// 			count: 0,
				// 			income: 0
				// 		},
				// 	},
				// this.getTradeRecordPageList(this.currentIndex)
				// this.getTradeIncomeStatistics(this.currentIndex)
			},
			swiperChange(e) {
				this.currentIndex = e.detail.current
				console.log('this.currentIndex', this.currentIndex)
				this.tabList[this.currentIndex] = {
						PageIndex: 1,
						PageSize: 12,
						loadMore: 0, // 0-loading前；1-loading中；2-没有更多了
						Type: this.currentIndex, // 类型(0全部, 1:买入, 2: 卖出)
						list: [],
						tongjiObj: {
							count: 0,
							income: 0
						},
					},
				this.getTradeRecordPageList(this.currentIndex)
				this.getTradeIncomeStatistics(this.currentIndex)
			},
			reset() {
				uni.showModal({
					content: "您确定要重置筛选条件吗？",
					confirmColor: "#02D48F",
					success: (res) => {
						if (res.confirm) {
							this.exchange = ''
							this.Exchange = ''
							this.startTime = ''
							this.StartDatetime = ''
							this.endTime = ''
							this.EndDatetime = ''
						} else if (res.cancel) {
							console.log('取消了重置')
						}
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
					Type: this.tabList[currentIndex].Type, // 类型(0全部, 1:买入, 2: 卖出)
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
				// 旧接口
				res = await post('User/GetTradeRecordPageList', obj, {}, false)
				// 新接口
				// res = await post('User/GetTradeLogPageList', obj, {}, false)
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

				let tempArr = [];
				res.data.map((item, index) => {

					// console.log('大于等于',11 <= 2)
					// if (item.income < 0) {
					// console.log('seat2',JSON.parse(item.seat2))
					item.seat1 = JSON.parse(item.seat1)
					item.seat2 = JSON.parse(item.seat2)
					if (item.seat1 < 0) {
						this.$set(item, 'incomeIsRed', true)
					} else {
						this.$set(item, 'incomeIsRed', false)
					}
					// 收益比,是否红色
					// if (item.incomeRatio < 0) {
					if (item.seat2 < 0) {
						this.$set(item, 'incomeRatioIsRed', true)
					} else {
						this.$set(item, 'incomeRatioIsRed', false)
					}
					tempArr.push(item)
					return item
				})
				// this.tabList[this.currentIndex].list.push(...res.data)
				this.tabList[currentIndex].list.push(...tempArr)
				// this.tabList[currentIndex].list = this.tabList[currentIndex].list.slice(1,2)
				console.log(this.tabList[this.currentIndex].list)
				// 强制刷新数据
				this.$forceUpdate();
			},
			// 交易记录统计信息
			// User/GetTradeIncomeStatistics
			async getTradeIncomeStatistics(currentIndex) {
				let obj = {
					UserId: this.userId,
					Token: this.token,
					Type: this.tabList[currentIndex].Type, // 类型(0全部, 1:买入, 2: 卖出)
					StartDatetime: this.StartDatetime, // 开始时间
					EndDatetime: this.EndDatetime, // 结束时间
					Exchange: this.Exchange, // 交易所
				}
				let res = await post('User/GetTradeIncomeStatistics', obj, {}, false)
				// let res = ''
				// if (currentIndex == 2) {
				// 	res = await post('User/GetTradeIncomeStatistics', obj, {}, true)
				// } else {
				// 	res = await post('User/GetTradeIncomeStatistics', obj, {}, false)
				// }
				if (res.code != 0) return
				res.data.income = JSON.parse(res.data.income)
				if (res.data.income < 0) {
					this.$set(res.data, 'tongjiIncomeIsRed', true)
				} else {
					this.$set(res.data, 'tongjiIncomeIsRed', false)
				}
				this.tabList[currentIndex].tongjiObj = res.data
				// 强制刷新数据
				this.$forceUpdate();
			},
			// 上拉刷新
			refresherrefresh() {
				this.refresherTriggered = true
				console.log('下拉刷新')
				if (this.nowScroll > this.refresherThreshold) return
				if (this.timer != null || this.timer2 != null) return
				clearTimeout(this.timer);
				this.timer = null;
				this.timer = setTimeout(() => {
					console.log('进入定时器')
					this.init()
					clearTimeout(this.timer);
					this.timer = null;
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
			},
			scrolltoupper() {
				console.log('下拉刷新', this.currentIndex)
				this.init()
			},
			// 上拉加载更多
			scrolltolower() {
				console.log('上拉加载更多', 'this.currentIndex', this.currentIndex)
				if (this.tabList[this.currentIndex].loadMore == 2) return
				this.tabList[this.currentIndex].PageIndex++
				this.getTradeRecordPageList(this.currentIndex)
			},
			scroll(e) {
				// console.log(e)
				this.nowScroll = e.target.scrollTop
				// console.log('现在滚动: ', this.nowScroll)
			}
		}
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
