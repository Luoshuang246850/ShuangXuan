import http from './http';
// import col from "element-ui/packages/col/src/col";


export const success_code = 20000;
export const failed_code = 40000;

// 岗位信息获取
export const listCompanies = () => {
	return http.requestGet('/back/getCompany');
};
export const addCompany = () => {
	return http.requestPost('');
}


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


// //解析token
// export const checkToken = () => {
//     return http.requestGet('/user/utils/check_token');
// };

// //登录
// export const doLogin = (verifyCode, sobUser) => {
//     return http.requestPost('/user/account/login/' + verifyCode + '/?from=p_', sobUser);
// };


// export const doLogout = () => {
//     return http.requestGet('/user/account/logout');
// };






