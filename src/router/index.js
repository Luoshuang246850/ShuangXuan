import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter);
/*登录页面*/
const login = () => import("@/page/login/login");

// 岗位管理
const job = () => import("@/page/job/job")
//公司管理
const company = () => import("@/page/company/company")
//学生管理
const studentList = () => import("@/page/student/stuList")
const studentJob = () => import("@/page/student/stujob")
const studentSelection = () => import("@/page/student/stuSelection")


/*首页*/
const index = () => import("@/page/dashboard/index");
/*设置*/
const info = () => import("@/page/settings/info");

/*佈局*/
const baseView = () => import("@/layout/base-view");
const rightView = () => import("@/layout/right-content");
//陆地游泳器==》陆游器
export const routes = [{
		path: '',
		component: baseView,
		redirect: '/student/stujob',
		children: [{
				path: "/index",
				name: '首页',
				icon: 'el-icon-s-home',
				hidden: false,
				component: index
			},
			{
				path: '/job',
				name: '岗位管理',
				hidden: false,
				icon: 'el-icon-monitor',
				component: rightView,
				children: [{
					path: 'job',
					hidden: false,
					name: '岗位列表',
					icon: 'el-icon-monitor',
					component: job,
				}]
			},
			{
				path: '/company',
				name: '公司信息',
				hidden: false,
				icon: 'el-icon-office-building',
				component: rightView,
				children: [{
					path: 'job',
					hidden: false,
					name: '公司列表',
					icon: 'el-icon-office-building',
					component: company,
				}]
			},
			{
				path: '/student',
				name: '学生管理',
				hidden: false,
				icon: 'el-icon-user',
				component: rightView,
				children: [{
					path: 'studentList',
					hidden: false,
					name: '学生列表',
					icon: 'el-icon-user',
					component: studentList,
				},{
					path: 'stujob',
					hidden: false,
					name: '学生——岗位',
					icon: 'el-icon-user-solid',
					component: studentJob,
				},{
					path: 'stuSelection',
					hidden: false,
					name: '学生已选岗位数统计',
					icon: 'el-icon-s-order',
					component: studentSelection,
				},
				]
			},
			{
				path: '/settings',
				name: '设置',
				icon: 'el-icon-setting',
				hidden: false,
				component: rightView,
				children: [

					{
						name: '用户信息',
						path: 'info',
						hidden: false,
						icon: 'el-icon-warning-outline',
						component: info
					},

				]
			}
		]
	},
	{
		path: '/login',
		component: login
	}
];


const router = new VueRouter({
	routes // (缩写) 相当于 routes: routes
});

export default router;
