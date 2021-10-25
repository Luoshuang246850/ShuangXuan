<template>
    <div class="company-list-box">
        <div style="margin: 10px"><el-button @click="exportExcel">导出选中</el-button></div>
        <!-- 导入Excel -->
        <!--      <a href="javascript:;" class="file">导入表格-->
        <!--        <input id="upload" type="file" @change="importfxx(this)"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />-->
        <!--      </a>-->

        <!--搜索部分        添加-->
        <div class="Company-search-pat">
            <el-form :inline="true" size="mini">
                <el-form-item label="公司名称">
                    <el-input v-model="search.number" placeholder="请输入公司名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="doSearch">搜 索</el-button>
                    <el-button type="danger" @click="cleanSearch">清 空</el-button>
                    <el-button type="primary" @click="showAddCompany">添加用户</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--显示内容-->
        <div class="list-box margin-bottom-20">
            <el-table
                    ref="multipleTable"
                    v-loading="loading"
                    :data="companyList"
                    tooltip-effect="dark"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        fixed
                        prop="id"
                        label="ID"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="number"
                        label="公司名称"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="公司人数"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="college"
                        label="公司性质"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="department"
                        label="公司简介"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="passwd"
                        label="公司地址"
                        width="150">
                </el-table-column>

                <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini"
                                   @click="deleteItem(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page-navigation-box margin-bottom-20 clearfix">
            <el-pagination
                    class="company-list-page-navigation-bar"
                    background
                    @current-change="onPageChange"
                    :current-page="pageNavigation.currentPage"
                    :page-size="pageNavigation.pageSize"
                    layout="prev, pager, next"
                    :total="pageNavigation.totalCount">
            </el-pagination>
        </div>
        <div class="Company-list-dialog-box">

            <!-- 添加/编辑用户的dialog -->
            <el-dialog :close-on-press-escape="false"
                       :close-on-click-modal="false"
                       :title="editTitle"
                       :visible.sync="editorDialogShow"
                       width="500px">
                <el-form>
                    <el-form-item label="公司名称" :label-width="formLabelWidth">
                        <el-input v-model="form.number"></el-input>
                    </el-form-item>
                    <el-form-item label="公司人数" :label-width="formLabelWidth">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="公司性质" :label-width="formLabelWidth">
                        <el-input v-model="form.passwd" ></el-input>
                    </el-form-item>
                    <el-form-item label="公司简介" :label-width="formLabelWidth">
                        <el-input v-model="form.college" ></el-input>
                    </el-form-item>
                    <el-form-item label="公司地址" :label-width="formLabelWidth">
                        <el-input v-model="form.department" ></el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="onEditorClose">取 消</el-button>
                    <el-button type="primary" @click="postCompany">{{editorCommitText}}</el-button>
                </div>
            </el-dialog>


            <el-dialog
                    :close-on-press-escape="false"
                    :close-on-click-modal="false"
                    title="删除提示"
                    :visible.sync="deleteDialogShow"
                    width="400px">
                <span>你确定要删除: {{deleteCompanyName}} 这个用户吗？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button size="mini" type="danger" @click="deleteDialogShow = false">取 消</el-button>
                    <el-button size="mini" type="primary" @click="doDeleteItem">确 定</el-button>
                </span>
            </el-dialog>

        </div>
    </div>
</template>
<script>
    // import {hex_md5} from "../../utils/md5";
    import * as api from '../../api/api';
    import * as dateUtils from '../../utils/date';

    export default {
        data() {
            return {
                //加载
                loading: false,
                editorCommitText:'修改用户信息',
                editorDialogShow:false,
                editTitle:'编辑用户信息',

                //完整用户列表
                companyList: [],
                //选中用户数据
                multipleSelection: [],
                //搜索
                search: {
                    number:'',
                    name:'',
                    college:'',
                    department:''
                },
                //  page/size
                pageNavigation: {
                    currentPage: 0,
                    totalCount: 0,
                    pageSize: 5,
                },
                //dialog宽度
                formLabelWidth:'120px',
                //添加编辑数据
                form:{
                    id:'',
                    number:'',
                    name:'',
                    passwd:'',
                    college:'',
                    department:'',
                    phone:''
                },
                deleteDialogShow: false,
                deleteCompanyName: '',
                targetDeleteCompanyId: '',
            }
        },
        methods: {

            //导入
            // importFile(obj){
            //   let _this = this;
            //   let inputDom = this.$refs.inputer;
            //   // 通过DOM取文件数据
            //   this.file = event.currentTarget.files[0];
            //   var rABS = false; //是否将文件读取为二进制字符串
            //   var f = this.file;
            //   var reader = new FileReader();
            //   //if (!FileReader.prototype.readAsBinaryString) {
            //   FileReader.prototype.readAsBinaryString = function(f) {
            //     var binary = "";
            //     var rABS = false; //是否将文件读取为二进制字符串
            //     var pt = this;
            //     var wb; //读取完成的数据
            //     var outdata;
            //     var reader = new FileReader();
            //     reader.onload = function(e) {
            //       var bytes = new Uint8Array(reader.result);
            //       var length = bytes.byteLength;
            //       for(var i = 0; i < length; i++) {
            //         binary += String.fromCharCode(bytes[i]);
            //       }
            //       var XLSX = require('xlsx');
            //       if(rABS) {
            //         wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
            //           type: 'base64'
            //         });
            //       } else {
            //         wb = XLSX.read(binary, {
            //           type: 'binary'
            //         });
            //       }
            //       outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是你想要的东西
            //       this.da = [...outdata]
            //       let arr = []
            //       this.da.map(v => {
            //         let obj = {}
            //         obj.id = v.id
            //         obj.status = v.status
            //         arr.push(obj)
            //       })
            //       console.log(arr)
            //       let para = {
            //         //withList: JSON.stringify(this.da)
            //         withList: arr
            //       }
            //       _this.$message({
            //         message: '请耐心等待导入成功',
            //         type: 'success'
            //       });
            //       withImport(para).then(res => {
            //         window.location.reload()
            //       })
            //
            //     }
            //     reader.readAsArrayBuffer(f);
            //   }
            //   if(rABS) {
            //     reader.readAsArrayBuffer(f);
            //   } else {
            //     reader.readAsBinaryString(f);
            //   }
            // },

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
                    const { export_json_to_excel } = require('../../vendor/Export2Excel');//注意这个Export2Excel路径
                    const tHeader = ['工号', '姓名','密码', '学院','部门','联系方式'];   // 上面设置Excel的表格第一行的标题
                    const filterVal = ['number', 'name', 'passwd','college','department','phone']; // 上面的index、nickName、name是tableData里对象的属性key值
                    const list = this.multipleSelection;  //把要导出的数据tableData存到list
                    const data = this.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, '列表excel');//最后一个是表名字
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            //重置密码

            deleteItem(item) {
                this.targetDeleteCompanyId = item.id;
                this.deleteCompanyName = item.name;
                this.deleteDialogShow = true;
            },
            doDeleteItem() {
                //去删除用户
                api.deleteCompanyById(this.targetDeleteCompanyId).then(result => {
                    if (result.code === api.success_code) {
                        this.deleteDialogShow = false;
                        //处理结果
                        this.$message.success(result.message);
                        this.listCompanies();
                    } else {
                        this.$message.error(result.message);
                    }
                })
            },
            onPageChange(page) {
                this.pageNavigation.currentPage = page;
                this.listCompanies()
            },
            doSearch() {
                api.doCompanySearch(this.search.number, this.search.name,this.search.college,this.search.department).then(result => {
                    this.handleCompanyListResult(result);
                });
            },
            cleanSearch() {
                this.search.number = '';
                this.search.name = '';
                this.search.college = '';
                this.search.department = '';
                this.listCompanies();
            },
            formatDate(dateStr) {
                let date = new Date(dateStr);
                return dateUtils.formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            },


            //获取用户列表
            listCompanies() {
                api.listCompanies(this.pageNavigation.currentPage, this.pageNavigation.pageSize).then(result => {
                    this.handleCompanyListResult(result);
                    console.log(result);
                });
                // this.loading = true;
            },
            handleCompanyListResult(result) {
                if (result.code === api.success_code) {
                    this.companyList = result.data.content;
                    this.pageNavigation.currentPage = result.data.number + 1;
                    this.pageNavigation.totalCount = result.data.totalElements;
                    this.pageNavigation.pageSize = result.data.size;
                } else {
                    this.$message.error(result.message);
                }
                //console.log(this.pageNavigation);
                this.loading = false;
            },

            showAddCompany() {
                this.editTitle = '添加用户';
                this.editorCommitText = '添 加';
                this.editorDialogShow = true;
            },
            onEditorClose(){
                this.editorDialogShow = false;
                this.resetForm();
            },
            //添加、修改
            edit(item){
                this.form.number = item.number;
                this.form.name = item.name;
                this.form.passwd = item.passwd;
                this.form.college = item.college;
                this.form.department = item.department;
                this.phone = item.phone;

                this.editorDialogShow = true;
                this.editorCommitText = '修改用户信息';
                this.editTitle = '编辑用户信息';

            },
            postCompany(){
                //检查内容
                if (this.form.number === ''){
                    this.showWarning('工号不能为空。');
                    return ;
                }
                if (this.form.name === ''){
                    this.showWarning('工号不能为空。');
                    return ;
                }
                if (this.form.passwd === ''){
                    this.showWarning('密码不能为空。');
                    return ;
                }
                //提交结果
                //提示结果
                // 刷新列表
                if (this.form.id === '') {
                    api.addCompany(this.form).then(result => {
                        this.editorDialogShow = false;
                        console.log(this.form);
                        if (result.code === api.success_code){
                            this.$message({
                                message:'添加成功',
                                center:true,
                                type:"success"
                            });
                            //刷新列表
                            this.listCompanies();
                            //重置数据
                            this.resetForm();
                        } else {
                            this.showWarning(result.message);
                        }
                    });
                } else {
                    api.updateCompanyInfo(this.form.id,this.form).then(result =>{
                        if (result.code === api.success_code){
                            this.$message.success(result.message);
                            this.editorDialogShow = false;
                            this.listCompanies();
                            this.resetForm();
                        }else {
                            this.$message.error(result.message);
                        }
                    });
                }

            },

            //重置数据
            resetForm(){
                this.form.id = '';
                this.form.name = '';
                this.form.passwd = '';
                this.form.college = '';
                this.form.department = '';
                this.form.phone = '';
            },
            showWarning(msg) {
                this.$message({
                    message: msg,
                    type: 'warning',
                    center: true
                })
            }
        },
        mounted() {
            //console.log(hex_md5('666666'));
            this.listCompanies();
        }
    };
</script>
<style>
    .company-list-box {
        padding: 20px;
    }

    .reset-tips-text {
        margin-left: 15px;
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 20px;
    }

    .company-list-page-navigation-bar {
        margin-right: 50px;
        float: right;
    }
</style>
