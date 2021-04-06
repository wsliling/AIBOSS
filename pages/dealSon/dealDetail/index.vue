<template>
	<view class="fs-16">
		<header-bar :title="navTitle" titleTintColor="#fff" :bgColor='bgColor' :center='center' :isBack="true">
			<view slot="back" class="uni_btnIco iconfont icon-xiaoyufuhao" @click="goBack"></view>
			<view slot="string">
					<!-- 跳转到收益 -->
					<!-- 跳转到交易记录 -->
				<!-- <view class="button-img-box">
					<image @tap="toMyProfit" class="button-img mr20" src="/static/jiaoyi/qian2.png" mode="widthFix"></image>
					<image @tap='toTransactionRecords' class="button-img" src="/static/jiaoyi/rizhi2.png" mode="widthFix"></image>
				</view> -->
			</view>
		</header-bar>
		<!-- 背景盒子 -->
		<view class="bg-box">
			<view class="data-box">
				<view class="data-title">
					<!-- {{ CurrencyMould }} -->
					{{ Name }}
				</view>
				<view class="data-content">
					<view class="data-item-wrapper border-bottom-1">
						<view class="data-item">
							<view class="shuzi theme-color fs-20">
								{{ EtcUsdt | four }}
							</view>
							<view class="text fs-16">
								持仓金额
							</view>
						</view>
					</view>
					<view class="data-item-wrapper border-bottom-1 border-left-1">
						<view class="data-item">
							<view class="shuzi theme-color fs-20">
								{{ EtcAVG | four }}
							</view>
							<view class="text fs-16">
								持仓均价
							</view>
						</view>
					</view>
					<!-- <view class="data-item-wrapper border-bottom-1 border-left-1">
						<view class="data-item">
							<view class="shuzi theme-color fs-20">
								{{ EtcFee | four }}
							</view>
							<view class="text fs-16">
								手续费
							</view>
						</view>
					</view> -->
					<view class="data-item-wrapper border-bottom-1 border-left-1">
							<view class="data-item">
								<view class="shuzi theme-color fs-20">
									{{ ReplenishNum }}
								</view>
								<view class="text fs-16">
									补仓单数
								</view>
							</view>
						</view>
					<view class="data-item-wrapper">
						<view class="data-item w50">
							<view class="shuzi theme-color fs-20">
								{{ EtcAmount }}
							</view>
							<view class="text fs-16">
								持仓数量
							</view>
						</view>
					</view>

				<!-- 	<view class="data-item-wrapper border-left-1">
						<view class="data-item">
							<view class="shuzi theme-color fs-20">
								{{ ReplenishNum }}
							</view>
							<view class="text fs-16">
								补仓单数
							</view>
						</view>
					</view> -->
					
					
					<view class="data-item-wrapper border-bottom-1 border-left-1">
						<view class="data-item w50">
							<view class="shuzi theme-color fs-20">
								{{ EtcFee }}
							</view>
							<view class="text fs-16">
								手续费
							</view>
						</view>
					</view>
					

				</view>
			</view>
		</view>

		<!-- 策略盒子 -->
		<view class="popup-box-content">
			
			<view class="popup-box-content-item" :class="[paternBtn == 1 ? '' : 'active button-theme-bg-color']" @tap="switchChange(1)">
				<image class="img" src="/static/jiaoyi/danci.png" mode="widthFix"></image>
				<view class="text">
					继续策略循环
				</view>
			</view>
			<view class="popup-box-content-item" :class="[paternBtn == 2 ? '' : 'active button-theme-bg-color']" @tap="switchChange(2)">
				<image class="img" src="/static/jiaoyi/zanting.png" mode="widthFix"></image>
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
			<!-- <view class="popup-box-content-item" :class="[paternBtn == 0 ? '' : 'active button-theme-bg-color']" @tap="switchChange(0)">
				<image class="img" src="/static/jiaoyi/zanting.png" mode="widthFix"></image>
				<view class="text">
					关闭策略
				</view>
			</view> -->
			<!-- <view class="popup-box-content-item button-theme-bg-color clear-bendi active" @tap="clearBendi"> -->
			<!-- <view class="popup-box-content-item button-theme-bg-color active" @tap="clearBendi">
				<image class="img" src="/static/jiaoyi/zanting.png" mode="widthFix"></image>
				<view class="text">
					清除持仓数据
				</view>
			</view> -->
		</view>
		<!-- 确认弹窗 -->
		<!-- <my-showModal ref='modal' @success='modalSuccess' :title='title' :content='content'></my-showModal> -->

		<!-- 按钮 -->
		<!-- 跳转到收益 -->
		<view class="my-button-box">
			<view class="my-button button-theme-bg-color" @tap="toMyProfit">
				我的收益
			</view>
			<view class="my-button button-theme-bg-color" @tap="toTransactionRecords">
				交易记录
			</view>

		</view>
		<!-- <image @tap="toMyProfit" class="button-img mr20" src="/static/jiaoyi/qian2.png" mode="widthFix"></image> -->
		<!-- 跳转到交易记录 -->
		<!-- <image @tap='toTransactionRecords' class="button-img" src="/static/jiaoyi/rizhi2.png" mode="widthFix"></image> -->

		<!-- 跳转到自定义页面 -->
		<!-- <view v-if="isEdit" class="foot" @tap='clickUserDefinedItem'> -->
		<!-- isAut: 0, // 0是未开通, 1开通了 -->
		<!-- <view v-if="isAut == 1 && loadMore == 2" class="foot button-theme-bg-color" @tap='clickUserDefinedItem'> -->
		<view v-if="isAut == 1 && loadMore == 2" class="foot button-theme-bg-color" @tap='clickUserDefinedItem'>
		<!-- <view v-if="0" class="foot" @tap='clickUserDefinedItem'> -->
			编辑策略
		</view>
		<!-- <view class="" v-if="!isAut && loadMore == 2"> -->
		<!-- <view class="" v-if="isAut == 0 && loadMore == 2"> -->
		<view class="" v-if="isAut == 0 && loadMore == 2">
			<view class="input-box" style="bottom: 300upx;">
				<view class="" v-if="isAut == 0 && loadMore == 2">
					单策略总金额建议 {{FirstAmount*50}} USDT
				</view>
			</view>
			<view class="input-box">
				<view class="input-leftText fs-17">
					首单金额(USDT)
				</view>
				<input type="digit"  v-model="inputData" class="text" placeholder="请输入金额(USDT)" />
			</view>
			<view class="bottom_btn">
				<button class="btn fs-20" @click="Submit">开始量化</button>
			</view>
		</view>

	</view>

</template>

<script>
	import {
		toast,
		switchTab,
		redirect,
		navigate,
		post,
		get
	} from '@/common/utils/index.js'
	import {
		StrategyTradingxq,
		StrategyTradingop,
		CurrencyStrategy
	} from '@/common/js/http.js'
	export default {
		data() {
			return {
				loadMore: 0,
				navigate,
				inputData: '',
				customBar: this.customBar,
				coinName: '',
				bgColor: {
					'background': 'linear-gradient(90deg, #418cf1, #0065eb)',
				},
				navTitle: '详情',
				center: true,
				isBack: true,
				paternBtn: 0,
				paternBtnText: '',
				title: '',
				content: '',
				CurrencyId: '',
				UserId: '',
				Token: '',

				CurrencyMould: '', // 模板名称
				Name: '',
				EtcUsdt: 0, //持仓金额(USDT)
				EtcAVG: 0, //持仓均价
				EtcFee: 0, //持仓手续费
				EtcAmount: 0, //持仓数量
				ReplenishNum: 0, //补仓单数
				EtcProfit: 0, //持仓盈利

				isEdit: 0, // 是否是自己的策略,是自己的策略会显示一个按钮可以去编辑这个策略 0 不是, 1是自己策略可以跳转编辑页面

				timer: null,
				Authoriztion: null, // null 就是 未授权
				
				// isAut: 0, // 0是未开通, 1开通了
				isAut: -1, // 0是未开通, 1开通了
				FirstAmount:0,
				CurrencyCode: '',
				Symbol: ''
			}
		},
		onLoad(e) {
			this.CurrencyId = e.CurrencyId || ''
			this.paternBtnText = +e.Type || null
			this.isEdit = e.isEdit || 0
		},
		onShow() {
			this.loadMore = 0
			this.UserId = uni.getStorageSync("userId")
			this.Token = uni.getStorageSync("token")
			this.getStrategyTradingxq()
			
			this.GetAuthoriztionInfoList()
			
			this.GetMemberInfo()
		},
		components: {

		},
		methods: {
			// 清除本次持仓数据
			async clearBendi() {
				this.UserId = uni.getStorageSync("userId")
				this.Token = uni.getStorageSync("token")
				// this.CurrencyId 
				let obj = {
					UserId: this.UserId,
					Token: this.Token,
					CurrencyId: this.CurrencyId
				}
				let res = await post('Trade/ClearEthData',obj)
			},
			// 授权
			allowSubmit(){
				if(!this.Authoriztion){
					new Promise((res,rej) => {
						uni.showToast({
								title: '您未授权',
								icon: 'none',
								duration: 1000
						})
						setTimeout(() => {
							// res()
							uni.navigateTo({
								url:'/pages/apiLetter/apiLetter'
							})
						},1000)
					}).then(() => {
						// uni.navigateTo({
						// 	url:'/pages/apiLetter/apiLetter'
						// })
					})
					return false
				}
				return true
			},
			// 提交开始量化
			Submit() {
				if(this.inputData == 0) {
					toast('首单金额不能为0')
					return
				}
				if(!this.allowSubmit()) {
					return
				}
				if (this.trim(this.inputData).length == 0) {
					return uni.showToast({
						title: '请输入首单金额',
						icon: 'none',
						duration: 2000
					})
				}
				
				this.CurrencyStrategys()
			},
			
			trim(str) {
				return str.replace(/\s+/g, "");
			},
			// 量化接口
			async CurrencyStrategys() {
				let params = {
					UserId: this.UserId,
					Token: this.Token,
					Strategy: {
						FirstAmount: this.inputData
					},
					CurrencyGroupId: this.CurrencyId
				}
				
				let {
					data
				} = await CurrencyStrategy(params)
				toast(data.msg)
				if (data.code != 0) {
					return
				}
				
				if(this.timer != null) {
					return
				}
				this.timer = setTimeout(() => {
					this.loadMore = 0
					this.UserId = uni.getStorageSync("userId")
					this.Token = uni.getStorageSync("token")
					this.getStrategyTradingxq()
					
					this.GetAuthoriztionInfoList()
					
					this.GetMemberInfo()
					
					clearTimeout(this.timer);
					this.timer = null;
				}, 1000)
								
				this.$once('hook:beforeDestroy', () => {
					clearTimeout(this.timer);
					this.timer = null;
				})
				
				
			},
			// 获取用户
			// 个人信息
			async GetMemberInfo() {
				let obj = {
					UserId: this.UserId,
					Token: this.Token
				}
				let res = await post('User/GetMemberInfo', obj,{},false)
				if (res.code != 0) {
					return
				}
				uni.setStorageSync('grade',res.data.grade)
				// isAut: 0, // 0是未开通, 1开通了
				this.isAut = res.data.isAut
			},
			// 点击了编辑自定义策略
			clickUserDefinedItem() {
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
				let obj = {
					isEdit: 1,
					id: this.CurrencyId,
				}
				navigate('lianghuaSon/userDefined/index', obj)
			},
			async getStrategyTradingxq() {
				let params = {
					UserId: this.UserId,
					Token: this.Token,
					CurrencyGroupId: this.CurrencyId
				}
				let {
					data
				} = await StrategyTradingxq(params)
				if (data.code != 0) {
					return
				} 
				// uni.showToast({
				// 	title: data.msg,
				// 	icon: 'none',
				// 	duration: 1000
				// })
				// CurrencyMould: '', // 模板名称
				// EtcUsdt: '', //持仓金额(USDT)
				// EtcAVG: '', //持仓均价
				// EtcFee: '', //持仓手续费
				// EtcAmount: '', //持仓数量
				// ReplenishNum: '', //补仓单数
				// EtcProfit: '', //持仓盈利
				this.CurrencyMould = data.data.CurrencyMould // 模板名称
				this.EtcUsdt = data.data.EtcUsdt //持仓金额(USDT)
				this.EtcAVG = data.data.EtcAVG //持仓均价
				this.EtcFee = data.data.EtcFee //持仓手续费
				this.EtcAmount = data.data.EtcAmount //持仓数量
				this.ReplenishNum = data.data.ReplenishNum //补仓单数
				this.EtcProfit = data.data.EtcProfit //持仓盈利
				this.paternBtn = data.data.Type
				this.Symbol = data.data.Symbol
				this.Name = data.data.Name
				this.FirstAmount = data.data.FirstAmount
				this.CurrencyCode = data.data.CurrencyCode
				this.inputData = data.data.FirstAmount ? data.data.FirstAmount : ''
				this.paternBtn = data.data.Type
				console.log(data)
				this.loadMore = 2
				uni.stopPullDownRefresh()
			},
			goBack() {
				uni.navigateBack()
			},
			toMyProfit() {				
				let obj = {
					Symbol: this.Symbol,
				}
				navigate('myProfit/myProfit',obj)
			},
			// 跳转到我的交易记录,当前币种的
			toTransactionRecords() {
				let obj = {
					Symbol: this.Symbol,
				}
				navigate('transactionRecords/transactionRecords',obj)
			},
			// 策略控制
			switchChange(e) {
				if(this.FirstAmount <= 0) {
					uni.showToast({
						title: '您未量化该币种~',
						icon: 'none',
						duration: 1000
					})
					
					// isAut: 0, // 0是未开通, 1开通了
					
				
					if(this.timer != null) {
						return
					}
					this.timer = setTimeout(() => {
						if(this.isAut == 1) {
							// uni.navigateTo({
							// 	url: '/pages/apiLetter/apiLetter'
							// })
							// 开通了高级功能
							this.clickUserDefinedItem()
						}else if(this.isAut == 0) {
							// 未开通高级
						}
						
						clearTimeout(this.timer);
						this.timer = null;
					}, 1000)
									
					this.$once('hook:beforeDestroy', () => {
						clearTimeout(this.timer);
						this.timer = null;
					})
					return
				}
				if (this.Authoriztion == null) {
					uni.showToast({
						title: '您未授权',
						icon: 'none',
						duration: 1000
					})
					if(this.timer != null) {
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
				
				if (this.paternBtn == e) return
				this.paternBtnText = e
				switch (e) {
					case 0:
						this.title = '关闭策略'
						this.content = '确认对该交易对关闭策略?';
						break;
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
							this.modalSuccess(true)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				//this.$refs.modal.open()
			},
			async modalSuccess(e) {
				if (!e) {
					return
				}
				let params = {
					UserId: this.UserId,
					Token: this.Token,
					CurrencyGroupId: this.CurrencyId,
					Type: this.paternBtnText
				}
				let {
					data
				} = await StrategyTradingop(params)
				console.log(data)
				toast(data.msg)
				if (data.code != 0) return
				this.paternBtn = this.paternBtnText
			},
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
				console.log('this.Authoriztion:', this.Authoriztion)
				// if (res.data == null) return
				// this.APIKey = res.data.apiKey
				// this.SecretKey = res.data.secretKey
			
			},
			// 下拉刷新
			onPullDownRefresh() {
				 
				new Promise((res, rej) => {
					this.UserId = uni.getStorageSync("userId")
					this.Token = uni.getStorageSync("token")
					this.getStrategyTradingxq()
					// res()
				}).then(() => {
					uni.stopPullDownRefresh()
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "./style";
</style>
