<script>
	import Vue from 'vue';
	export default {
		onLaunch: function() {
			console.log('App Launch')
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
