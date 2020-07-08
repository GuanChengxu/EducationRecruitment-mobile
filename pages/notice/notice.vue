<template>
	<view>
		<view class="page-head">
			<view class="uni-page-head-btn">
				<i class="uni-btn-icon page-head-b" @click="back"></i>
			</view>
			<view class="page-head-title">
				报名须知
			</view>
		</view>
		<view class="concent_box">
			<view class="notice_box">
				<view class="text_box tsHtml" v-html="notice"></view>
			</view>
			<view v-if="status == 1" class="gotoSignUp" @click="gotoSignUp()">我已认真阅读并同意</view>
		</view>
	</view>
</template>

<script>
	import code from "../../util/code.js"
	import common from "../../util/common.js"
	export default {
		data() {
			return {
				key:null,
				notice:'',
				status:null,
				uuid: ''
			};
		},
		onLoad(option) {
			let islogin = this.$islogin.isLogin;
			this.uuid = uni.getStorageSync('userInfo').uuid;
			if(!this.uuid || !islogin){
				uni.showToast({
					title: '请登录',
					icon: 'none',
					duration: 2000,
				});
				setTimeout(function(){
					uni.redirectTo({
						url: '/pages/index/index'
					});
				},2000)
			}
			const that = this;
			that.key = option.key;
			//获取招聘信息
			uni.request({
				url: common.port.recruitmentById + '/'+option.key,
				method: "GET",
				dataType: "json",
				data: {},
				success: (result) => {
					console.log(result)
					if (result.data.code == 200) {
						that.notice = result.data.data.applyNotice;
						that.status = result.data.data.applyStatus;
					}else {
						uni.showToast({
							title: result.data.msg,
							icon: 'none',
							duration: 2000,
						})
					}
				}
			})
		},
		methods:{
			gotoSignUp:function(data){
				if (this.uuid) {
					uni.request({
						url: common.port.recruitmentById + '/' + this.key,
						method: 'GET',
						dataType: 'json',
						data: {},
						success: result => {
							if (result.data.code == 200) {
								if (result.data.data.applyStatus != 1) {
									uni.showToast({
										title: '该招聘未开始或已结束，请返回列表重新选择',
										icon: 'none',
										duration: 2000
									});
									setTimeout(function(){
										uni.navigateTo({
											url: '/pages/index/index'
										});
									},2000)
								} else {
									var data = 'recruitId=' + this.key + '&userId=' + this.uuid;
									uni.request({
										url: common.port.startApplyOrQuery + '?' + data,
										method: 'GET',
										dataType: 'json',
										data: {},
										success: res => {
											console.log(res);
											if (res.data.code == 200) {
												if (res.data.data) {
													if (res.data.data.isverify == 1) {
														uni.navigateTo({
															url: '/pages/signUpReview/signUpReview?key=' + this.key
														});
													} else if (res.data.data.isverify == 2) {
														uni.navigateTo({
															url: '/pages/signUpSuccess/signUpSuccess?key=' + this.key
														});
													} else if (res.data.data.isverify == 3) {
														uni.navigateTo({
															url: '/pages/signUpFail/signUpFail?key=' + this.key
														});
													} else if (res.data.data.isverify == 0) {
														uni.navigateTo({
															url: '/pages/signUp/signUp?key=' + this.key
														});
													}
												} else if (res.data.msg == null) {
													uni.navigateTo({
														url: '/pages/signUp/signUp?key=' + this.key
													});
												}
											} else {
												uni.showToast({
													title: res.data.msg,
													icon: 'none',
													duration: 2000
												});
											}
										}
									});
								}
							} else {
								uni.showToast({
									title: result.data.msg,
									icon: 'none',
									duration: 2000
								});
							}
						}
					});
				} else {
					uni.showToast({
						title: '请先登录',
						icon: 'none',
						duration: 2000
					});
				}
			},
			back:function(e){
				uni.navigateBack({
				    delta: 1
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.concent_box{
		padding-bottom: 50rpx;
	}
	.notice_box{
		padding: 30rpx 26rpx 0;
		.text_box{
			font-size: 28rpx;
			line-height: 48rpx;
			color: #333333;
			white-space: pre-wrap;
		}
	}
	.gotoSignUp{
		display: block;
		margin: 60rpx auto 0;
		width: 462rpx;
		height: 70rpx;
		line-height: 70rpx;
		background-color: #436DF3 !important;
		font-size: 32rpx;
		text-align: center;
		border-radius: 35rpx;
		color: #FFFFFF;
		border: none;
		outline: none;
		&::after{
			display: none;
		}
	}
</style>
