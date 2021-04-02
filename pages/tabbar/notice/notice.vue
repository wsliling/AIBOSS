<template>
	<view>
		<view class="main-Content">
			<view class="menu">
				<view @click="clcikButton(item,index)" class="menu-item" v-for="(item,index) in menuList" :key="item.id">
					<image :src="item.logo" class="img" mode="aspectFit"></image>
					<view class="text" style="overflow: hidden;">
						{{ item.name }}
					</view>
					<!-- <image :src="item.logo" class="img shadow1" mode="aspectFill"></image> -->
				</view>
			</view>
		</view>
		<view class="topSeat"></view>
		<!-- 资讯列表 -->
		<view class="zixun-list flex">
			<view class="zixun-item" v-for="(item, index) in NewsList" :key="index" @click="golink(item)">
				<view class="zixun-item-left">
					<image :src="item.Logo" mode="aspectFill"></image>
				</view>
				<view class="zixun-item-right">
					<view class="title">
						{{item.Title}}
					</view>
					<!-- <view class="time">
					2020.12.12
					</view> -->
				</view>
				
			</view>
		</view>
		<!-- 公告列表 -->
		<!-- <view class="list">
			<view class="listItem" v-for="(item, index) in NewsList" :key="index" @click="golink(`../../noticeDetail/noticeDetail?Id=${item.Id}`)">
				<view class="title">
					{{item.Title}}
				</view>
				<view class="time">
					{{item.AddTime}}
				</view>
			</view>
		</view> -->
		<uni-load-more v-if="NewsList.length> 0  && loadMore !== 0" :loadingType="loadMore"></uni-load-more>
		<not-data  v-if='NewsList.length == 0'></not-data>
		<view style="height: 130upx;width: 100%;"></view>
		<tabbar :grade='grade' :current='2'></tabbar>
	</view>
</template>

<script>
	import { GetInformationPageList,GetPlatformTypeList, } from '@/common/js/http.js'
	import {post,get,navigate} from '@/common/utils';
	export default {
		data() {
			return {
				grade: 1, // 1游客, 2体验用户,3正式用户,4初级交易员,5中级交易员,6高级交易员,7社区
				Page:1,
				PageSize:20,
				loadMore: 0, // 0-loading前；1-loading中；2-没有更多了
				PageIndex: 1,
				NewsList:[],
				menuList:[]
			};
		},
		onLoad() {
			// this.getNewsList()
			this.GetPageList()
			this.GetPlatformType()
		},
		methods: {
			// 点击按钮
			clcikButton(item, index) {
				let obj = {
					src: item.h5Url
				}
				if (!item.h5Url) return
				// console.log(item.h5Url)
				navigate('ad/index', obj)
			},
			golink(item) {
				let Content=JSON.stringify(item)
				uni.navigateTo({
					url: `/pages/noticeDetail/noticeDetail1?Content=${Content}`
				})
			},
			//菜单类型
			async GetPlatformType() {
				let {
					data
				} = await GetPlatformTypeList(null)
				if (data.code != 0) return uni.showToast({
					title: data.msg,
					duration: 2000,
					icon: 'none'
				})
				this.menuList = data.data
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
	flex-wrap: wrap;
	.zixun-item {
		width: 33.33%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 30upx;
		box-sizing: border-box;
		// border-bottom: 1px solid #F2F2F2;
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
		margin-top: 10upx;
		// padding-left: 20upx;
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

.main-Content{
	width: 690upx;
	margin: 20upx auto 0;
}
.main-Content .menu{
	/* height: 400upx; */
	/* padding-top: 50upx; */
	height: 442upx;
	padding: 0upx 0upx 50upx;
	box-sizing: border-box;
	display: flex;
	flex-wrap: wrap;
	background-color: #FFFFFF;
	/* justify-content: space-around; */
}
.main-Content .menu .menu-item{
	margin-top: 20upx;
	width: 25%;
	/* height: 130upx; */
	/* height: 150upx; */
	/* height: 180upx; */
	text-align: center;
}
.main-Content .menu .menu-item .img{
	/* width: 90upx;
	height: 90upx; */
	width: 120upx;
	height: 120upx;
	border-radius: 50%;
}
.main-Content .menu .menu-item .text{
	/* height: 25upx;
	line-height: 25px;*/
	/* font-size: 28upx; */
	font-size: 28upx;
	font-weight: 700;
	/* word-break: break-all; */
/* 	white-space:nowrap;
	overflow:hidden; */
	overflow: hidden;
	/* text-overflow: ellipsis; */
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
}
</style>
