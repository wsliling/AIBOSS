<template>
	<view>
		<same-header :typetext="typetext" :headertext="headertext"></same-header>
		<!-- 同步按钮 -->

		<view class="main">
			<view class="tongbu" @click="synchronousUSDT">
				同步USDT
			</view>
			<view class="select-box">
				<!-- <view class="item" :class="showIndex==0?'active':''" @click="select(0)">ERC20</view> -->
				<view class="item" :class="showIndex==1?'active':''" @click="select(1)">TRC20</view>
			</view>
			<view class="main-item">
				<!-- <image src="@/static/coin/qrcode.png" class="img" mode="scaleToFill"></image> -->
				<image :src="walletAddressQRcode" class="img" mode="scaleToFill" v-if="walletAddressQRcode"></image>
			</view>
			<view class="main-item btn fs-20" @click="saveimg()">
				保存二维码至相册
			</view>
			<view class="main-item greycolor fs-18">
				充币地址
			</view>
			<view class="main-item fontNextLine fs-16">
				{{ walletAddress }}
			</view>
			<view class="main-item btn fs-18" @click="savePath">
				复制地址
			</view>
		</view>
		<view class="bottom fs-18">
			请勿向上述地址充值任何非<label style="color: #0166eb;margin: 0 10upx;">{{showIndex==0?'ERC20_USDT':'TRC20_USDT'}}</label>资产，否则资产将不可退回。
		</view>
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
	import sameHeader from '@/components/sameHeader.vue'
	export default {
		data() {
			return {
				lc: 0,
				usdt: 0,
				walletAddress: '',
				walletAddressQRcode: '',

				typetext: 'USDT',
				// headertext: 'LC',
				headertext: '',
				// walletAddress: '0x6856761315648891154989822194891659154163431'
				showIndex:1,
				AssetsInfo:{}
			}
		},
		components: {
			sameHeader
		},
		onLoad() {
		},
		onShow() {
			this.getUserAssetsInfo()
		},
		methods: {
			// 保存图片
			saveimg(path) {
				//  uni.saveImageToPhotosAlbum({
				// 	filePath: path || '',
				// 	success: function () {
				// 		console.log('save success');
				// 	}
				// });
				// uni.downloadFile({
				// 		// url: 'https://www.fb0b1a26523c33400f66f.jpg',
				// 		url: path,
				// 		success: (res) =>{
				// 			if (res.statusCode === 200){
				// 				uni.saveImageToPhotosAlbum({
				// 					filePath: res.tempFilePath,
				// 					success: function() {
				// 						uni.showToast({
				// 							title: "保存成功",
				// 							icon: "none"
				// 						});
				// 					},
				// 					fail: function() {
				// 						uni.showToast({
				// 							title: "保存失败，请稍后重试",
				// 							icon: "none"
				// 						});
				// 					}
				// 				});
				// 			}
				// 		}
				// 	})
				let that = this
				// this.$set(this, 'showBack', false)
				// this.showBack = false
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
									// that.showBack = true
								}
							});
						}, function(e) {
							console.log('保存图片失败：' + JSON.stringify(e));
							// that.showBack = true
						});
					}, function(e) {
						console.log('截屏绘制图片失败：' + JSON.stringify(e));
						// that.showBack = true
					});
				}, 30)
				that.$once('hook:beforeDestroy', () => {
					clearTimeout(that.timer);
					that.timer = null;
				})

			},
			savePath() {
				uni.setClipboardData({
					data: this.walletAddress,
					success: function() {
						uni.showToast({
							title: '复制成功',
							duration: 2000
						});
					}
				});
			},
			// 请求资产
			async getUserAssetsInfo() {
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				let obj = {
					userId: this.userId,
					token: this.token
				}
				let res = await post('User/GetUserAssetsInfo', obj)
				if (res.code != 0) return
				this.AssetsInfo=res.data
				this.lc = res.data.lc
				this.usdt = res.data.usdt
				this.walletAddress = res.data.trc20Wallet.walletAddress
				this.walletAddressQRcode = res.data.trc20Wallet.walletAddressQRcode
			},
			select(index){
				this.showIndex=index;
				let data=index==0?this.AssetsInfo.erc20Wallet:this.AssetsInfo.trc20Wallet;
				this.walletAddress = data.walletAddress
				this.walletAddressQRcode = data.walletAddressQRcode
			},
			// 同步用户USDT请求
			async synchronousUSDT() {
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				let obj = {
					userId: this.userId,
					token: this.token
				}
				let res = await post('User/SynchronousUSDT',obj)
				toast(res.msg)
			}
			
		}
	}
</script>

<style scoped>
	@import url("./style");
</style>
