<template>
	<view class="big-box">
		<view :style="{'height':customBar+'upx'}"></view>
		<view class="home_top">
			<swiper class="swiper" indicator-active-color="#FFFFFF" :indicator-dots="indicatorDots" :autoplay="autoplay"
			 :interval="interval" :duration="duration" :circular="true">
				<swiper-item v-for="item in swiperList" :key="item.id">
					<view class="swiper-item">
						<image @click="toAd(item)" :src="item.Pic" class="img" mode="scaleToFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="Notice-swiper">
			<view class="Notice-icon"><image src="../../../static/navigitc.png"></view>
			<swiper class="swiper-Notice" autoplay="autoplay" :duration="2000" circular="true" vertical="true">
				<swiper-item v-for="(item,index) in NewsList" :key="index" @click="golink(`/pages/noticeDetail/noticeDetail?Id=${item.Id}`)">
					<view class="swiper-item">{{item.Title}}</view>
				</swiper-item>
			</swiper>
			<view class="more-icon iconfont icon-dayuhao" @click="golink('/pages/tabbar/notice/notice')"></view>
		</view>
		<view class="list-kefu">
			<view @click="golink('/pages/friends/friends')"><image src="../../../static/qusitonss.png"></view>
			<view @click="golink('/pages/lookCourse/lookCourse')"><image src="../../../static/kefuss.png"></view>
		</view>
		<!-- <view class="w-bg">
		</view> -->
		<view class="main-Content">
			<!-- <view class="menu">
				<view @click="clcikButton(item,index)" class="menu-item" v-for="(item,index) in menuList" :key="item.id">
					<image :src="item.logo" class="img" mode="aspectFit"></image>
					<view class="text" style="overflow: hidden;">
						{{ item.name }}
					</view>
					<image :src="item.logo" class="img shadow1" mode="aspectFill"></image>
				</view>
			</view> -->
			<!-- <view class="w-bg my-ml30">

			</view>
			<view>
				<news>
					<template v-slot:left>
						<text class="h1-title">资讯</text>
					</template>
					<template v-slot:right>
						<text class="gengduo" @click="toHomeMore">更多</text>
					</template>
					<template v-slot:mainContent>
						<view class="box" v-if="realTime">
							<view class="box-left">
								<image :src="realTime[0].Pic" @click="goPage(realTime[0].Url)" class="img" mode="aspectFill"></image>
							</view>
							<view class="box-right">
								<image :src="realTime[1].Pic" @click="goPage(realTime[1].Url)" class="img" mode="aspectFill"></image>
								<image :src="realTime[2].Pic" @click="goPage(realTime[2].Url)" class="img" mode="aspectFill"></image>
							</view>
						</view>
					</template>
				</news>
			</view> -->

			<!-- <view class="quotation" v-if="isshow"> -->
			<view class="quotation">
				<view class="w-bg my-ml30">

				</view>
				<news>
					<template v-slot:left>
						<text class="h1-title">行情</text>
						<!-- 	{{ '--' |  four}}
						{{ '0' |  four}}
						{{ 0 |  four}}
						{{ 0.0000 |  four}}
						{{ '0.0000' |  four}} -->
					</template>
					<template v-slot:right>
						<text></text>
					</template>
					<template v-slot:mainContent>
						<!-- <view class="quotation-item" v-for="item in quotation" :key="item.id"> -->
						<!-- <block v-for="(item,index) in top7List" :key="index"> -->
				<!-- 		<view class="quotation-item">
							<view class="quotation-item-left">
								{{ btcusdt.name }}
							</view>
							<view class="quotation-item-center fs-16">
								<view class="">
									${{ btcusdt.close | four(6) }}
								</view>
							</view>
							<view class="quotation-item-right">
								<text class="" :class="btcusdt.baifenbi >= 0 ? 'green':'red'">
									{{ btcusdt.baifenbi > 0 ? "+" : ''}}{{ btcusdt.baifenbi | four(2) }}%
								</text>
							</view>
						</view> -->
						<view class="filterMenus">
							<view class="menus">
								<view class="item" :class="{'active':item.active}" v-for="(item,index) in filterTab" :key="index" @click="shiftFilterTab(index)">
									{{item.name}}
									<text v-if="item.single"></text>
									<text v-else class="iconfont filterBtn" :class="{upBtn:item.sortorder == '0',downBtn:item.sortorder == '1'}"></text>
								</view>
							</view>
						</view>
						
						<block v-for="(item,index) in marketList" :key="index">
							<view class="quotation-item" :style="{'margin-top':index==0?'-20upx':''}">
								<!-- <view class="quotation-item"> -->
								<!-- <view class="quotation-item" v-for="(item,index) in websocketList" :key="index"> -->
								<view class="quotation-item-left">
									<view class="itemName-img">
										<image :src="item.Logo"></image>
										<view class="paihan">{{index | paihanfilter}}</view>
									</view>
									<view class="itemName-sy">
										<view class="sy-title">{{item.Names | namefilter}}</view>
										<view class="znName" v-if="item.ZhName ">{{item.ZhName}}/</view>
										<view class="znName">{{item.EnName}}</view>
									</view>
									<!-- {{ item.name }} -->
									<!-- {{ item.Name }} -->
								</view>
								<view class="quotation-item-center fs-16">
									<!-- {{ item.amount }} -->
									<view class="marketvalue">
										<view class="" v-if="item.marketprice">{{item.marketprice | Billionfilter}}</view>
										<view class="" v-else>--</view>
										<view class="markettimeall">24H:{{item.amount | Billionfilter}}</view>
									<!-- 	</br>
										${{ item.close | four(16) }} -->
									</view>
									<!-- <view class="">
										¥{{ (item.close * 6.7) | four  }}
									</view> -->

								</view>

								<!-- :class="item.right.split('')[0] == '+' ? 'green' : 'red'" -->
								<view class="quotation-item-right">
									<!-- <text :class="+item.open > +item.close ? 'red':'green'" v-html="decimal(item,5)"> -->
									<view class="" :class="item.baifenbi >= 0 ? 'green':'red'">
										<view class="" style="font-size: 30upx;">${{ item.close | four(6) }}</view>
										<!-- {{ item.close > item.open ? '+'+((item.close - item.open)/item.close).toFixed(5)+'%' : ((item.close - item.open)/item.close).toFixed(5) +'%' }} -->
										<view style="font-size: 26upx; margin-top: 10upx;">{{ item.baifenbi > 0 ? "+" : ''}}{{ item.baifenbi | four(2) }}%</view>
									</view>
								</view>
							</view>
						</block>

						<!-- <view class="line">

						</view> -->
					</template>
				</news>
			</view>
		</view>
		<view class="my-tab-empty-box">

		</view>
		<tabbar :grade='grade' :current='0'></tabbar>

		<!-- 确认弹窗 -->
		<!-- <my-showModal ref='modal' @success='modalSuccess' :title='title' :content='content'></my-showModal> -->
	</view>
</template>
<script>
	import news from '@/components/News.vue'
	import {
		BannerList,
		GetPlatformTypeList,
		GetAnyInformation,
		GetLastCandlestickAskBid,
		GetRechargeNoticeInfo
	} from '@/common/js/http.js'

	import {
		StrategyTrading,
		GetAllCurrencyList
	} from '@/common/js/http.js'
	import {
		post,
		get,
		navigate,
		switchTab,
		judgeLogin,
		toast,
		trim,
		TNT,
		webSocketPath
	} from '@/common/utils/index.js';
	// var pako = require('pako');w
	import pako from 'pako'
	export default {
		data() {
			return {
				customBar: this.customBar,
				haomiaoshu: 3000,
				// 开关ws的变量
				wsSw: true,
				
				pageIndex: 1,
				pageSize: 12,
				loadMore: 0, // 0-loading前；1-loading中；2-没有更多了

				grade: 1, // 1游客, 2体验用户,3正式用户,4初级交易员,5中级交易员,6高级交易员,7社区
				userId: '',
				token: '',
				isTan: false,
				UserId: '',
				Token: '',
				
				is_open_socket: true,

				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 500,
				swiperList: [
					// { id: 1, Pic: require('@/static/index/banner.png')},
					// { id: 2, Pic: require('@/static/index/banner.png')},
					// { id: 3, Pic: require('@/static/index/banner.png')}
				],
				menuList: [],
				quotation: [],
				// ws连接实例
				socketTask: null,
				// 定时器
				timer: null,
				timer2: null, // 计时ws,定时发送
				timer3: null, // 计时失败连接后的重连,减少连接频率
				// 弹窗
				title: '未登录',
				// content: '此操作不可逆，确认删除？'
				content: '是否跳转登录页面?',
				realTime: null,
				isshow: false,
				// 设备唯一标识
				uuid: '',
				// 解压
				pako: '',
				// 全部货币种类数组
				allCoin: [],
				// 行情排行数组 (7个)
				top7List: [],
				// websocket 请求下来的数据,做成的数组
				websocketList: [
					// {
					// 	Symbol: 'btcusdt',
					// 	close: 0
					// }
				],
				// 基础货币
				baseCoin: 'USDT', // 现在是USDT
				// 当前传输
				nowTemp: '',
				// Socket是否连接错误了
				isSocketError: true,
				// 固定的行情显示顺序
				// BTC、BCH、BSU、ETH、EOS、HT、LTC、LinK、XRP、ADA
				btcusdt:{
						name: 'BTC/USDT',
						symbol: 'btcusdt',
						decimal: 0,
						close: 0,
						amount: 0,
						baifenbi: 0,
						Circulation:0,
				},
				bchusdt: {
					name: 'BCH/USDT',
					symbol: 'bchusdt',
					decimal: 0,
					close: 0,
					amount: 0,
					baifenbi: 0,
					Circulation:0,
				},
				bsvusdt: {
					name: 'BSV/USDT',
					symbol: 'bsvusdt',
					decimal: 0,
					close: 0,
					amount: 0,
					baifenbi: 0,
					Circulation:0,
				},
				ethusdt: {
					name: 'ETH/USDT',
					symbol: 'ethusdt',
					decimal: 0,
					close: 0,
					amount: 0,
					baifenbi: 0,
					Circulation:0,
				},
				eosusdt: {
					name: 'EOS/USDT',
					symbol: 'eosusdt',
					decimal: 0,
					close: 0,
					amount: 0,
					baifenbi: 0,
					Circulation:0,
				},
				htusdt: {
					name: 'HT/USDT',
					symbol: 'htusdt',
					decimal: 0,
					close: 0,
					amount: 0,
					baifenbi: 0,
					Circulation:0,
				},
				ltcusdt: {
					name: 'LTC/USDT',
					symbol: 'ltcusdt',
					decimal: 0,
					close: 0,
					amount: 0,
					baifenbi: 0,
					Circulation:0,
				},
				linkusdt: {
					name: 'LinK/USDT',
					symbol: 'linkusdt',
					decimal: 0,
					close: 0,
					amount: 0,
					baifenbi: 0,
					Circulation:0,
				},
				xrpusdt: {
					name: 'XRP/USDT',
					symbol: 'xrpusdt',
					decimal: 0,
					close: 0,
					amount: 0,
					baifenbi: 0,
					Circulation:0,
				},
				adausdt: {
					name: 'ADA/USDT',
					symbol: 'adausdt',
					decimal: 0,
					close: 0,
					amount: 0,
					baifenbi: 0,
					Circulation:0,
				},
				filterTab: [
					{
						name: "币种",
						sortname: 0,
						isSortorder: false,
						single:true
					},
					{
						name: "币市值(CNY)",
						sortorder: 1, //0-升序，1降序
						sortname: 1,
						isSortorder: true,
						active: true
					},
					{
						name: "价格",
						sortorder: "", //0-升序，1降序
						sortname: 2,
						isSortorder: true,
						active: false
					}
				],
				NewsList:[],//公告列表
				cnySell:6.49,//汇率
				IDlist:'',//获取币种id
				strattri:'close',
				sorttype:'',
				marketList: [
					// this.btcusdt,
					// this.bchusdt,
					// this.bsvusdt,
					// this.ethusdt,
					// this.eosusdt,
					// this.htusdt,
					// this.ltcusdt,
					// this.linkusdt,
					// this.xrpusdt,
					// this.adausdt
				],
				
				myMibaoList:[],
				isLoadMibaoList: false,
				// marketList: [{
				// 		name: 'BTC/USDT',
				// 		symbol: 'btcusdt',
				// 		decimal: 0,
				// 		close: 0,
				// 		amount: 0,
				// 		baifenbi: 0
				// 	},
				// 	{
				// 		name: 'BCH/USDT',
				// 		symbol: 'bchusdt',
				// 		decimal: 0,
				// 		close: 0,
				// 		amount: 0,
				// 		baifenbi: 0
				// 	},
				// 	{
				// 		name: 'BSV/USDT',
				// 		symbol: 'bsvusdt',
				// 		decimal: 0,
				// 		close: 0,
				// 		amount: 0,
				// 		baifenbi: 0
				// 	},
				// 	{
				// 		name: 'ETH/USDT',
				// 		symbol: 'ethusdt',
				// 		decimal: 0,
				// 		close: 0,
				// 		amount: 0,
				// 		baifenbi: 0
				// 	},
				// 	{
				// 		name: 'EOS/USDT',
				// 		symbol: 'eosusdt',
				// 		decimal: 0,
				// 		close: 0,
				// 		amount: 0,
				// 		baifenbi: 0
				// 	},
				// 	{
				// 		name: 'HT/USDT',
				// 		symbol: 'htusdt',
				// 		decimal: 0,
				// 		close: 0,
				// 		amount: 0,
				// 		baifenbi: 0
				// 	},
				// 	{
				// 		name: 'LTC/USDT',
				// 		symbol: 'ltcusdt',
				// 		decimal: 0,
				// 		close: 0,
				// 		amount: 0,
				// 		baifenbi: 0
				// 	},
				// 	{
				// 		name: 'LinK/USDT',
				// 		symbol: 'linkusdt',
				// 		decimal: 0,
				// 		close: 0,
				// 		amount: 0,
				// 		baifenbi: 0
				// 	},
				// 	{
				// 		name: 'XRP/USDT',
				// 		symbol: 'xrpusdt',
				// 		decimal: 0,
				// 		close: 0,
				// 		amount: 0,
				// 		baifenbi: 0
				// 	},
				// 	{
				// 		name: 'ADA/USDT',
				// 		symbol: 'adausdt',
				// 		decimal: 0,
				// 		close: 0,
				// 		amount: 0,
				// 		baifenbi: 0
				// 	}
				// ]
			}
		},
		components: {
			news
		},

		watch: {

		},
		onShow() {
			// this.pako = require('pako');
			// console.log('pako', this.pako)
			uni.hideTabBar()
			// uni.showLoading({
			//     title: '加载中'
			// });
			// this.GetAllCurrency()
			this.init()
			// this.connectSocketInit();

			// this.openSocket();
			// this.GetCurrencyMarkets()
			this.userId = uni.getStorageSync('userId')
			this.token = uni.getStorageSync('token')
			
			this.GetSecuritystatus()
		},
		onHide() {
			// this.quotation = []
			// this.isshow = false 
			this.isshow = true
			//this.closeSocket();
			this.is_open_socket = false
		},

		onLoad() {
			this.marketList =[
				this.btcusdt,
				this.bchusdt,
				this.bsvusdt,
				this.ethusdt,
				this.eosusdt,
				this.htusdt,
				this.ltcusdt,
				this.linkusdt,
				this.xrpusdt,
				this.adausdt
			]
			// 打开行情ws
			this.GetCurrencyMarkets()
			this.openSocket()

			// this.openSocket()
			// this.pako = require('pako');
			// console.log('pako', this.pako)
			// this.init()
			uni.hideTabBar()
			this.userId = uni.getStorageSync('userId')
			this.token = uni.getStorageSync('token')
			// this.GetPlatformType()
			this.getBannerList()
			// this.getRealTime()
			this.getNewsList()
			// uni.showLoading({
			// 	title: '加载中'
			// });
			// this.GetAllCurrency()

			//this.getPriceList()
			// lc不足
			// this.GetRechargeNotice()
			
			// if(!judgeLogin()) return
			// if (!this.isLogin()) {
			// 	// 未登录打开弹窗
			// 	clearInterval(this.timer);
			// 	this.timer = null;
			// 	this.timer = setTimeout(() => {
			// 		this.$refs.modal.open()
			// 	}, 200)
			// 	this.$once('hook:beforeDestroy', () => {
			// 		clearInterval(this.timer);
			// 		this.timer = null;
			// 	})
			// 	return
			// }
		},
		// 下拉刷新
		onPullDownRefresh() {
			// Object.assign(this.$data, this.$options.data())
			// this.GetCurrencyMarkets()
			// this.openSocket()
			
			// this.socketTask.close({
			// 	success: ()=>{
			// 		console.log('手动关闭连接 成功')
			// 	},
			// 	fail: ()=>{
			// 		console.log('手动关闭连接 失败')
			// 	},
			// })
			new Promise((res, rej) => {
				// this.init()
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				this.GetCurrencyMarkets()
				this.GetPlatformType()
				this.getBannerList()
				this.getRealTime()
				// this.GetAllCurrency()
				res()
			}).then(() => {
				uni.stopPullDownRefresh()
			})
		},
		methods: {
			// 获取密保状态
			async GetSecuritystatus() {
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				let obj = {
					UserId: this.userId,
					Token: this.token
				}
				let res = await post('Login2021/GetSecuritystatus', obj)
				if(res.code != 0) {
					return
				}
				this.myMibaoList = res.data.guards
				// this.myMibaoList = []
				// this.mibaoList.map((item, index) => {
				// 		 res.data.map((item2, index2) => {
				// 			if(item2 == item.code) {
				// 				this.myMibaoList.push(item)
				// 			}
				// 		})
				// })
				// if(this.myMibaoList.length) {
				// 	this.mibaoWenti1 = this.myMibaoList[0].message
				// 	this.mibaoWenti2 = this.myMibaoList[0].message
				// 	this.OldGuardList[0].Id = this.myMibaoList[0].code
				// 	this.NewGuardList[0].Id = this.myMibaoList[0].code
				// }
				this.isLoadMibaoList = true
				
				if(this.myMibaoList.length == 0 && this.isLoadMibaoList == true) {
					// 去密保重置页面
					uni.showModal({
						title: '您未设置密保',
						content: '是否前往设置？',
						success:(res) =>{
							if(res.confirm) {
								navigate('updateQuestion/updateQuestion')
							}
						}
					})
					return
				}
			},
			golink(url,index){console.log(index)
				if(index==1){
					if(judgeLogin()){
						uni.navigateTo({
							url:url
						})
					}
				}else{
					uni.navigateTo({
						url:url
					})
				}
			},
			async GetRechargeNotice() {
				if (this.userId == '' && this.token == '') {
					return
				}
				let params = {
					UserId: this.userId,
					Token: this.token
				}
				let {
					data
				} = await GetRechargeNoticeInfo(params)
				
				if (data.code != 0) return
				uni.showToast({
					title: '您的点卡余额不足',
					icon: 'none',
					duration: 2000
				})
			},
			// decimal(item, v) {
			// 	let cut = item.close - item.open
			// 	// return cut > 0 ? '+'+Math.round(cut*Math.pow(10,v))/Math.pow(10,v)+'%' : Math.round(cut*Math.pow(10,v))/Math.pow(10,v)+'%'
			// 	// return cut > 0 ? '+'+cut.toFixed(5)+'%' : cut.toFixed(5)+'%'
			// 	return cut > 0 ? '+' + (cut / item.open).toFixed(5) + '%' : (cut / item.open).toFixed(5) + '%'
			// },
			// 初始化
			init() {
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				// // 打开行情ws
				// this.openSocket()
				// this.GetMemberInfo()
				
				// lc不足
				this.GetRechargeNotice()
			},
			// 立即获取行情
			async GetCurrencyMarkets() {
				let res = await get('Trade/GetCurrencyMarkets', {}, {}, false)
				if (res.code != 0) {
					return
				}
				// str = temp5.ch.match(/market\.(\S*)\.detail/)[1];
				let tempList = res.data
				// console.log(tempList)
				tempList.map((item, index) => {
					// console.log("原始",item)
					let str = item.Symbol
					
					// 数据
					let cut = item.close - item.open
					let baifenbi = (cut * 100 / item.open)
					
					
					let amount = item.amount
					let close = item.close
					let Logo = item.Logo
					let Circulation = item.Circulation
					let marketprice = item.Circulation * item.close * this.cnySell;
					let ZhName = item.ZhName
					let EnName = item.EnName
					let Names = item.Name
					// this.marketList.map((item,index)=>{})
					this.marketList.map((item2, index2) => {
						if (str == item2.symbol) {
							this.marketList[index2].amount = amount
							this.marketList[index2].close = close
							this.marketList[index2].baifenbi = baifenbi
							this.marketList[index2].Logo = Logo
							this.marketList[index2].Circulation = Circulation
							this.marketList[index2].marketprice = marketprice.toFixed(2)
							this.marketList[index2].ZhName = ZhName
							this.marketList[index2].EnName = EnName
							this.marketList[index2].Names = Names
							// this.marketList[index].decimal = decimal\
							// let fiter =  name.slice(0,name.indexOf('/')).toLowerCase()
							// let final = get(`Trade/CurrencyInfo?pageIdentifier=${fiter}`).then(res=>{
							// 	console.log(res)
							// 	this.marketList[index2].fullName = res.data[0].fullName
							// 	this.marketList[index2].pageIdentifier = res.data[0].pageIdentifier.toUpperCase()
							// })
						}
					})
					// console.log(this.marketList)
// 

				})
				// let final = await get(`CurrencyInfo?pageIdentifier=btcusdt`)
				// let final = await get(`CurrencyInfo?pageIdentifier=`,{
				// 	pageIdentifier:'btcusdt'
				// })
				// console.log(this.marketList)

			},
			// 个人信息
			async GetMemberInfo() {
				uni.removeStorageSync('grade')
				let obj = {
					UserId: this.userId,
					Token: this.token
				}
				let res = await post('User/GetMemberInfo', obj, {}, false)
				if (res.code != 0) {
					return
				}
				uni.setStorageSync('grade', res.data.grade)
				this.grade = res.data.grade
			},
			// 获取设备唯一标识
			getUuid() {
				return new Promise((resolve, reject) => {
					// #ifdef APP-PLUS
					plus.device.getInfo({
						success: function(e) {
							console.log('getDeviceInfo success: ' + JSON.stringify(e));
							let uuid = JSON.stringify(e)
							resolve(uuid);
						},
						fail: function(e) {
							console.log('getDeviceInfo failed: ' + JSON.stringify(e));
							reject();
						}
					});
					// #endif
				})

			},
			// 发送消息
			mySendSocketMessage(value) {
				
				let myDate = new Date();
				let mytime = myDate.toLocaleTimeString();
				
				try {
					// console.log(mytime,'发送了', value)
					let temp2 = JSON.stringify(value)
					
					// uni.sendSocketMessage({
					this.socketTask.send({
						data: temp2,
						fail: () => {
							console.log(mytime,'发送失败了了')
						},
						success: () => {
							// console.log(mytime,'发送成功了了',temp2)
						}
					});
				} catch (e) {
					console.log('发送消息出错了')
				}

			},
			
			unique(arr, objs,Symbol ='Symbol') {
				// arr = JSON.parse(JSON.stringify(arr))
				var res = arr.some(item => {
					//console.log(item,objs.secondId)
					if (item[Symbol] == objs[Symbol]) {
						return true
					}
				})
				// console.log(res) // 如果arr数组对象中含有item.secondId,就会返回true，否则返回false
				if (res) { // 如果存在
					var index = arr.findIndex((item) => {
						return item[Symbol] === objs[Symbol];
					});
					// console.log(index); //找到相同ID对象的index
					arr.splice(index, 1, objs) //去重，替换数组
				} else {
					arr.push(objs)
				}
				
				return arr
			},
			
			//不替换去重
			uniqueNo(arr, objs,Symbol ='Symbol') {
				// arr = JSON.parse(JSON.stringify(arr))
				var res = arr.some(item => {
					//console.log(item,objs.secondId)
					if (item[Symbol] == objs[Symbol]) {
						return true
					}
				})
				// console.log(res) // 如果arr数组对象中含有item.secondId,就会返回true，否则返回false
				if (res) { // 如果存在
					
					var index = arr.findIndex((item) => {
						return item[Symbol] === objs[Symbol];
					});
					let test = {...arr[index],...objs}
					// console.log(index); //找到相同ID对象的index
					arr.splice(index, 1, test) //去重，替换数组
				} else {
					arr.push(objs)
				}
				
				return arr
			},

			// 排序
			sortId(property,rev) {
				if(rev ==  undefined){
					rev = 1;
				}else{
					rev = (rev) ? 1 : -1;
				}
				return function(a,b){
					a = a[property];
					b = b[property];
					if(a < b){
						return rev * -1;
					}
					if(a > b){
						return rev * 1;
					}
					return 0;
				}
			},
			mySortId(result) {
				result.sort(this.sortId(this.strattri,this.sorttype));
				// console.log('去重后排序result: ', result);
				return result
			},

			// 连接socket
			// async openSocket() {
			openSocket() {
				if(this.socketTask != null) {
					return
				}
				// #ifdef APP-PLUS
				// this.uuid = await this.getUuid()
				this.uuid = new Date().getTime()
				// #endif
				// #ifdef H5
				this.uuid = new Date().getTime()
				// #endif

				// 创建连接
				try {
					// uni.connectSocket({
					this.socketTask = uni.connectSocket({
						// url:wssHost+'/WebSocketServer.ashx?Signature='+res.data.Signature,
						// url: 'wss://api.btcgateway.pro/ws',
						// url: 'ws://lhapi.wtvxin.com/WebSocketServer.ashx',
						url: webSocketPath,
						complete(err) {
							// console.log(err,res.data.Signature)
							clearInterval(this.timer2)
							this.timer2 = null
						},
						success: (data) => {
							console.log("websocket创建连接成功");
						},
						fail: () => {
							console.log("websocket创建连接失败");
							
						}
					})
				} catch (e) {
					//TODO handle the exception
					console.log('连接封装的出错了')
				}

				// uni.onSocketOpen((ress) => {
				this.socketTask.onOpen((ress) => {
					console.log('成功连接', ress)
					this.mySendSocketMessage({
						"id": ''
					})
					// 发送消息
					clearInterval(this.timer2)
					clearInterval(this.timer3)
					this.timer2 = null
					this.timer2 = setInterval(() => {
						// console.log('定时发送')
						this.mySendSocketMessage({
							"id": ''
						})
					}, this.haomiaoshu)
				})
				// uni.onSocketError((err) => {
				this.socketTask.onError((err) => {
					console.log('失败连接', err)
					clearInterval(this.timer2)
					this.timer2 = null
					this.socketTask = null
					
					// toast('系统错误，请重新尝试')
					this.timer3 = setInterval(() => {
						// console.log('定时发送')
						this.openSocket()
					}, this.haomiaoshu)
					
					
					// this.isSocketError = true
					// uni.closeSocket()
					// this.socketTask.close({
					// 	success: ()=>{
					// 		console.log('手动关闭连接 成功')
					// 	},
					// 	fail: ()=>{
					// 		console.log('手动关闭连接 失败')
					// 	},
					// })
					
				})
				// uni.onSocketClose((res) => {
				this.socketTask.onClose((res) => {
					clearInterval(this.timer2)
					this.timer2 = null
					this.socketTask = null
					console.log('WebSocket 已关闭！');
					// 是已经关闭了
					// uni.closeSocket()
					this.openSocket()
					// this.isSocketError = false
				});

				// uni.onSocketMessage((ress) => {
				this.socketTask.onMessage((ress) => {
					// console.log('收到了')
					// console.log(ress)
					// console.log(Object.prototype.toString.call(ress))
					if (Object.prototype.toString.call(ress.data) === '[object ArrayBuffer]') {
						// 解压,判断
						// console.log(ress.data)
						let info = pako.inflate(ress.data, {
							to: "string"
						}); //解压成字符串
						info = JSON.parse(info)
						
						// let myDate = new Date();
						// let mytime = myDate.toLocaleTimeString();
						// console.log('收到了',info)
						
						// 如果是ping,需要重新发送
						if (info.ping) {
							let temp4 = {
								pong: info.ping
							}
							this.mySendSocketMessage(temp4)
						}
						if (info.ch) {
							// 一个对象,存储变化的
							let bianObj = {
								close: 0,
								baifenbi: 0,
								amount: 0
							}
							// 如果是数据,并且不是坏的数据
							let temp5 = JSON.parse(JSON.stringify(info))
							// console.log('收到了',temp5)
							// ch: "market.BTC_CW.detail"
							
							// 取出中间的货币名字
							// let str = temp5.ch.match(/market\.(\S*)_CW\.detail/)[1];
							let str = ''
							let info2 = ''
							// console.log('处理,',temp5.ch.match(/market\.(\S*)\.detail/))
							// if(temp5.ch.match(/market\.(\S*)\.detail/) != null) {
							if (temp5.ch.match(/market\.(\S*)\.kline.1day/) != null) {
								// 如果是百分比
								// str = temp5.ch.match(/market\.(\S*)\.detail/)[1];
								str = temp5.ch.match(/market\.(\S*)\.kline.1day/)[1];
								
								// 数据
								let cut = info.tick.close - info.tick.open
								let baifenbi = (cut * 100 / info.tick.open)
								
								// console.log('涨跌:涨跌:涨跌:涨跌:', baifenbi)
								// let amount = info.tick.amount.toFixed(2)
								// let amount = info2.tick.bid.toFixed(2)
								// let amount = info2.tick.bid
								// let close = info.tick.close.toFixed(2)
								let close = info.tick.close
								let amount = info.tick.amount
								// console.log(info)
								// 存储到vuex,用于交易页面
								let tempWebList = []
								// tempWebList = this.unique([...JSON.parse(JSON.stringify(this.websocketList))], {
								// 	Symbol: str,
								// 	close: close
								// })
								tempWebList = this.unique(this.websocketList, {
									Symbol: str,
									close: close
								},Symbol)
								
								
								this.websocketList = tempWebList  
								// console.log('websocketList',this.websocketList.length)
								this.$store.commit('update', {
									"websocketList": this.websocketList
								})
							
								
								
								if(this[str]) {
									// console.log(this[str])
									this.$set(this[str],'close',close)
									this.$set(this[str],'baifenbi',baifenbi)
									this.$set(this[str],'amount',amount)
									let marketprice = this[str].Circulation * this[str].close * this.cnySell// console.log(this[str].amount * this[str].close * this.cnySell)
									this.$set(this[str],'marketprice',marketprice.toFixed(2))
									
									// this.$set(this[str],'',)
									this.$forceUpdate()
									
									let myDate = new Date();
									let mytime = myDate.toLocaleTimeString();
									
									// console.log(this[str])
									let temparr = this.uniqueNo(this.marketList,{
										name:str,
										Symbol:str,
										symbol:str,
										close:close,
										baifenbi:baifenbi,
										amount:amount,
										marketprice:marketprice
										
									},'symbol')
									this.marketList = this.mySortId(temparr)
									// console.log(mytime,str+'百分比----',baifenbi)
									// console.log(mytime,str+'最新价----',close)
									
								}
								
								// if('linkusdt' === str) {
								// 	let myDate = new Date();
								// 	let mytime = myDate.toLocaleTimeString();
								// 	console.log(mytime,'linkusdt百分比----',baifenbi)
								// 	console.log(mytime,'linkusdt最新价----',close)
								// 	// this[str].close = close
								// 	// this[str].baifenbi = baifenbi
								// 	// this.$set(this[str],'close',close)
								// 	// this.$set(this[str],'baifenbi',baifenbi)
								// 	// this.$forceUpdate()
								// }
								// if('btcusdt3lusdt' === str) {
								// 	let myDate = new Date();
								// 	let mytime = myDate.toLocaleTimeString();
								// 	console.log(mytime,'btcusdt3lusdt百分比----',baifenbi)
								// 	console.log(mytime,'btcusdt3lusdt最新价----',close)
								// 	// this[str].close = close
								// 	// this[str].baifenbi = baifenbi
								// 	// this.$set(this[str],'close',close)
								// 	// this.$set(this[str],'baifenbi',baifenbi)
								// 	// this.$forceUpdate()
								// }
								// let decimal = info.tick.decimal.toFixed(2)

								// this.marketList.map((item,index)=>{})
								// let closeBaifenbiArr = this.marketList.map((item, index) => {
								// 	if (str == item.symbol) {
								// 		// this.marketList[index].amount = amount
								// 		// this.marketList[index].decimal = decimal
								// 		// this.marketList[index].close = close
								// 		// this.marketList[index].baifenbi = baifenbi
								// 		// this.$set(bianObj,'close',close)
								// 		// this.$set(bianObj,'baifenbi',baifenbi)
								// 		// this.$set(bianObj,'name',this.marketList[index].name)
								// 		// {
								// 		// 	name: 'HT/USDT',
								// 		// 	symbol: 'htusdt',
								// 		// 	decimal: 0,
								// 		// 	close: 0,
								// 		// 	amount: 0,
								// 		// 	baifenbi: 0
								// 		// },
								// 		// this.$set(this.marketList[index],'close',close)
								// 		// this.$set(this.marketList[index],'baifenbi',baifenbi)
								// 		item.close = close
								// 		item.baifenbi = baifenbi
								// 		// this.$set(this.marketList,index,bianObj)
								// 		// this.$forceUpdate()
								// 	}
								// 	// console.log(item,index)
								// 	return item
								// })
								// this.marketList = [...closeBaifenbiArr]
								// this.marketList = [...closeBaifenbiArr]
								// this.marketList = JSON.parse(JSON.stringify(closeBaifenbiArr))
								// this.$forceUpdate()
								
								// // 存储到vuex,用于交易页面
								// let tempWebList = []
								// // tempWebList = this.unique([...JSON.parse(JSON.stringify(this.websocketList))], {
								// // 	Symbol: str,
								// // 	close: close
								// // })
								// tempWebList = this.unique(this.websocketList, {
								// 	Symbol: str,
								// 	close: close
								// })
								
								
								// this.websocketList = tempWebList  
								// // console.log('websocketList',this.websocketList.length)
								// this.$store.commit('update', {
								// 	"websocketList": this.websocketList
								// })
								

							} else if (temp5.ch.match(/market\.(\S*)\.bbo/) != null) {
									// // 如果是中间的
									// str = temp5.ch.match(/market\.(\S*)\.bbo/)[1];
									// info2 = JSON.parse(JSON.stringify(info))
									// // 数据
									// let amount = info2.tick.bid
									// // let close = info.tick.close.toFixed(2)
									// // let decimal = info.tick.decimal.toFixed(2)
									// if('btcusdt' === str) {
									// 	console.log('btcusdt中间的----',amount)
									// }
									// // this.marketList.map((item,index)=>{})
									// this.marketList.map((item, index) => {
									// 	if (str == item.symbol) {
									// 		// this.marketList[index].amount = amount
									// 		this.$set(this.marketList[index],'amount',amount)
									// 		this.$forceUpdate()
									// 	}
									// 	// console.log(item,index)
									// })
									
							}else if(temp5.ch.match("cny") != null){
								this.cnySell = temp5.sell;
								this.$store.commit('exchangerate',this.cnySell)
								// console.log(this.cnySell)
							}
								
						}else {
							if(!info.ping) {
								console.log('坏的数据',info)
							}
						}
						// // 全部货币种类数组
						// allCoin: [],
						// // 行情排行数组 (7个)
						// top7List: [],
						// // websocket 请求下来的数据,做成的数组
						// websocketList: []
					}

				})
			},
			// async GetAllCurrency() {
			// 	let {
			// 		data
			// 	} = await GetAllCurrencyList({})
			// 	console.log(data)
			// 	if (data.code != 0) return
			// 	let list = JSON.parse(JSON.stringify(data.data))
			// 	for (let i of list) {
			// 		this.quotation.push({
			// 			name: i.symbol,
			// 			Name: i.name
			// 		})
			// 		let myCoinName = i.name.split('/')[0]
			// 		this.baseCoin = i.name.split('/')[1]
			// 		// console.log('this.baseCointhis.baseCointhis.baseCoin', this.baseCoin)
			// 		this.allCoin.push({
			// 			name: myCoinName,
			// 			symbol: i.symbol
			// 		})
			// 		this.marketList.map((item, index) => {
			// 			this.allCoin.map((item2, index2) => {
			// 				if (item.name == item2.name) {
			// 					// 如果币相等,交易对赋值
			// 					this.marketList[index].symbol = item.symbol
			// 				}
			// 			})
			// 		})
			// 	}
			// 	// console.log('this.allCoin: ', this.allCoin)

			// 	// this.getPriceList()
			// 	// 请求完,根据货币链接
			// 	this.openSocket()

			// },
			// async getPriceList() {
			// 	for (let i in this.quotation) {
			// 		let params = {
			// 			symbol: this.quotation[i].name
			// 		}
			// 		let {
			// 			data
			// 		} = await GetLastCandlestickAskBid(params)
			// 		Object.assign(this.quotation[i], data.tick)
			// 	}
			// 	// console.log(this.quotation)
			// 	this.isshow = true
			// 	uni.hideLoading();
			// },
			//点击排序
			shiftFilterTab(index){
				if(index==0)return
				this.filterTab.forEach((item,subindex)=>{
					if(subindex == index){
						this.$set(item,'active',true)
						if(item.isSortorder){
							if(item.sortorder === '' || item.sortorder === 1){
								this.$set(item,'sortorder',0)
							}else{
								this.$set(item,'sortorder',1)
							}
						}
					}else{
						this.$set(item,'active',false)
						this.$set(item,'sortorder','')
					}
				})
				//市值价
				if(index == 1){
					this.strattri = 'marketprice'
					this.sorttype = this.filterTab[index].sortorder == 0?1:0
				}else if(index ==2){
					this.strattri = 'close'
					this.sorttype = this.filterTab[index].sortorder == 0?1:0
				}
				
			},
			//菜单类型
			async GetPlatformType() {
				let {
					data
				} = await GetPlatformTypeList(null)
				if (data.code != 0) return uni.showToast({
					title: data.msg,
					duration: 2000,
					icon: 'none'
				})
				this.menuList = data.data
			},
			//公告
			async getNewsList(){
				let res = await post('News/NewsList',{
					Page:1,
					PageSize:10,
					Keywords:'',
				})
				if(res.code == 0){
					console.log("公告",res)
					this.NewsList = res.data
				}
			},
			//资讯
			async getRealTime() {
				let {
					data
				} = await GetAnyInformation(null)
				if (data.code != 0) return
				this.realTime = data.data
			},
			goPage(url) {
				console.log('跳转到:' + url)
				let obj = {
					src: url
				}
				if (!url) return
				// console.log(url)
				navigate('ad/index', obj)
			},
			// 轮播图
			async getBannerList() {
				let params = {
					Cid: 1
				}
				// let {data} = await BannerList(params)
				let res = await get('Banner/BannerList', params)
				if (res.code != 0) return
				this.swiperList = res.data
				// console.log(this.swiperList)
			},
			// 获取首页的交易平台类型	
			async getPlatformTypeList() {
				// let {data} = await BannerList(params)
				let res = await get('System/GetPlatformTypeList')
				if (res.code != 0) return
				// console.log(this.swiperList)
				this.menuList = res.data
			},
			// 去ad页面
			toAd(item) {
				// console.log(item)
				// 点击
				get('Banner/BannerHits', {
					Id: item.Id
				})
				let obj = {
					src: item.Url
				}
				if (!item.Url) return
				// console.log(item.Url)
				navigate('ad/index', obj)
			},
			// 点击按钮
			clcikButton(item, index) {
				let obj = {
					src: item.h5Url
				}
				if (!item.h5Url) return
				// console.log(item.h5Url)
				navigate('ad/index', obj)
			},
			// 点击了弹窗确定
			modalSuccess(e) {
				// console.log('e',e)
				if (!e) {
					return
				}
				// console.log('点击确定')
				// this.clist[this.currentIndexCheck].value = !this.clist[this.currentIndexCheck].value
				navigate('login/login')
			},
			// 去登录页
			isLogin() {
				if (!uni.getStorageSync("userId") || !uni.getStorageSync("token")) {
					// navigate('login/login')
					return false
				} else {
					return true
				}
			},
			// 去首页更多
			toHomeMore() {
				uni.navigateTo({
					url: '/pages/homeMore/homeMore'
				});
			},
		},
		filters:{
			paihanfilter(index){
				if(index === '')return
				let val = index+1
				if(val<10)return '00'+val
				if(val<100)return '0'+val
				if(val>100) return val
			},
			Billionfilter(val){
				if(val === '')return
				var param = {};
				var k = 10000,
				sizes = ['', '万', '亿', '万亿'],
				i;
				if(val < k){
					param.val =val
					param.unit=''
				}else{
					i = Math.floor(Math.log(val) / Math.log(k)); 
					param.val= ((val / Math.pow(k, i))).toFixed(4);
					param.unit = sizes[i];
				}
				return param.val+param.unit
			},
			namefilter(val){
				if(val === '')return
				let arr
				try{
					arr = val.split('/')
					return arr[0]
				}catch(e){
					// console.log("不符合规则")
				}
				
				
			}
			
		},
		// 上拉加载更多
		onReachBottom() {
			// console.log('到底了')
			// if (
			// 	this.loadMore === 2
			// ) return;
			// this.pageIndex++
			// this.getNumberChartsMemberGrade()
		},
	}
</script>
<style scoped lang="scss">
	@import url("./style");
	@import './style.scss';
</style>
