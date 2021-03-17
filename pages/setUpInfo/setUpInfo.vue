<template>
	<view>
		<view class="top fs-18">
			<view class="top-item bb" @click="toUpdateLogin">
				<view class="top-left">
					修改登录密码
				</view>
				<view class="top-right iconfont icon-dayuhao">

				</view>
			</view>
			<view class="top-item bb" @click="toUpdatePay">
				<view class="top-left">
					修改支付密码
				</view>
				<view class="top-right iconfont icon-dayuhao">

				</view>
			</view>
			<view class="top-item" @click="toUpdateQuestion">
				<view class="top-left">
					修改密保问题
				</view>
				<view class="top-right iconfont icon-dayuhao">
			
				</view>
			</view>
		</view>
		<view class="top fs-18">
			<view class="top-item bb" @click="toContactUs" v-if="false">
				<view class="top-left">
					联系我们
				</view>
				<view class="top-right iconfont icon-dayuhao">

				</view>
			</view>
			<view class="top-item bb">
				<view class="top-left">
					<!-- 检查更新 -->
					软件版本
				</view>
			
				<view class="top-right">
					<view class="text">
						{{ version }}
					</view>
					<!-- <view class="iconfont icon-dayuhao">
						
					</view> -->
				</view>
			</view>
			<view @click="isClearCache" class="top-item">
				<view class="top-left">
					清除缓存
				</view>
				<view class="text">
					{{fileSizeString}}
				</view>
			</view>
		</view>
		<view @tap='loginOut' class="bottom_btn">
			<button class="btn">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileSizeString: '',
				os: '',
				version: ''
			}
		},
		onLoad(){
			// #ifdef APP-PLUS
			this.formatSize()
			console.log( this.fileSizeString)
			// #endif
		},
		onShow(){
			// #ifdef APP-PLUS
			this.version = plus.runtime.version
			// #endif
		},
		methods: {
			//去修改登录密码页面
			toUpdateLogin() {
				uni.navigateTo({
					url: '/pages/updateLoginPassword/updateLoginPassword'
				})
			},
			//去修改支付密码页面
			toUpdatePay() {
				uni.navigateTo({
					url: '/pages/updatePayPassword/updatePayPassword'
				})
			},
			//去修改密保问题页面
			toUpdateQuestion() {
				uni.navigateTo({
					url: '/pages/updateQuestion/updateQuestion'
				})
			},
			//去联系我们页面
			toContactUs() {
				uni.navigateTo({
					url: '/pages/contactUs/contactUs'
				})
			},
			// 退出登录
			loginOut() {
				uni.setStorageSync('userid', '')
				uni.setStorageSync('token', '')
				// 清除所有缓存
				try {
				    uni.clearStorageSync();
				} catch (e) {
				    // error
						console.log('清除缓存出错')
				}
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			// 清除缓存start
			isClearCache() {
				uni.showModal({
					title: '提示',
					content: '确定清除缓存吗?',
					success:(res)=> {
						// 用户确定要删除
						if (res.confirm) {
							this.clearCache()
						}
					}
				})
			},
			formatSize() {
				let that = this;
				plus.cache.calculate(function(size) {
					let sizeCache = parseInt(size);
					if (sizeCache == 0) {
						that.fileSizeString = "0B";
					} else if (sizeCache < 1024) {
						that.fileSizeString = sizeCache + "B";
					} else if (sizeCache < 1048576) {
						that.fileSizeString = (sizeCache / 1024).toFixed(2) + "KB";
					} else if (sizeCache < 1073741824) {
						that.fileSizeString = (sizeCache / 1048576).toFixed(2) + "MB";
					} else {
						that.fileSizeString = (sizeCache / 1073741824).toFixed(2) + "GB";
					}
				});
			},
			clearCache() {
				let that = this;
				let os = plus.os.name;
				if (os == 'Android') {
					let main = plus.android.runtimeMainActivity();
					let sdRoot = main.getCacheDir();
					let files = plus.android.invoke(sdRoot, "listFiles");
					let len = files.length;
					for (let i = 0; i < len; i++) {
						let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径  
						plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
							if (entry.isDirectory) {
								entry.removeRecursively(function(entry) { //递归删除其下的所有文件及子目录  
									uni.showToast({
										title: '缓存清理完成',
										duration: 2000
									});
									that.formatSize(); // 重新计算缓存  
								}, function(e) {
									console.log(e.message)
								});
							} else {
								entry.remove();
							}
						}, function(e) {
							console.log('文件路径读取失败')
						});
					}
				} else { // ios暂时未找到清理缓存的方法，以下是官方提供的方法，但是无效，会报错  
					plus.cache.clear(function() {
						uni.showToast({
							title: '缓存清理完成',
							duration: 2000
						});
						that.formatSize();
					});
				}
			},
			// 清除缓存end
		},

	}
</script>

<style scoped>
	@import url("./style");
</style>
