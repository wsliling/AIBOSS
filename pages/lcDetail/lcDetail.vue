<template>
	<view class="big-box">
		<detail @getLcList="getList" :isRequest="isRequest" ref="childDetail" @resetLcList="resetLcList" :RechargeList="RechargeList" @emptyArr='emptyArr' :myNowDate='myNowDate' :loadMore='loadMore' :pageHeight='pageHeight'></detail>
	</view>
</template>

<script>
	import { GetLCRecordPageList } from '@/common/js/http.js'
	import Detail from '@/components/Detail.vue'
	import {
		post,
		get,
		navigate,
		switchTab,
		judgeLogin,
		toast,
		trim,
		TNT
	} from '@/common/utils/index.js';
	export default {
		data() {
			return {
				pageHeight:	300,
				UserId: '', //用户登录后返回的Id				Token: '', //登录后返回的Token				PageIndex: 1, //当前页				PageSize: 12, //一页多少行(1~12)				Year: null, //选择的年				Month: null, //选择的月				Type: 1, //类型: (1:充币2:转换)
				RechargeList: [],
				convert: [],
				isRefesh: false,
				isRequest: true,
				myNowDate: '',
				loadMore: 0, // 0-loading前；1-loading中；2-没有更多了
			}
		},
		components:{
			Detail
		},
		onLoad() {
			// this.UserId = uni.getStorageSync('userId')
			// this.Token = uni.getStorageSync('token')
			// let date = new Date()
			// this.Year = date.getFullYear()
			// this.Month = date.getMonth()+1
			// this.getLcDetail()
			// this.getPageHeight()
		},
		onShow() {
			this.getPageHeight()
			this.myReset()
			this.UserId = uni.getStorageSync('userId')
			this.Token = uni.getStorageSync('token')
			this.PageIndex = 1
			this.RechargeList = []
			this.loadMore = 0
			let date = new Date()
			this.Year = date.getFullYear()
			this.Month = date.getMonth()+1
			this.getLcDetail()
		},
		methods: {
			getPageHeight() {
				// this.pageHeight = uni.getSystemInfoSync().windowHeight - this.customBar - this.statusBarH - -50 - 15 - 44; // 减去可视窗口除swiper的盒子的高度即为swiper高度
				this.pageHeight = uni.getSystemInfoSync().windowHeight -50 - 15; // 减去可视窗口除swiper的盒子的高度即为swiper高度
			},
			myReset() {
				let data = new Date()
				let mon = data.getMonth()+1
				let month = mon <10 ? '0'+mon : mon
				this.myNowDate = data.getFullYear()+"-"+month
			},
			resetLcList(){
				this.PageIndex = 1
				this.isRequest = true
				this.RechargeList = []
				this.loadMore = 0
			},
			getList(val){
				this.Year = val.Year
				this.Month = val.Month
				val.Type == this.Type ? this.isRefesh = true : this.isRefesh = false
				this.Type = val.Type
				this.PageIndex = val.PageIndex
				this.isRequest = val.isRequest
				this.getLcDetail()
			},
			emptyArr(e) {
				this.PageIndex = 1
				this.isRequest = true
				this.RechargeList = []
				this.loadMore = 0
				
				this.getList(e)
			},
			async getLcDetail(){
				console.log('执行了')
				// if(!this.isRequest)return
				console.log('进来了')
				let params = {
					UserId: this.UserId,
					Token: this.Token,
					PageIndex: this.PageIndex,
					PageSize: this.PageSize,
					Year: this.Year,
					Month: this.Month,
					// Type: this.Type
					Type: 0
				}
				// let { data } = await GetLCRecordPageList(params)
				let data = await post('User/GetLCRecordPageList',params)
				if(data.code != 0) return
				this.RechargeList.push(...data.data) 
				// if(!this.isRefesh){
				// 	this.Type == 1 ? this.RechargeList = data.data : this.convert = data.data
				// }else{
				// 	this.Type == 1 ? this.RechargeList.push(...data.data) : this.convert.push(...data.data)
				// }
				if(this.PageSize>data.data.length) {
					
					this.isRequest = false
				}
				if(data.data.length < this.PageSize) {
					this.loadMore = 2
				}else {
					this.loadMore = 0
				}
				 this.$refs.childDetail.refreshState = false
			}
		}
	}
</script>

<style scoped>
	@import url("./style");
	.big-box {
		height: 100vh;
		overflow: hidden;
	}
</style>
