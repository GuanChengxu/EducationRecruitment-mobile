<template>
	<view class="concent_l">
		<view class="concent_box">
			<view class="signUp_con">
				<view class="con1" v-if="stepData == 1">
					<view class="select clearfix">
						<view class="title fl">报考单位</view>
						<view class="select_chose fl clearfix" @click="changeChose('companySelected')">
							<view v-bind:class="companySelected.label ? 'chose_data have_data fl' : 'chose_data fl'">
								{{ companySelected.label ? companySelected.label : '请选择您要报考的单位' }}
							</view>
							<image class="fl" src="/static/xiala.png" mode=""></image>
						</view>
					</view>
					<view class="select clearfix">
						<view class="title fl">报考岗位</view>
						<view class="select_chose fl clearfix" @click="changeChose('stationSelected')">
							<view v-bind:class="stationSelected.label ? 'chose_data have_data fl' : 'chose_data fl'">
								{{ stationSelected.label ? stationSelected.label : '请选择您要报考的岗位' }}
							</view>
							<image class="fl" src="/static/xiala.png" mode=""></image>
						</view>
					</view>
					<view class="error" v-show="stationError">*{{ stationErrorText }}</view>
					<view class="next" @click="next(2)">下一步</view>
				</view>
				<view class="con2" v-if="stepData == 2">
					<view class="input clearfix">
						<view class="title fl">姓名</view>
						<view class="input_box fl clearfix">
							<input type="text" :disabled="userInfo.name.isdisabled" v-model="userInfo.name.text" placeholder="请输入您的姓名" />
						</view>
					</view>
					<view class="image clearfix">
						<view class="title fl">
							<view>个人近期彩色</view>
							<view>正面免冠照片</view>
						</view>
						<view class="image_box fr clearfix">
							<view class="choseImg" @click="choseImg"></view>
							<image class="img" v-bind:src="'https://ystwx.yantai.gov.cn/jneduapi2' + imageUrl" mode=""></image>
							<image class="uploader" v-show="!imageUrl" src="/static/uploader.png" mode=""></image>
							<image-cropper :src="tempFilePath" :crop-width="295" :crop-height="413" :crop-fixed="true" @confirm="confirm" @cancel="cancel"></image-cropper>
						</view>
					</view>
					<view class="select clearfix">
						<view class="title fl">性别</view>
						<view class="select_chose sex_box fl clearfix" @click="changeChose('sexSelect', null, sexSelect.isdisabled)">
							<view v-bind:class="sexSelect.name ? 'chose_data have_data fl' : 'chose_data fl'">{{ sexSelect.name ? sexSelect.name : '请选择您的性别' }}</view>
							<!-- <image class="fl" src="/static/xiala.png" mode=""></image> -->
						</view>
					</view>
					<view class="input clearfix">
						<view class="title fl">民族</view>
						<view class="input_box fl clearfix"><input type="text" v-model="userInfo.nation.text" placeholder="请输入您的民族" /></view>
					</view>
					<view class="input clearfix">
						<view class="title fl">生源地</view>
						<view class="input_box fl clearfix"><input type="text" v-model="userInfo.origin.text" placeholder="请输入您的生源地" /></view>
					</view>
					<view class="input clearfix">
						<view class="title fl">手机</view>
						<view class="input_box fl clearfix"><input type="text" v-model="userInfo.phone.text" placeholder="请输入您的手机号码" /></view>
					</view>
					<view class="input clearfix">
						<view class="title fl">电子邮箱</view>
						<view class="input_box fl clearfix"><input type="text" v-model="userInfo.mailbox.text" placeholder="请输入您的电子邮箱" /></view>
					</view>
					<view class="input clearfix">
						<view class="title fl">身份证号</view>
						<view class="input_box fl clearfix">
							<input type="text" :disabled="userInfo.idCard.isdisabled" v-model="userInfo.idCard.text" placeholder="请输入您的身份证号码" />
						</view>
					</view>
					<view class="select clearfix">
						<view class="title fl">政治面貌</view>
						<view class="select_chose fl clearfix" @click="changeChose('politicalSelect')">
							<view v-bind:class="politicalSelect.name ? 'chose_data have_data fl' : 'chose_data fl'">
								{{ politicalSelect.name ? politicalSelect.name : '请选择您的政治面貌' }}
							</view>
							<image class="fl" src="/static/xiala.png" mode=""></image>
						</view>
					</view>
					<view class="input clearfix">
						<view class="title fl">家庭地址</view>
						<view class="input_box fl clearfix"><input type="text" v-model="userInfo.address.text" placeholder="请输入您的家庭地址" /></view>
					</view>
					<view class="input clearfix">
						<view class="title fl">教师资格证种类</view>
						<view class="input_box fl clearfix"><input type="text" v-model="userInfo.type.text" placeholder="请输入您的资格证种类" /></view>
					</view>
					<view class="input clearfix">
						<view class="title fl">教师资格证编号</view>
						<view class="input_box fl clearfix"><input type="text" v-model="userInfo.identifier.text" placeholder="请输入您的资格证编号" /></view>
					</view>
					<view class="input clearfix">
						<view class="title fl">毕业年份</view>
						<view class="time_box fl clearfix">
							<picker class="picker" mode="date" :end="todayTimeYear" fields="year" :value="userInfo.graduationTime.text" @change="bindgTimeChange($event)"></picker>
							<view v-bind:class="userInfo.graduationTime.text ? 'chose_data have_data fl' : 'chose_data fl'">{{ userInfo.graduationTime.text ? userInfo.graduationTime.text : '请选择您的毕业年份' }}</view>
							<image class="fl" src="/static/xiala.png" mode=""></image>
						</view>
					</view>
					<view class="select clearfix">
						<view class="title fl">最高学历</view>
						<view class="select_chose fl clearfix" @click="changeChose('educationSelect')">
							<view v-bind:class="educationSelect.name ? 'chose_data have_data fl' : 'chose_data fl'">
								{{ educationSelect.name ? educationSelect.name : '请选择您的最高学历' }}
							</view>
							<image class="fl" src="/static/xiala.png" mode=""></image>
						</view>
					</view>
					<view class="select clearfix">
						<view class="title fl">最高学位</view>
						<view class="select_chose fl clearfix" @click="changeChose('eduDegreeSelect')">
							<view v-bind:class="eduDegreeSelect.name ? 'chose_data have_data fl' : 'chose_data fl'">
								{{ eduDegreeSelect.name ? eduDegreeSelect.name : '请选择您的最高学位' }}
							</view>
							<image class="fl" src="/static/xiala.png" mode=""></image>
						</view>
					</view>
					<view v-for="(item, index) in nEducationSelect" :key="item.id">
						<view class="input clearfix">
							<view class="title fl">{{ item.type }}院校</view>
							<view class="input_box fl clearfix"><input type="text" v-model="item.school" v-bind:placeholder="'请输入您的' + item.type + '毕业院校'" /></view>
						</view>
						<view class="input clearfix">
							<view class="title fl">{{ item.type }}专业</view>
							<view class="input_box fl clearfix"><input type="text" v-model="item.major" v-bind:placeholder="'请输入您的' + item.type + '专业'" /></view>
						</view>
						<view class="select clearfix">
							<view class="title fl">学历性质</view>
							<view class="select_chose fl clearfix" @click="changeChose('nEducationData', index)">
								<view v-bind:class="item.selected.name ? 'chose_data have_data fl' : 'chose_data fl'">
									{{ item.selected.name ? item.selected.name : '请选择您的' + item.type + '学历性质' }}
								</view>
								<image class="fl" src="/static/xiala.png" mode=""></image>
							</view>
						</view>
					</view>
					<view class="pic_list">
						<view class="tle">上传证明材料</view>
						<view class="p">*(选填)请上传您的学历学位证书，教师资格证等证明</view>
						<view class="pic_box clearfix">
							<view class="img fl" v-for="(item,index) in picList" :key="index">
							    <image class="close" @click="removePic(index)" src="/static/webx.png" alt=""></image>
							    <image class="pic" :src="'https://ystwx.yantai.gov.cn/jneduapi2'+item.url" alt=""></image>
							</view>
							<view class="upload fl" v-if="picList.length<6">
								<image @click="uploadPic" src="/static/addPic.png" mode=""></image>
							</view>
						</view>
					</view>
					<view class="tips">*以上信息请确保真实有效，一经提交无法修改，请仔细认真填写</view>
					<view class="btn_box clearfix">
						<view class="save fl" @click="saveUser(false)">保存</view>
						<view class="next fr" @click="next(3)">下一步</view>
					</view>
				</view>
				<view class="con3" v-if="stepData == 3">
					<view class="input clearfix">
						<view class="title fl">现工作单位</view>
						<view class="input_box fl clearfix"><input type="text" v-model="workplace" placeholder="请输入您的现工作单位" /></view>
					</view>
					<view class="tle clearfix">
						<view class="fl text">个人简历（从高中阶段填起）</view>
						<view class="fr add" @click="addResume()">添加经历</view>
					</view>
					<view class="resume">
						<view class="resume_box" v-for="(item, index) in resume" :key="item.id">
							<view class="time clearfix">
								<view class="title fl">简历{{ index + 1 }}</view>
								<view class="time_box clearfix fr">
									<view class="text fl">从</view>
									<view class="start_time clearfix fl">
										<picker class="picker" mode="date" :end="todayTime" :value="item.startTime" @change="bindDateChange($event, index, 'start')"></picker>
										<view v-bind:class="item.startTime ? 'chose_data have_data fl' : 'chose_data fl'">
											{{ item.startTime ? item.startTime : '请选择时间' }}
										</view>
										<image class="fl" src="/static/xiala.png" mode=""></image>
									</view>
									<view class="text fl">到</view>
									<view class="start_time clearfix fl">
										<picker class="picker" mode="date" :end="todayTime" :value="item.endTime" @change="bindDateChange($event, index, 'end')"></picker>
										<view v-bind:class="item.endTime ? 'chose_data have_data fl' : 'chose_data fl'">{{ item.endTime ? item.endTime : '请选择时间' }}</view>
										<image class="fl" src="/static/xiala.png" mode=""></image>
									</view>
								</view>
							</view>
							<view class="input_all"><input type="text" v-model="item.inputText" placeholder="请输入您的工作/学习单位及职务所学专业" /></view>
						</view>
					</view>
					<view class="tle clearfix">
						<view class="fl text">家庭主要成员</view>
						<view class="fr add" @click="addPeople()">添加成员</view>
					</view>
					<view class="peopleData">
						<view class="peopleData_box" v-for="(item, index) in peopleData" :key="item.id">
							<view class="input clearfix">
								<view class="title fl">成员{{ index + 1 }}</view>
								<view class="input_box fl clearfix"><input type="text" v-model="item.relationship" placeholder="请输入成员与您的关系" /></view>
							</view>
							<view class="input_all"><input type="text" v-model="item.name" placeholder="请输入成员的姓名" /></view>
							<view class="input_all"><input type="text" v-model="item.political" placeholder="请输入成员的政治面貌" /></view>
							<view class="input_all"><input type="text" v-model="item.work" placeholder="请输入成员工作单位及职务" /></view>
						</view>
					</view>
					<view class="textarea">
						<view class="title">备注</view>
						<textarea v-model="remark" placeholder="请输入您的备注信息" />
					</view>
					<view class="tips">*以上信息请确保真实有效，一经提交无法修改，请仔细认真填写</view>
					<view class="btn_box clearfix">
						<view class="save fl" @click="saveExperience(false)">保存</view>
						<view class="next fr" @click="saveExperience(true)">提交</view>
					</view>
				</view>
			</view>
		</view>
		<view class="choseData" v-show="showChose" @click="changeChose('hidden')">
			<view class="chose_list" @click.stop>
				<view class="chose_box" v-for="(item, index) in choseData" :key="index" @click="selectChose(item)">{{ item[choseKey] }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import code from '../../util/code.js';
import common from '../../util/common.js';
import ImageCropper from '@/components/invinbg-image-cropper/invinbg-image-cropper.vue';
export default {
	data() {
		return {
			todayTime:'',
			todayTimeYear:'',
			fileKey: '',
			//裁剪图片
			tempFilePath: '',
			cropFilePath: '',
			key: null,
			status: null,
			title: '选择岗位',
			stepData: 1, //在哪一步
			teacherId: null,
			imageUrl: null, //图片
			showChose: false, //选择框
			companyData: [], //单位数据
			certificationId: '',
			companySelected: {
				value: null,
				label: ''
			},
			stationData: [], //岗位数据
			stationSelected: {
				value: null,
				label: ''
			}, //岗位选择
			stationOldData: [], //岗位数据没转换前
			choseData: [], //选择弹窗数据
			choseText: null, //选择数据标识
			choseKey: '', //选择弹窗展示哪个字段数据
			choseNum: null, //学历性质
			scrollTop: '', //距离顶端的位置
			className: 'modalOpen',
			stationError: false,
			stationErrorText: '',
			userInfo: {
				graduationTime:{
					text:null,
				},
				name: {
					text: null,
					isdisabled: false
				},
				nation: {
					text: null
				},
				origin: {
					text: null
				},
				phone: {
					text: null
				},
				mailbox: {
					text: null
				},
				idCard: {
					text: null,
					isdisabled: false
				},
				address: {
					text: null
				},
				type: {
					text: null
				},
				identifier: {
					text: null
				}
			},
			//性别信息
			sexData: [
				{
					id: 0,
					name: '男'
				},
				{
					id: 1,
					name: '女'
				},
				{
					id: 2,
					name: '未知'
				}
			],
			sexSelect: {
				id: null,
				name: null,
				isdisabled: false
			},
			//政治面貌
			politicalData: [
				{
					id: 0,
					name: '中共党员'
				},
				{
					id: 4,
					name: '预备党员'
				},
				{
					id: 1,
					name: '共青团员'
				},
				{
					id: 2,
					name: '群众'
				},
				{
					id: 3,
					name: '民主党派'
				}
			],
			politicalSelect: {
				id: null,
				name: null
			},
			//最高学历
			educationData: [
				{
					id: 0,
					name: '专科'
				},
				{
					id: 1,
					name: '本科'
				},
				{
					id: 2,
					name: '硕士研究生'
				},
				{
					id: 3,
					name: '博士研究生'
				}
			],
			educationSelect: {
				id: null,
				name: null
			},
			//最高学位
			eduDegreeData: [
				{
					id: 0,
					name: '博士'
				},
				{
					id: 1,
					name: '硕士'
				},
				{
					id: 2,
					name: '学士'
				},
				{
					id: 3,
					name: '无'
				}
			],
			eduDegreeSelect: {
				id: null,
				name: null
			},
			//学历性质
			nEducationData: [
				{
					id: 0,
					name: '全日制'
				},
				{
					id: 1,
					name: '非全日制'
				}
			],
			nEducationSelect: [],
			resume: [
				{
					id: 0,
					startTime: null,
					endTime: null,
					inputText: null
				},
				{
					id: 1,
					startTime: null,
					endTime: null,
					inputText: null
				}
			], //个人简历
			peopleData: [
				{
					id: 0,
					relationship: null,
					name: null,
					political: null,
					work: null
				},
				{
					id: 1,
					relationship: null,
					name: null,
					political: null,
					work: null
				}
			], //家庭成员
			//工作单位
			workplace: '',
			//备注
			remark: '',
			//用户信息
			userData: {},
			//之前保存的最高学历
			highest:'',
			//证明资料
		    picList:[]
		};
	},
	onLoad(option) {
		this.todayTime = new Date().getFullYear() + '-' + ((new Date().getMonth()+1) > 10 ? new Date().getMonth()+1:'0'+(new Date().getMonth()+1)) +'-'+ (new Date().getDate()>10 ? new Date().getDate() : '0'+new Date().getDate())
		this.todayTimeYear = new Date().getFullYear();
		const islogin = this.$islogin.isLogin;
		const that = this;
		this.userData = uni.getStorageSync('userInfo');
		if (!this.userData.uuid && !islogin) {
			uni.showToast({
				title: '请登录',
				icon: 'none',
				duration: 2000
			});
			setTimeout(function() {
				uni.navigateTo({
					url: '/pages/index/index'
				});
			}, 2000);
			return false;
		}
		that.key = option.key;
		//获取招聘信息
		uni.request({
			url: common.port.recruitmentById + '/' + option.key,
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
							uni.redirectTo({
								url: '/pages/index/index'
							});
						}, 2000);
					} else {
						var data = 'recruitId=' + option.key + '&userId=' + this.userData.uuid;
						uni.request({
							url: common.port.startApplyOrQuery + '?' + data,
							method: 'GET',
							dataType: 'json',
							data: {},
							success: res => {
								if (res.data.code == 200) {
									if (res.data.data) {
										if (res.data.data.isverify == 1) {
											uni.redirectTo({
												url: '/pages/signUpReview/signUpReview?key=' + that.key
											});
										} else if (res.data.data.isverify == 2) {
											uni.redirectTo({
												url: '/pages/signUpSuccess/signUpSuccess?key=' + that.key
											});
										} else if (res.data.data.isverify == 3 || res.data.data.isverify == 0) {
											//岗位
											that.getTeacher(res.data.data.unitId, res.data.data.postId);
											//个人资料
											that.teacherId = res.data.data.teacherId;
											that.imageUrl = res.data.data.photo;
											that.userInfo.name.text = res.data.data.name;
											if (res.data.data.sex == '0') {
												that.sexSelect = {
													id: 0,
													name: '男',
													isdisabled: true
												};
											} else if (res.data.data.sex == '1') {
												that.sexSelect = {
													id: 1,
													name: '女',
													isdisabled: true
												};
											} else if (res.data.data.sex == '2') {
												that.sexSelect = {
													id: 2,
													name: '未知',
													isdisabled: true
												};
											}
											if(res.data.data.credentials && res.data.data.credentials.length>0){
											    this.picList = res.data.data.credentials;
											}
											that.userInfo.graduationTime.text = res.data.data.graduateTime;
											that.userInfo.nation.text = res.data.data.nation;
											that.userInfo.origin.text = res.data.data.birthplace;
											that.userInfo.phone.text = res.data.data.mobile;
											that.userInfo.mailbox.text = res.data.data.email;
											that.userInfo.idCard.text = res.data.data.idNumber;
											that.userInfo.address.text = res.data.data.address;
											if (res.data.data.maxDegree == '博士') {
												that.eduDegreeSelect = {
													id: 0,
													name: '博士'
												};
											} else if (res.data.data.maxDegree == '硕士') {
												that.eduDegreeSelect = {
													id: 1,
													name: '硕士'
												};
											} else if (res.data.data.maxDegree == '学士') {
												that.eduDegreeSelect = {
													id: 2,
													name: '学士'
												};
											} else if (res.data.data.maxDegree == '无') {
												that.eduDegreeSelect = {
													id: 3,
													name: '无'
												};
											}
											if (res.data.data.politicsStatus == '中共党员') {
												that.politicalSelect = {
													id: 0,
													name: '中共党员'
												};
											} else if (res.data.data.politicsStatus == '共青团员') {
												that.politicalSelect = {
													id: 1,
													name: '共青团员'
												};
											} else if (res.data.data.politicsStatus == '群众') {
												that.politicalSelect = {
													id: 2,
													name: '群众'
												};
											} else if (res.data.data.politicsStatus == '民主党派') {
												that.politicalSelect = {
													id: 3,
													name: '民主党派'
												};
											} else if (res.data.data.politicsStatus == '预备党员') {
												that.politicalSelect = {
													id: 4,
													name: '预备党员'
												};
											}
											that.userInfo.type.text = res.data.data.certificationInfo.kind;
											that.userInfo.identifier.text = res.data.data.certificationInfo.serialNumber;
											that.certificationId = res.data.data.certificationInfo.certificationId;
											that.highest = res.data.data.certificationInfo.highestEducation;
											if (res.data.data.certificationInfo.highestEducation == '专科') {
												that.educationSelect = {
													id: 0,
													name: '专科'
												};
											} else if (res.data.data.certificationInfo.highestEducation == '本科') {
												that.educationSelect = {
													id: 1,
													name: '本科'
												};
											} else if (res.data.data.certificationInfo.highestEducation == '硕士研究生') {
												that.educationSelect = {
													id: 2,
													name: '硕士研究生'
												};
											} else if (res.data.data.certificationInfo.highestEducation == '博士研究生') {
												that.educationSelect = {
													id: 3,
													name: '博士研究生'
												};
											}
											//博士
											if (
												res.data.data.certificationInfo.doctorSpecialty &&
												res.data.data.certificationInfo.doctorAcademy &&
												res.data.data.certificationInfo.doctorEducationNature
											) {
												that.nEducationSelect.push({
													id: 4,
													type: '博士',
													error: false,
													errorText: '',
													school: res.data.data.certificationInfo.doctorAcademy,
													major: res.data.data.certificationInfo.doctorSpecialty,
													selected: {
														id: res.data.data.certificationInfo.doctorEducationNature == '全日制' ? 0 : 1,
														name: res.data.data.certificationInfo.doctorEducationNature
													}
												});
											}
											//硕士
											if (
												res.data.data.certificationInfo.masterAcademy &&
												res.data.data.certificationInfo.masterSpecialty &&
												res.data.data.certificationInfo.masterEducationNature
											) {
												that.nEducationSelect.push({
													id: 3,
													type: '硕士',
													error: false,
													errorText: '',
													school: res.data.data.certificationInfo.masterAcademy,
													major: res.data.data.certificationInfo.masterSpecialty,
													selected: {
														id: res.data.data.certificationInfo.masterEducationNature == '全日制' ? 0 : 1,
														name: res.data.data.certificationInfo.masterEducationNature
													}
												});
											}
											//本科
											if (
												res.data.data.certificationInfo.bachelorAcademy &&
												res.data.data.certificationInfo.bachelorSpecialty &&
												res.data.data.certificationInfo.bachelorEducationNature
											) {
												that.nEducationSelect.push({
													id: 2,
													type: '本科',
													error: false,
													errorText: '',
													school: res.data.data.certificationInfo.bachelorAcademy,
													major: res.data.data.certificationInfo.bachelorSpecialty,
													selected: {
														id: res.data.data.certificationInfo.bachelorEducationNature == '全日制' ? 0 : 1,
														name: res.data.data.certificationInfo.bachelorEducationNature
													}
												});
											}
											//专科
											if (
												res.data.data.certificationInfo.specialtiesAcademy &&
												res.data.data.certificationInfo.specialtiesSpecialty &&
												res.data.data.certificationInfo.specialtiesEducationNature
											) {
												that.nEducationSelect.push({
													id: 1,
													type: '专科',
													error: false,
													errorText: '',
													school: res.data.data.certificationInfo.specialtiesAcademy,
													major: res.data.data.certificationInfo.specialtiesSpecialty,
													selected: {
														id: res.data.data.certificationInfo.specialtiesEducationNature == '全日制' ? 0 : 1,
														name: res.data.data.certificationInfo.specialtiesEducationNature
													}
												});
											}
											//社会简历
											that.workplace = res.data.data.currentWorkingUnit;
											that.remark = res.data.data.remark;
											if (res.data.data.familyMembers.length > 0) {
												var familyList = [];
												res.data.data.familyMembers.forEach((v, i) => {
													familyList.push({
														id: i,
														relationship: v.relation,
														name: v.familyMemberName,
														political: v.familyMemberPoliticsStatus,
														work: v.works
													});
												});
												this.peopleData = familyList;
											}
											if (res.data.data.resumes.length > 0) {
												var resumesList = [];
												res.data.data.resumes.forEach((v, i) => {
													resumesList.push({
														id: i,
														startTime: v.entryTime,
														endTime: v.dimissionTime,
														inputText: v.work,
														error: false,
														errorText: ''
													});
												});
												this.resume = resumesList;
											}
										}
									} else if (res.data.msg == null) {
										that.getTeacher();
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
		if (this.userData.name) {
			this.userInfo.name.text = this.userData.name;
			this.userInfo.name.isdisabled = true;
		}
		if (this.userData.sex) {
			if (this.userData.sex == 0) {
				this.sexSelect = {
					id: 1,
					name: '女',
					isdisabled: true
				};
			} else if (this.userData.sex == 1) {
				this.sexSelect = {
					id: 0,
					name: '男',
					isdisabled: true
				};
			} else {
				this.sexSelect = {
					id: 2,
					name: '未知',
					isdisabled: true
				};
			}
		}
		if (this.userData.papersnumber) {
			this.userInfo.idCard.text = this.userData.papersnumber;
			this.userInfo.idCard.isdisabled = true;
		}
		if (this.userData.mobile) {
			this.userInfo.phone.text = this.userData.mobile;
		}
	},
	methods: {
		// 打开弹层 要做的事
		afterOpen() {
			this.scrollTop = document.scrollingElement.scrollTop;
			document.body.classList.add(this.className);
			document.body.style.top = `-${this.scrollTop}px`;
		},
		// 弹层关闭之前 要做的事
		beforeClose() {
			document.body.classList.remove(this.className);
			document.scrollingElement.scrollTop = this.scrollTop;
		},
		//选择弹窗选择数据
		selectChose(row) {
			const that = this;
			if (this.choseText == 'nEducationData') {
				this.nEducationSelect[this.choseNum].selected = row;
				this.showChose = false;
				this.beforeClose();
			} else {
				this[this.choseText] = row;
				this.showChose = false;
				this.beforeClose();
				switch (this.choseText) {
					case 'companySelected':
						var teacherdata = 'recruitId=' + this.key + '&unitId=' + row.value;
						uni.request({
							url: common.port.queryRecruitmentJob + '?' + teacherdata,
							method: 'GET',
							dataType: 'json',
							data: {},
							success: res => {
								if (res.data.code == 200) {
									var teacherList = [];
									res.data.data.forEach((v, i) => {
										teacherList.push({
											value: v.jobId,
											label: v.subjectName
										});
									});
									that.stationOldData = res.data.data;
									that.stationData = teacherList;
									that.stationSelected = {
										value: null,
										label: ''
									};
								} else {
									uni.showToast({
										title: res.data.msg,
										icon: 'none',
										duration: 2000
									});
								}
							}
						});
						break;
					case 'stationSelected':
						if (!code.validateEmpty(this.companySelected.label) || !code.validateEmpty(this.stationSelected.label)) {
							this.stationError = true;
							this.stationErrorText = '请选择报考单位和报考岗位';
						} else {
							var job = '';
							this.stationOldData.forEach((v, i) => {
								if (v.jobId == this.stationSelected.value) {
									job = v;
								}
							});
							if(job.educationName != '不限'){
								this.stationError = true;
								this.stationErrorText = '您选择的岗位学历要求'+job.educationName+'以上';
							  }else {
								this.stationError = true;
								this.stationErrorText = '您选择的岗位学历没有限制';
							  }
							if (job.educationName == '不限') {
								this.educationData = [
									{
										id: 0,
										name: '专科'
									},
									{
										id: 1,
										name: '本科'
									},
									{
										id: 2,
										name: '硕士研究生'
									},
									{
										id: 3,
										name: '博士研究生'
									}
								];
							} else if (job.educationName == '专科') {
								this.educationData = [
									{
										id: 0,
										name: '专科'
									},
									{
										id: 1,
										name: '本科'
									},
									{
										id: 2,
										name: '硕士研究生'
									},
									{
										id: 3,
										name: '博士研究生'
									}
								];
							} else if (job.educationName == '本科') {
								this.educationData = [
									{
										id: 1,
										name: '本科'
									},
									{
										id: 2,
										name: '硕士研究生'
									},
									{
										id: 3,
										name: '博士研究生'
									}
								];
							} else if (job.educationName == '硕士研究生') {
								this.educationData = [
									{
										id: 2,
										name: '硕士研究生'
									},
									{
										id: 3,
										name: '博士研究生'
									}
								];
							} else if (job.educationName == '博士研究生') {
								this.educationData = [
									{
										id: 3,
										name: '博士研究生'
									}
								];
							}
						}
						break;
					case 'educationSelect':
						this.choseEducation();
						break;
					default:
						break;
				}
			}
		},
		//展示选择弹窗
		changeChose(data, num, isdisabled) {
			switch (data) {
				case 'companySelected':
					this.choseData = this.companyData;
					this.choseText = 'companySelected';
					this.choseKey = 'label';
					this.showChose = true;
					this.afterOpen();
					break;
				case 'stationSelected':
					if (this.stationData.length <= 0) {
						uni.showToast({
							title: '请选择学校',
							icon: 'none',
							duration: 2000
						});
					} else {
						this.choseData = this.stationData;
						this.choseText = 'stationSelected';
						this.choseKey = 'label';
						this.showChose = true;
						this.afterOpen();
					}
					break;
				case 'sexSelect':
					if (!isdisabled) {
						this.choseData = this.sexData;
						this.choseText = 'sexSelect';
						this.choseKey = 'name';
						this.showChose = true;
						this.afterOpen();
					}
					break;
				case 'politicalSelect':
					this.choseData = this.politicalData;
					this.choseText = 'politicalSelect';
					this.choseKey = 'name';
					this.showChose = true;
					this.afterOpen();
					break;
				case 'educationSelect':
					this.choseData = this.educationData;
					this.choseText = 'educationSelect';
					this.choseKey = 'name';
					this.showChose = true;
					this.afterOpen();
					break;
				case 'eduDegreeSelect':
					this.choseData = this.eduDegreeData;
					this.choseText = 'eduDegreeSelect';
					this.choseKey = 'name';
					this.showChose = true;
					this.afterOpen();
					break;
				case 'nEducationData':
					this.choseData = this.nEducationData;
					this.choseText = 'nEducationData';
					this.choseNum = num;
					this.choseKey = 'name';
					this.showChose = true;
					this.afterOpen();
					break;
				case 'hidden':
					this.showChose = false;
					this.beforeClose();
					break;
				default:
					break;
			}
		},
		//上传图片
		uploadPic(){
			const that = this;
			if(that.picList.length<6){
				uni.chooseImage({
					count: 6 - that.picList.length, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						res.tempFiles.forEach((v,i)=>{
							uni.uploadFile({
								// 需要上传的地址
								url: common.port.avatar,
								// file  需要上传的文件
								file: v,
								name: 'file',
								success(res) {
									// 显示上传信息
									if (res.statusCode == 200 && JSON.parse(res.data).code == 200) {
										that.picList.push({url:JSON.parse(res.data).imgUrl});
									} else {
										uni.showToast({
											title: '上传图片失败，请重新尝试',
											icon: 'none',
											duration: 2000
										});
									}
								}
							});
						})
					}
				});	
			}
		},
		//下一步
		next(num) {
			if (num == 2) {
				if (!code.validateEmpty(this.companySelected.label) || !code.validateEmpty(this.stationSelected.label)) {
					this.stationError = true;
					this.stationErrorText = '请选择报考单位和报考岗位';
				} else {
					this.stepData = 2;
					this.title = '个人资料';
					var job = '';
					this.stationOldData.forEach((v, i) => {
						if (v.jobId == this.stationSelected.value) {
							job = v;
						}
					});
					if((job.educationName == '本科' && this.educationSelect.name == '专科')||(job.educationName == '硕士' && (this.educationSelect.name == '专科' || this.educationSelect.name == '本科'))||(job.educationName == '博士' && (this.educationSelect.name == '专科' || this.educationSelect.name == '本科' || this.educationSelect.name == '硕士'))){
						this.educationSelect = {
							id: '',
							name: ''
						};
						this.nEducationSelect = [];
					}
					if (job.educationName == '不限') {
						this.educationData = [
							{
								id: 0,
								name: '专科'
							},
							{
								id: 1,
								name: '本科'
							},
							{
								id: 2,
								name: '硕士研究生'
							},
							{
								id: 3,
								name: '博士研究生'
							}
						];
					} else if (job.educationName == '专科') {
						this.educationData = [
							{
								id: 0,
								name: '专科'
							},
							{
								id: 1,
								name: '本科'
							},
							{
								id: 2,
								name: '硕士研究生'
							},
							{
								id: 3,
								name: '博士研究生'
							}
						];
					} else if (job.educationName == '本科') {
						this.educationData = [
							{
								id: 1,
								name: '本科'
							},
							{
								id: 2,
								name: '硕士研究生'
							},
							{
								id: 3,
								name: '博士研究生'
							}
						];
					} else if (job.educationName == '硕士研究生') {
						this.educationData = [
							{
								id: 2,
								name: '硕士研究生'
							},
							{
								id: 3,
								name: '博士研究生'
							}
						];
					} else if (job.educationName == '博士研究生') {
						this.educationData = [
							{
								id: 3,
								name: '博士研究生'
							}
						];
					}
				}
			} else if (num == 3) {
				this.saveUser(true);
			}
		},
		//选择图片
		choseImg() {
			const that = this;
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: function(res) {
					let fileData = res.tempFiles[0];
					const isJPG = fileData.type === 'image/jpeg' || fileData.type === 'image/png';
					const isLt3k = fileData.size / 1024 / 1024 < 20;
					if (!isJPG) {
						uni.showToast({
							title: '上传头像图片只能是 JPG和png 格式!',
							icon: 'none',
							duration: 2000
						});
					}
					if (!isLt3k) {
						uni.showToast({
							title: '上传头像图片大小不能超过 20M!',
							icon: 'none',
							duration: 2000
						});
					}
					if (isJPG && isLt3k) {
						that.tempFilePath = res.tempFilePaths.shift();
						that.fileKey = fileData.id;
					}
				}
			});
		},
		//选择学历
		choseEducation() {
			if (this.educationSelect.name == '专科') {
				this.nEducationSelect = [
					{
						id: 1,
						type: '专科',
						school: null,
						major: null,
						selected: {
							id: null,
							name: null
						}
					}
				];
			} else if (this.educationSelect.name == '本科') {
				this.nEducationSelect = [
					{
						id: 2,
						type: '本科',
						school: null,
						major: null,
						selected: {
							id: null,
							name: null
						}
					}
				];
			} else if (this.educationSelect.name == '硕士研究生') {
				this.nEducationSelect = [
					{
						id: 3,
						type: '硕士',
						school: null,
						major: null,
						selected: {
							id: null,
							name: null
						}
					},
					{
						id: 2,
						type: '本科',
						school: null,
						major: null,
						selected: {
							id: null,
							name: null
						}
					}
				];
			} else if (this.educationSelect.name == '博士研究生') {
				this.nEducationSelect = [
					{
						id: 4,
						type: '博士',
						school: null,
						major: null,
						selected: {
							id: null,
							name: null
						}
					},
					{
						id: 3,
						type: '硕士',
						school: null,
						major: null,
						selected: {
							id: null,
							name: null
						}
					},
					{
						id: 2,
						type: '本科',
						school: null,
						major: null,
						selected: {
							id: null,
							name: null
						}
					}
				];
			}
		},
		//删除上传证明材料
		removePic(num){
			this.picList.splice(num,1);
		},
		//保存个人资料 和 下一步
		saveUser(pddata) {
			const that = this;
			var postData = true;
			if (!code.validateEmpty(this.companySelected.label) || !code.validateEmpty(this.stationSelected.label)) {
				uni.showToast({
					title: '请选择报考单位和报考岗位',
					icon: 'none',
					duration: 2000
				});
				postData = false;
				return false;
			}
			if (!code.validateEmpty(this.userInfo.name.text)) {
				uni.showToast({
					title: '请输入姓名',
					icon: 'none',
					duration: 2000
				});
				postData = false;
				return false;
			} else if (!code.validateName(this.userInfo.name.text)) {
				uni.showToast({
					title: '请输入正确格式的姓名',
					icon: 'none',
					duration: 2000
				});
				postData = false;
				return false;
			}
			if (!code.validateEmpty(this.sexSelect.name)) {
				uni.showToast({
					title: '请选择性别',
					icon: 'none',
					duration: 2000
				});
				postData = false;
				return false;
			}
			if (!code.validateEmpty(this.userInfo.nation.text)) {
				uni.showToast({
					title: '请填写民族',
					icon: 'none',
					duration: 2000
				});
				postData = false;
				return false;
			} else if (!code.validateNation(this.userInfo.nation.text)) {
				uni.showToast({
					title: '请填写正确格式的民族',
					icon: 'none',
					duration: 2000
				});
				postData = false;
				return false;
			}
			if (!code.validateEmpty(this.userInfo.origin.text)) {
				uni.showToast({
					title: '请填写生源地',
					icon: 'none',
					duration: 2000
				});
				postData = false;
				return false;
			}
			if (!code.validateEmpty(this.userInfo.phone.text)) {
				uni.showToast({
					title: '请输入手机号',
					icon: 'none',
					duration: 2000
				});
				postData = false;
				return false;
			} else if (!code.validatePhoneNumber(this.userInfo.phone.text)) {
				uni.showToast({
					title: '请输入正确格式的手机号',
					icon: 'none',
					duration: 2000
				});
				postData = false;
				return false;
			}
			if (!code.validateEmpty(this.userInfo.mailbox.text)) {
				uni.showToast({
					title: '请输入电子邮箱',
					icon: 'none',
					duration: 2000
				});
				postData = false;
				return false;
			} else if (!code.validateEmail(this.userInfo.mailbox.text)) {
				uni.showToast({
					title: '请输入正确格式的电子邮箱',
					icon: 'none',
					duration: 2000
				});
				postData = false;
				return false;
			}
			if (!code.validateEmpty(this.userInfo.idCard.text)) {
				uni.showToast({
					title: '请输入身份证号',
					icon: 'none',
					duration: 2000
				});
				postData = false;
				return false;
			} else if (!code.IdentityCodeValid(this.userInfo.idCard.text)) {
				uni.showToast({
					title: '请输入正确格式的身份证号',
					icon: 'none',
					duration: 2000
				});
				postData = false;
				return false;
			}
			if (!code.validateEmpty(this.userInfo.address.text)) {
				uni.showToast({
					title: '请填写家庭住址',
					icon: 'none',
					duration: 2000
				});
				postData = false;
				return false;
			}
			if (!code.validateEmpty(this.politicalSelect.name)) {
				uni.showToast({
					title: '请选择政治面貌',
					icon: 'none',
					duration: 2000
				});
				postData = false;
				return false;
			}
			if (!code.validateEmpty(this.userInfo.type.text)) {
				uni.showToast({
					title: '请填写教师资格证种类',
					icon: 'none',
					duration: 2000
				});
				postData = false;
				return false;
			}
			if (!code.validateEmpty(this.userInfo.identifier.text)) {
				uni.showToast({
					title: '请填写教师资格证编号',
					icon: 'none',
					duration: 2000
				});
				postData = false;
				return false;
			}
			if (!code.validateEmpty(this.userInfo.graduationTime.text)) {
				uni.showToast({
					title: '请选择毕业年份',
					icon: 'none',
					duration: 2000
				});
				postData = false;
				return false;
			}
			if (!code.validateEmpty(this.educationSelect.name)) {
				uni.showToast({
					title: '请选择最高学历',
					icon: 'none',
					duration: 2000
				});
				postData = false;
				return false;
			}
			if (!code.validateEmpty(this.eduDegreeSelect.name)) {
				uni.showToast({
					title: '请选择最高学位',
					icon: 'none',
					duration: 2000
				});
				postData = false;
				return false;
			}
			if (!code.validateEmpty(this.imageUrl)) {
				uni.showToast({
					title: '请上传图片',
					icon: 'none',
					duration: 2000
				});
				postData = false;
				return false;
			}
			if (this.educationSelect.name != '不限') {
				this.nEducationSelect.forEach((v, i) => {
					if (!code.validateEmpty(v.school) || !code.validateEmpty(v.major) || !code.validateEmpty(v.selected.name)) {
						uni.showToast({
							title: '请填写完整的学历信息',
							icon: 'none',
							duration: 2000
						});
						postData = false;
						return false;
					}
				});
			}
			if (postData) {
				var data = {
					certificationInfo: {},
					credentials:[]
				};
				data.teacherId = this.teacherId;
				data.userId = this.userData.uuid;
				data.recruitId = this.key;
				data.photo = this.imageUrl;
				data.unitId = this.companySelected.value;
				// data.subjectId = this.stationSelected.value;
				data.name = this.userInfo.name.text;
				data.sex = this.sexSelect.id;
				data.nation = this.userInfo.nation.text;
				data.birthplace = this.userInfo.origin.text;
				data.mobile = this.userInfo.phone.text;
				data.email = this.userInfo.mailbox.text;
				data.idNumber = this.userInfo.idCard.text;
				data.address = this.userInfo.address.text;
				data.maxDegree = this.eduDegreeSelect.name;
				data.politicsStatus = this.politicalSelect.name;
				data.certificationInfo.kind = this.userInfo.type.text;
				data.certificationInfo.serialNumber = this.userInfo.identifier.text;
				data.certificationInfo.highestEducation = this.educationSelect.name;
				data.graduateTime = this.userInfo.graduationTime.text;
				console.log(this.companyData)
				console.log(this.companySelected)
				this.stationOldData.forEach((v, i) => {
					if (v.jobId == this.stationSelected.value) {
						data.postId = v.jobId;
					}
				});
				switch (this.educationSelect.name) {
					case '专科':
						this.nEducationSelect.forEach((v, i) => {
							if (v.id == 1) {
								data.certificationInfo.specialtiesAcademy = v.school;
								data.certificationInfo.specialtiesSpecialty = v.major;
								data.certificationInfo.specialtiesEducationNature = v.selected.name;
							}
						});
						break;
					case '本科':
						this.nEducationSelect.forEach((v, i) => {
							if (v.id == 2) {
								data.certificationInfo.bachelorAcademy = v.school;
								data.certificationInfo.bachelorSpecialty = v.major;
								data.certificationInfo.bachelorEducationNature = v.selected.name;
							}
						});
						break;
					case '硕士研究生':
						this.nEducationSelect.forEach((v, i) => {
							if (v.id == 2) {
								data.certificationInfo.bachelorAcademy = v.school;
								data.certificationInfo.bachelorSpecialty = v.major;
								data.certificationInfo.bachelorEducationNature = v.selected.name;
							}
							if (v.id == 3) {
								data.certificationInfo.masterAcademy = v.school;
								data.certificationInfo.masterSpecialty = v.major;
								data.certificationInfo.masterEducationNature = v.selected.name;
							}
						});
						break;
					case '博士研究生':
						this.nEducationSelect.forEach((v, i) => {
							if (v.id == 2) {
								data.certificationInfo.bachelorAcademy = v.school;
								data.certificationInfo.bachelorSpecialty = v.major;
								data.certificationInfo.bachelorEducationNature = v.selected.name;
							}
							if (v.id == 3) {
								data.certificationInfo.masterAcademy = v.school;
								data.certificationInfo.masterSpecialty = v.major;
								data.certificationInfo.masterEducationNature = v.selected.name;
							}
							if (v.id == 4) {
								data.certificationInfo.doctorAcademy = v.school;
								data.certificationInfo.doctorSpecialty = v.major;
								data.certificationInfo.doctorEducationNature = v.selected.name;
							}
						});
						break;
					default:
						break;
				}
				this.picList.forEach((v,i)=>{
					data.credentials.push({
						url:v.url,
						teacherId:this.teacherId
				    })
			    })
				uni.request({
					url: common.port.saveTeacherInfo,
					headers: {
						'Content-Type': 'application/json'
					},
					method: 'POST',
					dataType: 'json',
					data: data,
					success: result => {
						if (result.data.code == 200) {
							if (pddata) {
								that.stepData = 3;
								that.teacherId = result.data.data;
								that.title = '社会简历';
								uni.pageScrollTo({
								    scrollTop: 0,
								    duration: 0
								});
							} else {
								that.teacherId = result.data.data;
								// uni.redirectTo({
								// 	url: '/pages/index/index'
								// });
								uni.showToast({
									title: '保存成功',
									icon: 'none',
									duration: 2000
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
			}
		},
		//选择时间
		bindDateChange(event, num, type) {
			if (type == 'start') {
				this.resume[num].startTime = event.target.value;
			} else if (type == 'end') {
				this.resume[num].endTime = event.target.value;
			}
		},
		//选择毕业时间
		bindgTimeChange(event) {
			this.userInfo.graduationTime.text = event.target.value;
		},
		//添加经历
		addResume() {
			this.resume.push({
				id: this.resume.length,
				startTime: null,
				endTime: null,
				inputText: null
			});
		},
		//添加家庭成员
		addPeople() {
			if (this.peopleData.length < 4) {
				this.peopleData.push({
					id: this.peopleData.length,
					relationship: null,
					name: null,
					political: null,
					work: null
				});
			}
		},
		//保存个人经历 和 报名
		saveExperience(pddata) {
			const that = this;
			var savepd = true;
			var resumepd = true;
			var peoplepd = true;
			var data = {
				teacherId: this.teacherId,
				currentWorkingUnit: '',
				remark: '',
				familyMembers: [],
				resumes: []
			};
			if (!code.validateEmpty(this.workplace)) {
				uni.showToast({
					title: '请填写工作单位,没有请填写无',
					icon: 'none',
					duration: 2000,
					position:'top'
				});
				savepd = false;
			} else {
				data.currentWorkingUnit = this.workplace;
			}
			if (!code.validateEmpty(this.remark)) {
				uni.showToast({
					title: '请填写备注,没有请填写无',
					icon: 'none',
					duration: 2000
				});
				savepd = false;
			} else {
				data.remark = this.remark;
			}
			this.resume.forEach((v, i) => {
				if (code.validateEmpty(v.startTime) || code.validateEmpty(v.endTime) || code.validateEmpty(v.inputText)) {
					if (!code.validateEmpty(v.startTime) || !code.validateEmpty(v.endTime) || !code.validateEmpty(v.inputText)) {
						uni.showToast({
							title: '请填写完整的个人简历',
							icon: 'none',
							duration: 2000
						});
						savepd = false;
						resumepd = false;
						return false;
					} else if (new Date(v.startTime) > new Date(v.endTime)) {
						uni.showToast({
							title: '个人简历开始时间不能大于结束时间',
							icon: 'none',
							duration: 2000
						});
						savepd = false;
						resumepd = false;
						return false;
					} else {
						data.resumes.push({
							entryTime: v.startTime,
							dimissionTime: v.endTime,
							work: v.inputText
						});
					}
				}
			});
			if (resumepd) {
				if (data.resumes.length < 2) {
					uni.showToast({
						title: '请至少填写两条个人简历',
						icon: 'none',
						duration: 2000
					});
					savepd = false;
					return false;
				}
			}
			if (resumepd) {
				this.peopleData.forEach((v, i) => {
					if (code.validateEmpty(v.relationship) || code.validateEmpty(v.name) || code.validateEmpty(v.political) || code.validateEmpty(v.work)) {
						if (!code.validateEmpty(v.relationship) || !code.validateEmpty(v.name) || !code.validateEmpty(v.political) || !code.validateEmpty(v.work)) {
							uni.showToast({
								title: '请填写完整的该成员信息',
								icon: 'none',
								duration: 2000
							});
							savepd = false;
							peoplepd = false;
							return false;
						} else if (v.relationship.length > 4) {
							uni.showToast({
								title: '关系最多为四个字,请检查是否含有空格',
								icon: 'none',
								duration: 2000
							});
							savepd = false;
							peoplepd = false;
							return false;
						} else if (v.political.length > 4) {
							uni.showToast({
								title: '政治面貌最多为四个字,请检查是否含有空格',
								icon: 'none',
								duration: 2000
							});
							savepd = false;
							peoplepd = false;
							return false;
						} else {
							data.familyMembers.push({
								relation: v.relationship,
								familyMemberName: v.name,
								familyMemberPoliticsStatus: v.political,
								works: v.work
							});
						}
					}
				});
				if (peoplepd) {
					if (data.familyMembers.length < 1) {
						uni.showToast({
							title: '请至少填写一条家庭成员',
							icon: 'none',
							duration: 2000
						});
						savepd = false;
						return false;
					}
				}
			}
			if (savepd) {
				data.teacherId = this.teacherId;
				if (pddata) {
					uni.request({
						url: common.port.applyTeacher,
						headers: {
							'Content-Type': 'application/json'
						},
						method: 'POST',
						dataType: 'json',
						data: data,
						success: result => {
							if (result.data.code == 200) {
								uni.redirectTo({
									url: '/pages/addSuccess/addSuccess?key=' + that.key
								});
							} else {
								uni.redirectTo({
									url: '/pages/addFail/addFail?key=' + that.key
								});
							}
						}
					});
				} else {
					uni.request({
						url: common.port.saveSocialResume,
						headers: {
							'Content-Type': 'application/json'
						},
						method: 'POST',
						dataType: 'json',
						data: data,
						success: result => {
							if (result.data.code == 200) {
								// uni.redirectTo({
								// 	url: '/pages/index/index'
								// });
								uni.showToast({
									title: '保存成功',
									icon: 'none',
									duration: 2000
								});
							} else {
								uni.showToast({
									title: result.data.msg,
									icon: 'none',
									duration: 2000
								});
							}
						}
					});
				}
			}
		},
		//获取岗位信息
		getTeacher: function(schoolKey, teacherKey) {
			const that = this;
			var data = 'recruitId=' + this.key;
			uni.request({
				url: common.port.queryRecruitmentSchool + '?' + data,
				method: 'GET',
				dataType: 'json',
				data: {},
				success: res => {
					if (res.data.code == 200) {
						var jobList = [];
						res.data.data.forEach((v, i) => {
							jobList.push({
								value: v.unitId,
								label: v.unitName
							});
							if (schoolKey == v.unitId) {
								that.companySelected = {
									value: v.unitId,
									label: v.unitName
								};
							}
						});
						that.companyData = jobList;
						if (teacherKey && schoolKey) {
							var teacherdata = 'recruitId=' + this.key + '&unitId=' + schoolKey;
							uni.request({
								url: common.port.queryRecruitmentJob + '?' + teacherdata,
								method: 'GET',
								dataType: 'json',
								data: {},
								success: result => {
									if (result.data.code == 200) {
										var teacherList = [];
										result.data.data.forEach((v, i) => {
											teacherList.push({
												value: v.jobId,
												label: v.subjectName
											});
											if (schoolKey == v.unitId) {
												that.stationSelected = {
													value: v.jobId,
													label: v.subjectName
												};
												if(v.educationName != '不限'){
													this.stationError = true;
													this.stationErrorText = '您选择的岗位学历要求'+v.educationName+'以上';
												  }else {
													this.stationError = true;
													this.stationErrorText = '您选择的岗位学历没有限制';
												  }
											}
										});
										that.stationOldData = result.data.data;
										that.stationData = teacherList;
									} else {
										uni.showToast({
											title: result.data.msg,
											icon: 'none',
											duration: 2000
										});
									}
								}
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
		},
		confirm(e) {
			const that = this;
			this.tempFilePath = '';
			var arr = e.detail.tempFilePath.split(','),
				mime = arr[0].match(/:(.*?);/)[1],
				bstr = atob(arr[1]),
				n = bstr.length,
				u8arr = new Uint8Array(n);
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}
			var fileData = new File([u8arr], that.fileKey, { type: mime });
			uni.uploadFile({
				// 需要上传的地址
				url: common.port.avatar,
				// file  需要上传的文件
				file: fileData,
				name: 'file',
				success(res) {
					// 显示上传信息
					if (res.statusCode == 200 && JSON.parse(res.data).code == 200) {
						that.imageUrl = JSON.parse(res.data).imgUrl;
					} else {
						uni.showToast({
							title: '上传图片失败，请重新尝试',
							icon: 'none',
							duration: 2000
						});
					}
				}
			});
		},
		cancel() {
			console.log('canceled');
		},
		back: function(e) {
			if (this.stepData == 3) {
				this.stepData = 2;
			} else {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	},
	components: { ImageCropper }
};
</script>

<style lang="scss" scoped>
.concent_box {
	padding-bottom: 50rpx;
	padding-top: 0rpx;
	.con1 {
		position: relative;
		padding: 0 30rpx;
		.select {
			border-bottom: 1px solid #d7d7d7;
			.title {
				width: 130rpx;
				font-size: 32rpx;
				color: #333333;
				line-height: 80rpx;
			}
			.select_chose {
				width: calc(100% - 130rpx);
				padding-left: 20rpx;
				.chose_data {
					width: calc(100% - 24rpx - 20rpx);
					color: #999999;
					line-height: 80rpx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
					text-align: right;
					font-size: 32rpx;
					&.have_data {
						color: #333333;
					}
				}
				image {
					margin-left: 10rpx;
					width: 14rpx;
					height: 8rpx;
					margin-top: 36rpx;
				}
			}
		}
		.error {
			position: absolute;
			left: 30rpx;
			top: 160rpx;
			font-size: 28rpx;
			color: #ff3b3b;
			line-height: 48rpx;
			margin-top: 10rpx;
			z-index: 3;
		}
		.next {
			display: block;
			width: 462rpx;
			height: 70rpx;
			line-height: 70rpx;
			font-size: 32rpx;
			color: #ffffff;
			text-align: center;
			border-radius: 35rpx;
			background-color: #436df3;
			margin: 140rpx auto 0;
			&:after {
				display: none;
			}
		}
	}
	.con2 {
		position: relative;
		padding: 0 30rpx;
		.input {
			border-bottom: 1px solid #d7d7d7;
			.title {
				width: 260rpx;
				font-size: 32rpx;
				color: #333333;
				line-height: 86rpx;
			}
			.input_box {
				width: calc(100% - 260rpx);
				padding-left: 20rpx;
				input {
					width: 100%;
					font-size: 32rpx;
					line-height: 86rpx;
					height: 86rpx;
					color: #333333;
					text-align: right;
				}
				input::-webkit-input-placeholder {
					color: #999999;
				}
				input::-moz-placeholder {
					/* Mozilla Firefox 19+ */
					color: #999999;
				}
				input:-moz-placeholder {
					/* Mozilla Firefox 4 to 18 */
					color: #999999;
				}
				input:-ms-input-placeholder {
					/* Internet Explorer 10-11 */
					color: #999999;
				}
			}
			.time_box {
				position: relative;
				width: calc(100% - 260rpx);
				.chose_data {
					width: calc(100% - 12px - 10px);
					font-size: 32rpx;
					line-height: 86rpx;
					height: 86rpx;
					color: #999999;
					text-align: right;
				}
				.have_data{
					color: #333333;
				}
				.picker {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					opacity: 0;
					z-index: 9;
				}
				image {
					position: absolute;
					right: 20rpx;
					top: 36rpx;
					width: 14rpx;
					height: 8rpx;
					z-index: 2;
				}
			}
		}
		.image {
			border-bottom: 1px solid #d7d7d7;
			padding: 18rpx 0;
			.title {
				width: 260rpx;
				margin-top: 52.67rpx;
				view {
					font-size: 32rpx;
					line-height: 42rpx;
					color: #333333;
				}
			}
			.image_box {
				position: relative;
				width: 136rpx;
				height: 189.34rpx;
				background-color: #f4f4f4;
				.choseImg {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					opacity: 0;
					z-index: 9;
				}
				.uploader {
					position: absolute;
					left: 48rpx;
					top: 74.67rpx;
					width: 40rpx;
					height: 40rpx;
					z-index: 6;
				}
				.img {
					max-width: 100%;
					max-height: 100%;
					position: relative;
					z-index: 7;
				}
			}
		}
		.select {
			border-bottom: 1px solid #d7d7d7;
			.title {
				width: 130rpx;
				font-size: 32rpx;
				color: #333333;
				line-height: 86rpx;
			}
			.select_chose {
				width: calc(100% - 130rpx);
				padding-left: 20rpx;
				.chose_data {
					width: calc(100% - 24rpx - 20rpx);
					color: #999999;
					line-height: 86rpx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
					text-align: right;
					font-size: 32rpx;
					&.have_data {
						color: #333333;
					}
				}
				&.sex_box{
					.chose_data {
						width: 100%;
					}
				}
				image {
					margin-left: 10rpx;
					width: 14rpx;
					height: 8rpx;
					margin-top: 36rpx;
				}
			}
		}
		.btn_box {
			margin-top: 116rpx;
			.save {
				display: block;
				width: 250rpx;
				height: 70rpx;
				line-height: 70rpx;
				font-size: 32rpx;
				color: #436df3 !important;
				text-align: center;
				border-radius: 35rpx;
				background-color: #ffffff !important;;
				border: 1px solid #436df3 !important;;
				margin-left: 36rpx;
				&:after {
					display: none;
				}
			}
			.next {
				display: block;
				width: 250rpx;
				height: 70rpx;
				line-height: 70rpx;
				font-size: 32rpx;
				color: #ffffff;
				text-align: center;
				border-radius: 35rpx;
				background-color: #436df3 !important;;
				margin-right: 36rpx;
				&:after {
					display: none;
				}
			}
		}
		.tips {
			font-size: 28rpx;
			line-height: 48rpx;
			color: #ff3434;
			margin-top: 18rpx;
		}
	}
	.con3 {
		position: relative;
		padding: 0 30rpx;
		.input {
			border-bottom: 1px solid #d7d7d7;
			.title {
				width: 200rpx;
				font-size: 32rpx;
				color: #333333;
				line-height: 86rpx;
			}
			.input_box {
				width: calc(100% - 200rpx);
				padding-left: 20rpx;
				input {
					width: 100%;
					font-size: 32rpx;
					line-height: 86rpx;
					height: 86rpx;
					color: #333333;
					text-align: right;
				}
				input::-webkit-input-placeholder {
					color: #999999;
				}
				input::-moz-placeholder {
					/* Mozilla Firefox 19+ */
					color: #999999;
				}
				input:-moz-placeholder {
					/* Mozilla Firefox 4 to 18 */
					color: #999999;
				}
				input:-ms-input-placeholder {
					/* Internet Explorer 10-11 */
					color: #999999;
				}
			}
		}
		.input_all {
			border-bottom: 1px solid #d7d7d7;
			input {
				width: 100%;
				font-size: 32rpx;
				line-height: 86rpx;
				height: 86rpx;
				color: #333333;
				text-align: right;
			}
			input::-webkit-input-placeholder {
				color: #999999;
			}
			input::-moz-placeholder {
				/* Mozilla Firefox 19+ */
				color: #999999;
			}
			input:-moz-placeholder {
				/* Mozilla Firefox 4 to 18 */
				color: #999999;
			}
			input:-ms-input-placeholder {
				/* Internet Explorer 10-11 */
				color: #999999;
			}
		}
		.tle {
			border-bottom: 1px solid #d7d7d7;
			.text {
				font-size: 32rpx;
				line-height: 86rpx;
				color: #333333;
			}
			.add {
				width: 140rpx;
				height: 50rpx;
				line-height: 46rpx;
				border: 2rpx solid #436df3;
				margin-top: 18rpx;
				text-align: center;
				color: #436df3;
				font-size: 28rpx;
				border-radius: 24rpx;
			}
		}
		.time {
			border-bottom: 1px solid #d7d7d7;
			.title {
				width: 130rpx;
				font-size: 32rpx;
				color: #333333;
				line-height: 86rpx;
			}
			.time_box {
				.text {
					font-size: 32rpx;
					color: #333333;
					line-height: 86rpx;
					margin: 0 8rpx;
				}
				.start_time {
					position: relative;
					width: 210rpx;
					height: 42rpx;
					line-height: 42rpx;
					background-color: #f2f2f2;
					border-radius: 21rpx;
					padding: 0 20rpx 0 15rpx;
					margin-top: 22rpx;
					.chose_data {
						width: 100%;
						text-align: center;
						font-size: 26rpx;
						color: #999999;
						line-height: 42rpx;
						&.have_data {
							color: #333333;
						}
					}
					.picker {
						position: absolute;
						left: 0;
						top: 0;
						width: 100%;
						height: 100%;
						opacity: 0;
						z-index: 9;
					}
					image {
						position: absolute;
						right: 10rpx;
						top: 17rpx;
						width: 14rpx;
						height: 8rpx;
						z-index: 2;
					}
				}
			}
		}
		.textarea {
			border-bottom: 1px solid #d7d7d7;
			.title {
				display: block;
				font-size: 32rpx;
				color: #333333;
				line-height: 52rpx;
				padding: 10rpx 0;
			}
			textarea {
				font-size: 32rpx;
				line-height: 52rpx;
				color: #333333;
				padding-bottom: 8rpx;
				height: 150rpx;
				width: 100%;
			}
		}
		.btn_box {
			margin-top: 116rpx;
			.save {
				display: block;
				width: 250rpx;
				height: 70rpx;
				line-height: 70rpx;
				font-size: 32rpx;
				color: #436df3;
				text-align: center;
				border-radius: 35rpx;
				background-color: #ffffff !important;;
				border: 1px solid #436df3 !important;;
				margin-left: 36rpx;
				&:after {
					display: none;
				}
			}
			.next {
				display: block;
				width: 250rpx;
				height: 70rpx;
				line-height: 70rpx;
				font-size: 32rpx;
				color: #ffffff;
				text-align: center;
				border-radius: 35rpx;
				background-color: #436df3 !important;;
				margin-right: 36rpx;
				&:after {
					display: none;
				}
			}
		}
		.tips {
			font-size: 28rpx;
			line-height: 48rpx;
			color: #ff3434;
			margin-top: 18rpx;
		}
	}
}
.choseData {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(89, 89, 89, 0.6);
	z-index: 999;
	.chose_list {
		position: absolute;
		left: 0;
		bottom: 0;
		max-height: 600rpx;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		background-color: #ffffff;
		border-top-left-radius: 12rpx;
		border-top-right-radius: 12rpx;
		.chose_box {
			position: relative;
			font-size: 32rpx;
			line-height: 52rpx;
			padding: 27rpx 20rpx;
			text-align: center;
			color: #333333;
			&::before {
				content: '';
				position: absolute;
				left: 26rpx;
				bottom: 0;
				width: calc(100% - 26rpx - 26rpx);
				height: 2rpx;
				background-color: #e6e6e6;
				z-index: 3;
			}
			&:last-child:before {
				display: none;
			}
		}
	}
}
.pic_list{
	padding-top: 22rpx;
	.tle{
		font-size:32rpx;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height: 52rpx;
		margin-bottom: 10rpx;
	}
	.p{
		font-size:29rpx;
		font-weight:400;
		color:rgba(153,153,153,1);
		line-height:33rpx;
		margin-bottom: 22rpx;
	}
	.pic_box{
		view:nth-child(3n+3){
			margin-right: 0rpx;
		}
		.img{
			width: calc(33.33% - 25rpx);
			height: 208rpx;
			margin-right: 35rpx;
			margin-bottom: 35rpx;
			position: relative;
			.pic{
				width: 100%;
				height: 208rpx;
			}
			.close{
				position: absolute;
				right: 5rpx;
				top: 5rpx;
				width: 20rpx;
				height: 20rpx;
				opacity: 1;
				z-index: 3;
			}
		}
		.upload{
			width: calc(33.33% - 25rpx);
			height: 208rpx;
			margin-right: 35rpx;
			margin-bottom: 35rpx;
			text-align: center;
			background-color: rgba(219,219,219,0.2);
			image{
				display: inline-block;
				width: 67rpx;
				height: 67rpx;
				margin-top: 70.5rpx;
			}
		}
	}
}
</style>
