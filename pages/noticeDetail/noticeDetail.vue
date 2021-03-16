<template>
	<view class="Content">
		<view class="headed">
			<view>
			{{Content.Title}}
			</view>
		</view>
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
				Content:[],
				userId:'',
				token:'',
				Id:''
			};
		},
		onLoad(e) {
			this.userId = uni.getStorageSync('userId')
			this.token = uni.getStorageSync('token')
			this.Id = e.Id
			this.getContent()
		},
		methods:{
			async getContent(){
				let res = await post('News/GetNews',{
					Id:this.Id,
					Token:this.token,
					UserId:this.userId,
				})
				console.log('11',res)
				if(res.code ==0){
					this.Content = res.data;
				}
			}
		},
	}
</script>

<style lang="scss">
.Content{
	padding: 40upx 20upx 10upx 20upx;
}
.headed{
	width: 100%;
	font-size: 34upx;
	margin-bottom: 30upx;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
