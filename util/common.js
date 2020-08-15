// const url = "https://ystwx.yantai.gov.cn/jntestapi"
const url = "https://ystwx.yantai.gov.cn/jneduapi2"
const port = {
	recruitmentInfo:url+"/edu/recruitment/recruitmentInfo",//获取招聘列表
	recruitmentById:url+"/edu/recruitment/recruitmentById",//获取招聘信息
	saveTeacherInfo:url+"/edu/recruitment/saveTeacherInfo",//个人资料保存
	saveSocialResume:url+"/edu/recruitment/saveSocialResume",//社会简历保存
	applyTeacher:url+"/edu/recruitment/applyTeacher",//正式报名
	startApplyOrQuery:url+"/edu/recruitment/startApplyOrQuery",//获取报名信息
	queryRecruitmentSchool:url+"/edu/recruitment/queryRecruitmentSchool",//获取学校信息
	queryRecruitmentJob:url+"/edu/recruitment/queryRecruitmentJob",//获取岗位信息
	avatar:url+"/edu/recruitment/avatar",//上传图片
	infoByToken:url+"/edu/interface/infoByToken",//获取用户信息
}
export default {  
  port
}