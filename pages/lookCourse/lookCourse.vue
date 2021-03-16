<template>
	<view style="padding: 0 20upx;">
<!-- 		<view class="" v-html="content">
		</view> -->
		<view v-if="content.length" class="" v-html="content">
		</view>
		<not-data v-if="content.length <= 0 && loadMore == 2" ></not-data>
	</view>	
</template>

<script>
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
				UserId: '',
				Token: '',
				// content: "<img src='/static/jiaocheng/jiaocheng01.png'><img src='/static/jiaocheng/jiaocheng02.png'><img src='/static/jiaocheng/jiaocheng03.png'><img src='/static/jiaocheng/jiaocheng04.png'>"
				content: '',
				loadMore: 0, // 0-loading前；1-loading中；2-没有更多了
			}
		},
		onLoad() {
			// this.content = this.content.replace(/<img/g, '<img style="max-width:100%;height:auto;"');
			this.GetHuobiCourse()
		},
		methods: {
			// 获取授权信息
			async GetHuobiCourse() {
				this.UserId = uni.getStorageSync('userId')
				this.Token = uni.getStorageSync('token')
				let params = {
					UserId: this.UserId,
					Token: this.Token,
					TypeId: 3 // 平台类型：现在写死为 3(火币网) 即可
				}
				// let { data } = await GetAuthoriztionInfo(params)
				let res = await post('System/GetHuobiCourse', params)
				// if(data.code != 0) return uni.showToast({
				// 	title: data.msg,
				// 	duration: 2000,
				// 	icon: 'none'
				// })
				this.loadMore = 2
				if (res.code != 0) return
				res.data.Content = res.data.Content.replace(/<img/g, '<img style="max-width:100%;height:auto;"');
				this.content = res.data.Content
			},
		}
	}
</script>

<style>

</style>
