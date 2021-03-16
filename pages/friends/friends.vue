<template>
	<view class="big-box">
		<view v-if="showBack" :style="{'padding-top': customBar +'rpx'}" class="iconfont icon-xiaoyufuhao back" @click="back">
		</view>
		<view class="content-box" @longpress="longTouch">
			<view class="topimg">
				<!-- <view :style="{'margin-top': customBar +'rpx'}" class="iconfont icon-xiaoyufuhao back" @click="back"> -->
			</view>
			<!-- <view class="saoma">
				浏览器扫描二维码下载
			</view> -->
			<view class="userInfo">
				<view class="info-left">
					<view class="left-bottom" style="background-color: #f8f8f8;color: #333;font-size: 28upx;margin-bottom: 20upx;">
						我的邀请码: {{ info.referralCode }}
					</view>
					<!-- <view class="left-top">
						<view>
							<image class="img shadow1" :src="info.avatar" mode="aspectFill"></image>
						</view>
						<view class="usertext">
							<view class="text-top">{{ info.nickName }}</view>
							<view class="text-bottom">
								邀请码: {{ info.referralCode }}
							</view>
						</view>
					</view> -->
					<view class="info-right">
						<view class="right-top">
							<image :src="info.inviteQRcode" class="img shadow1" mode="aspectFit"></image>
						</view>
						<view class="right-bottom fs-15">
							扫描二维码下载app
						</view>
					</view>
					<view class="left-bottom" style="margin-bottom: 40upx;">
						长按屏幕保存图片分享好友
					</view>
				</view>
				
			</view>
		</view>

	</view>


	</view>
</template>
<script>
	import {
		InviteFriends
	} from '@/common/js/http.js'

	export default {
		data() {
			return {
				// 控制显示箭头的变量
				showBack: true,
				timer: null,
				statusBar: this.statusBar,
				customBar: this.customBar,
				UserId: '',
				Token: '',
				info: {
					avatar: '',
					nickName: '',
					referralCode: '',
					inviteQRcode: ''
				}
			}
		},
		onLoad() {

			this.UserId = uni.getStorageSync('userId')
			this.Token = uni.getStorageSync('token')
			//邀请人信息
			this.getInviteFriendsInfo()

		},
		methods: {
			back() {
				uni.navigateBack()
			},
			async getInviteFriendsInfo() {
				let params = {
					UserId: this.UserId,
					Token: this.Token,
				}
				let {
					data
				} = await InviteFriends(params)
				if (data.code != 0) return uni.showToast({
					title: data.msg,
					duration: 2000,
					icon: 'none'
				})
				this.info = data.data
			},
			// 长按事件start
			longTouch() {
				let that = this
				console.log('长安了')
				// this.$set(this, 'showBack', false)
				this.showBack = false
				clearInterval(that.timer);
				that.timer = null;
				let imgName = new Date().getTime()
				that.timer = setTimeout(() => {
					var pages = getCurrentPages();
					var page = pages[pages.length - 1];
					var bitmap = null;
					var currentWebview = page.$getAppWebview();
					bitmap = new plus.nativeObj.Bitmap('amway_img');
					// 将webview内容绘制到Bitmap对象中  
					currentWebview.draw(bitmap, function() {
						bitmap.save(`${imgName}.jpg`, {}, function(i) {
							uni.saveImageToPhotosAlbum({
								filePath: i.target,
								success: function(res) {
									bitmap.clear(); //销毁Bitmap图片  
									uni.showToast({
										title: '截图已保存',
										mask: false,
										duration: 1500
									});
									that.showBack = true
								}
							});
						}, function(e) {
							console.log('保存图片失败：' + JSON.stringify(e));
							that.showBack = true
						});
					}, function(e) {
						console.log('截屏绘制图片失败：' + JSON.stringify(e));
						that.showBack = true
					});
				}, 30)
				that.$once('hook:beforeDestroy', () => {
					clearTimeout(that.timer);
					that.timer = null;
				})
			}
			// 长按事件end
		}
	}
</script>

<style scoped>
	@import url("./style");
</style>
