<template>
	<view>
		<!-- <view class="headerTab">
			<view class="tab-item">
				<text class="tab-btn fs-22" :class="currentIndex == 0 ? 'active' : ''" @click="clickTab(0)">充币</text>
			</view>
			<view class="tab-item">
				<text class="tab-btn" :class="currentIndex == 1 ? 'active' : ''" @click="clickTab(1)">转换</text>
			</view>
		</view> -->
		<view class="timer">
			<picker mode="date" fields="month" @cancel="cancelSelect" :value="date"  @change="bindDateChange" :end='myNowDate'>
				<view class="timebox" @click="selectTime">
					<text class="fs-18">{{ date }}</text>
					<text class="iconfont" :class="isOpen ? 'icon-xiangshang1' : 'icon-xiangxia'"></text>
				</view>
			</picker>
		</view>
		<swiper class="swiper"  v-if="RechargeList.length>0" :current="currentIndex" @change="swiperChange"  :style="'height:' +pageHeight+'px'">
			<swiper-item>
				<!-- <scroll-view @scrolltolower="toBottom" :lower-threshold="100" scroll-y="true" class="main" :refresher-triggered="refreshState" :refresher-enabled="true" @refresherrefresh="pullRefresh"> -->
				<scroll-view @scrolltolower="toBottom" :lower-threshold="100" scroll-y="true" class="main" :refresher-triggered="scroll_refresher_enabled" :refresher-enabled="true" @refresherrefresh="pullRefresh"  @scroll='myScroll'  :style="'height:' +pageHeight+'px'">
					<view class="main-item" v-for="item in RechargeList" :key="item.id">
						<view class="item-left">
							<view class="left-top fs-20">
								{{ item.title }}
							</view>
							<view class="left-bottom fs-15">
								{{ item.addtime }}
							</view>
						</view>
						<view class="item-right fs-20" :class="[item.direction == 0 ? 'fzcolorgreen' : 'fzcolorred']">
							<!-- {{ item.direction == 0 ? '+'+item.money: '-'+item.money }} -->
							<!-- == 0 收入 -->
							{{ item.direction == 0 ? '+' : '-' }} {{ item.money | four}}
						</view>
					</view>
					
					<uni-load-more  v-if="RechargeList.length>0" :loadingType="loadMore"></uni-load-more>
					<!-- <view  v-if="RechargeList.length == 0 && loadMore == 2">
						<not-data></not-data>
					</view>
					<view class="" style="height: 80upx;">
						
					</view> -->
					<view class="" style="height: 80upx;">
						
					</view>
				</scroll-view>
				
			</swiper-item>
			
			<!-- <swiper-item>
				<scroll-view scroll-y="true" @scrolltolower="toBottom" class="main">
					<view class="main-item" v-for="item in 15">
						<view class="item-left">
							<view class="left-top">
								转换
							</view>
							<view class="left-bottom">
								2020/08/30 16:43
							</view>
						</view>
						<view class="item-right fzcolorred">
							+91.08
						</view>
					</view>
				</scroll-view>
			</swiper-item> -->
			
		</swiper>
		<view  v-if="RechargeList.length == 0 && loadMore == 2">
			<not-data></not-data>
			<view class="" style="height: 80upx;">
				
			</view>
		</view>
		
	</view>
</template>

<script>
	import notData from '@/components/not-data/not-data.vue'
	
	export default {
		props:{
			RechargeList:{
				type: Array
			},
			convert:{
				type: Array
			},
			isRequest:{
				type: Boolean,
				default: true
			},
			myNowDate:{
				type:String,
				default: ''
			},
			loadMore:{
				type: Number,
				default: 0
			},
			pageHeight:{
				type: Number,
				default: 300
			}
		},
		components:{
			notData
		},
		data() {
			return {
				currentIndex: 0,
				isOpen: false,
				date: '',
				PageIndex: 1,
				swiperHeight: 0,
				refreshState: false,
				isRequest2: false,
				scroll_refresher_enabled: true
			};
		},
		mounted() {
			this.reset()
		},
		methods:{
			myScroll(e) {
				// if(this.scrollTop = 'ding') {
				// 	return
				// }
				// console.log(e)
				// this.scrollTop = e.detail.scrollTop
				if (e.detail.scrollTop === 0) {
				this.scroll_refresher_enabled = true
				} else {
				this.scroll_refresher_enabled = false
				}
			},
			pullRefresh(){
				// if(this.refreshState)return
				this.refreshState = true
				this.reset()
				this.getList()
			},
			toBottom(){
				// if(this.refreshState || !this.isRequest) return
				if(this.loadMore == 2) {
					return
				}
				this.refreshState = true
				this.PageIndex++
				this.getList()
			},
			reset(){
				this.PageIndex = 1
				let data = new Date()
				let mon = data.getMonth()+1
				let month = mon <10 ? '0'+mon : mon
				this.date = data.getFullYear()+"-"+month
				this.$emit('resetLcList')
			},
			getList(){
				let params = {
					PageIndex: this.PageIndex,
					Year: +this.date.split('-')[0],
					Month: +this.date.split('-')[1],
					Type: this.currentIndex+1,
					isRequest: this.isRequest2
				}
				this.$emit('getLcList',params)
			},
			clickTab(index){
				if(index == this.currentIndex) return
				this.reset()
				this.currentIndex = index
			},
			swiperChange(e){
				this.currentIndex = e.detail.current
				//this.getList()
			},
			selectTime(){
				this.isOpen = !this.isOpen
			},
			bindDateChange(e){
				this.date = e.target.value
				console.log('this.date:',this.date)
				this.isOpen = !this.isOpen
				this.isRequest2 = true
				// 清空数组
				
				let params = {
					PageIndex: 1,
					Year: +this.date.split('-')[0],
					Month: +this.date.split('-')[1],
					Type: this.currentIndex+1,
					isRequest: this.isRequest2
				}
				
				this.$emit('emptyArr',params)
				// this.getList()
			},
			cancelSelect(){
				this.isOpen = !this.isOpen
			}
		}
	}
</script>

<style scoped>
	.headerTab{
		height: 90upx;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 34upx;
	}
	.headerTab .tab-item{
		width: 50%;
		text-align: center;
	}
	.headerTab .tab-item .tab-btn{
		height: 90upx;
		line-height: 90upx;
		display: inline-block;
	}
	.active{
		border-bottom: 5upx solid #02CC89;
		color: #02CC89;
	}
	
	.timer{
		margin-top: 30upx;
		width: 100vw;
		height: 100upx;
		box-sizing: border-box;
		padding-left: 30upx;
		background-color: #f7f6fb;
		display: flex;
		align-items: center;
	}
	.timer .timebox{
		background-color: #FFFFFF;
		padding: 10upx;
		color: #999999;
	}
	.main-item{
		height: 130upx;
		width: 690upx;
		margin: 0 auto;
		border-bottom: 1px solid #ececec;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.main-item .item-left .left-top{
		font-weight:600;
		font-size: 30upx;
	}
	.main-item .item-left .left-bottom{
		color: #999999;
		font-size: 20upx;
		margin-top: 10upx;
	}
	.fzcolorgreen{
		color: #4387ea;
	}
	.fzcolorred{
		color: red;
	}
	.swiper{
		height: calc(100vh - 100px);
	}
	.swiper .main{
		height: 100%;
	}
</style>
