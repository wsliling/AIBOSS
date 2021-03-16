<template>
	<view class="Content">
		<view class="headed">{{Content.Title}}</view>
		<view style="text-align: right;color: #999;margin:20upx 0 30upx;">2020.12.12</view>
		<view >
			<uParse :content="Content.Content" v-if="Content.Content"/>
		</view>
	</view>
</template>


<script>
	import uParse from '@/components/uParse/src/wxParse.vue';
	import {
		post,
		get,
	} from '@/common/utils';
	export default {
		components:{
			uParse,
		},
		data() {
			return {
				Content:{},
				userId:'',
				token:'',
				Id:''
			};
		},
		onLoad(e) {
			this.Content = JSON.parse(e.Content)
		},
		methods:{
			
		},
	}
</script>

<style lang="scss">
.Content{
	padding: 40upx 20upx 10upx 20upx;
}
.headed{
	font-weight: bold;
	width: 100%;
	font-size: 34upx;
	text-align: center;
}
</style>
