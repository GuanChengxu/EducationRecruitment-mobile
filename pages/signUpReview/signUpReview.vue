<template>
	<view class="concent_l">
		<view class="concent_box">
			<view class="signUp_box">
				<view class="signUp_top">
					<view class="name">姓名：{{ name }}</view>
					<view class="idCard">身份证号：{{ idCard }}</view>
					<view class="text">您的报名信息正在审核中，请耐心等待，感谢您的参与。</view>
					<image src="/static/bigpic.png" mode=""></image>
				</view>
				<view class="signUp_bot">正在审核中</view>
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
			linkName: '',
			idCard: '3706121988xxxx6325',
			name: ''
		};
	},
	onLoad(option) {
		const islogin = this.$islogin.isLogin;
		const that = this;
		that.key = option.key;
		const user = uni.getStorageSync('userInfo');
		if(!user.uuid && !islogin){
			uni.showToast({
				title: '请登录',
				icon: 'none',
				duration: 2000
			});
			setTimeout(function(){
				uni.navigateTo({
					url: '/pages/index/index'
				});
			},2000)
			return false;
		}
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
		var data = 'recruitId=' + option.key + '&userId=' + user.uuid;
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
							that.name = res.data.data.name;
							if (res.data.data.idNumber.length == 18) {
								that.idCard = res.data.data.idNumber.substring(0, 10) + 'xxxx' + res.data.data.idNumber.substring(res.data.data.idNumber.length - 4);
							} else {
								that.idCard = res.data.data.idNumber.substring(0, 7) + 'xxxx' + res.data.data.idNumber.substring(res.data.data.idNumber.length - 4);
							}
						} 
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
	},
	methods: {
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
	.concent_box {
		padding: 88rpx 46rpx 0;
		.signUp_box {
			margin-top: 60rpx;
			.signUp_top {
				border-top-right-radius: 12rpx;
				border-top-left-radius: 12rpx;
				padding: 60rpx 50rpx 0;
				background: -moz-linear-gradient(top, #66a4f6 100%, #629af2 100%);
				background: -webkit-gradient(linear, left top, left bottom, color-stop(100%, #66a4f6), color-stop(100%, #629af2));
				background: -webkit-linear-gradient(top, #66a4f6 100%, #629af2 100%);
				background: -o-linear-gradient(top, #66a4f6 100%, #629af2 100%);
				background: -ms-linear-gradient(top, #66a4f6 100%, #629af2 100%);
				background: linear-gradient(to bottom, #66a4f6 100%, #629af2 100%);
				view {
					font-size: 32rpx;
					line-height: 52rpx;
					color: #ffffff;
				}
				.idCard {
					margin-bottom: 20rpx;
				}
				image {
					display: block;
					width: 414rpx;
					height: 456rpx;
					margin: 40rpx auto 0;
				}
			}
		}
		.signUp_bot {
			position: relative;
			background-color: #ffffff;
			line-height: 156rpx;
			height: 156rpx;
			border-bottom-right-radius: 12rpx;
			border-bottom-left-radius: 12rpx;
			font-size: 40rpx;
			color: #2f7cfb;
			text-align: center;
			.editData {
				position: absolute;
				right: 30rpx;
				bottom: 15rpx;
				font-size: 32rpx;
				line-height: 52rpx;
				color: #2f7cfb;
				z-index: 3;
			}
		}
	}
}
</style>
