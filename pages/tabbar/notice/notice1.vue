<template>
	<view>
		<view class="topSeat"></view>
		<!-- 资讯列表 -->
		<!-- <view class="zixun-list">
			<view class="zixun-item" v-for="(item, index) in NewsList" :key="index">
				<view class="zixun-item-left">
					<image :src="item.Logo" mode="aspectFill"></image>
				</view>
				<view class="zixun-item-right">
					<view class="title">
						{{item.Title}}
					</view>
					<view class="time">
					{{item.AddTime}}
					</view>
				</view>
				
			</view>
		</view> -->
		<!-- 公告列表 -->
		<view class="list">
			<view class="listItem" v-for="(item, index) in NewsList" :key="index" @click="golink(`../../noticeDetail/noticeDetail?Id=${item.Id}`)">
				<view class="title">
					{{item.Title}}
				</view>
				<view class="time">
					{{item.AddTime}}
				</view>
			</view>
		</view>
		<uni-load-more v-if="NewsList.length> 0  && loadMore !== 0" :loadingType="loadMore"></uni-load-more>
		<not-data  v-if='NewsList.length == 0'></not-data>
	</view>
</template>

<script>
	import { GetInformationPageList } from '@/common/js/http.js'
	import {post,get,} from '@/common/utils';
	export default {
		data() {
			return {
				grade: 1, // 1游客, 2体验用户,3正式用户,4初级交易员,5中级交易员,6高级交易员,7社区
				Page:1,
				PageSize:20,
				loadMore: 0, // 0-loading前；1-loading中；2-没有更多了
				PageIndex: 1,
				NewsList:[],
			};
		},
		onLoad() {
			this.getNewsList()
			// this.GetPageList()
		},
		methods: {
			golink(url) {
				uni.navigateTo({
					url: url
				})
			},
			// 资讯列表
			async GetPageList(){
				let params = {
					pageIndex: this.Page,
					pageSize: this.PageSize
				}
				let { data } = await GetInformationPageList(params)
				if(data.code != 0) return
				if(data.data.length == 0 || data.data.length<this.PageSize) {
					this.loadMore = 2
				}
				this.NewsList.push(...data.data)
			},
			// 公告
			async getNewsList(){
				let res = await post('News/NewsList',{
					Page:this.Page,					PageSize:this.PageSize,					Keywords:'',
				})
				if(res.code == 0){
					console.log(res)
					res.data = res.data || []
					if(res.data.length == 0 || res.data.length<this.PageSize) {
						this.loadMore = 2
					}
					this.NewsList.push(...res.data)
					// this.NewsList = [{
					// 	Pic: '/static/logo.png',
					// 	// Pic: '',
					// 	Title: '来了标题',
					// 	AddTime: '2020-10-12'
					// }]
					
				}
			}
		},
		onReachBottom: function() {
			if(this.loadMore == 2) return
			// this.loadMore=1
			this.PageIndex++
			this.GetPageList()
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
	}
.topSeat{
	height: 20upx;
	background-color: #f5f5f5;
}
.list{
	padding: 0 20upx 10upx 20upx;
	.listItem{
		border-bottom: 1px solid #F2F2F2;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		padding: 30upx 0;
		.title{
			font-size: 30upx;
			font-weight: 600;
			white-space: nowrap;
			color: black;
			text-overflow: ellipsis;
			overflow: hidden;
			width: 75%;
		}
		.time{
			font-size: 22upx;
			color: #b3b3b3;
			width: 25%;
			text-align: right;
		}
	}
}


.zixun-list {
	.zixun-item {
		display: flex;
		align-items: center;
		padding: 30upx;
		border-bottom: 1px solid #F2F2F2;
	}
	.zixun-item-left {
		display: flex;
		align-items: center;
		image {
			width: 100upx;
			height: 100upx;
			border-radius: 10upx;
		}
	}
	.zixun-item-right {
		flex: 1;
		height: 100upx;
		padding-left: 20upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.title {
			font-size: 30upx;
			white-space: nowrap;
			color: black;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		.time {
			text-align: right;
			font-size: 22upx;
			color: #b3b3b3;
		}
	}
}
</style>
