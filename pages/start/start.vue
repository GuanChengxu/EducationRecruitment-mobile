<template>
	<view class="concent_l">
		<view class="concent_box">
			<view class="signUp_box">
				<view class="signUp_top">
					<view class="p">欢迎您进入</view>
					<view class="h1">{{linkName}}报名</view>
					<image src="/static/bigpic.png" mode=""></image>
				</view>
				<view class="signUp_bot clearfix">
					<view :class="status==1?'start':'start noclick'" @click="start()">{{status==1?'开始报名':(status==2?'已结束':'未开始')}}</view>
					<view :class="status==1 || status==2?'search fr':'noclick search fr'" @click="search()">已报名查询></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import code from '../../util/code.js';
import common from '../../util/common.js';
export default {
	data() {
		return {
			key: '',
			status: null,
			uuid: '',
			linkName:''
		};
	},
	onLoad(option) {
		this.uuid = uni.getStorageSync('userInfo').uuid;
		const that = this;
		that.key = option.key;
		//获取招聘信息
		uni.request({
			url: common.port.recruitmentById + '/' + option.key,
			method: 'GET',
			dataType: 'json',
			data: {},
			success: result => {
				console.log(result);
				if (result.data.code == 200) {
					that.status = result.data.data.applyStatus;
					that.linkName = result.data.data.recruitTheme;
				} else {
					uni.showToast({
						title: result.data.msg,
						icon: 'none',
						duration: 2000
					});
				}
			}
		});
	},
	methods: {
		start: function() {
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
								setTimeout(function() {
									uni.navigateTo({
										url: '/pages/index/index'
									});
								}, 2000);
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
														url: '/pages/notice/notice?key=' + this.key
													});
												}
											} else if (res.data.msg == null) {
												uni.navigateTo({
													url: '/pages/notice/notice?key=' + this.key
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
		//已报名查询
		search() {
			if (this.uuid) {
				uni.request({
					url: common.port.recruitmentById + '/' + this.key,
					method: 'GET',
					dataType: 'json',
					data: {},
					success: result => {
						if (result.data.code == 200) {
							console.log(result.data)
							if (result.data.data.queryStatus != 1) {
								uni.showToast({
									title: '该招聘不在查询时间之内',
									icon: 'none',
									duration: 2000
								});
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
														url: '/pages/signUpNodata/signUpNodata?key=' + this.key
													});
												}
											} else if (res.data.msg == null) {
												uni.navigateTo({
													url: '/pages/signUpNodata/signUpNodata?key=' + this.key
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
		back: function(e) {
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.concent_l {
	background-color: #293991;
	height: 100vh;
	padding-bottom: 50rpx;
	.signUp_box {
		padding: 148rpx 46rpx 0;
		// margin-top: 60rpx;
		.signUp_top {
			border-top-right-radius: 12rpx;
			border-top-left-radius: 12rpx;
			padding-top: 37rpx;
			background: -moz-linear-gradient(top, #66a4f6 100%, #629af2 100%);
			background: -webkit-gradient(linear, left top, left bottom, color-stop(100%, #66a4f6), color-stop(100%, #629af2));
			background: -webkit-linear-gradient(top, #66a4f6 100%, #629af2 100%);
			background: -o-linear-gradient(top, #66a4f6 100%, #629af2 100%);
			background: -ms-linear-gradient(top, #66a4f6 100%, #629af2 100%);
			background: linear-gradient(to bottom, #66a4f6 100%, #629af2 100%);
			.p {
				font-size: 32rpx;
				line-height: 52rpx;
				text-align: center;
				color: #ffffff;
				margin-bottom: 10rpx;
			}
			.h1 {
				font-size: 40rpx;
				line-height: 60rpx;
				text-align: center;
				color: #ffffff;
				margin-bottom: 37rpx;
				padding: 0 30rpx;
			}
			image {
				display: block;
				width: 442rpx;
				height: 486rpx;
				margin: 0 auto;
			}
		}
		.signUp_bot {
			background-color: #ffffff;
			padding: 40rpx 70rpx;
			border-bottom-right-radius: 12rpx;
			border-bottom-left-radius: 12rpx;
			.start {
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				background-color: #2f7cfb !important;
				color: #ffffff;
				border-radius: 50rpx;
				border: none;
				outline: none;
				font-size: 40rpx;
				text-align: center;
				&::after {
					display: none;
				}
			}
			.noclick{
				pointer-events:none;
				opacity: 0.3;
			}
			.search {
				font-size: 32rpx;
				line-height: 52rpx;
				color: #2f7cfb;
				margin-top: 20rpx;
			}
		}
	}
}
</style>
