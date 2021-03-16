<template>
	<view>
		<view class="header" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px' }]">
			<view class="header-item">
				<view class="iconfont icon-xiaoyufuhao bigText" @click="back">

				</view>
				<view class="inputSearch">
					<input class="uni-input" maxlength="20" v-model="currencyName" placeholder="搜索币的名称" @confirm='myConfirm' />
				</view>
				<view class="iconfont icon-fangdajing bigText" @click="myConfirm">
				</view>
			</view>
		</view>
		<view v-if="list.length>0" class="mainList">
	
			<view class="mainList-item"  :class="[item.active ? '' : 'my-bg-gary']"  v-for="(item,index) in list" :key="index">
				<deal-item :dealItem="item" :scrollTop='scrollTop' :isShowAllProfit='isShowAllProfit'></deal-item>
			</view>
			<!-- <view class="mainList-item"  :class="[item.active ? '' : 'my-bg-gary']"  v-for="(item,key,index) in tempObj" :key="index">
				<deal-item :dealItem="tempObj[key]" :scrollTop='scrollTop'></deal-item>
			</view> -->
			<!-- 加载更多 -->
			<uni-load-more v-if="list.length > 0  && loadMore !== 0" :loadingType="loadMore"></uni-load-more>
			<!-- 批处理 -->
			<!-- <view class="batch-box" @tap="openPop">
				<image class="batch-img" src="/static/jiaoyi/piliang.png" mode="widthFix"></image>
			</view> -->
			<!-- 弹窗start -->
			<batch-pop ref='popup' :isSearch='isSearch' :surplusUsdt='surplusUsdt' :paternBtn='paternBtn' @changeModel='switchChange'></batch-pop>
			<!-- <uni-popup ref='popup' type="bottom">
				<view class="popup-box">
					<view class="popup-box-title">
						<view class="popup-box-title-left fs-18">
							当前账户剩余USDT：{{ surplusUsdt }}
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
			<!-- 弹窗end -->

		</view>
		<view  v-if="list.length == 0 && loadMore == 2">
			<not-data></not-data>
		</view>


		<!-- <my-showModal ref='modal' @success='modalSuccess' :title='title' :content='content'></my-showModal> -->
	</view>
</template>

<script>
	import notData from '@/components/not-data/not-data.vue'
	import {
		mapMutations
	} from 'vuex'
	import {
		StrategyTrading
	} from '@/common/js/http.js'
	import {
		navigate,
		post,
		get,
		toast
	} from '@/common/utils/index.js'
	export default {
		data() {
			return {
				scrollTop: 0,
				statusBarH: this.statusBar,
				customBarH: this.customBar,
				list: [],
				currencyName: '',
				selectClist: [],
				title: '',
				content: '',
				currentId: '',
				UserId: '',
				Token: '',
				Page: 1,
				PageSize: 4000,
				loadMore: 0, // 0-loading前；1-loading中；2-没有更多了
				surplusUsdt: 0, // 火币账户余额
				paternBtn: 0,
				paternBtnText: '',
				timer: null,
				Authoriztion: null, // null 就是 未授权
				isSearch: true,
				tempObj: {},
				isShow: false, // 是否处于这个页面
				isShowAllProfit: true, // 控制是否显示全部收益，true是全部，false是单仓
				timer3: null
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
					if(!newName[0]) {
						return
					}
					// 不处于这个页面
					if(this.isShow == false) {
						return
					}
					if(this.list.length == 0) {
						return
					}
					// 方法一:
					// console.log('变化了',newName,newName[0].Symbol);
					if(newName[0].Symbol) {
						// console.log('变化了2222',newName,newName[0].Symbol);
						this.list.map((item,index)=>{
							
							
							if (!this.isShowAllProfit && item.order != null) {
								if (item.order.Symbol == newName[0].Symbol && Number(item.order.EtcAmount) > 0) {
									
									let myDate = new Date();
									let mytime = myDate.toLocaleTimeString();
							
									this.$set(item.order, 'newprice', newName[0].close)
							
									// 计算
									let EtcProfit = this.GetProfit(item.order.Symbol, item.order.EtcAmount, item.order.EtcUsdt, item.order.newprice)
									let EtcPercent = this.GetEtcPercent(item.order.EtcUsdt, EtcProfit)
							
									this.$set(item.order, 'EtcPercent', EtcPercent)
									this.$set(item.order, 'EtcProfit', EtcProfit)
							
									// this.$forceUpdate()
								}
								this.$forceUpdate()
								return
							}
							
							
							if(item.Symbol == newName[0].Symbol && Number(item.EtcAmount) > 0) {
								
								let myDate = new Date();
								let mytime = myDate.toLocaleTimeString();
								
								this.$set(item,'newprice',newName[0].close)
								
								// 计算
								let EtcProfit = this.GetProfit(item.Symbol, item.EtcAmount, item.EtcUsdt, item.newprice)
								let EtcPercent = this.GetEtcPercent(item.EtcUsdt, EtcProfit)
								
								this.$set(item, 'EtcPercent', EtcPercent)
								this.$set(item, 'EtcProfit', EtcProfit)
								// console.log('newName[0].Symbo---------',newName[0].Symbol)
								// if(item.EtcProfit && newName[0].Symbol == 'btcusdt') {
								// // console.log(mytime,newName[0].Symbol + '交易的盈利百分比盈利百分比盈利百分比盈利百分比盈利百分比',this.list.EtcPercent)
								// // console.log(mytime,newName[0].Symbol + '交易的预计盈利预计盈利预计盈利预计盈利预计盈利预计盈利',this.list.EtcProfit)
								// 	console.log(mytime,newName[0].Symbol + '交易的盈利百分比',item.EtcPercent,'%')
								// 	console.log(mytime,newName[0].Symbol + '交易的预计盈利',item.EtcProfit)
								// }
		// 						if(newName[0].Symbol == 'btcusdt3lusdt') {
		
		// 							console.log(mytime,'交易btcusdt3lusdt的百分比的百分比的百分比',this.list.EtcPercent)
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
			this.UserId = uni.getStorageSync("userId")
			this.Token = uni.getStorageSync("token")
		},
		onShow() {
			this.isShow = true
			this.GetAuthoriztionInfoList()
			this.Page = 1
			this.loadMore = 0
			this.list = []
			this.search()
		},
		onHide() {
			this.isShow = false
		},
		onUnload() {
			this.setSelectItem()
		},
		methods: {
			...mapMutations(['updateDealList']),
			back() {
				uni.navigateBack()
			},
			setSelectItem() {
				this.updateDealList(this.selectClist)
				// uni.setStorageSync('dealList', this.selectClist)
			},
			myConfirm() {
				this.Page = 1
				this.list = []
				this.search()
			},
			async search() {
				let params = {
					UserId: this.UserId,
					Token: this.Token,
					Keywords: this.currencyName,
					Page: this.Page,
					PageSize: this.PageSize,
					Type: 0,
				}
				// let {
				// 	data
				// } = await StrategyTrading(params)
				let data = await post('Trade/StrategyTrading', params,{},true)
				this.loadMore = 2
				if (data.code != 0) {
					return
				}
				
				data.data.list = data.data.list ? data.data.list : []
				// console.log('data.data.list:',data.data.list)
				let tempArr = data.data.list.map((item, index) => {
					
					let myTypeName = ''
					switch (item.Type) {
						case 0:
							// return '全部';
							myTypeName = '';
							// this.$set(data.data.list[index], 'active', false);
							break;
						case 1:
							myTypeName = '策略循环';
							// this.$set(data.data.list[index], 'active', true);
							break;
						case 2:
							myTypeName = '单次策略';
							// this.$set(data.data.list[index], 'active', true);
							break;
						case 3:
							myTypeName = '停止补单';
							// this.$set(data.data.list[index], 'active', true);
							break;
							// case 4: return '清仓卖出';
						case 4:
							myTypeName = '';
							// this.$set(data.data.list[index], 'active', false);
							break;
							// default: return '未知'
						default:
							myTypeName = ''
					}
					this.$set(data.data.list[index], 'myTypeName', myTypeName)
					// if (item.Type != null && item.Type != 4 && item.Type != 0) {
					if (item.Type != null && item.Type != 4 && item.Type != 0 && item.FirstAmount > 0) {
						// this.$set(this.list, 'active', true)
						item.active = true
					} else {
						// this.$set(this.list, 'active', false)
						item.active = false
					}
					
					// this.$set(data.data.list[index], 'myTypeName', myTypeName)
					
					this.$set(this.tempObj,item.Symbol,item)
					
					
					// console.log('this.tempObj',this.tempObj)
					// if (item.Type == null) {
					// 	this.$set(data.data.list[index], 'active', false);
					// }
					
					return item

				})

				if (data.data.list === null || data.data.list.length < this.PageSize) {
					this.loadMore = 2
				}

				// this.list = data.data.list
				// this.list.push(...data.data.list)
				
				clearInterval(this.timer3);
				this.timer3 = null;
				this.timer3 = setInterval(() => {
					this.isShowAllProfit = !this.isShowAllProfit
				}, 3000)
				
				
				this.surplusUsdt = Number(data.data.USDT)
				this.list = [...tempArr]
			},
			toDealDetail(item) {
				uni.navigateTo({
					url: `/pages/dealSon/dealDetail/index?CurrencyId=${item.CurrencyId}&Type=${item.Type}`
				})
			},
			clickCheck(item, index) {
				if (this.Authoriztion == null) {
					uni.showToast({
						title: '您未授权',
						icon: 'none',
						duration: 1000
					})
					if(this.timer != null) return
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
				// this.list[index].active = !this.list[index].active
			
				// item = !item
				this.currentIndexCheck = item.CurrencyId
				this.selectClist.indexOf(this.currentIndexCheck) == -1 ? this.selectClist.push(this.currentIndexCheck) : this.selectClist
					.splice(this.selectClist.findIndex(item => item == this.currentIndexCheck), 1)
				this.$forceUpdate()
				
				if (this.list[index].active == true) {
					this.title = '放弃交易'
					// this.content = '确认放弃对该交易进行监视，策略修改， 卖出操作?'
					this.content = '取消勾选该交易对,将不再对它进行买入、卖出操作,确认取消?'
					this.$set(this.list[index],'isGiveUp',true)
					// this.list[index].isGiveUp = true
				} else {
					this.title = '选择交易'
					// this.content = '确认对该交易进行监视，策略修改， 卖出操作?'
					this.content = '确认对该交易进行监控,执行买入,卖出操作?'
					this.$set(this.list[index],'isGiveUp',false)
				}
				uni.showModal({
					title: this.title,
					content: this.content,
					success: (res) => {
						if (res.confirm) {
							// this.Page = 1
							// this.loadMore = 0 
							// 	this.list = []
							this.dangeUpdateStrategyTradingop(item,index)
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
			// 单个更新策略
			async dangeUpdateStrategyTradingop(item,index) {
				// this.selectClist = []
				// this.list.map((item,index)=>{
				// 	if(item.active) {
				// 		this.selectClist.push(item.CurrencyId)
				// 	}
				// })
				console.log('过来了', this.selectClist.length, this.selectClist.length == 0)
				// let str = this.selectClist.join(',')
				// str = mySelectClist.join(',')
				let str = this.list[index].CurrencyId
				let myType = 1
				// 如果没有类型的话,定死1
				// if(this.list[index].Type === null || this.list[index].Type === 0) {
				if(this.list[index].isGiveUp == true) {
					console.log('放弃交易了')
					// 放弃交易
					myType = 0
				}else if(this.list[index].isGiveUp == false){
					console.log('选择交易了')
					// 执行策略循环
					if(this.list[index].Type == null || this.list[index].Type == 0 || this.list[index].Type == 4 ) {
						myType = 1
					}else {
						myType = this.list[index].Type
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
				this.list[index].active = !this.list[index].active
				
				this.paternBtn = this.paternBtnText
				this.closePop()
				// 初始化一下页面数据
				// this.Page = 1
				// this.loadMore = 0
				// this.list = []
				// if (this.paternBtnText == 4) {
				// 	this.selectClist = []
				// }
				// // 要等更改成功才请求
				// this.search()
				this.timer = setTimeout(() => {
					// uni.navigateTo({
					// 	url: '/pages/apiLetter/apiLetter'
					// })
					this.Page = 1
					this.loadMore = 0
					this.list = []
					// if (this.paternBtnText == 4) {
					// 	this.selectClist = []
					// }
					
					// // 要等更改成功才请求
					this.search()
					
					
					clearTimeout(this.timer);
					this.timer = null;
				}, 1000)
								
				this.$once('hook:beforeDestroy', () => {
					clearTimeout(this.timer);
					this.timer = null;
				})
			},
			closePop() {
				this.$refs.popup.close()
			},
			// modalSuccess(e) {
			// 	if (!e) {
			// 		return
			// 	}
			// 	this.selectClist.indexOf(this.currentId) == -1 ? this.selectClist.push(this.currentId) : this.selectClist.splice(
			// 		this.selectClist.findIndex(item => item == this.currentId), 1)
			// },
			// 打开批处理弹窗
			openPop() {
				if (this.Authoriztion == null) {
					uni.showToast({
						title: '您未授权',
						icon: 'none',
						duration: 1000
					})
					if(this.timer != null) return
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
			// 点击按钮start
			switchChange(e) {
				let tempRes = false
				this.list.map((item,index)=> {
					if(item.active == true) {
						tempRes = true
					}
				})
				if(tempRes == false) {
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
							// 	this.list = []
							this.modalSuccess(true)
							// this.getStrategyTrading()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				//this.$refs.modal.open()
			},
			// 点击按钮end
			// 确定之后执行的批处理请求start
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
			// 确定之后执行的批处理请求end
			// 批处理请求start
			async updateStrategyTradingop() {
				// console.log('this.selectClist.length:',this.selectClist.length)
				this.selectClist = []
				this.list.map((item, index) => {
					if (item.active) {
						this.selectClist.push(item.CurrencyId)
					}
				})
				if (this.selectClist.length == 0) {
					uni.showToast({
						title: '请先至少选择一种货币',
						icon: 'none',
						duration: 1000
					})
					return
				}
				// console.log('过来了', this.selectClist.length, this.selectClist.length == 0)
				let str = this.selectClist.join(',')
				// 我添加的start
				let mySelectClist = []
				this.list.map((item, index) => {
					if (item.active == true) {
						let id = this.list[index].CurrencyId
						mySelectClist.push(id)
					}
				})
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


				if (this.paternBtnText == 4) {
					this.selectClist = []
				}
				this.closePop()
				// 初始化一下页面数据
				// this.Page = 1
				// this.loadMore = 0 
				// this.list = []
				// this.search()
				
				
				this.timer = setTimeout(() => {
					// uni.navigateTo({
					// 	url: '/pages/apiLetter/apiLetter'
					// })
					this.Page = 1
					this.loadMore = 0
					this.list = []
					// if (this.paternBtnText == 4) {
					// 	this.selectClist = []
					// }
					
					// // 要等更改成功才请求
					this.search()
					
					
					clearTimeout(this.timer);
					this.timer = null;
				}, 1000)
				
				// 要等更改成功才请求
				// this.list.map((item, index) => {
				// 	if (item.active) {
				// 		let myType2 = ''
				// 		switch (this.paternBtnText) {
				// 			case 1:
				// 				myType2 = '策略循环'
				// 				break;
				// 			case 2:
				// 				myType2 = '单次策略'
				// 				break;
				// 			case 3:
				// 				myType2 = '停止补仓'
				// 				break;
				// 			case 4:
				// 				myType2 = ''
				// 				this.list[index].active = false
				// 				break;
				// 			default:
				// 				return
				// 		}
				// 		this.list[index].myTypeName = myType2

				// 	}
				// })
				// this.getStrategyTrading()
			},
			// 批处理请求end
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
				if(res.code == 3) {
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
			    var Price = Number(EtcAmount) * Number(newprice);//预计卖出获得USDT
			    var SellFee = Price * 0.002;//预计卖出火币收取手续费USDT//0.002//火币卖出手续费
			    var Profit = Price - Number(EtcUsdt) - SellFee;
			//     var EtcPercent = this.GetEtcPercent(Number(EtcUsdt), Profit);
					
			//     if (Symbol) {//更新对应币种预估盈利
			
			//     }
					return Profit
					
			},
			// 计算盈利方法等结束
		},
		// 页面滚动
		onPageScroll({
			scrollTop
		}) {
			// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
			this.scrollTop = scrollTop;
		},
		// 上拉加载更多
		onReachBottom() {
			console.log('到底了')
			if (
				this.loadMore === 2
			) return;
			//  请求
			this.Page++
			this.search()
		},
		// 下拉刷新
	}
</script>

<style scoped>
	@import './style';
</style>
