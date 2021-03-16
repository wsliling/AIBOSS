<template>
	<view class="main">
		<!-- <view class="menuBtn"  @click="openFooter">
			<view class="iconBtn">
				+
			</view>
		</view> -->
		<!-- <view class="header" :style="{height: this.customBar + 'px'}">
			<view class="header-left iconfont icon-fangdajing">
				
			</view>
			<view class="header-center">
				交易
			</view>
			<view @tap="toKaitong" class="header-right iconfont icon-shaixuan">
				
			</view>
		</view> -->
		<header-bar :title="tabTitle" titleTintColor="#000" :bgColor='bgColor' :center='center' :isBack="true">
			<view @tap="goBack" slot="back" class="uni_btnIco iconfont icon-fangdajing"></view>
			<view slot="string">
				<view @tap="toKaitong" class="header-right iconfont icon-shaixuan">

				</view>
			</view>
		</header-bar>
		<!-- <view @click="anniu" class="" style="width: 100%;height: 100upx;">
			啊咧
		</view> -->
		<scroll-view class="scroll-view" scroll-x="true">
			<view :id="`demo${item.id}`" @tap="selectTab(index)" class="scroll-view-item fs-18" :class="currentIndex==index ? 'active' : ''"
			 v-for="(item,index) in headerMenu" :key="item.id">{{ item.TypeName }}</view>
		</scroll-view>
		<swiper :current="currentIndex" class="swiper" @change="swiperChange" :style="'height:' +pageHeight+'px'">
			<!-- :style="'height:' +pageHeight+'px'" -->
			<swiper-item v-for="(item,index) in clist" :key="index">
				<!-- <scroll-view class="mainList" scroll-y="true" @scrolltolower="toBottom" @scroll='myScroll' @scrolltoupper='scrolltoupper' :lower-threshold="100" :refresher-triggered="refreshState"
				 :refresher-enabled="scroll_refresher_enabled"  @refresherrefresh="pullRefresh" v-if="item.list.length>0"> -->
				<scroll-view class="mainList" scroll-y="true" @scrolltolower="toBottom" @scroll='myScroll' @scrolltoupper='scrolltoupper'
				 :lower-threshold="100" :scroll-top='setScrollTop' :refresher-enabled="scroll_refresher_enabled" @refresherrefresh="pullRefresh"
				 v-if="item.list.length>0">
					<!-- <view class="toubu">
					
					</view> -->
					<!-- <view class="mainList-item" :class="[item3.active ? '' : 'my-bg-gary']" v-for="(item3,key3,index3) in tempObj" :key="index3">
						<deal-item :dealItem="tempObj[key3]" :scrollTop='scrollTop'></deal-item>
						
					</view> -->

					<view class="mainList-item" :class="[item3.active ? '' : 'my-bg-gary']" v-for="(item3,index3) in item.list" :key="index3">
						<!-- {{index3+1}} -->
						<deal-item :dealItem="item3" :scrollTop='scrollTop' :isShowAllProfit='isShowAllProfit'></deal-item>
					</view>

					<!-- <radio-group> -->

					<!-- <uni-load-more v-if="!item.isAdd" :loadingType="loadMore"></uni-load-more> -->
					<uni-load-more :loadingType="loadMore"></uni-load-more>
					<view class="my-tab-empty-box">

					</view>
					<!-- <not-data v-if="!isGet" tipsTitle="没有更多了"></not-data> -->
					<!-- </radio-group> -->
					<!-- <view class="dibu">
					</view> -->
				</scroll-view>
				<view v-if="item.list.length <=0 && isLoad == false">
					<not-data></not-data>
				</view>
			</swiper-item>
		</swiper>
		<!-- 批处理 -->
		<!-- <view class="batch-box button-theme-bg-color" @tap="openPop">
			<image class="batch-img" src="/static/jiaoyi/piliang.png" mode="widthFix"></image>
		</view> -->
		<!-- 弹窗 -->
		<batch-pop ref='popup' :surplusUsdt='surplusUsdt' :paternBtn='paternBtn' @changeModel='switchChange'></batch-pop>
		<!-- <uni-popup ref='popup' type="bottom">
			<view class="popup-box">
				<view class="popup-box-title">
					<view class="popup-box-title-left fs-18">
						当前账户剩余USDT：{{ surplusUsdt | four }}
					</view>
					<view @tap="closePop" class="popup-box-title-right">
						×
					</view>
				</view>
				<view class="popup-box-content">
					<view class="popup-box-content-item" :class="[paternBtn == 1 ? '' : 'active button-theme-bg-color']" @tap="switchChange(1)">
						<image class="img" src="/static/jiaoyi/jixu.png" mode="widthFix"></image>
						<view class="text">
							继续策略循环
						</view>
					</view>
					<view class="popup-box-content-item" :class="[paternBtn == 2 ? '' : 'active button-theme-bg-color']" @tap="switchChange(2)">
						<image class="img" src="/static/jiaoyi/danci.png" mode="widthFix"></image>
						<view class="text">
							执行单次策略
						</view>
					</view>
					<view class="popup-box-content-item" :class="[paternBtn == 3 ? '' : 'active button-theme-bg-color']" @tap="switchChange(3)">
						<image class="img" src="/static/jiaoyi/zanting.png" mode="widthFix"></image>
						<view class="text">
							暂停策略循环
						</view>
					</view>
					<view class="popup-box-content-item" :class="[paternBtn == 4 ? '' : 'active button-theme-bg-color']" @tap="switchChange(4)">
						<image class="img" src="/static/jiaoyi/qingcang.png" mode="widthFix"></image>
						<view class="text">
							清仓卖出
						</view>
					</view>
				</view>
			</view>
		</uni-popup> -->

		<view class="my-bottom fs-18">
			<view class="bottom-left">
				<view class="">火币网账户剩余{{ surplusUsdt | four }} <text class="unit">USDT</text></view>
				<view class="">总策略总金额建议{{ allFirstAmount*50 | four }} <text class="unit">USDT</text></view>
			</view>
			<view class="bottom-right"  @tap="openPop">
				批量操作
			</view>
		</view>
		<!-- 确认弹窗 -->
		<!-- <my-showModal ref='modal' @success='modalSuccess' :title='title' :content='content'></my-showModal> -->

		<!-- 		<view class="modal" v-show="showOrHide" @click="showOrHide = false">
			
		</view>
		<view class="footer" :class="[showOrHide ? 'footerShow': '']">
			<view class="text-box">
				<view class="texts">
					当前账户剩余USDT：0.0169
				</view>
				<view class="footer-btn" @click="closeFooter">
					+
				</view>
			</view>
			<view class="bottom-btn" >
				<view class="btn-item bgigray" >
					<text class="iconfont icon-arrow-"></text>
					继续策略循环
				</view>
				<view class="btn-item">
					<text class="iconfont icon-zanting"></text>
					执行单次循环
				</view>
				<view class="btn-item">
					<text class="iconfont icon-zanting"></text>
					暂停策略循环
				</view>
				<view class="btn-item" @click="sell">
					<text class="iconfont icon-maichu"></text>
					清仓卖出
				</view>
			</view>
		</view> -->
		<tabbar :current='2'></tabbar>
	</view>
</template>

<script>
	import {
		StrategyTrading,
		StrategyTradingop
	} from '@/common/js/http.js'
	import notData from '@/components/not-data/not-data.vue'
	import {
		mapMutations,
		mapState
	} from 'vuex'
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
				setScrollTop: -1,
				isAut: 0, // 0是未开通, 1开通了自定义
				lazyLoad: false,
				"scroll_refresher_enabled": true,
				grade: 1, // 1游客, 2体验用户,3正式用户,4初级交易员,5中级交易员,6高级交易员,7社区

				isGet: true,
				surplusUsdt: 0,
				UserId: '',
				Token: '',
				Page: 1,
				PageSize: 4000,
				bgColor: {
					// 'background': 'linear-gradient(90deg, #02D48E, #17B580)',
					'background': '#fff'
				},
				tabTitle: 'AI量化',
				center: true,
				isBack: true,
				customBar: this.customBar,
				clist: [{
					list: [],
					isAdd: true
				}, {
					list: [],
					isAdd: true
				}, {
					list: [],
					isAdd: true
				}, {
					list: [],
					isAdd: true
				}],
				selectClist: [],
				headerMenu: [{
						id: 0,
						TypeName: '全部'
					},
					{
						id: 1,
						TypeName: '策略循环'
					},
					{
						id: 2,
						TypeName: '单次策略'
					},
					{
						id: 3,
						TypeName: '停止补单'
					}
				],
				currentIndex: 0,
				paternBtn: 0,
				paternBtnText: '',
				whatMoabl: '',
				// ws连接实例
				socketTask: null,
				// 定时器
				timer: null,
				timer2: null, // 计时ws,定时发送
				timer3: null, // 计时轮转显示
				// 弹窗
				title: '选择交易',
				// content: '此操作不可逆，确认删除？'
				content: '确认对该交易进行监视，策略修改， 卖出操作?',
				currentIndexCheck: -1,
				isPush: true,
				refreshState: false,
				pageHeight: 300,
				loadMore: 0, // 0-loading前；1-loading中；2-没有更多了
				// API是否授权
				Authoriztion: null, // null 就是 未授权
				isLoad: true,
				scrollTop: 0,
				isSwitchChange: false,
				tempObj: {},
				isShow: false, // 是否处于这个页面
				isShowAllProfit: true, // 控制是否显示全部收益，true是全部，false是单仓
				allFirstAmount:0,
				// footerBtn:[
				// 	{ id: 1, TypeName: '继续策略循环'},
				// 	{ id: 2, TypeName: '执行单次循环'},
				// 	{ id: 3, TypeName: '暂停策略循环'},
				// 	{ id: 4, TypeName: '清仓卖出'}
				// ],
				// currentIndex: 0,
				// showOrHide: false
			}
		},
		components: {
			notData
		},
		watch: {
			'$store.state.websocketList': {
				handler(newName, oldName) {
					newName = JSON.parse(JSON.stringify(newName))
					// console.log('this.$store.state.websocketList',this.$store.state.websocketList)
					// 如果是空就不执行
					if (!newName[0]) {
						return
					}
					// 不处于这个页面
					if (this.isShow == false) {
						return
					}
					if (this.clist[this.currentIndex].list.length == 0) {
						return
					}
					// 方法一:
					// console.log('变化了',newName,newName[0].Symbol);
					if (newName[0].Symbol) {
						// console.log('变化了2222',newName,newName[0].Symbol);
						this.clist[this.currentIndex].list.map((item, index) => {
							if (!this.isShowAllProfit && item.order != null) {
								if (item.order.Symbol == newName[0].Symbol && Number(item.order.EtcAmount) > 0) {
									
									let myDate = new Date();
									let mytime = myDate.toLocaleTimeString();

									this.$set(this.clist[this.currentIndex].list[index].order, 'newprice', newName[0].close)

									// 计算
									let EtcProfit = this.GetProfit(item.order.Symbol, item.order.EtcAmount, item.order.EtcUsdt, item.order.newprice)
									let EtcPercent = this.GetEtcPercent(item.order.EtcUsdt, EtcProfit)

									this.$set(this.clist[this.currentIndex].list[index].order, 'EtcPercent', EtcPercent)
									this.$set(this.clist[this.currentIndex].list[index].order, 'EtcProfit', EtcProfit)

									// this.$forceUpdate()
								}
								this.$forceUpdate()
								return
							}
							if (item.Symbol == newName[0].Symbol && Number(item.EtcAmount) > 0) {

								let myDate = new Date();
								let mytime = myDate.toLocaleTimeString();

								this.$set(this.clist[this.currentIndex].list[index], 'newprice', newName[0].close)

								// 计算
								let EtcProfit = this.GetProfit(item.Symbol, item.EtcAmount, item.EtcUsdt, item.newprice)
								let EtcPercent = this.GetEtcPercent(item.EtcUsdt, EtcProfit)

								this.$set(this.clist[this.currentIndex].list[index], 'EtcPercent', EtcPercent)
								this.$set(this.clist[this.currentIndex].list[index], 'EtcProfit', EtcProfit)
								// console.log('newName[0].Symbo---------',newName[0].Symbol)
								// if(this.clist[this.currentIndex].list[index].EtcProfit && newName[0].Symbol == 'btcusdt') {
								// // console.log(mytime,newName[0].Symbol + '交易的盈利百分比盈利百分比盈利百分比盈利百分比盈利百分比',this.clist[this.currentIndex].list[index].EtcPercent)
								// // console.log(mytime,newName[0].Symbol + '交易的预计盈利预计盈利预计盈利预计盈利预计盈利预计盈利',this.clist[this.currentIndex].list[index].EtcProfit)
								// 	console.log(mytime,newName[0].Symbol + '交易的盈利百分比',this.clist[this.currentIndex].list[index].EtcPercent,'%')
								// 	console.log(mytime,newName[0].Symbol + '交易的预计盈利',this.clist[this.currentIndex].list[index].EtcProfit)
								// }
								// 						if(newName[0].Symbol == 'btcusdt3lusdt') {

								// 							console.log(mytime,'交易btcusdt3lusdt的百分比的百分比的百分比',this.clist[this.currentIndex].list[index].EtcPercent)
								// 							console.log('btcusdt3lusdt的item的item的item:',newName[0])
								// 						}
								this.$forceUpdate()
							}
						})
					}

					// 方法二:
					// if(newName[0].Symbol && this.tempObj[newName[0].Symbol]) {
					// 				// console.log('变化了2222',newName,newName[0].Symbol);
					// 					if(this.tempObj[newName[0].Symbol].Symbol == newName[0].Symbol && Number(this.tempObj[newName[0].Symbol].EtcAmount) > 0) {

					// 						this.$set(this.tempObj[newName[0].Symbol],'newprice',newName[0].close)
					// 						// 计算
					// 						let EtcProfit = this.GetProfit(this.tempObj[newName[0].Symbol].Symbol, this.tempObj[newName[0].Symbol].EtcAmount, this.tempObj[newName[0].Symbol].EtcUsdt, this.tempObj[newName[0].Symbol].newprice)
					// 						let EtcPercent = this.GetEtcPercent(this.tempObj[newName[0].Symbol].EtcUsdt, EtcProfit)

					// 						this.$set(this.tempObj[newName[0].Symbol], 'EtcPercent', EtcPercent)
					// 						this.$set(this.tempObj[newName[0].Symbol], 'EtcProfit', EtcProfit)
					// 						// console.log('newName[0].Symbo---------',newName[0].Symbol)
					// 						// if(this.tempObj[newName[0].Symbol].EtcProfit && newName[0].Symbol == 'btcusdt') {
					// 						// 	let myDate = new Date();
					// 						// 	let mytime = myDate.toLocaleTimeString();
					// 						// // console.log(mytime,newName[0].Symbol + '交易的盈利百分比盈利百分比盈利百分比盈利百分比盈利百分比',this.tempObj[newName[0].Symbol].EtcPercent)
					// 						// // console.log(mytime,newName[0].Symbol + '交易的预计盈利预计盈利预计盈利预计盈利预计盈利预计盈利',this.tempObj[newName[0].Symbol].EtcProfit)
					// 						// 	console.log(mytime,newName[0].Symbol + '交易的盈利百分比',this.tempObj[newName[0].Symbol].EtcPercent,'%')
					// 						// 	console.log(mytime,newName[0].Symbol + '交易的预计盈利',this.tempObj[newName[0].Symbol].EtcProfit)
					// 						// }
					// // 						if(newName[0].Symbol == 'btcusdt3lusdt') {

					// // 							console.log(mytime,'交易btcusdt3lusdt的百分比的百分比的百分比',this.tempObj[newName[0].Symbol].EtcPercent)
					// // 							console.log('btcusdt3lusdt的item的item的item:',newName[0])
					// // 						}
					// 						this.$forceUpdate()
					// 					}
					// 			}

				},
				immediate: true,
				deep: true
			}
		},
		onLoad() {
			// this.UserId = uni.getStorageSync("userId")
			// this.Token = uni.getStorageSync("token")
			uni.hideTabBar()

			this.pageHeight = uni.getSystemInfoSync().windowHeight - 166; //减去可视窗口除swiper的盒子的高度即为swiper高度
			//console.log(this.pageHeight)
		},
		onShow() {
			this.allFirstAmount=0;
			this.isShow = true
			// let tempArr = ['btcusdt']
			// tempArr.map((item,index)=>{
			// 	this.$set(this.data,item,{
			// 		a:1
			// 	})
			// })
			// console.log('this.btc',this.btcusdt)
			this.UserId = uni.getStorageSync("userId")
			this.Token = uni.getStorageSync("token")
			this.GetAuthoriztionInfoList()
			uni.hideTabBar()
			for (let i of this.dealList) {
				this.selectClist.indexOf(i) == -1 ? this.selectClist.push(i) : ''
			}
			// this.selectClist = Array.from(new Set(this.selectClist.push(...this.dealList))) 
			this.Page = 1
			this.loadMore = 0
			this.clist[this.currentIndex].isAdd = true
			this.clist[this.currentIndex].list = []
			this.clist = [{
				list: [],
				isAdd: true
			}, {
				list: [],
				isAdd: true
			}, {
				list: [],
				isAdd: true
			}, {
				list: [],
				isAdd: true
			}]
			// this.GetMemberInfo()

			this.getStrategyTrading()
		},
		onHide() {
			console.log('隐藏要么======')
			this.isShow = false
			this.setSelectItem()
			this.updateDealList([])
		},
		computed: {
			...mapState(['dealList'])
		},

		onNavigationBarButtonTap(e) {
			console.log(e)
		},
		methods: {
			...mapMutations(['updateDealList']),
			// anniu() {
			// 	// uni.closeSocket()
			// 	// this.socketTask.close()
			// 	this.clist[this.currentIndex].list[0].active =!this.clist[this.currentIndex].list[0].active 
			// },
			initList() {
				this.Page = 1
				this.loadMore = 0
				// this.clist[this.currentIndex].list = []
				// this.clist[this.currentIndex].isAdd = true
				this.clist = [{
					list: [],
					isAdd: true
				}, {
					list: [],
					isAdd: true
				}, {
					list: [],
					isAdd: true
				}, {
					list: [],
					isAdd: true
				}]
			},
			// 覆盖去重
			unique(arr, objs) {
				var res = arr.some(item => {
					//console.log(item,objs.secondId)
					if (item.name == objs.name) {
						return true
					}
				})
				// console.log(res) // 如果arr数组对象中含有item.secondId,就会返回true，否则返回false
				if (res) { // 如果存在
					var index = arr.findIndex((item) => {
						return item.name === objs.name;
					});
					// console.log(index); //找到相同ID对象的index
					arr.splice(index, 1, objs) //去重，替换数组
				} else {
					arr.push(objs)
				}
				return arr
			},
			// 滚动条滚动
			myScroll(e) {
				// if(this.scrollTop = 'ding') {
				// 	return
				// }
				this.scrollTop = e.detail.scrollTop
				console.log('滚动条滚动了', this.scrollTop)
				// console.log(e.detail.scrollTop)
				// this.scrollTop = e.detail.scrollTop
				if (e.detail.scrollTop === 0) {
					this.scroll_refresher_enabled = true
				} else {
					this.scroll_refresher_enabled = false
				}
			},
			scrolltoupper() {
				// this.scrollTop = 'ding'
				console.log('到顶部了 ')
			},
			setSelectItem() {
				this.updateDealList(this.selectClist)
				// uni.setStorageSync('dealList', this.selectClist)
			},
			// 下拉刷新
			pullRefresh() {
				if (this.isSwitchChange == true) {
					return
				}
				if (this.scroll_refresher_enabled == false) {
					return
				}
				console.log('this.scrollTop :', this.scrollTop)
				// if (this.scrollTop != 'ding') return

				if (this.refreshState) return

				// this.isGet = true
				// this.isPush = false
				this.Page = 1
				this.loadMore = 0
				this.clist[this.currentIndex].list = []
				this.clist[this.currentIndex].isAdd = true
				this.clist = [{
					list: [],
					isAdd: true
				}, {
					list: [],
					isAdd: true
				}, {
					list: [],
					isAdd: true
				}, {
					list: [],
					isAdd: true
				}]
				this.getStrategyTrading()
			},
			// 滚动条到底
			toBottom() {
				// // if(this.refreshState || !this.isGet)return
				// if (this.refreshState) return
				// if (this.loadMore == 2) return
				// //this.isPush = true
				// this.Page++
				// this.getStrategyTrading()
			},
			// 获取策略列表
			async getStrategyTrading() {
				this.isLoad = true
				// if (!this.clist[this.currentIndex].isAdd) return
				this.refreshState = true
				let params = {
					UserId: this.UserId,
					Token: this.Token,
					Page: this.Page,
					PageSize: this.PageSize,
					Type: this.currentIndex
				}
				// let {
				// 	data
				// } = await StrategyTrading(params)

				let data = await post('Trade/StrategyTrading', params, {}, true)
				if (data.code != 0) {
					return
				}

				// this.$once('hook:beforeDestroy', () => {
				// 	clearInterval(this.timer3);
				// 	this.timer3 = null;
				// })

				let tempArr = data.data.list.map((item, index) => {
					let myTypeName = ''
					switch (item.Type) {
						case 0:
							// myTypeName = '全部';
							myTypeName = '';
							break;
						case 1:
							myTypeName = '策略循环';
							break;
						case 2:
							myTypeName = '单次策略';
							break;
						case 3:
							myTypeName = '停止补单';
							break;
							// case 4: return '清仓卖出';
						case 4:
							myTypeName = '';
							break;
							// default: return '未知'
						default:
							myTypeName = ''
					}
					// let EtcPercent = this.GetEtcPercent(item.EtcUsdt, item.EtcProfit) 
					// let EtcProfit = this.GetProfit(item.Symbol, item.EtcAmount, item.EtcUsdt, item.newprice)
					// this.$set(data.data.list[index], 'EtcPercent', EtcPercent)
					// this.$set(data.data.list[index], 'EtcProfit', EtcProfit)
					this.$set(data.data.list[index], 'myTypeName', myTypeName)

					// if (item.Type != null && item.Type != 4 && item.Type != 0 && item.CurrencyCode == '') {
					if (item.Type != null && item.Type != 4 && item.Type != 0 && item.FirstAmount > 0) {
						// this.$set(this.clist[this.currentIndex].list[index], 'active', true)
						item.active = true
					} else {
						// this.$set(this.clist[this.currentIndex].list[index], 'active', false)
						item.active = false
					}
					this.$set(this.tempObj, item.Symbol, item)
					
					//计算总策略建议金额
					this.allFirstAmount=this.allFirstAmount+item.FirstAmount*1
					return item
				})


				clearInterval(this.timer3);
				this.timer3 = null;
				this.timer3 = setInterval(() => {
					this.isShowAllProfit = !this.isShowAllProfit
				}, 3000)



				// this.clist[this.currentIndex].list.push(...data.data.list)
				// this.clist[this.currentIndex].list = [...this.clist[this.currentIndex].list,...data.data.list]
				// this.clist[this.currentIndex].list = [...this.clist[this.currentIndex].list,...data.data.list]
				for (let i of data.data.list) {
					if (i.Type != null && i.Type != 4 && i.Type != 4) {
						this.selectClist.push(i.CurrencyId)
					}
				}

				// let tempArr = this.clist[this.currentIndex].list.map((item, index) => {
				// let tempArr = data.data.list.map((item, index) => {
				// 	if (item.Type != null && item.Type != 4 && item.Type != 0) {
				// 		// this.$set(this.clist[this.currentIndex].list[index], 'active', true)
				// 		item.active = true
				// 	} else {
				// 		// this.$set(this.clist[this.currentIndex].list[index], 'active', false)
				// 		item.active = false
				// 	}

				// 	this.$set(this.tempObj,item.Symbol,item)

				// 	return item
				// })
				// console.log('this.tempObj',this.tempObj)
				// 现在是不分页
				this.clist[this.currentIndex].list = [...tempArr]
				// this.clist[this.currentIndex].list = tempArr

				// 使得滚动条滚动一点点
				this.setScrollTop = 1
				// console.log('打印this.clist[this.currentIndex].list[index]:', this.clist[this.currentIndex].list)

				this.refreshState = false
				// this.isPush ? this.clist[this.currentIndex].push(...data.data.list) : this.clist[this.currentIndex] = data.data.list
				if (data.data.list.length < this.PageSize) {
					//this.isGet = false
					this.loadMore = 2
					// this.clist[this.currentIndex].isAdd = false
					// this.$set(tempArr, 'isAdd', false)
					// this.clist[this.currentIndex].list = [...tempArr]
				} else {
					// this.loadMore = 1
				}
				// this.isPush = true
				// this.surplusUsdt = data.data.USDT
				// this.surplusUsdt = Number(data.data.USDT) == 0 ? 0 : Number(data.data.USDT).toFixed(3)
				// this.surplusUsdt = Number(data.data.USDT) == 0 ? 0 : Number(data.data.USDT)
				this.surplusUsdt = Number(data.data.USDT)
				this.isLoad = false

				this.isSwitchChange = false


				// this.$forceUpdate()
			},
			goBack() {
				uni.navigateTo({
					url: '/pages/searchCurrency/searchCurrency'
				})
				// 放大镜按钮
				// uni.navigateBack()
			},
			toDealDetail(item) {
				uni.navigateTo({
					url: `/pages/dealSon/dealDetail/index?CurrencyId=${item.CurrencyId}&Type=${item.Type}`
				})
				//navigate('dealSon/dealDetail/index')
			},
			clickCheck(item, index) {
				if (this.Authoriztion == null) {
					uni.showToast({
						title: '您未授权',
						icon: 'none',
						duration: 1000
					})
					if (this.timer != null) return
					this.timer = setTimeout(() => {
						uni.navigateTo({
							url: '/pages/apiLetter/apiLetter'
						})
						clearTimeout(this.timer);
						this.timer = null;
					}, 1000)

					this.$once('hook:beforeDestroy', () => {
						clearTimeout(this.timer);
						this.timer = null;
					})
					return
				}
				// if(item.Type != 0 || item.Type != 1 || item.Type != 2 || item.Type != 3 || item.Type != 4){
				// 	return uni.navigateTo({
				// 		url: `/pages/lianghuaSon/setStrategy/index?currencyId=${item.CurrencyId}`
				// 	})
				// }
				this.whatMoabl = 'clickChecks'
				// // 反选
				// this.clist[this.currentIndex].list[index].active = !this.clist[this.currentIndex].list[index].active

				// item = !item
				this.currentIndexCheck = item.CurrencyId
				this.selectClist.indexOf(this.currentIndexCheck) == -1 ? this.selectClist.push(this.currentIndexCheck) : this.selectClist
					.splice(this.selectClist.findIndex(item => item == this.currentIndexCheck), 1)
				this.$forceUpdate()

				if (this.clist[this.currentIndex].list[index].active == true) {
					this.title = '放弃交易'
					// this.content = '确认放弃对该交易进行监视，策略修改， 卖出操作?'
					this.content = '取消勾选该交易对,将不再对它进行买入、卖出操作,确认取消?'
					this.$set(this.clist[this.currentIndex].list[index], 'isGiveUp', true)
					// this.clist[this.currentIndex].list[index].isGiveUp = true
				} else {
					this.title = '选择交易'
					// this.content = '确认对该交易进行监视，策略修改， 卖出操作?'
					this.content = '确认对该交易进行监控,执行买入,卖出操作?'
					this.$set(this.clist[this.currentIndex].list[index], 'isGiveUp', false)
				}
				uni.showModal({
					title: this.title,
					content: this.content,
					success: (res) => {
						if (res.confirm) {
							// this.Page = 1
							// this.loadMore = 0 
							// 	this.clist[this.currentIndex].list = []
							this.dangeUpdateStrategyTradingop(item, index)
							// this.getStrategyTrading()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

				// if (this.selectClist.indexOf(item.CurrencyId) != -1) {
				// 	this.title = '放弃交易'
				// 	this.content = '确认放弃对该交易进行监视，策略修改， 卖出操作?'
				// } else {
				// 	this.title = '选择交易'
				// 	this.content = '确认对该交易进行监视，策略修改， 卖出操作?'
				// }
				//console.log(item,index)
				//this.$refs.modal.open()
				// this.clist[index].value = !this.clist[index].value
			},
			// 单个的更新策略
			async dangeUpdateStrategyTradingop(item, index) {
				// this.selectClist = []
				// this.clist[this.currentIndex].list.map((item,index)=>{
				// 	if(item.active) {
				// 		this.selectClist.push(item.CurrencyId)
				// 	}
				// })
				console.log('过来了', this.selectClist.length, this.selectClist.length == 0)
				// let str = this.selectClist.join(',')
				// str = mySelectClist.join(',')
				let str = this.clist[this.currentIndex].list[index].CurrencyId
				let myType = 1
				// 如果没有类型的话,定死1
				// if(this.clist[this.currentIndex].list[index].Type === null || this.clist[this.currentIndex].list[index].Type === 0) {
				if (this.clist[this.currentIndex].list[index].isGiveUp == true) {
					console.log('放弃交易了')
					// 放弃交易
					myType = 0
				} else if (this.clist[this.currentIndex].list[index].isGiveUp == false) {
					console.log('选择交易了')
					// 执行策略循环
					if (this.clist[this.currentIndex].list[index].Type == null || this.clist[this.currentIndex].list[index].Type == 0 ||
						this.clist[this.currentIndex].list[index].Type == 4) {
						myType = 1
					} else {
						myType = this.clist[this.currentIndex].list[index].Type
					}
				}

				// 我添加的end
				let params = {
					UserId: this.UserId,
					Token: this.Token,
					CurrencyGroupId: str,
					// Type: this.paternBtnText
					Type: myType // 定死 1
				}
				// let { data } = await StrategyTradingop(params)
				let data = await post('Trade/StrategyTradingop', params)
				uni.showToast({
					title: data.msg,
					icon: 'none',
					duration: 1000
				})
				if (data.code != 0) {
					return
				}
				// 返回正确修改才更新勾选状态
				this.clist[this.currentIndex].list[index].active = !this.clist[this.currentIndex].list[index].active

				this.paternBtn = this.paternBtnText
				this.closePop()

				// 初始化一下页面数据
				// this.Page = 1
				// this.loadMore = 0
				// this.clist[this.currentIndex].list = []
				// if (this.paternBtnText == 4) {
				// 	this.selectClist = []
				// }

				this.timer = setTimeout(() => {
					// uni.navigateTo({
					// 	url: '/pages/apiLetter/apiLetter'
					// })
					this.Page = 1
					this.loadMore = 0
					this.clist[this.currentIndex].list = []

					this.clist = [{
						list: [],
						isAdd: true
					}, {
						list: [],
						isAdd: true
					}, {
						list: [],
						isAdd: true
					}, {
						list: [],
						isAdd: true
					}]

					if (this.paternBtnText == 4) {
						this.selectClist = []
					}

					this.getStrategyTrading()
					clearTimeout(this.timer);
					this.timer = null;
				}, 1000)

				this.$once('hook:beforeDestroy', () => {
					clearTimeout(this.timer);
					this.timer = null;
				})

				// 要等更改成功才请求
				// this.getStrategyTrading()
			},
			// 批处理,批量更改请求
			async updateStrategyTradingop() {
				// this.selectClist = []
				// this.clist[this.currentIndex].list.map((item,index)=>{
				// 	if(item.active) {
				// 		this.selectClist.push(item.CurrencyId)
				// 	}
				// })
				// if (this.selectClist.length == 0) {
				// 	uni.showToast({
				// 		title: '请先至少选择一种货币',
				// 		icon: 'none',
				// 		duration: 1000
				// 	})
				// 	return
				// }

				// console.log('过来了', this.selectClist.length, this.selectClist.length == 0)
				// let str = this.selectClist.join(',')
				let str = ''
				// 我添加的start
				let mySelectClist = []
				let myRes = false
				this.clist[this.currentIndex].list.map((item, index) => {
					if (item.active == true) {
						myRes = true
						let id = this.clist[this.currentIndex].list[index].CurrencyId
						mySelectClist.push(id)
					}
				})
				if (myRes == false) {
					uni.showToast({
						title: '请先至少选择一种货币',
						icon: 'none',
						duration: 1000
					})
					return
				}
				str = mySelectClist.join(',')
				// 我添加的end
				let params = {
					UserId: this.UserId,
					Token: this.Token,
					CurrencyGroupId: str,
					Type: this.paternBtnText
				}
				// let { data } = await StrategyTradingop(params)
				let data = await post('Trade/StrategyTradingop', params)
				uni.showToast({
					title: data.msg,
					icon: 'none',
					duration: 1000
				})
				if (data.code != 0) {
					return
				}

				this.paternBtn = this.paternBtnText
				// this.closePop()
				// // 初始化一下页面数据
				// this.Page = 1
				// this.loadMore = 0
				// this.clist[this.currentIndex].list = []
				// if (this.paternBtnText == 4) {
				// 	this.selectClist = []
				// }
				// 要等更改成功才请求
				// this.getStrategyTrading()

				this.timer = setTimeout(() => {
					// uni.navigateTo({
					// 	url: '/pages/apiLetter/apiLetter'
					// })
					this.closePop()
					// 初始化一下页面数据
					this.Page = 1
					this.loadMore = 0
					this.clist[this.currentIndex].list = []

					this.clist = [{
						list: [],
						isAdd: true
					}, {
						list: [],
						isAdd: true
					}, {
						list: [],
						isAdd: true
					}, {
						list: [],
						isAdd: true
					}]

					if (this.paternBtnText == 4) {
						this.selectClist = []
					}


					this.getStrategyTrading()
					clearTimeout(this.timer);
					this.timer = null;



				}, 1000)


				this.$once('hook:beforeDestroy', () => {
					clearTimeout(this.timer);
					this.timer = null;
				})
			},
			modalSuccess(e) {
				if (!e) {
					return
				}
				if (this.whatMoabl == 'paternBtn') {
					this.updateStrategyTradingop()
				} else if (this.whatMoabl == 'clickChecks') {
					// this.selectClist.indexOf(this.currentIndexCheck) == -1 ? this.selectClist.push(this.currentIndexCheck) : this.selectClist
					// 	.splice(this.selectClist.findIndex(item => item == this.currentIndexCheck), 1)
					// this.clist[this.currentIndexCheck].value = !this.clist[this.currentIndexCheck].value
				} else {

				}
				// console.log('点击确定')

			},
			// 右上角按钮,
			toKaitong() {
				if (this.Authoriztion == null) {
					uni.showToast({
						title: '您未授权',
						icon: 'none',
						duration: 1000
					})
					if (this.timer != null) {
						return
					}
					this.timer = setTimeout(() => {
						uni.navigateTo({
							url: '/pages/apiLetter/apiLetter'
						})
						clearTimeout(this.timer);
						this.timer = null;
					}, 1000)

					this.$once('hook:beforeDestroy', () => {
						clearTimeout(this.timer);
						this.timer = null;
					})

					return
				}
				// uni.navigateTo({
				// 	// url: '/pages/lianghuaSon/setStrategy/index'
				// 	url: '/pages/lianghuaSon/kaitong/index'
				// })
				// navigate('lianghuaSon/kaitong/index')
				this.GetMemberInfo()
			},

			// 个人信息
			async GetMemberInfo() {
				this.UserId = uni.getStorageSync('userId')
				this.Token = uni.getStorageSync('token')
				let obj = {
					UserId: this.UserId,
					Token: this.Token
				}
				let res = await post('User/GetMemberInfo', obj, {}, false)
				if (res.code != 0) {
					return
				}
				uni.setStorageSync('grade', res.data.grade)
				// isAut: 0, // 0是未开通, 1开通了
				this.isAut = res.data.isAut

				if (this.isAut == 0) {
					// 未开通
					let obj = {
						isEdit: 0
					}
					navigate('lianghuaSon/kaitong/index', obj)
				} else if (this.isAut == 1) {
					let obj = {
						// isEdit: 1
						isEdit: 0
					}
					// 开通了
					navigate('lianghuaSon/userDefined/index', obj)
				}


			},
			// 切换tab
			selectTab(index) {
				this.currentIndex = index
			},
			// 轮播图切换事件
			swiperChange(e) {
				this.isSwitchChange = true
				// this.isGet = true
				// this.isPush = false
				this.clist[this.currentIndex].list = []
				this.currentIndex = e.detail.current
				this.clist[this.currentIndex].list = []

				this.clist = [{
					list: [],
					isAdd: true
				}, {
					list: [],
					isAdd: true
				}, {
					list: [],
					isAdd: true
				}, {
					list: [],
					isAdd: true
				}]

				this.loadMore = 0
				this.Page = 1
				//只有第一次进入对应的swiper-item时才会请求，后续数据的添加或刷新靠下拉加载或触底事件
				// if (!this.clist[this.currentIndex].isAdd || this.clist[this.currentIndex].list.length > 0) return
				this.getStrategyTrading()
			},
			// 点击加号的批量策略按钮
			switchChange(e) {
				let tempRes = false
				this.clist[this.currentIndex].list.map((item, index) => {
					if (item.active == true) {
						tempRes = true
					}
				})
				if (tempRes == false) {
					toast('您还未执行任何策略')
					this.$refs.popup.close()
					return
				}
				if (this.paternBtn == e) return
				this.whatMoabl = 'paternBtn'
				this.paternBtnText = e
				switch (e) {
					case 1:
						this.title = '继续策略循环'
						this.content = '确认对该交易对执行策略循环，达到盈利点，卖出币种，然后会再买入一把这个币种?';
						break;
					case 2:
						this.title = '执行单次策略'
						this.content = '确认对该交易对执行单次策略，卖出后，将不再购买此交易对?';
						break;
					case 3:
						this.title = '不再操作订单'
						this.content = '当该交易下降后，将不再买入该币种，确定不再操作?';
						break;
					case 4:
						this.title = '清仓卖出'
						this.content = '按照当前价格，卖出所有资产，确定清仓吗?';
						break;
					default:
						return
				}
				uni.showModal({
					title: this.title,
					content: this.content,
					success: (res) => {
						if (res.confirm) {
							// this.Page = 1
							// this.loadMore = 0 
							// 	this.clist[this.currentIndex].list = []
							this.modalSuccess(true)
							// this.getStrategyTrading()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				//this.$refs.modal.open()
			},
			// 打开弹窗
			openPop() {
				if (this.Authoriztion == null) {
					uni.showToast({
						title: '您未授权',
						icon: 'none',
						duration: 1000
					})
					if (this.timer != null) return
					this.timer = setTimeout(() => {
						uni.navigateTo({
							url: '/pages/apiLetter/apiLetter'
						})
						clearTimeout(this.timer);
						this.timer = null;
					}, 1000)

					this.$once('hook:beforeDestroy', () => {
						clearTimeout(this.timer);
						this.timer = null;
					})

					return
				}
				this.paternBtn = 0
				this.$refs.popup.open()
				// this.timer = setTimeout(() => {
				// 	this.$refs.popup.open()
				// }, 200)

				// this.$once('hook:beforeDestroy', () => {
				// 	clearInterval(this.timer);
				// 	this.timer = null;
				// })

			},
			// 关闭弹窗
			closePop() {
				this.$refs.popup.close()
			},
			// 点击确定选择交易
			success(e) {
				console.log(e)
				if (!e) return
				// 点击确定了
			},
			// // 个人信息
			// async GetMemberInfo() {
			// 	uni.removeStorageSync('grade')
			// 	this.userId = uni.getStorageSync('userId')
			// 	this.token = uni.getStorageSync('token')
			// 	let obj = {
			// 		UserId: this.userId,
			// 		Token: this.token
			// 	}
			// 	let res = await post('User/GetMemberInfo', obj, {}, false)
			// 	if (res.code != 0) {
			// 		return
			// 	}
			// 	uni.setStorageSync('grade', res.data.grade)
			// 	this.grade = res.data.grade
			// },
			// 获取授权信息
			async GetAuthoriztionInfoList() {
				this.UserId = uni.getStorageSync('userId')
				this.Token = uni.getStorageSync('token')
				let params = {
					UserId: this.UserId,
					Token: this.Token,
					TypeId: 3 // 平台类型：现在写死为 3(火币网) 即可
				}
				// let { data } = await GetAuthoriztionInfo(params)
				let res = await post('User/GetAuthoriztionInfo', params)
				// if(data.code != 0) return uni.showToast({
				// 	title: data.msg,
				// 	duration: 2000,
				// 	icon: 'none'
				// })
				if (res.code == 3) {
					toast(res.msg)
				}
				if (res.code != 0) return
				// this.list = data.data || this.list
				this.Authoriztion = res.data
				if (res.data == null) return
				// this.APIKey = res.data.apiKey
				// this.SecretKey = res.data.secretKey
				console.log('this.Authoriztion:', this.Authoriztion)
			},
			// webscoket开始

			// webscoket结束

			// 计算盈利方法等开始
			// this.clist[this.currentIndex].list
			//保留几位小数，之后的位数截掉不做处理
			ToDec(d, n) {
				var Precision = Math.pow(10, n);
				return Math.floor(Number(d) * Precision) / Precision;
			},
			ToDec4(d) {
				return this.ToDec(d, 4)
			},
			ToDec8(d) {
				return this.ToDec(d, 8)
			},
			//计算盈利百分比
			GetEtcPercent(EtcUsdt, EtcProfit) {
				return EtcUsdt > 0 ? (this.ToDec4(EtcProfit / EtcUsdt) * 100) : 0;
			},
			//预估盈利
			GetProfit(Symbol, EtcAmount, EtcUsdt, newprice) {
				// if (EtcUsdt <= 0) return;
				if (EtcUsdt <= 0) {
					return 0
				}
				var Price = Number(EtcAmount) * Number(newprice); //预计卖出获得USDT
				var SellFee = Price * 0.002; //预计卖出火币收取手续费USDT//0.002//火币卖出手续费
				var Profit = Price - Number(EtcUsdt) - SellFee;
				//     var EtcPercent = this.GetEtcPercent(Number(EtcUsdt), Profit);

				//     if (Symbol) {//更新对应币种预估盈利

				//     }
				return Profit

			},
			// 计算盈利方法等结束
			// closeFooter(){
			// 	this.showOrHide = false
			// },
			// openFooter(){
			// 	this.showOrHide = true
			// },
			// sell(){

			// }
		}
	}
</script>

<style scoped>
	@import url("./style");
</style>
