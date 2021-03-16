<template>
	<view class="helpBox">
		<view class="helpItem" v-for="(ite, index) in menuList" @click="openMenu(ite)" :key="index">
			<view class="container">
				<view class="left">
					<view class="icon">
						{{ index + 1 }}
					</view>
					<view>{{ ite.Title }}</view>
				</view>
				<view class="img iconfont" :class="ite.isOpen ? 'icon-shangjiantou': 'icon-dayuhao'"></view>
			</view>
			<view class="content" v-if="ite.isOpen">
				<uParse :content="ite.Contents" v-if="ite.Contents"/>
			</view>
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
				params: {
					userId:'',
					token:'',
				},
				headerList: [],
				menuList: [],
				ClassList:[],
				Infolist:[],//详情
			};
		},
		onLoad() {
			this.userId = uni.getStorageSync('userId')
			this.token = uni.getStorageSync('token')
			this.getHelpClassList()
		},
		onShow() {
			
		},
		methods: {
			openMenu(val) {
				val.isOpen = !val.isOpen
			},
			//帮助分类
			async getHelpClassList(){
				let res = await post('Help/HelpClassList','')
				if(res.code ==0){
					this.ClassList = res.data
					for(let item of this.ClassList){
						this.GetelpList(item.Id)
						this.menuList.push(...this.menuList)
					}
				}
			},

			//列表
			async GetelpList(id){
				let res = await post('Help/HelpList',{
					UserId:this.userId,					Token:this.token,					Page:this.Page,					PageSize:this.PageSize,					Cid:id
				})
				if(res.code == 0){
					let data =[];
					for(let i of res.data){
						i['isOpen'] = false
						data.push(i)
					}
					this.menuList = data
				}
			},
			
			// async GetHelpInfo(Id){
			// 	let res = await post('Help/HelpList',{
			// 		UserId:this.userId,
			// 		Token:this.token,
			// 		Id:id
			// 	})
			// 	if(res.code == 0){
			// 		this.Infolist = res.data
			// 	}
			// }
			
		}
	}
</script>

<style lang="scss" scoped>
 page{
	 background-color: #f7f8fa;
 }
 .helpBox{
	 margin-top: 20upx;
	 padding: 0 30upx;
	 background-color: #FFFFFF;
	 .helpItem{
		 &:not(:last-child){
			 border-bottom: 1px solid #ededed;
		 }
		 .content{
			 padding: 20upx 0;
		 }
		 .container{
			 display: flex;
			 justify-content: space-between;
			 align-items: center;
			 padding: 35upx 0;
			 .iconxiangxia{
				width: 30upx;
				height: 20upx;
			 }
			 .iconxiangyou{
				 width: 20upx;
				 height: 30upx;
			 }
			 .left{
				 display: flex;
				 align-items: center;
				 color: #4387ea;
				 font-size: 30upx;
				 .icon{
					 background-image: url(../../static/icon.png);
					 height: 50upx;
					 width: 50upx;
					 line-height: 50upx;
					 text-align: center;
					 background-position: center;
					 background-repeat: no-repeat;
					 background-size: contain;
					 margin-right: 10upx;
				 }
			 }
		 }
	 }
 }
</style>
