<template>
	<view class="main">
		<header-bar :title="tabTitle" titleTintColor="#fff" :bgColor='bgColor' :center='center' :isBack="true">
			<view @tap="goBack" slot="back" class="uni_btnIco iconfont icon-xiaoyufuhao"></view>

		</header-bar>
		 <!-- v-if="this.selectClist[0].length != 0" -->
		<view class="">
			<scroll-view class="scroll-view" scroll-x="true">
				<view :id="`demo${item.id}`" @tap="selectTab(index)" class="scroll-view-item" :class="currentIndex==index ? 'active' : ''"
				 v-for="(item,index) in headerMenu" :key="item.id">{{ item.TypeName }}</view>
			</scroll-view>
			
			<swiper :current="currentIndex" class="swiper" @change="swiperChange">
				
				<swiper-item v-for="(item,index) in clist" :key="index">
					<scroll-view  class="mainList" scroll-y="true" @scrolltolower="toBottom" :lower-threshold="0" :refresher-triggered="refreshState" :refresher-enabled="true" @refresherrefresh="pullRefresh" v-if="item.list.length>0">
						<view class="toubu">
			
						</view>
						<!-- <radio-group> -->
						<view class="mainList-item" v-for="(item2,index2) in item.list" :key="index2" >
							<view class="mainList-item-left">
								<!-- <checkbox @change='change' value="r2" class="radio" /> -->						
								<view @click="clickCheck(item2,index2)" class="mainList-item-left-yuan" :class="[selectClist.indexOf(item2.CurrencyId) != -1 ? 'active' : '']">
									<view class="iconfont icon-dui">
										
									</view>
								</view>
			
							</view>
							<view @tap='toDealDetail(item2)' class="mainList-item-right border-bottom-1">
								<view class="my-centent">
									<view class="mainList-item-left-content-top">
										<view class="text">
											{{ item2.Name+ '/USDT' }}
										</view>
										<view class="icon" v-if="selectClist.indexOf(item2.CurrencyId) != -1 &&item2.Type != null">
											{{ item2.Type | TradingTypeName }}
										</view>
									</view>
									<view class="mainList-item-left-content-bottom">
										数量:{{ item2.EtcAmount }}
									</view>
								</view>
								<view class="mainList-item-right-top-bottom-box">
									<!-- <view class="mainList-item-right-top bg-gray"> -->
									<view class="mainList-item-right-top" :class="[selectClist.indexOf(item2.CurrencyId) != -1 ? '' : 'bg-gray']">
										{{ item2.EtcAmount == 0 ? '0' : item2.EtcProfit / item2.EtcAmount }}%
									</view>
									<view class="mainList-item-right-bottom">
										盈利:{{ item2.EtcProfit }}
									</view>
								</view>
							</view>
						</view>
						
						<!-- </radio-group> -->
						<!-- <view class="dibu">
			
						</view> -->
					</scroll-view>
					<view  v-else>
						<not-data></not-data>
					</view>
				</swiper-item>
			</swiper>
			
			<!-- 批处理 -->
			<view class="batch-box" @tap="openPop">
				<image class="batch-img" src="/static/jiaoyi/piliang.png" mode="widthFix"></image>
			</view>
			<!-- 弹窗 -->
			<uni-popup ref='popup' type="bottom">
				<view class="popup-box">
					<view class="popup-box-title">
						<view class="popup-box-title-left">
							当前账户剩余USDT：{{ surplusUsdt }}
						</view>
						<view @tap="closePop" class="popup-box-title-right">
							×
						</view>
					</view>
					<view class="popup-box-content">
						<view class="popup-box-content-item" :class="[paternBtn == 1 ? '' : 'active']" @tap="switchChange(1)">
							<image class="img" src="/static/jiaoyi/zanting.png" mode="widthFix"></image>
							<view class="text">
								继续策略循环
							</view>
						</view>
						<view class="popup-box-content-item" :class="[paternBtn == 2 ? '' : 'active']" @tap="switchChange(2)">
							<image class="img" src="/static/jiaoyi/zanting.png" mode="widthFix"></image>
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
							<image class="img" src="/static/jiaoyi/zanting.png" mode="widthFix"></image>
							<view class="text">
								清仓卖出
							</view>
						</view>
					</view>
				</view>
			</uni-popup>
			
			<view class="my-bottom">
				<view class="bottom-left">
					当前账户剩余USDT
				</view>
				<view class="bottom-right">
					{{ surplusUsdt }}
				</view>
			</view>
			<!-- 确认弹窗 -->
			<!-- <my-showModal ref='modal' @success='modalSuccess' :title='title' :content='content'></my-showModal> -->
			
		</view>
		
		
	

		
			<!-- 如果没有开通 -->
		<!-- <view  v-if="this.selectClist[0].length == 0">
			<view class="big-box">
				<view class="content-box">
					<image class="content-img" src="/static/lianghua/no-tong.png" mode="widthFix"></image>
					<view class="text">
						您还未开通，开通后可自定义
					</view>
					<view @click="clickKaitong" class="button-box">
						立即开通
					</view>
				</view>
			</view>
			
		</view> -->
		
		
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
	import { StrategyTrading, StrategyTradingop } from '@/common/js/http.js'
	export default {
		data() {
			return {
				
				surplusUsdt: 0,
				UserId: '',
				Token: '',
				Page: 1,
				PageSize: 12,
				
				
				bgColor: {
					'background': 'linear-gradient(90deg, #02D48E, #17B580)',
				},
				// title: '开通',
				tabTitle: '自定义策略',
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
				// 定时器
				timer: null,
				// 弹窗
				title: '选择交易',
				// content: '此操作不可逆，确认删除？'
				content: '确认对该交易进行监视，策略修改， 卖出操作?',
				currentIndexCheck:-1,
				isPush: false,
				refreshState: false
				

			}
		},
		components: {
		
		},
		onLoad() {
			this.UserId = uni.getStorageSync('userId')
			this.Token = uni.getStorageSync('token')
		},
		onShow() {
			this.getStrategyTrading()
		},
		methods: {
			// 返回按钮
			goBack() {
				uni.navigateBack()
			},
			// 点击开通
			clickKaitong() {
				let obj = {
					isEdit: 0,
					id: 5,
				}
				navigate('lianghuaSon/userDefined/index', obj)
			},
			// 点击修改策略,是编辑
			clickUserDefinedItem() {
				let obj = {
					isEdit: 1,
					id: 5,
				}
				navigate('lianghuaSon/userDefined/index', obj)
			},
			// 网络请求start
			// async StrategyTrading() {
			// 	this.userId = uni.getStorageSync('userId')
			// 	this.token = uni.getStorageSync('token')
			// 	// 0: //全部
			// 	// 	1: //策略循环
			// 	// 	2: //单次策略
			// 	// 	3: //停止补单
			// 	let obj = {
			// 		UserId: this.userId,
			// 		Token: this.token,
			// 		Page: this.Page,
			// 		PageSize: this.PageSize,
			// 		Type: 0,
			// 	}
			// 	let res = await post('Trade/StrategyTrading', obj)
			// },
			// 网络请求end
			
			// 添加的列表start
			pullRefresh(){
				if (this.refreshState) return
				// this.isGet = true
				// this.isPush = false
				this.Page = 1
				this.clist[this.currentIndex].list = []
				this.clist[this.currentIndex].isAdd = true
				this.getStrategyTrading()
			},
			toBottom(){
				// if(this.refreshState || !this.isGet)return
				if (this.refreshState) return
				//this.isPush = true
				this.Page++
				this.getStrategyTrading()
			},
			async getStrategyTrading(){
				if (!this.clist[this.currentIndex].isAdd) return
				this.refreshState = true
				let params = {
					UserId: this.UserId,
					Token: this.Token,
					Page: this.Page,
					PageSize: this.PageSize,
					Type: this.currentIndex
				}
				let {
					data
				} = await StrategyTrading(params)
				if (data.code != 0) return
				this.clist[this.currentIndex].list.push(...data.data.list)
				this.refreshState = false
				// this.isPush ? this.clist[this.currentIndex].push(...data.data.list) : this.clist[this.currentIndex] = data.data.list
				if (data.data.list.length < this.PageSize) {
					//this.isGet = false
					this.clist[this.currentIndex].isAdd = false
				}
				// this.isPush = true
				this.surplusUsdt = data.data.USDT
				this.$forceUpdate()
			},
			toDealDetail(item) {
				uni.navigateTo({
					url: `/pages/dealSon/dealDetail/index?CurrencyId=${item.CurrencyId}&Type=${item.Type}&isEdit=1`
				})
			},
			clickCheck(item,index) {
				this.whatMoabl = 'clickChecks'
				this.currentIndexCheck = item.CurrencyId
				this.selectClist.indexOf(this.currentIndexCheck) == -1 ? this.selectClist.push(this.currentIndexCheck) : this.selectClist.splice(this.selectClist.findIndex(item => item == this.currentIndexCheck), 1)
				// if(this.selectClist.indexOf(item.CurrencyId) != -1){
				// 	this.title = '放弃交易'
				// 	this.content = '确认放弃对该交易进行监视，策略修改， 卖出操作?'
				// }else{
				// 	this.title = '选择交易'
				// 	this.content = '确认对该交易进行监视，策略修改， 卖出操作?'
				// }
				//console.log(item,index)
				//this.$refs.modal.open()
				// this.clist[index].value = !this.clist[index].value
			},
			modalSuccess(e) {
				if(!e) {
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
			async updateStrategyTradingop(){
				if(this.selectClist.length==0) return uni.showToast({
					title: '请先至少选择一种货币',
					icon: 'none',
					duration: 1000
				})
				let str = this.selectClist.join(',')
				let params = {
					UserId: this.UserId,
					Token: this.Token,
					CurrencyGroupId: str,
					Type: this.paternBtnText
				}
				let { data } = await StrategyTradingop(params)
				if(data.code != 0) return uni.showToast({
					title: data.msg,
					icon: 'none',
					duration: 1000
				})
				this.paternBtn = this.paternBtnText
			},
			toKaitong() {
				console.log(1111)
				uni.navigateTo({
					// url: '/pages/lianghuaSon/kaitong/index'
					url: '/pages/lianghuaSon/setStrategy/index'
				})
				// navigate('lianghuaSon/kaitong/index')
			},
			selectTab(index) {
				this.currentIndex = index
			},
			swiperChange(e) {
				// this.isGet = true
				// this.isPush = false
				this.currentIndex = e.detail.current
				this.Page = 1
				//只有第一次进入对应的swiper-item时才会请求，后续数据的添加或刷新靠下拉加载或触底事件
				if (!this.clist[this.currentIndex].isAdd || this.clist[this.currentIndex].list.length > 0) return
				this.getStrategyTrading()
			},
			switchChange(e) {
				if(this.paternBtn == e) return
				this.whatMoabl = 'paternBtn'
					this.paternBtnText = e
					switch(e){
						case 1: this.title = '继续策略循环'
						this.content = '确认对该交易对执行策略循环，达到盈利点，卖出币种，然后会再买入一把这个币种?'; break;
						case 2: this.title = '执行单次策略'
						this.content = '确认对该交易对执行单次策略，卖出后，将不再购买此交易对?'; break;
						case 3: this.title = '不再操作订单'
						this.content = '当该交易下降后，将不再买入该币种，确定不再操作?'; break;
						case 4: this.title = '清仓卖出'
						this.content = '按照当前价格，卖出所有资产，确定清仓吗?'; break;
						default: return
					}
					uni.showModal({
					    title: this.title,
					    content: this.content,
					    success:  (res)=> {
					        if (res.confirm) {
					            this.modalSuccess(true)
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
					//this.$refs.modal.open()
			},
			openPop() {
				this.$refs.popup.open()
				// this.timer = setTimeout(() => {
				// 	this.$refs.popup.open()
				// }, 200)
			
				// this.$once('hook:beforeDestroy', () => {
				// 	clearInterval(this.timer);
				// 	this.timer = null;
				// })
			
			},
			closePop() {
				this.$refs.popup.close()
			},
			// 点击确定选择交易
			success(e) {
				console.log(e)
				if (!e) return
				// 点击确定了
				
			},
			// 添加的列表end
			
			

		}
	}
</script>

<style lang="scss" scoped>
	@import "./style";
</style>
