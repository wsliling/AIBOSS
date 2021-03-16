<template>
	<view class="menu">
		<!-- <radio-group> -->
		<view @click="selectBtn(item,index)" class="big-menu-item" v-for="(item,index) in  menuList" :key="item.id">
			<view class="menu-item">
				<view class="img">
					<image :src="item.logo" mode="widthFix"></image>
				</view>
				<view class="text fs-18">{{ item.name }}</view>
			</view>
			<!-- <view class="selectMenu" @click="selectBtn(item.id+'')" :class="selectList.indexOf(item.id+'') != -1 ? 'active' : ''" v-if="isOwn == 0"> -->
			<!-- <view class="selectMenu" @click="selectBtn(item.id+'')" :class="selectList.indexOf(item.id+'') != -1 ? 'active' : ''"> -->
			<!-- <view class="selectMenu" @click="selectBtn(item,index)" :class="item.active ? 'active' : ''"> -->
			<view class="selectMenu" :class="item.active ? 'active' : ''">
				<view class="iconfont icon-dui">

				</view>
				<!-- <radio :value="item.Title" class="radio" :checked="item.checked" /> -->
			</view>
		</view>
		<!-- <view class="" v-if="menuList.length == 0 && loadMore == 2"> -->
		<view class="" v-if="menuList.length == 0 && loadMore == 2">
			<not-data></not-data>
		</view>
		<!-- </radio-group> -->
	</view>
</template>

<script>
	import infoList from '@/components/infoList.vue'
	import {
		GetCurrencyList,
		GetAllCurrencyList
	} from '@/common/js/http.js'
	import {
		mapMutations
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
				loadMore: 0,
				UserId:'',
				Token: '',
				menuList: [],
				id: 0,
				selectList: [],
				isOwn: 0,
				timer: null
			}
		},
		components: {
			infoList
		},
		onUnload() {
			// this.setId()
		},
		onLoad(e) {

			this.id = e.id || 0
			this.isOwn = e.isOwn || 0
			// uni.setNavigationBarTitle({
			// 	title: this.isOwn == 0 ? '币种选择' : '查看币种'
			// })
			uni.setNavigationBarTitle({
				title: '币种选择'
			})
			// #ifdef APP-PLUS
			if (this.isOwn != 0) {
				// 修改右上角按钮显示
				// let webView = this.$mp.page.$getAppWebview();
				// // 修改buttons  
				// // index: 按钮索引, style {WebviewTitleNViewButtonStyles }  
				// webView.setTitleNViewButtonStyle(0, {
				// 	width: 0,
				// });
			}
			// #endif

			// #ifdef H5
			console.log('H5')
			// #endif
			// this.UserId = uni.getStorageSync("userId")
			// this.Token = uni.getStorageSync("token")
			this.selectList = e.CurrencyGroupIds != '' ? e.CurrencyGroupIds.split(',') : []
			// this.getList()
		},
		onShow() {
			this.UserId = uni.getStorageSync("userId")
			this.Token = uni.getStorageSync("token")
			this.getList()
		},
		methods: {
			...mapMutations(['updateCurrencyGroupId']),
			setId() {
				let str = ''
				for (let i of this.selectList) {
					str += i + ','
				}
				str = str.substring(0, str.length - 1)
				this.updateCurrencyGroupId(str)
				// uni.setStorageSync('CurrencyGroupId',str)
			},
			selectBtn(item,index) {
				// this.selectList.indexOf(index) == -1 ? this.selectList.push(index) : this.selectList.splice(this.selectList.findIndex(
				// 	item => item == index), 1)
				this.menuList[index].active = !this.menuList[index].active 
				
			},
			//获取套餐的货币列表
			async getList() {
				let params = {
					UserId: this.UserId,
					Token: this.Token,
					// packageId: this.id
					PackageId:this.id
				}
				// let { data } = this.isOwn == 0 ? await GetAllCurrencyList() : await GetCurrencyList(params)
				// let { data } = await GetCurrencyList(params)
				let data = await post('Trade/GetCurrencyList',params)
				this.loadMore = 2
				if (data.code != 0) return
				data.data = data.data ? data.data : []
				this.menuList = data.data.map((item,index)=>{
					if(item.isSelect) {
						this.$set(item,'active',true)
					}else {
						this.$set(item,'active',false)
					}
					return item
				})
				// this.menuList = data.data
				// console.log(data)
				console.log('this.menuList:',this.menuList)
			},
			// 点击确定保存选中币种状态
			// Trade/UpdatePackageCurrency
			async UpdatePackageCurrency() {
				let tempArr = []
				let CurrencyIds = ''
				this.menuList.map((item,index)=>{
					if(item.active) {
						tempArr.push(item.id)
					}else {
					}
					return item
				})
				CurrencyIds = tempArr.join(',')
				let params = {
					UserId: this.UserId,
					Token: this.Token,
					// packageId: this.id
					PackageId:this.id,
					CurrencyIds: CurrencyIds
				}
				let data = await post('Trade/UpdatePackageCurrency',params)
				toast(data.msg)
				if (data.code != 0) return
				
			},
			
		},
		onNavigationBarButtonTap(e) {
			// console.log('点击右上角确定')
			// let isKong = true
			// this.menuList.map((item,index)=>{
			// 	if(item.active) {
			// 		isKong = false
			// 	}
			// })
			
			// if (isKong == true) {
			// 	uni.showToast({
			// 		title: '您还未选中币种',
			// 		icon: 'none',
			// 	})
			// 	return
			// }
			this.UpdatePackageCurrency()
			// if (this.selectList.length == 0) {
			// 	uni.showToast({
			// 		title: '您还未选中币种',
			// 		icon: 'none',
			// 	})
			// 	return
			// }

			// this.setId()

			// 保存选中状态请求
			// if (this.timer != null) return
			// this.timer = setTimeout(() => {
			// 	// uni.navigateBack()
			// 	clearTimeout(this.timer);
			// 	this.timer = null;
			// }, 1000)

			// this.$once('hook:beforeDestroy', () => {
			// 	clearTimeout(this.timer);
			// 	this.timer = null;
			// })
			// uni.navigateBack()
		}
	}
</script>

<style scoped>
	@import './style';
	page {
		background: #F8F8F8;
	}
</style>
