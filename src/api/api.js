import http from './http';
// import col from "element-ui/packages/col/src/col";

<<<<<<< HEAD
var value = window.localStorage.getItem('value');
export const success_code = 20000;
export const failed_code = 40000;

// 公司信息获取
export const listCompanies = (page,size) => {
	console.log(value);
	return http.requestGet('/back/findAllCompany/'+size+'/'+page);
};
//获取公司详情
export const getCompanyDetail = () => {
	return http.requestGet()
}

//添加公司
export const addCompany = () => {
	return http.requestPost('');
}
//搜索公司
export const doCompanySearch = () => {
	return http.requestGet('');
}
//删除公司
export const deleteCompanyById = () => {
	return http.requestDelete('');
}
//更新公司信息
export const updateCompanyInfo = () => {
	return http.requestPut('');
}

// 岗位信息获取
export const listJobs = () => {
	return http.requestGet('');
};
//获取岗位详情
export const getjobDetail = () => {
	return http.requestGet()
}
//添加岗位
export const addJob = () => {
	return http.requestPost('');
}
//岗位名搜索
export const doJobSearch = () => {
	return http.requestGet('');
}
//删除岗位
export const deleteJobById = () => {
	return http.requestDelete('');
}
//更新岗位信息
export const updateJobInfo = () => {
	return http.requestPut('');
}

=======

export const success_code = 20000;
export const failed_code = 40000;

// 岗位信息获取
export const listCompanies = () => {
	return http.requestGet('/back/getCompany');
};
export const addCompany = () => {
	return http.requestPost('');
}
>>>>>>> 9c64dd2a89f38b9b94a98020bd26cdd25cd086ca


// 学生——岗位选择信息获取
export const listStuJob = () => {
	return http.requestGet('/back/findStudentInfo');
};
// （学生——岗位）按班级进行搜索
export const doSearch = (x) => {
	return http.requestGet('/back/findByClass?sClass='+x);
};

//学生已选择岗位数统计列表
export const listStuSelection = () =>{
	return http.requestGet('/back/findStudents/')
}
//查询所有班级
export const listClass = () =>{
	return http.requestGet('/back/findAllClass')
}
//按班级进行查询
export const doSelectionSearch = (page,size,c) =>{
	return http.requestGet('/back/findStudentsByClass/'+size+'/'+page+'/'+c)
}


<<<<<<< HEAD
//解析token
=======
// //解析token
>>>>>>> 9c64dd2a89f38b9b94a98020bd26cdd25cd086ca
// export const checkToken = () => {
//     return http.requestGet('/user/utils/check_token');
// };

<<<<<<< HEAD
//登录
export const doLogin = (s) => {
    return http.requestPost('/admin',s);
};
export const judgeCaptcha = (verCode) => {
	return http.requestPost('/judgeCaptcha',verCode)
}

=======
// //登录
// export const doLogin = (verifyCode, sobUser) => {
//     return http.requestPost('/user/account/login/' + verifyCode + '/?from=p_', sobUser);
// };
>>>>>>> 9c64dd2a89f38b9b94a98020bd26cdd25cd086ca


// export const doLogout = () => {
//     return http.requestGet('/user/account/logout');
// };






