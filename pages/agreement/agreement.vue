<template>
	<view class="comment">
		<view class="newsInfo" v-html="Content"></view>
	</view>
</template>
  
<script>
	import { GetUserNotice } from '@/common/js/http.js'
	export default {
		data() {
			return {
				userId: "",
				token: "",
				Content:""
			}
		},
		onLoad: function(e) {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			//获取注册协议
			this.getinfo()
		},
		onShow(){
		},
		methods: {
			async getinfo(){
				let { data } = await GetUserNotice(null)
				if(data.code != 0) return
				this.Content = data.data.Content
				//原始字符串
				var string = data.data.Content
				 
				//替换所有的换行符
				string = string.replace(/\r\n/g,"<br>")
				string = string.replace(/\n/g,"<br>");
				// string = string.replace(/（/g,"(");
				// string = string.replace(/（ /g,"(");
				// string = string.replace(/（ /g,"(");
				// string = string.replace(/）/g,")");
				// string = string.replace(/ ）/g,")");
				// string = string.replace(/） /g,")");
				// string = string.replace(/）/g,")");
				 string = string.replace(/（/g,"(");
				 string = string.replace(/）/g,")");
				string = string.replace(/\s/g,"&nbsp;");
				 string = "<div style='word-break:break-all;'>" + string + "</div>"
				//替换所有的空格（中文空格、英文空格都会被替换）
				 
				//输出转换后的字符串
				this.Content = string
				console.log(string);
				
				// console.log(data)
			},
		}
	}
</script>

<style scoped>
.comment{ padding: 0; margin: 0 auto; background: #fff; min-height: 100%;}
.newsInfo{ padding: 30upx;}
.comment {
	height: 100%;
	width: 750upx;
	overflow-x: hidden!important;
	position:relative;
	word-break:break-all; 
}
</style>
