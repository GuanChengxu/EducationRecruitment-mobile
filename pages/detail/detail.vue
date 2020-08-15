<template>
	<view class="concent_l">
		<view class="concent_box">
			<view class="detail_box">
				<view class="text_box tsHtml" v-html="content"></view>
			</view>
			<view v-if="status == 1" class="gotoStart" @click="gotoStart(key)">去报名</view>
		</view>
	</view>
</template>

<script>
	import code from "../../util/code.js"
	import common from "../../util/common.js"
	export default {
		data() {
			return {
				content:'',
				status:'',
				key:'',
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
						that.content = result.data.data.recruitmentBrochure;
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
		methods: {
			//去报名
			gotoStart(data){
				uni.navigateTo({
				    url: '/pages/start/start?key='+data
				});
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
	.detail_box{
		padding: 28rpx 28rpx 60rpx;
		.text_box{
		}
	}
	.gotoStart{
		display: block;
		width: 462rpx;
		height: 70rpx;
		line-height: 70rpx;
		display: block;
		margin: 0 auto;
		background-color: #436DF3 !important;
		font-size: 32rpx;
		color: #FFFFFF;
		text-align: center;
		border-radius: 35rpx;
		border: none;
		outline: none;
		&::after{
			display: none;
		}
	}
</style>
