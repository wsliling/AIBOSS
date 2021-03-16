<template>
	<view>
		<view class="topimg">
			<!-- <view @click="clickUpImg" class="imgbox"> -->
			<view class="imgbox">
			<!-- <view  class="imgbox"> -->
				<view class="icon touxiang">
					<image class="touxiang-img" :src="Avatar" mode="aspectFill"></image>
					<!-- <view class="touxiang-img">
						<avatar selWidth="140upx" selHeight="140upx" ref='avatar' fileType='png' :avatarSrc="Avatar"
						 @upload="myUpload" quality="1" :inner='true' avatarStyle="width:140upx;height: 140upx;" :minScale='0.1'>
						</avatar>
					</view> -->
				</view>
				<!-- <cpimg ref="cpimg" @result="cpimgOk" @err="cpimgErr" :number="9" :fixOrientation="true" :size="500" :maxWidth="1000"
				 :ql="0.9" type="url" /> -->
				<!-- <view class="text fs-16">
					点击更换头像
				</view> -->
			</view>
		</view>
		<view class="main">
			<!-- <view @click="clickNickName" class="main-item bb"> -->
			<view class="main-item bb">
				<view class="main-item-left fs-16">
					姓名
				</view>
				<view class="main-item-right">
					{{ NickName }}
					<!-- <text class="iconfont icon-dayuhao"></text> -->
				</view>
			</view>
			<view class="main-item bb">
				<view class="main-item-left fs-16">
					账号ID
				</view>
				<view class="main-item-right">
					{{ AccountNO }}
				</view>
			</view>
			<view class="main-item">
				<view class="main-item-left fs-16">
					级别
				</view>
				<view class="main-item-right">
					{{ Grade }}
				</view>
			</view>
		</view>
		<!-- <view @click="submit" class="bottom_btn">
			<button class="btn">保存</button>
		</view> -->
		<!-- 头像弹窗 -->
		<uni-popup ref='photo' type="bottom">
			<view class="morePop-box">
				<view class="more-item-wrapper">
					<view @click="clickUpPhoto('camera')" class="more-item">
						拍照
					</view>
					<view @click="clickUpPhoto('album')" class="more-item">
						从相册选择
					</view>
				</view>
				<view @click="clickCancel" class="cancel">
					取消
				</view>
			</view>
		</uni-popup>
		<!-- 信息修改弹窗 -->
		<uni-popup ref='editNamePop' type="center">
			<view class="edit-name-box">
				<view class="edit-name-title">
					填写昵称
				</view>
				<view class="edit-name-input">
					<input type="text" v-model="tempNickName" :placeholder="placeholder" />
				</view>
				<view class="button-box">
					<view @click="closeEditNamePop" class="button-item button-box-left">
						取消
					</view>
					<view @click="confirmName" class="button-item button-box-right">
						确定
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		getImgPath,
		pathToBase64
	} from '@/common/utils/image-tools.js'
	import avatar from "@/components/yq-avatar/yq-avatar.vue";
	import cpimg from '@/components/cpimg.vue';
	import {
		trim,
		toast,
		get,
		post
	} from '@/common/utils/index.js'
	export default {
		components: {
			cpimg,
			avatar
		},
		data() {
			return {
				defaultImg: '/static/mine/default.png',
				myCanvasWidth: 0,
				timer: null,
				bendiImg: '',
				userId: '',
				token: '',
				Avatar: '', // 头像
				NickName: '', // 姓名
				tempNickName: '',
				AccountNO: '12258', // 账号
				Grade: '初级交易员', // 级别 
				placeholder: '请输入您的昵称',
				// count: num, //最大图片数量=最大数量-临时路径的数量
				// sizeType, //图片尺寸 original--原图；compressed--压缩图
				// sourceType, //选择图片的位置 album--相册选择, 'camera--使用相机
				sourceType: ["album", "camera"],
			}
		},
		onLoad() {
			this.getSystemInfo()
			this.GetMemberInfo()
		},
		methods: {
			// 适配屏幕
			getSystemInfo() {
				uni.getSystemInfo({
					success: function(res) {
						// this.myCanvasWidth = res.windowWidth - 56
						// this.myCanvasHeight = res.windowHeight - 200
						this.myCanvasWidth = res.windowWidth / 750 * 140 + 'px'
						console.log('this.myCanvasWidth: ', this.myCanvasWidth)
					},
				})
			},
			// 裁剪start
			myUpload(rsp) {
				console.log(rsp);
				this.url = rsp.path;
				//rsp.avatar.imgSrc = rsp.path;
				this.Avatar = this.url
				return;

				uni.uploadFile({
					url: 'xxxx',
					filePath: rsp.path,
					name: 'avatar',
					formData: {
						'avatar': rsp.path
					},
					success: (uploadFileRes) => {
						console.log('裁剪成功')
						console.log(uploadFileRes.data);
					},
					complete(res) {
						console.log('裁剪报错',res)
					}
				});

			},
			// 裁剪end
			// 点击头像
			clickUpImg() {
				this.$refs.photo.open()
			},
			// 点击拍照
			async clickUpPhoto(type) {
				this.clickCancel()
				let tishi = '相册上传'
				if (type == 'camera') {
					tishi = '拍照上传'
				}
				// 压缩图
				let res = await getImgPath(1, [type],['compressed'])
				// console.log(tishi + '上传res', res)
				// 临时路径显示
				this.Avatar = res[0]
				// let temp = await pathToBase64(res[0])
				// console.log(tishi + '上传temp', temp)
				// this.Avatar = temp
				// this.Avatar = temp
				// this.bendiImg = temp
				// console.log('this.Avatar',this.Avatar)
			},
			// 点击取消相册拍照
			clickCancel() {
				this.$refs.photo.close()
			},
			// 我的app处理图片start
			// 我的app处理图片end
			// 打开昵称弹窗
			clickNickName() {
				this.tempNickName = this.NickName
				this.$refs.editNamePop.open()
			},
			// 关闭昵称弹窗
			closeEditNamePop() {
				this.$refs.editNamePop.close()
			},
			// 确定昵称
			confirmName() {
				this.NickName = this.tempNickName
				this.$refs.editNamePop.close()
			},
			// 验证
			checkAll() {
				if (this.Avatar.length == 0) {
					toast('头像不能为空哦~')
					return false
				}
				// if (trim(this.NickName) == 0) {
				// 	toast('昵称不能为空哦~')
				// 	return false
				// }
				return true
			},
			// 保存
			submit() {
				if (!this.checkAll()) return
				this.UpdateUserInfo()
			},
			// 处理图片start
			// cpimgOk(file) {
			// 	let that = this;
			// 	this.base64Arr = this.Avatar
			// 	that.base64Arr = that.base64Arr.concat(file);
			// 	if (that.base64Arr.length >= 9) {
			// 		that.isShowBtnUpload = false;
			// 		that.base64Arr.splice(9);
			// 	}
			// 	that.Avatar = that.base64Arr;
			// 	console.log('that.Avatar:', that.Avatar);
			// },
			// cpimgErr(e) {
			// 	console.log(e);
			// },
			// 添加图片
			async chooseImage() {
				that.$refs.cpimg._changImg();
			},
			// 处理图片end


			// 获取个人信息
			async GetMemberInfo() {
				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				let obj = {
					UserId: this.userId,
					Token: this.token
				}
				let res = await post('User/GetMemberInfo', obj)
				// this.memberInfo = res.data
				this.NickName = res.data.userNick
				this.Avatar = res.data.avatar ? res.data.avatar : this.defaultImg
				this.AccountNO = res.data.userId
				this.Grade = res.data.gradeName

			},
			tempToBase64(httpImg) {
				return new Promise((resolve, reject) => {
					uni.downloadFile({
						url: httpImg, //仅为示例，并非真实的资源
						success: (res) => {
							if (res.statusCode === 200) {
								console.log('下载成功', res);
								resolve(res);
							}
						},
						fail: (err) => {
							console.log('下载失败');
							reject(err)
						}
					});
				})
			},
			httpToBase64(httpImg) {
				return new Promise((resolve, reject) => {
					uni.request({
						// url: temp, //临时路径
						url: httpImg, //临时路径
						// App（自定义组件编译模式）不支持ArrayBuffer类型
						responseType: 'ArrayBuffer', //设置返回的数据格式为arraybuffer
						success: res => {
							const base64 = uni.arrayBufferToBase64(res.data)
							resolve(base64);
							// console.log('http的base64:', base64)
						},
						fail: (err) => {
							console.log('我的base64转换失败:', err);
							reject(err)
						}
					})
				})
			},
			// 更新个人信息
			async UpdateUserInfo() {
				if (this.timer != null) {
					return
				}
				clearTimeout(this.timer);
				this.timer = null;

				this.userId = uni.getStorageSync('userId')
				this.token = uni.getStorageSync('token')
				let upImg = ''
				let reg = /^http:?/ig
				let isHttp = reg.test(this.Avatar)
				// console.log('是不是网络图片', isHttp)
				if (isHttp) {
					console.log('是网络图片', upImg,this.Avata)
					return
					upImg = await this.httpToBase64(this.Avatar)
				} else {
					// upImg = this.Avatar
					// upImg = this.bendiImg
					console.log('非网图',this.Avatar)
					upImg = await pathToBase64(this.Avatar)
					// console.log('本地的图片', upImg)
				}

				// console.log('uni.getNetworkType()',await uni.getNetworkType())
				// let tt2 = await uni.onNetworkStatusChange()
				// console.log('uni.onNetworkStatusChange()',tt2)
				// console.log('请求的头像:', upImg)
				let obj = {
					UserId: this.userId,
					Token: this.token,
					NickName: this.NickName,
					// Avatar: this.Avatar
					Avatar: upImg
				}
				let res = await post('User/UpdateUserInfo', obj)
				if (res.code != 0) return
				toast('修改成功~')
				this.timer = setTimeout(() => {
					uni.reLaunch({
						url: '/pages/tabbar/mine/mine'
					})
				}, 1500)

				this.$once('hook:beforeDestroy', () => {
					clearTimeout(this.timer);
					this.timer = null;
				})

			},
		}
	}
</script>

<style lang="scss" scoped>
	/* @import url("./style"); */
	@import "./style";
</style>
