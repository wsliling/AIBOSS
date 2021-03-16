<template>
	<view>
		<view class="header-box">
			<view class="header-text fs-18">
				<view class="header-left">
					<!-- 总收益 (USDT) {{ Statistics.total | four }} -->
				</view>
				<view class="header-right" @click="selectTime">
					<picker mode="date" fields="day" @cancel="cancelSelect" :value="date"  @change="bindDateChange">
						<text>{{ date }}</text>
						<text class="iconfont" :class="isOpen ? 'icon-xiangshang1' : 'icon-xiangxia'"></text>
					</picker>
				</view>
			</view>
			<view class="circle">
						<view class="circle-text">
							<view class="circle-top fs-25">
								总收益 (USDT) 
							</view>
							<view class="circle-bottom">
								{{ Statistics.total | four }}
							</view>
						</view>
						<view style="display: flex;justify-content: space-around;margin: 30upx 0 20upx;">
							<view class="circle-text" style="width: 200upx;">
								<view class="" style="font-size: 26upx;">
									昨日累计收益(USDT)
								</view>
								<view class="" style="font-size: 26upx;">
									{{ Statistics.ZTAmount | four }}
								</view>
							</view>
							<view class="circle-text" style="width: 200upx;">
								<view class="" style="font-size: 26upx;">
									今日累计收益(USDT)
								</view>
								<view class="" style="font-size: 26upx;">
									{{ Statistics.JTAmount | four }}
								</view>
							</view>
							<view class="circle-text" style="width: 200upx;">
								<view class="" style="font-size: 26upx;">
									本月累计收益(USDT)
								</view>
								<view class="" style="font-size: 26upx;">
									{{ Statistics.totalOnMonth | four }}
								</view>
							</view>
						</view>
						
						<view class="h20-box">
							
						</view>
			</view>
		</view>
		<view class="menu fs-20">
			收益明细
		</view>
		<view v-if="Details.length>0">
			<view class="menu-item fs-16" v-for="(item,index) in Details" :key="index">
				<view class="menu-item-left">
					<view class="menu-item-left-top fs-16">
						{{ item.title }}
					</view>
					<view class="menu-item-left-bottom fs-14">
						{{ item.addtime }}
					</view>
				</view>
				<view class="menu-item-right" :class="[item.money < 0 ? 'red' : 'green']">
					{{ item.money | four }} USDT
				</view>
			</view>
			<uni-load-more v-if="!isReuqest" :loadingType="2"></uni-load-more>
		</view>
		<view v-if="Details.length==0">
			<not-data></not-data>
		</view>
	</view>
</template>

<script>
	import { IncomeDetails, GetIncomeStatistics } from '@/common/js/http.js'
	export default {
		data() {
			return {
				isOpen: false,
				date: '',
				UserId: '',
				Token: '',
				PageIndex: 1, //第几页
				PageSize: 10, //每页多少条
				Statistics: {
					total: 0,
					totalOnMonth: 0
				},
				Details: [],
				isReuqest: true,
				// 币种交易对
				Exchange: ''
			}
		},
		onReachBottom(){
			if(!this.isReuqest)return
			this.PageIndex++
			this.getDetails()
			console.log('到底了')
		},
		onLoad(e) {
			
			// this.Exchange = e.CurrencyCode
			this.Exchange = e.Symbol
			
			let data = new Date()
			let month = data.getMonth()+1
			let dateMonth = month <10 ? '0' + month : month 
			this.date = data.getFullYear()+"-"+dateMonth+"-"+data.getDate()
			this.UserId = uni.getStorageSync("userId")
			this.Token = uni.getStorageSync("token")
			this.getStatistics()
			this.getDetails()
		},
		methods: {
			async getStatistics(){
				let params = {
					UserId: this.UserId,
					Token: this.Token,
					Year: +this.date.split('-')[0],
					Month: +this.date.split('-')[1],
					Exchange: this.Exchange,
				}
				let { data } = await GetIncomeStatistics(params)
				if(data.code != 0) return
				this.Statistics = data.data
				
			},
			async getDetails(){
				let params = {
					UserId: this.UserId,
					Token: this.Token,
					PageIndex: this.PageIndex,
					PageSize: this.PageSize,
					Year: +this.date.split('-')[0],
					Month: +this.date.split('-')[1],
					Date:this.date,
					Exchange: this.Exchange,
				}
				let { data } = await IncomeDetails(params)
				if(data.code != 0) {
					return
				}
				if(data.data.length<this.PageSize) {
					this.isReuqest = false
				}
				data.data.map((item,index)=>{
					// if(Number(item.money)<0) {
					// 	this.$set(item,'isRed',true)
					// }else {
					// 	this.$set(item,'isRed',false)
					// }
						this.$set(item,'money',Number(item.money))
				})
				this.Details.push(...data.data)
				console.log(this.Details)
			},
			selectTime(){
				this.isOpen = !this.isOpen
			},
			bindDateChange(e){
				this.date = e.target.value
				this.isOpen = !this.isOpen
				//切换时间后查询数据
				this.Details = []   //先清空
				this.getStatistics()
				this.getDetails()
			},
			cancelSelect(){
				this.isOpen = !this.isOpen
			}
		}
	}
</script>

<style>
	@import url("./style");
</style>
