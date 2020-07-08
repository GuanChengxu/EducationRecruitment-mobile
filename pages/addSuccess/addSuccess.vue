<template>
	<view class="concent">
		<view class="page-head">
			<view class="uni-page-head-btn">
				<i class="uni-btn-icon page-head-b" @click="back"></i>
			</view>
			<view class="page-head-title">
				{{linkName}}
			</view>
		</view>
		<view class="concent_box">
			<view class="signUp_box">
				<view class="signUp_top">
					<image class="img1" src="/static/success.png" mode=""></image>
					<view class="text">您的报名信息已经提交成功，我们会及时审批，感谢您的参与 。</view>
					<image class="img2" src="/static/bigpic.png" mode=""></image>
				</view>
				<view class="signUp_bot">
					正在审核中...
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import code from "../../util/code.js"
	import common from "../../util/common.js"
	export default {
		data() {
			return {
				key:'',
				status:null,
				linkName:'',
			};
		},
		onLoad(option) {
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
						that.status = result.data.data.applyStatus;
						that.linkName = result.data.data.recruitTheme;
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
			back:function(e){
				uni.navigateBack({
				    delta: 1
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.concent{
		background-color: #293991;
		height: 100vh;
		padding-bottom: 50rpx;
		.page-head{
			background-color: #293991;
			border-bottom: none;
			box-shadow: none;
			.page-head-b,
			.page-head-title{
				background-color: #293991;
				color: #FFFFFF;
			}
		}
		.concent_box{
			padding: 88rpx 46rpx 0;
			.signUp_box{
				margin-top: 60rpx;
				.signUp_top{
					border-top-right-radius: 12rpx;
					border-top-left-radius: 12rpx;
					padding: 50rpx 50rpx 0;
					background: -moz-linear-gradient(top, #66a4f6 100%, #629af2 100%);
					background: -webkit-gradient(linear, left top, left bottom, color-stop(100%,#66a4f6), color-stop(100%,#629af2));
					background: -webkit-linear-gradient(top, #66a4f6 100%,#629af2 100%);
					background: -o-linear-gradient(top, #66a4f6 100%,#629af2 100%);
					background: -ms-linear-gradient(top, #66a4f6 100%,#629af2 100%);
					background: linear-gradient(to bottom, #66a4f6 100%,#629af2 100%);
					view{
						font-size: 32rpx;
						line-height: 52rpx;
						color: #FFFFFF;
						text-align: center;
					}
					.img1{
						display: block;
						width: 160rpx;
						height: 160rpx;
						margin: 0 auto 30rpx;
					}
					.img2{
						display: block;
						width: 414rpx;
						height: 456rpx;
						margin: 0 auto;
					}
				}
			}
			.signUp_bot{
				background-color: #FFFFFF;
				line-height: 156rpx;
				height: 156rpx;
				border-bottom-right-radius: 12rpx;
				border-bottom-left-radius: 12rpx;
				font-size: 40rpx;
				color: #2F7CFB;
				text-align: center;
			}
		}
	}
</style>
