<template>
	<div class="user-list-box">
		<div style="margin: 10px;display: flex;">
			<el-button @click="exportExcel">导出选中</el-button>
		</div>

		<!--搜索部分 按照班级查询 -->
		<div class="user-search-pat">
			<el-form :inline="true" size="mini">
				<el-form-item label="班级">
					<el-select v-model="value" filterable placeholder="请选择" >
						<el-option v-for="(item,index) in options" :key="index" :label="item" :value="item">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="doSelectionSearch">搜 索</el-button>
					<el-button type="danger" @click="cleanSearch">清空/搜索全部</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!--显示内容-->
		<div class="list-box margin-bottom-20">
			<el-table ref="multipleTable" v-loading="loading" :data="stuSelectionList" tooltip-effect="dark" @selection-change="handleSelectionChange" style="width: 100%">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<!-- <el-table-column fixed prop="id" label="ID" width="100">
				</el-table-column> -->
				<el-table-column fixed prop="s_number" label="学号" width="200">
				</el-table-column>

				<el-table-column prop="s_college" label="学院" width="200">
				</el-table-column>
				<el-table-column prop="s_department" label="部门" width="200">
				</el-table-column>
				<el-table-column prop="s_class" label="班级" width="200">
				</el-table-column>
				<el-table-column prop="s_name" label="姓名" width="180">
				</el-table-column>
				<el-table-column prop="s_choice" label="已选岗位数" width="100">
				</el-table-column>
			</el-table>
		</div>
		<div class="page-navigation-box margin-bottom-20 clearfix">
			<el-pagination class="user-list-page-navigation-bar" background @current-change="onPageChange" :current-page="pageNavigation.currentPage" :page-size="pageNavigation.pageSize" layout="prev, pager, next" :total="pageNavigation.totalCount">
			</el-pagination>
		</div>

	</div>
</template>
<script>
	import * as api from '../../api/api.js';


	export default {
		data() {
			return {
				//加载
				loading: false,

				//完整学生选择岗位列表
				stuSelectionList: [],
				//选中数据
				multipleSelection: [],
				//搜索
				options: [],
				value:'全部班级',

				//  page/size
				pageNavigation: {
					currentPage: 1,
					totalCount: 0,
					pageSize: 100000,
				},

			}
		},
		methods: {

			//导出的方法
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			//导出的方法
			exportExcel() {
				require.ensure([], () => {
					const {
						export_json_to_excel
					} = require('../../vendor/Export2Excel'); //注意这个Export2Excel路径
					const tHeader = ['学号', '学院', '部门', '班级', '姓名','已选岗位数']; // 上面设置Excel的表格第一行的标题
					const filterVal = ['snumber', 'scollege', 'sdepartment', 'sclass','sname', 'schoice']; // 上面的index、nickName、name是tableData里对象的属性key值
					const list = this.multipleSelection; //把要导出的数据tableData存到list
					const data = this.formatJson(filterVal, list);
					export_json_to_excel(tHeader, data, '列表excel'); //最后一个是表名字
				})
			},
			formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => v[j]))
			},


			onPageChange(page) {
				this.pageNavigation.currentPage = page+1;
				this.listStuSelections();
			},
			doSelectionSearch() {
				if (this.value == '全部班级') {
					this.listStuSelections();
				} else {
					api.doSelectionSearch(this.pageNavigation.currentPage,this.pageNavigation.pageSize, this.value).then(result => {

						this.stuSelectionList = result.data;
						// console.log(this.stuSelectionList);

					});
				}

			},
			cleanSearch() {
				this.value = '全部班级';
				this.listStuSelections();
			},

			//获取学生已选岗位数统计列表
			listStuSelections() {
				api.listStuSelection().then(result => {
					if (result.code === api.success_code) {
						this.stuSelectionList = result.data;
						// console.log(this.stuSelectionList);
					} else {
						// console.log('');
					}
				});
			},
			listClass(){
				api.listClass().then(result =>{
					this.options = result.data
					// console.log(this.options)
				})
			}
		},
		mounted() {
			this.listStuSelections();
			this.listClass();
		}
	};
</script>
<style>
	.user-list-box {
		padding: 20px;
	}

	.reset-tips-text {
		margin-left: 15px;
		font-size: 16px;
		font-weight: 600;
		margin-bottom: 20px;
	}

	.user-list-page-navigation-bar {
		margin-right: 50px;
		float: right;
	}
</style>
