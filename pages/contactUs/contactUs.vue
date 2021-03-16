<template>
	<view>
		<view class="topbgc">
		</view>
		<view class="main fs-18">
			<view class="main-img">
				<view class="img-top wsnr">
					点击二维码可保存到本地相册
				</view>
				<view class="img-center" @click="clickQrcode">
					<!-- <image src="@/static/contactUS.png" class="img" mode="aspectFit"></image> -->
					<image :src="businessLicense" class="img" mode="aspectFit"></image>
				</view>
				<view class="img-bottom">
					<!-- 微信扫码添加平台专属客服或搜索添加：1228958326 -->
					微信扫码添加平台专属客服或搜索添加：{{ wechat }}
				</view>
			</view>
		</view>
		<view class="tips fs-18">
			<view class="tips-Header">
				温馨提示：
			</view>
			<view class="tips-content-item">
				1,添加时请备注您的APPID：XXXXXX，未备注ID者一律无法通过申请
			</view>
			<view class="tips-content-item">
				2,添加时请备注您的APPID：XXXXXX，未备注ID者一律无法通过申请
			</view>
		</view>
	</view>
</template>

<script>
	import { post } from '@/common/utils/index.js';
	export default {
		data() {
			return {
				Content: '',
				businessLicense: '',
				wechat: '',
				timer: null
			}
		},
		onLoad() {
			this.getAboutUs()
		},
		methods: {
			getAboutUs() {
				post('System/GetAboutUs').then(res => {
					if (res.code === 0) {
						// res.data.Content = res.data.Content.replace(/<img/g, '<img style="max-width:100%;height:auto;"');
						// this.Content = res.data.Content.replace(/(\r\n|\n|\r)/gm, "<br />");
						
						this.businessLicense = res.data.businessLicense
						this.wechat = res.data.wechat
					}
				});
			},
			clickQrcode() {
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
		}
	}
</script>

<style scoped>
	@import url("./style");
</style>
