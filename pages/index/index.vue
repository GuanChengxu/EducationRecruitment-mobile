<template>
	<view class="concent_l">
		<view class="concent_box" v-show="showData">
			<view class="index_banner"><image src="/static/banner.png" mode=""></image></view>
			<view class="index_list">
				<view class="list_box" v-for="(item, index) in tableData" :key="item.id">
					<view class="tles">{{ item.recruitTheme }}</view>
					<view class="time">
						<image src="/static/time.png" mode=""></image>
						报名时间&nbsp;&nbsp;{{ returnTime(item) }}
					</view>
					<view class="btn_box clearfix">
						<view v-bind:class="item.applyStatus == 1?'gotoSignUp blue fr':'gotoSignUp black fr'" @click="gotoSignUp(item)">{{item.applyStatus == 1?'去报名':(item.applyStatus == 2?'已结束':'未开始')}}</view>
						<view class="gotoDetail fr" @click="gotoDetail(item)">招聘简章</view>
					</view>
				</view>
				<text class="index_text">
					<p>按照国家一体化在线政务服务平台建设有关要求，教师招聘系统已对接山东省统一身份认证平台。已在“烟台一手通”或“山东省统一政务服务门户”注册且完成实名认证的用户可以直接登录报名。未注册或未实名认证的用户，为不影响报名，请尽快下载安装“烟台一手通”或登录“山东省统一政务服务门户”注册并完成实名认证。</p>
					<p>目前 ，烟台市已有烟台市政府门户网站、烟台市政务服务平台、烟台“互联 网+公安”政务服务平台 、烟台市住房公积金网上营业厅、烟台市社会保险个人网上服务系统、烟台人才热线等20多个系统接入了山东省统一身份认证平台。</p>
				</text>
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
			tableData: [],
			showData:false
		};
	},
	onLoad(option) {
		const that = this;
		const islogin = this.$islogin.isLogin;
		uni.showLoading({
		    title: ''
		});
		if (!islogin) {
			var timeInterval = setInterval(function(){
				const token = uni.getStorageSync('dhToken');
				// const token = option.token;
				if(token){
					that.getUser(token,islogin);
					clearInterval(timeInterval);
				}
			},2000)
		}
		//获取列表信息
		uni.request({
			url: common.port.recruitmentInfo + '?pageNum=1&pageSize=999999999',
			method: 'GET',
			dataType: 'json',
			data: {},
			success: result => {
				if (result.data.code == 200) {
					that.tableData = result.data.rows;
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
		//转换时间格式
		returnTime: function(row) {
			var returnData = '';
			var yearStart = row.applyStartTime?new Date(row.applyStartTime.replace(/-/g, '/')).getFullYear():'';
			var yearEnd = row.applyEndTime?new Date(row.applyEndTime.replace(/-/g, '/')).getFullYear():'';
			var monthStart = row.applyStartTime?new Date(row.applyStartTime.replace(/-/g, '/')).getMonth() + 1:'';
			var monthEnd = row.applyEndTime?new Date(row.applyEndTime.replace(/-/g, '/')).getMonth() + 1:'';
			var dayStart = row.applyStartTime?new Date(row.applyStartTime.replace(/-/g, '/')).getDate():'';
			var dayEnd = row.applyEndTime?new Date(row.applyEndTime.replace(/-/g, '/')).getDate():'';
			if(row.applyStartTime && row.applyEndTime){
				if (monthStart > 0 && monthStart < 10) {
					monthStart = '0' + monthStart;
				}
				if (monthEnd > 0 && monthEnd < 10) {
					monthEnd = '0' + monthEnd;
				}
				if (dayStart > 0 && dayStart < 10) {
					dayStart = '0' + dayStart;
				}
				if (dayEnd > 0 && dayEnd < 10) {
					dayEnd = '0' + dayEnd;
				}
				returnData = yearStart + '.' + monthStart + '.' + dayStart + '~' + yearEnd + '.' + monthEnd + '.' + dayEnd;
			}
			return returnData;
		},
		getUser(token,islogin){
			const that = this;
			if (token && !islogin) {
				uni.request({
					url: common.port.infoByToken +'?token='+token+'&origin=0',
					method: 'GET',
					dataType: 'json',
					success: result => {
						that.showData = true;
						if (result.data.code == 200) {
							uni.hideLoading();
							if (result.data.data.authlevel < 1) {
								uni.showToast({
									title: '请补全个人信息',
									icon: 'none',
									duration: 2000
								});
							} else {
								uni.setStorageSync('userInfo', result.data.data);
								this.$islogin.setLogin();
							}
						} else {
							uni.hideLoading();
							uni.showToast({
								title: result.data.msg,
								icon: 'none',
								duration: 2000
							});
						}
					}
				});
			}
		},
		//去报名
		gotoSignUp(row) {
			uni.navigateTo({
				url: '/pages/start/start?key=' + row.applyId
			});
		},
		//招聘简章
		gotoDetail(row) {
			uni.navigateTo({
				url: '/pages/detail/detail?key=' + row.applyId
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
.index_banner {
	image {
		width: 100%;
		height: 188rpx;
	}
}
.index_list {
	padding: 0 28rpx;
	.list_box {
		border-bottom: 1px solid #dbdbdb;
		.tles {
			width: 100%;
			font-size: 32rpx;
			line-height: 52rpx;
			color: #436ef3;
			padding: 6rpx 0 0;
		}
		.time {
			image {
				width: 24rpx;
				height: 24rpx;
				margin-right: 12rpx;
			}
			font-size: 28rpx;
			line-height: 48rpx;
			color: #999999;
		}
		.btn_box {
			.gotoDetail {
				font-size: 28rpx;
				line-height: 48rpx;
				color: #333333;
				padding: 10rpx 0 10rpx 64rpx;
			}
			.gotoSignUp {
				font-size: 28rpx;
				line-height: 48rpx;
				padding: 10rpx 0 10rpx 64rpx;
				&.blue{
					color: #436ef3;
				}
				&.black{
					color: #999999;
				}
			}
		}
	}
	.index_text {
		padding: 24rpx 0;
		p{
			color: #999999;
			font-size: 28rpx;
			line-height: 48rpx;
			text-indent: 2em;
			margin: 0;
		}
		display: block;
	}
}
</style>
