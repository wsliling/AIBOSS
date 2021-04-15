<template>
	<view>
		<!-- <view @click="golink('/pages/myProfit/myProfit')">原始</view>
		<view @click="golink('/pages/usdtInvest/usdtInvest')">充值</view>
		<view @click="swlink('/pages/tabbar/money/money')">所有</view> -->
		<view class="tabar-list">
			<view :class="typeshow==0?'active':''" @click="typeshow=0">充值</view>
			<view :class="typeshow==1?'active':''" @click="typeshow=1">点卡</view>
			<view :class="typeshow==2?'active':''" @click="typeshow=2">收益</view>
		</view>
		<view class="wallet-info">
			<swiper class="swiper" @change="swiperChange" :current="typeshow">
				<swiper-item v-for="(item,index) in walletInfo" :key="index">
					<scroll-view :scroll-y="true" class="scroll-Y" @scrolltolower="PullupMore()">
						<view class="box-sss">
							<view class="info-box" :class="{'isblue':typeshow===0||typeshow===1||typeshow===2,'isyellow':typeshow===11,'isgrren':typeshow===22}" >
								<view class="infob-name">{{item.name}}</view>
								<view v-if="typeshow==0" class="infob-number">{{ usdt  | four  }}</view>
								<view v-if="typeshow==1" class="infob-number">{{ lc  | four  }}</view>
								<view v-if="typeshow==2" class="infob-number">{{ sumAvailableLC }}</view>
								<view class="btn-list">
									<view v-for="(data,key) in item.buttons" v-if="data.url" class="btnss" :class="{'isblue':typeshow===0||typeshow===1||typeshow===2,'isyellow':typeshow===11,'isgrren':typeshow===22}"
									@click="golink(data.url)"
									>{{data.name}}</view>
									<view v-for="(data,key) in item.buttons" v-if="data.conver" class="btnss" :class="{'isblue':typeshow===0||typeshow===1||typeshow===2,'isyellow':typeshow===11,'isgrren':typeshow===22}"
									@click="data.conver"
									>{{data.name}}</view>
								</view>
							</view>
						</view>
						<view class="record-list" >
							<view class="record-title">
								<view class="title-l">{{item.chidron}}</view>
								<view class="title-r"><image src="../../static/timess.png" @click="golink(item.detailurl)"></view>
							</view>
							<view class="recode-content" v-for="(mation,reper) in tabList" :key="reper" v-if='tabList.length > 0'>
								<view class="recon-l">
									<view class="recon-status">
										{{mation.title}}
									</view>
									<view class="recon-date">
										{{mation.addtime}}
									</view>
								</view>
								<view class="recon-r" :class="{'addcolor':mation.direction == 0, 'cutcolor' :mation.direction != 0}">
									{{mation.direction == 0?'+':'-'}}{{mation.money}}
								</view>
							</view>
							<uni-load-more v-if="tabList.length> 0  && loadMore !== 0" :loadingType="loadMore"></uni-load-more>
							<not-data  v-if='tabList.length == 0'></not-data>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import { GetUSDTRecordPageList } from '@/common/js/http.js'
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
				typeshow:0,//0cz 1LC 2tk
				walletInfo:[
					{
						name:"总资产(USDT)",
						number:0,
						buttons:[
							{name:'充币',
								url:'/pages/usdtInvest/usdtInvest'
							},
							{name:'提币',
								url:'/pages/usdtCashOut/usdtCashOut',
							},
							{name:'兑换',
								conver:this.toConvert,
							},
						],
						chidron:'最近成交记录',
						detailurl:'/pages/usdtDetail/usdtDetail'
					},
					{
						name:"总点卡数",
						number:0,
						buttons:[
							{name:'充币',
								url:'/pages/lcInvest/lcInvest'
							},
							{name:'兑换',
								conver:this.toConvert,
							},
							// {name:'转换',
							// 	conver:this.toConvert
							// },
						],
						chidron:'最近点卡记录',
						detailurl:'/pages/lcDetail/lcDetail'
					},
					{
						name:"总收益(USDT)",
						number:0,
						buttons:[
							{name:'划转',
								conver:this.toConvert1
							}
						],
						chidron:'最近收益记录',
						detailurl:'/pages/convertDetail/convertDetail'
					}
				],
				grade: 1, // 1游客, 2体验用户,3正式用户,4初级交易员,5中级交易员,6高级交易员,7社区
				lc: 0,
				usdt: 0,
				availableLC: 0,
				// 累计lc
				sumAvailableLC: 0,
				// 当月lc
				sumAvailableLCOnMonth: 0,
				userId:'',
				token:'',
				Year: '',//最近
				Month: '',//最近
				date: '',
				loadMore: 0, // 0-loading前；1-loading中；2-没有更多了
				PageIndex: 1,
				PageSize: 12,
				tabList:[],//最近数据
			};
		},
		onLoad(e) {
			if(e.IsAuthLC==1){//是否显示转让
				let arr=[
					{name:'充币',
						url:'/pages/lcInvest/lcInvest'
					},
					{
						name:'转让',
						url:'/pages/turnCoin/turnCoin',
					}]
				this.walletInfo[1]['buttons']=arr;
			}
		},
		onShow() {
			this.userId = uni.getStorageSync('userId')
			this.token = uni.getStorageSync('token')
			this.getUserAssetsInfo()
			this.reset()
			this.init()
		},
		methods:{
			swiperChange(e){
				this.typeshow = e.detail.current
				this.init()
			},
			golink(url){
				if(!judgeLogin())return
				uni.navigateTo({
					url:url
				})
			},
			swlink(url){
				uni.switchTab({
					url:url
				})
			},
			//下拉加载
			PullupMore(){
				if(this.loadMore == 2) return
				this.PageIndex++
				this.getUSDTRecordPageLists()
			},
			// 资产信息
			async getUserAssetsInfo() {
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				let obj = {
					userId: this.userId,
					token: this.token
				}
				let res = await post('User/GetUserAssetsInfo', obj)
				if (res.code != 0) return
				this.lc = res.data.lc
				this.usdt = res.data.usdt
				this.availableLC = res.data.availableLC
				this.sumAvailableLC = res.data.sumAvailableLC
				this.sumAvailableLCOnMonth = res.data.sumAvailableLCOnMonth
			
			},
			toConvert1() {
				if (!judgeLogin()) return
				uni.navigateTo({
					url: '/pages/convert/convert?fromshouyi=1'
				})
			},
			// 跳转转换页面
			toConvert() {
				let date = new Date()
				let today = date.getDate();
				console.log(today)
				// if(today != 1 || today != 2 || today != 3) {
			
				if (!judgeLogin()) return
				uni.navigateTo({
					url: '/pages/convert/convert'
				})
				// let content = '推广收益每月1号正式结算,转换日期为每月1号到3号,未到日期不能转换'
				// uni.showModal({
				// 	title: '注意',
				// 	content: content,
				// 	success: (res) => {
				// 		if (res.confirm) {
				// 			if (!judgeLogin()) return
				// 			uni.navigateTo({
				// 				url: '/pages/convert/convert'
				// 			})
				// 		} else if (res.cancel) {
				// 			console.log('用户点击取消');
				// 		}
				// 	}
				// });
			
			},
			//最近记录
			init(){
				this.PageIndex = 1
				this.loadMore = 0
				this.tabList = [];
				this.getUSDTRecordPageLists()
			},
			//当月名称
			reset() {
				let data = new Date()
				let mon = data.getMonth() + 1
				let month = mon < 10 ? '0' + mon : mon
				this.date = data.getFullYear() + "-" + month
				this.Month = month
				this.Year = data.getFullYear()
				// console.log(this.Month)
				// coole.log(this.Year)
			
			},
			// 获取USDT提现,充值记录
			async getUSDTRecordPageLists() {
				let myPageIndex = 'PageIndex' + this.currentIndex
				let typeclass;
				if(this.typeshow==0){
					typeclass=1
				}else{
					typeclass=0
				}
				let obj = {
					UserId: uni.getStorageSync('userId'),
					Token: uni.getStorageSync('token'),
					Year: this.Year,
					Month: this.Month,
					Type:typeclass,
					PageIndex: this.PageIndex,
					PageSize: this.PageSize
				}
				
				let data
				// console.log(obj)
				if(this.typeshow==0){
					data = await post('/User/GetUSDTRecordPageList',obj)
				}else if(this.typeshow==1){
					data = await post('User/GetLCRecordPageList',obj)
				}else if(this.typeshow==2){
					data = await post('User/GetAvailableLCRecordPageList',obj)
				}
				console.log(data)
				// 未授权
				if(data.code == 9) {
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
				data.data = data.data || []
				if(data.data.length == 0) {
					this.loadMore = 2
				}
				this.tabList.push(...data.data)
			},
		},
	}
</script>

<style lang="scss" scoped>
@import './style.scss'
</style>
