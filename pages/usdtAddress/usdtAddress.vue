<template>
	<view>
		<view v-if="list.length" class="main-box">
			<view @tap='clickChoose(item,index)' class="main-box-item" v-for="(item,index) in list" :key='index'>
				<view class="header fs-16">
					<!-- USDT地址名称 -->
					{{ item.name }}
				</view>
				<view class="header-name fs-16">
					<!-- USDTdaonaofdajpamcpajpdpfanonaofnoiaoajsfijaosijioajoajdojai -->
					{{ item.address }}
				</view>
				<view class="icon-box">
					<view @click.stop="clickEdit(item,index)" class="icon">
						<text class="iconfont icon-bianji"></text>
						<text class="text fs-16">编辑</text>
					</view>
					<view @click.stop="clickDel(item,index)" class="icon">
						<!-- <view class="icon" @click="remove"> -->
						<text class="iconfont icon-shanchu"></text>
						<text class="text fs-16">删除</text>
					</view>
				</view>
			</view>
			<view class="my-loadmore">
				<uni-load-more v-if="list.length > 0  && loadMore !== 0" :loadingType="loadMore"></uni-load-more>
			</view>
		</view>
		<!-- 为空的时候 -->
		<!-- <view v-else class="empty-box"> -->
		<view v-if='list.length === 0' class="empty-box">
			<image class="empty-img" src="/static/addres/empty.png" mode="widthFix"></image>
			<view class="text">
				暂无记录
			</view>
		</view>
		
		<view class="bottom_btn" @click="toAddUSDTAddress">
			添加地址
		</view>

		<!-- 删除弹窗 -->
		<!-- <my-showModal ref='modal' @success='success' :title='title' :content='content'></my-showModal> -->
	</view>
</template>

<script>
	import {
		toast,
		trim,
		verifyPhone,
		post,
		get,
		navigate
	} from '@/common/utils/index.js'
	export default {
		data() {
			return {
				timer: null,
				userId: '',
				token: '',
				PageIndex: 1,
				PageSize: 12,
				loadMore: 0, // 0-loading前；1-loading中；2-没有更多了
				id:'',
				list: [
					// '0',
					// '1',
					// '2',
					// '3',
					// '4',
					// '5',
					// '6',
				],
				currentIndex: -1,
				title: '您确定删除该地址吗',
				content: '此操作不可逆，确认删除？'
				//content: ''
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.init()
		},
		methods: {
			clickChoose(item,index) {
				this.$store.commit('update',{"address":item.address})
				if(this.timer != null) return
				this.timer = setTimeout(() => {
					uni.navigateBack()
				}, 100)
				this.$once('hook:beforeDestroy', () => {
					clearInterval(this.timer);
					this.timer = null;
				})
			},
			clickEdit(item,index) {
				this.currentIndex = index
				navigate('addUSDTAddress/addUSDTAddress',{
					isEdit: 1,
					id: item.id,
					name: item.name,
					address: item.address
				})
			},
			clickDel(item, index) {
				this.currentIndex = index
				this.id = item.id
				// uni.showModal({
				// 	title: '您的余额不足~',
				// 	content: "是否跳转充值页面?",
				// 	confirmColor: "#D0A072",
				// 	success(res) {
				// 		if (res.confirm) {
				// 			navigate('mySon/wallet/chongzhi/index')
				// 		} else if (res.cancel) {}
				// 	}
				// });
				// return
				uni.showModal({
				    title: this.title,
				    content: this.content,
				    success: (res) => {
				        if (res.confirm) {
				            this.success(true)
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				//this.$refs.modal.open()

			},
			async success(e) {
				console.log(e)
				if (!e) return
				// 确定删除了
				// 地址删除请求
				let obj = {
						UserId: this.userId,
						Token: this.token,
						Id: this.id
				}
				let res = await post('Address/DeleteUSDTAddress',obj)
				toast(res.msg)
				if(res.code != 0) return
				// 返回,然后切割数组
				// console.log('this.list刪除前:',this.list)
				let tempArr = JSON.parse(JSON.stringify(this.list))
				tempArr.splice(this.currentIndex, 1)
				this.list = JSON.parse(JSON.stringify(tempArr))
				// console.log('this.list刪除后:',this.list)
			},
			toAddUSDTAddress() {
				// uni.navigateTo({
				// 	url: '/pages/addUSDTAddress/addUSDTAddress'
				// })
				navigate('addUSDTAddress/addUSDTAddress',{
					isEdit: 0,
					id: '',
					name: '',
					address: ''
				})
			},
			init() {
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				this.list = []
				this.PageIndex = 1
				this.PageSize = 12
				this.loadMore = 0
				this.getUSDTAddressPageList()
			},
			// 获取地址列表
			async getUSDTAddressPageList() {
				let obj = {
						UserId: this.userId,
						Token: this.token,
						PageIndex: this.PageIndex,
						PageSize: this.PageSize
				}
				let res = await post('Address/GetUSDTAddressPageList',obj)
				if(res.code != 0) return
				res.data = res.data ? res.data : []
				if (res.data.length < this.PageSize) {
					console.log('没有更多的')
					// 没有更多的
					this.loadMore = 2;
				} else {
					// loading前
					this.loadMore = 0;
				}
				
				this.list.push(...res.data)
			},
			// async deleteUSDTAddress() {
			// 	let obj = {
			// 			UserId: this.userId,
			// 			Token: this.token,
			// 			Id: this.id
			// 	}
			// 	let res = await post('Address/DeleteUSDTAddress',obj)
			// 	toast(res.msg)
				
			// },
			// remove() {
			// 	uni.showModal({
			// 		title: '提示',
			// 		content: '此操作不可逆，确认删除？',
			// 		success: function (res) {
			// 			if (res.confirm) {
			// 				console.log('用户点击确定');
			// 			} else if (res.cancel) {
			// 				console.log('用户点击取消');
			// 			}
			// 		}
			// 	})
			// }
		},
		// 下拉刷新
		onReachBottom() {
				if (
					this.loadMore === 2
				) return;
				this.PageIndex++
				this.getMyTeamPageList()
		}
	}
</script>

<style scoped>
	@import url("./style");
</style>
