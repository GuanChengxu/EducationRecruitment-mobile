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
					<view class="success_text">欢迎您报考本次招聘相关岗位，请前往电脑端，打开本次报名网页，选择已报名查询，打印《我的报名表》和《诚信承诺书》参加现场考核，预祝您取得好成绩！</view>
					<image src="/static/bigpic.png" mode=""></image>
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
				linkName:''
			};
		},
		onLoad(option) {
			const islogin = this.$islogin.isLogin;
			const that = this;
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
			that.key = option.key;
			//获取招聘信息
			uni.request({
				url: common.port.recruitmentById + '/'+option.key,
				method: "GET",
				dataType: "json",
				data: {},
				success: (result) => {
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
					border-radius: 12rpx;
					background: -moz-linear-gradient(top, #66a4f6 100%, #629af2 100%);
					background: -webkit-gradient(linear, left top, left bottom, color-stop(100%,#66a4f6), color-stop(100%,#629af2));
					background: -webkit-linear-gradient(top, #66a4f6 100%,#629af2 100%);
					background: -o-linear-gradient(top, #66a4f6 100%,#629af2 100%);
					background: -ms-linear-gradient(top, #66a4f6 100%,#629af2 100%);
					background: linear-gradient(to bottom, #66a4f6 100%,#629af2 100%);
					.success_text{
						padding: 130rpx 56rpx 0;
						font-size: 32rpx;
						line-height: 52rpx;
						color: #FFFFFF;
					}
					image{
						display: block;
						width: 536rpx;
						height: 590rpx;
						margin: 0 auto;
					}
				}
			}
		}
	}
</style>
