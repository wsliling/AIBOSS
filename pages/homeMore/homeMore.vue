<template>
	<view >
		<info-list :menuList="menuList"></info-list>
	</view>
</template>

<script>
	import { GetInformationPageList } from '@/common/js/http.js'
	import infoList from '@/components/infoList.vue'
	export default {
		data() {
			return {
				menuList: null,
				pageIndex: 1, //第多少页
				pageSize: 15 //每页显示多少条
			}
		},
		components:{
			infoList
		},
		onLoad() {
			this.GetPageList()
		},
		methods: {
			async GetPageList(){
				let params = {
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				}
				let { data } = await GetInformationPageList(params)
				if(data.code != 0) return
				this.menuList = data.data
			}
		}
	}
</script>

<style>
	
</style>
