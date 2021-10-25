<template>
	<div class="user-list-box">
		<div style="margin: 10px;display: flex;">
			<el-button @click="exportExcel">导出选中</el-button>
			
			<!-- 导入部分 -->
			<el-upload action="/上传文件的接口" :on-change="onChange" :auto-upload="false" :show-file-list="false" accept=".xls, .xlsx">
				<el-button type="warning" icon="el-icon-folder-add" style="margin-left: 10px;">批量导入</el-button>
			</el-upload>
		</div>

		<!--搜索部分 按照班级查询 -->
		<div class="user-search-pat">
			<el-form :inline="true" size="mini">
				<el-form-item label="班级">
					<el-input v-model="search.class" placeholder="请输入班级"></el-input>
				</el-form-item>
				
				<el-form-item>
					<el-button type="primary" @click="doSearchInfo">搜 索</el-button>
					<el-button type="danger" @click="cleanSearch">清 空</el-button>
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
				<el-table-column fixed prop="0" label="学号" width="120">
				</el-table-column>
				
				<el-table-column prop="1" label="学院" width="150">
				</el-table-column>
				<el-table-column prop="2" label="部门" width="150">
				</el-table-column>
				<el-table-column prop="3" label="班级" width="150">
				</el-table-column>
				<el-table-column prop="4" label="姓名" width="100">
				</el-table-column>
				<el-table-column prop="5" label="联系方式" width="150">
				</el-table-column>
				<el-table-column prop="6" label="公司名称" width="250">
				</el-table-column>
				<el-table-column prop="7" label="岗位名称" width="180">
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
				search: {
					class:''
				},
				//  page/size
				pageNavigation: {
					currentPage: 0,
					totalCount: 0,
					pageSize: 5,
				},
				
				//导入设置
				fileData: '',
				studentlist: []
			}
		},
		methods: {

			// // ----------以下为导入Excel数据功能--------------
			// // 文件选择回调
			onChange(file, fileList) {
				console.log(fileList);
				this.fileData = file; // 保存当前选择文件
				this.readExcel(); // 调用读取数据的方法
			},
			// 读取数据
			readExcel() {

				let that = this;
				const files = that.fileData;

				if (!files) {
					//如果没有文件
					return false;
				} else if (!/.(xls|xlsx)$/.test(files.name.toLowerCase())) {
					this.$message.error("上传格式不正确，请上传xls或者xlsx格式");
					return false;
				}

				const fileReader = new FileReader();
				fileReader.onload = ev => {
					try {
						const data = ev.target.result;
						const workbook = this.XLSX.read(data, {
							type: "binary"
						});
						// console.log(workbook.SheetNames);
						if (workbook.SheetNames.length >= 1) {
							this.$message({
								message: "导入数据表格成功",
								showClose: true,
								type: "success"
							});
						}
						const wsname = workbook.SheetNames[0]; //取第一张表
						const ws = this.XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容
						console.log(ws);

						that.outputs = []; //清空接收数据
						for (var i = 0; i < ws.length; i++) {
							var sheetData = {
								// 键名为绑定 el 表格的关键字，值则是 ws[i][对应表头名]
								number: ws[i]["学号"],
								college: ws[i]["学院"],
								department: ws[i]["部门"],
								class: ws[i]["班级"],
								name: ws[i]["姓名"],
								phone: ws[i]["联系方式"],
								company: ws[i]["公司名称"],
								job: ws[i]["岗位名称"],
							};
							that.studentlist.unshift(sheetData);
						}
						console.log(that.studentlist);
						this.$refs.upload.value = "";
					} catch (e) {
						return false;
					}
				};
				// 如果为原生 input 则应是 files[0]
				fileReader.readAsBinaryString(files.raw);
			},

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
					const tHeader = ['学号', '学院', '部门', '班级', '姓名', '联系方式', '公司名称', '岗位名称']; // 上面设置Excel的表格第一行的标题
					const filterVal = ['0', '1', '2', '3', '4', '5', '6', '7']; // 上面的index、nickName、name是tableData里对象的属性key值
					const list = this.multipleSelection; //把要导出的数据tableData存到list
					const data = this.formatJson(filterVal, list);
					export_json_to_excel(tHeader, data, '列表excel'); //最后一个是表名字
				})
			},
			formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => v[j]))
			},


			onPageChange(page) {
				this.pageNavigation.currentPage = page;
				this.listStuJobs();
			},
			doSearchInfo() {
				if (this.search.class==''){
					this.listStuJobs();
				}else{
					api.doSearch(this.search.class).then(result => {
						// this.handleUserListResult(result);
						this.stuSelectionList = result.data;
						console.log(this.stuSelectionList);
						
					});
				}
				
			},
			cleanSearch() {
				this.search.class = '';
				this.listStuJobs();
			},

			//获取用户列表
			listStuJobs() {
				api.listStuJob().then(result => {
					if (result.code === api.success_code){
						this.stuSelectionList = result.data;
						console.log(this.stuSelectionList);
					}else{
						console.log('');
					}
				});
			},
		},
		mounted() {
			this.listStuJobs();
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
