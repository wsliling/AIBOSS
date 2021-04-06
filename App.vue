<script>
	import Vue from 'vue';
	import { host } from '@/common/utils/index.js';
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-PLUS
			//检测系统
			const system = uni.getSystemInfoSync().platform;
			// App平台检测升级，服务端代码是通过uniCloud的云函数实现的，详情可参考：https://ext.dcloud.net.cn/plugin?id=2226
			if (plus.runtime.appid !== 'HBuilder') { // 真机运行不需要检查更新，真机运行时appid固定为'HBuilder'，这是调试基座的appid
				uni.request({
					// url: host + 'System/GetWebConfiguration', //检查更新的服务器地址
					url: host + 'system/GetWebConfiguration', //检查更新的服务器地址
					
					method: 'POST',
					success: (e) => {
						console.log(e)
						let _res = e.data;
						let _this = this;
						if (_res.code == 0) {
							uni.setStorageSync("VersionNo", _res.data.HotRecTitle);
							if (_res.data.HotRecTitle != plus.runtime.version) {
								// 提醒用户更新
								_this.$showModal({
									title: '更新提示',
									content: "检测到有新的版本是否选择更新？",
								}).then(res => {
									//确认
									console.log('确定了确定了确定了')
									// let version=_res.data.Copyright.split('.').join('');
									let version=_res.data.Copyright;
									const dowmappURL = 'http://web.aiboss.club/down/android.apk'; //app下载地址安卓
									if (system == "ios") {
										uni.showToast({
											title: "请自行前往APP Store下载",
											icon: "none",
											duration: 2000
										});
									}else {
										plus.runtime.openURL(system == "ios" ? dowmappURLios : dowmappURL);
									}
								}).catch(res => {
									//取消
								})
							}
						}
					}
				})
			}
			// #endif
			// 自定义导航栏，获取设备顶部高度
			uni.getSystemInfo({
				success:function(e){
					Vue.prototype.statusBar = e.statusBarHeight;
					// Vue.prototype.customBar = e.statusBarHeight + 50
					if(e.platform == 'android') {
						// Vue.prototype.customBar = e.statusBarHeight + 50
						Vue.prototype.customBar = e.statusBarHeight + 44
						console.log('安卓高度',Vue.prototype.statusBar)
					}else {
						// Vue.prototype.customBar = e.statusBarHeight + 45
						Vue.prototype.customBar = e.statusBarHeight + 41
					}
						
				}
			})
		}, 
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	} 
</script>

<style>
	/*每个页面公共css */
	@import '~@/common/css/iconfont.css';
	@import './common/uni.css';
	/* @import '~@/common/css/reset.css'; */
	/* @import url(//at.alicdn.com/t/font_2069170_eoo63d087rl.css); */
	page{
		font-size: 30upx;
		background: #F8F8F8;
	}
	.my-tab-empty-box {
		width: 750upx;
		height: 130upx;
	}
	.one-line {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.two-line {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	
</style>
