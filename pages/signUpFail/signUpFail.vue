<template>
	<view class="concent">
		<view class="page-head">
			<view class="uni-page-head-btn"><i class="uni-btn-icon page-head-b" @click="back"></i></view>
			<view class="page-head-title">{{ linkName }}</view>
		</view>
		<view class="concent_box">
			<view class="signUp_box">
				<view class="signUp_top">
					<image src="/static/fail.png" mode=""></image>
					<view class="name">姓名：{{ name }}</view>
					<view class="idCard">身份证号：{{ idCard }}</view>
					<view class="text">很遗憾，您得报名信息未通过审核</view>
					<view class="reason">拒绝理由：{{ reason }}</view>
				</view>
				<view class="signUp_bot" v-show="isverify==3" @click="gotoLink()">审核未通过重新报名></view>
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
			reason: '',
			idCard: '',
			name: '',
			isverify:3
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
						if (res.data.data.isverify == 3) {
							that.isverify = res.data.data.isverify
							that.reason = res.data.data.isverifyRemark;
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
		gotoLink: function() {
			uni.navigateTo({
				url: '/pages/signUp/signUp?key=' + this.key
			});
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
.concent {
	background-color: #293991;
	height: 100vh;
	padding-bottom: 50rpx;
	.page-head {
		background-color: #293991;
		border-bottom: none;
		box-shadow: none;
		.page-head-b,
		.page-head-title {
			background-color: #293991;
			color: #ffffff;
		}
	}
	.concent_box {
		padding: 88rpx 46rpx 0;
		.signUp_box {
			margin-top: 60rpx;
			.signUp_top {
				border-top-right-radius: 12rpx;
				border-top-left-radius: 12rpx;
				padding: 1rpx 50rpx 90rpx;
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
					width: 160rpx;
					height: 160rpx;
					margin: 88rpx auto 32rpx;
				}
			}
		}
		.signUp_bot {
			background-color: #ffffff;
			line-height: 156rpx;
			height: 156rpx;
			border-bottom-right-radius: 12rpx;
			border-bottom-left-radius: 12rpx;
			font-size: 40rpx;
			color: #ff8207;
			text-align: center;
		}
	}
}
</style>
