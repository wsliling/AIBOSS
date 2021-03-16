<template>
	<view class="main-box">
		
		<view class="select-box">
			<!-- <view class="select-box-item" :class="[selectArr.indexOf(item.id) == -1 ? '' : 'active']" -->
			<!-- <view class="select-box-item" :class="[item.active == false ? 'active' : 'active']" -->
			<view class="select-box-item" :class="[item.active == false ? '' : 'active']"
			 @click="clickTab(item,item.id)" v-for="(item,index) in pageList" :key="item.id">
			 <!-- <view class="my-gou" @click.stop="selectCurrency(item,index)" :class="[item.active == false ? '' : 'active']"> -->
			 <view class="my-gou" :class="[item.active == false ? '' : 'active']">
			 	
			 </view>
				<view class="item-img">
					<image class="img" :src="item.logo" mode="aspectFit"></image>
				</view>
				<view class="item-center-text fs-16">
					{{ item.name }}
				</view>
				<!-- <view class="item-bottom-text" style="font-size: 30upx; color: #000000;" data-index="noExist" @click="selectCurrency(item)"> -->
				<view class="item-bottom-text" style="font-size: 30upx; color: #8b959f;" data-index="noExist">
					<!-- {{ item.currencyCount == 0 ? CurrencyGroupId.length> 0 ?  '选择了'+CurrencyGroupId.split(',').length+'种币种>' : '选择币种>' : '包含'+item.currencyCount+'种币种>' }} -->
					<!-- {{ item.currencyCount == 0 ? CurrencyGroupId.length> 0 ?  '选择了'+CurrencyGroupId.split(',').length+'种币种>' : '选择币种>' : '包含'+item.currencyCount+'种币种>' }} -->
					<!-- {{ item.currencyCount == 0 ? CurrencyGroupId.length> 0 ?  '选择了'+CurrencyGroupId.split(',').length+'种币种>' : '请选择币种>' : '包含'+item.currencyCount+'种币种>' }} -->
					{{ item.describe }}
				</view>
			<!-- 	<view class="sjxdui iconfont" v-if="index ==0 || index ==1"></view> -->
			</view>
			<!-- <view class="select-box-item" :class="selectArr.indexOf(1) == -1 ? '' : 'active'" @click="clickTab(1)">
				<view class="item-img">
					<image class="img" src="/static/lianghua/2.png" mode="aspectFit"></image>
				</view>
				<view class="item-center-text">
					套餐二
				</view>
				<view class="item-bottom-text">
					包含15种币种>
				</view>
			</view>
			<view class="select-box-item" :class="selectArr.indexOf(2) == -1 ? '' : 'active'" @click="clickTab(2)">
				<view class="item-img">
					<image class="img" src="/static/lianghua/3.png" mode="aspectFit"></image>
				</view>
				<view class="item-center-text">
					套餐三
				</view>
				<view class="item-bottom-text">
					包含15种币种>
				</view>
			</view> -->
			<!-- <view class="select-box-item">
				<view class="item-img">
					<image class="img" src="/static/lianghua/4.png" mode="aspectFit"></image>
				</view>
				<view class="item-center-text">
					自选
				</view>
				<view class="item-bottom-text"  @click="selectCurrency(0)">
					选择币种>
				</view>
			</view> -->
		</view>
		<view class="input-box">
			<view class="input-leftText fs-17">
				首单金额(USDT)
			</view>
			<input type="digit"  v-model="inputData" class="text" placeholder="请输入金额(USDT)" />
		</view>
		<view class="bottom_btn">
			<button class="btn fs-20" @click="Submit">一键量化</button>
		</view>
		<tabbar  :current='1'></tabbar>
	</view>
</template>

<script>
	import {
		GetPackagePageList,
		CurrencyStrategy,
		GetAuthoriztionInfo,
		GetRechargeNoticeInfo
	} from '@/common/js/http.js'
	import {
		post,
		get,
		navigate,
		switchTab,
		judgeLogin,
		toast,
		trim,
	} from '@/common/utils/index.js';
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				grade: 1, // 1游客, 2体验用户,3正式用户,4初级交易员,5中级交易员,6高级交易员,7社区
				inputData: '',
				selectArr: [],
				pageIndex: 1,
				pageSize: 12,
				pageList: [],
				CurrencyGroupId: '',
				UserId: '',
				Token: '',
				customizeId: -1,
				isAuthorized: false
			}
		},
		computed:{
			...mapState(['CurrencyGroupIds'])
		},
		onUnload() {
			uni.removeStorageSync('CurrencyGroupId')
		},
		onLoad() {
			uni.hideTabBar()
			// this.UserId = uni.getStorageSync("userId")
			// this.Token = uni.getStorageSync("token")
			// this.GetPageList()
			// this.GetRechargeNotice()
		},
		onShow() {
			uni.hideTabBar()
			this.UserId = uni.getStorageSync("userId")
			this.Token = uni.getStorageSync("token")
			this.GetPageList()
			this.GetRechargeNotice()
			
			this.GetAuthoriztionInfoList()
			this.CurrencyGroupId = this.CurrencyGroupIds
			// this.CurrencyGroupId = uni.getStorageSync('CurrencyGroupId') || ''
			// if(this.CurrencyGroupId.split(',').length == 0 && this.pageList.length == 0) return
			// for(let i of this.pageList){
			// 	if(i.currencyCount == 0){
			// 		i.currencyCount = this.CurrencyGroupId.split(',')
			// 	}
			// }
			//uni.removeStorageSync('CurrencyGroupId')
			//this.GetMemberInfo()
		},
		methods: {
			async GetRechargeNotice(){
				let params = {
					UserId: this.UserId,
					Token: this.Token
				}
				let { data } = await GetRechargeNoticeInfo(params)
				// let data = await post('Recharge/GetRechargeNoticeInfo',params)
				console.log(data)
				if(data.code != 0) {
					return
				}
				uni.showToast({
					title: '您的点卡余额不足',
					icon: 'none',
					duration: 2000
				})
			},
			...mapMutations(['updateCurrencyGroupId']),
			// 获取授权信息
			async GetAuthoriztionInfoList() {
				let params = {
					UserId: this.UserId,
					Token: this.Token,
					TypeId: 3 // 平台类型：现在写死为 3(火币网) 即可
				}
				// let { data } = await GetAuthoriztionInfo(params)
				let data= await post('User/GetAuthoriztionInfo',params)
				if(data.code == 3) {
					toast(data.msg)
				}
				console.log(data)
				if (data.code != 0) return
				if(data.data) {
					this.isAuthorized = true
				}
				else {
					this.isAuthorized = false
				}
			},
			allowSubmit(){
				if(!this.isAuthorized){
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
						uni.navigateTo({
							url:'/pages/apiLetter/apiLetter'
						})
					})
					return false
				}
				return true
			},
			Submit() {
				if(this.inputData == 0) {
					toast('首单金额不能为0')
					return
				}
				if(!this.allowSubmit()) return
				if (this.trim(this.inputData).length == 0) {
					return uni.showToast({
						title: '请输入首单金额',
						icon: 'none',
						duration: 2000
					})
				}
				let isKong = true
				this.pageList.map((item,index)=>{
					if(item.active) {
						isKong = false
					}
				})
				
				if (isKong == true) {
					uni.showToast({
						title: '您还未选择套餐',
						icon: 'none',
					})
					return
				}
				
				// if (this.selectArr.length == 0) {
				// 	return uni.showToast({
				// 		title: '您还未选择套餐',
				// 		icon: 'none',
				// 		duration: 2000
				// 	})
				// }else{
				// 	// if(this.selectArr.indexOf(this.customizeId) != -1 && this.CurrencyGroupId.length==0){
				// 	// 	return uni.showToast({
				// 	// 		title: '您选择的自定义套餐并未包含币种',
				// 	// 		icon: 'none',
				// 	// 		duration: 2000
				// 	// 	})
				// 	// }
				// }
				// this.CurrencyStrategys()
				this.GetSelectCurrencyIds()
			},
			trim(str) {
				return str.replace(/\s+/g, "");
			},
			async CurrencyStrategys(CurrencyGroupId) {
				let params = {
					UserId: this.UserId,
					Token: this.Token,
					Strategy: {
						FirstAmount: this.inputData
					}
				}
				let PackageIdArr = []
				// let CurrencyGroupIdArr = []
				this.pageList.map((item,index)=>{
					if(item.active){
						// this.$set(params,'PackageId',item.id)
						PackageIdArr.push(item.id)
					}else {
						// this.$set(params,'PackageId',false)
					}
					return item
				})
				let PackageId = PackageIdArr.join(',')
				this.$set(params,'PackageId',PackageId)
				this.$set(params,'CurrencyGroupId',CurrencyGroupId)
				// if(this.selectArr.indexOf(this.customizeId) == -1){
				// 	params['PackageId'] = this.selectArr.join(',')
				// }else{
				// 	params['CurrencyGroupId'] = this.CurrencyGroupId
				// 	params['PackageId'] = this.selectArr.join(',')
				// }
				// let { data } = await CurrencyStrategy(params)
				
				// 在请求量化之前,需要先请求选中的币种的接口
				let data = await post('Trade/CurrencyStrategy',params)
				toast(data.msg)
				if (data.code != 0) return
			},
			// 获取所有选中的币种的id的 接口
			// Trade/GetSelectCurrencyIds
			async GetSelectCurrencyIds() {
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				
				let PackageIdArr = []
				// let CurrencyGroupIdArr = []
				this.pageList.map((item,index)=>{
					if(item.active){
						// this.$set(params,'PackageId',item.id)
						PackageIdArr.push(item.id)
					}else {
						// this.$set(params,'PackageId',false)
					}
					return item
				})
				let PackageId = PackageIdArr.join(',')
				
				let obj = {
					UserId: this.userId,
					Token: this.token,
					PackageIdStr: PackageId
				}
				let res = await post('Trade/GetSelectCurrencyIds', obj, {}, false)
				if (res.code != 0) {
					return
				}
				// 请求量化
				this.CurrencyStrategys(res.data)
				
				
			},
			async GetPageList() {
				let params = {
					// pageIndex: this.pageIndex,
					// pageSize: this.pageSize,					
					UserId: this.UserId,
					Token: this.Token
				}
				// let { data } = await GetPackagePageList(params)
				let data = await post('Trade/GetPackagePageList',params)
				if (data.code != 0) return
				
				this.pageList = data.data.map((item,index)=>{
					if(item.currencyCount !=0 && item.selectCount == 0) {
						this.$set(item,'describe','请选择币种')
					}else if(item.currencyCount == 0) {
						this.$set(item,'describe','待开放')
					}else if(item.currencyCount !=0 && item.selectCount != 0) {
						this.$set(item,'describe','已选择'+ item.selectCount + '种币种')
					}
					if(item.selectCount){
						this.$set(item,'active',true)
					}else {
						this.$set(item,'active',false)
					}
					return item
				})
				
				this.pageList = data.data
				for (let i of this.pageList) {
					if (i.currencyCount == 0) {
						this.customizeId = i.id
						break;
					}
				}

			},
			selectCurrency(item,index) {
				if(item.active) {
					this.pageList[index].active = false
					return
				}
				// if(!this.allowSubmit()) return
				uni.navigateTo({
					url: `/pages/selectCurrency/selectCurrency?id=${item.id}&isOwn=${item.currencyCount}&CurrencyGroupIds=${this.CurrencyGroupId}`
				})
				// if(item.currencyCount == 0)return
				// uni.navigateTo({
				// 	url: `/pages/selectCurrency/selectCurrency?id=${item.id}&isOwn=${item.currencyCount}&CurrencyGroupIds=${this.CurrencyGroupId}`
				// })
			},
			clickTab(item, index) {
				if(item.currencyCount == 0) {
					toast('待开放')
					return
				}
				// if(!this.allowSubmit()) return
				uni.navigateTo({
					url: `/pages/selectCurrency/selectCurrency?id=${item.id}&isOwn=${item.currencyCount}&CurrencyGroupIds=${this.CurrencyGroupId}`
				})
				// if (item.currencyCount == 0) return
				// if (this.CurrencyGroupId) return uni.showToast({
				// 	title: '您已自选币种，无法再选择套餐',
				// 	icon: 'none',
				// 	duration: 2000
				// })
				// if(this.selectArr.length>0){
				// 	if(this.selectArr.indexOf(this.customizeId) != -1 && item.currencyCount != 0) return uni.showToast({
				// 		title: '您已自选币种，无法再选择套餐',
				// 		icon: 'none',
				// 		duration: 2000
				// 	})
				// 	if(this.selectArr.indexOf(this.customizeId) == -1 && item.currencyCount == 0) return uni.showToast({
				// 		title: '您已选择套餐，无法再自选币种',
				// 		icon: 'none',
				// 		duration: 2000
				// 	})
				// }
				// if (this.selectArr.indexOf(index) == -1) {
				// 	this.selectArr.push(index)
				// } else {
				// 	this.selectArr.splice(this.selectArr.findIndex(item => item == index), 1)
				// 	this.updateCurrencyGroupId('')
				// 	this.CurrencyGroupId = this.CurrencyGroupIds
				// }
				// if(index == this.customizeId && this.selectArr.length != 0){
				// 	uni.navigateTo({
				// 		url: `/pages/selectCurrency/selectCurrency?id=${item.id}&isOwn=${item.currencyCount}&CurrencyGroupIds=${this.CurrencyGroupId}`
				// 	})
				// }
			},
			// 个人信息
			async GetMemberInfo() {
				uni.removeStorageSync('grade')
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
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
		}
	}
</script>

<style scoped>
	@import url("./style");
</style>
