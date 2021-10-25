<template>

  <div class="bigbox">
<!--    表单项-->
    <!--  搜索部分-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
      <el-form-item label="部门">
        <el-select v-model="search.department" placeholder="请选择部门">
          <el-option label="教务处" value="jiaowuchu"></el-option>
          <el-option label="学生处" value="xueshengchu"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级">
        <el-select v-model="search.class" placeholder="请选择班级">
          <el-option label="19信管01" value="01"></el-option>
          <el-option label="19信管02" value="02"></el-option>
          <el-option label="19信管03" value="03"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="search.name" placeholder="请输入姓名"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="doSearch">搜 索</el-button>
        <el-button type="danger" @click="cleanSearch">清 空</el-button>
        <el-button type="warning" @click="showAddUser">批量添加</el-button>
      </el-form-item>

    </el-form>
    <!--列表项-->
    <div class="list-box margin-bottom-20">
      <el-table
              ref="multipleTable"

              :data="userList"

              @selection-change="handleSelectionChange"
              style="width: 100%">
        <el-table-column
                type="selection"
                width="55">
        </el-table-column>
        <el-table-column
                prop="id"
                label="ID"
                >
        </el-table-column>
        <el-table-column
                prop="number"
                label="学号"
                width="120"
                >
        </el-table-column>
        <el-table-column
                prop="passwd"
                label="密码"
                >
        </el-table-column>
        <el-table-column
                prop="college"
                label="学院"
                width="150">
        </el-table-column>
        <el-table-column
                prop="department"
                label="部门"
                width="150">
        </el-table-column>
        <el-table-column
                prop="class"
                label="班级"
                width="150">
        </el-table-column>
        <el-table-column
                prop="name"
                label="姓名"
                width="150">
        </el-table-column>
        <el-table-column
                prop="phone"
                label="联系方式"
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
    <!--    分页部分-->
    <br>

    <div class="page-navigation-box margin-bottom-20 clearfix">
      <el-pagination
              class="user-list-page-navigation-bar"
              background
              @current-change="onPageChange"
              :current-page="pageNavigation.currentPage"
              :page-size="pageNavigation.pageSize"
              layout="prev, pager, next"
              :total="pageNavigation.totalCount">
      </el-pagination>

    </div>
    <div class="user-list-dialog-box">

      <!-- 添加/编辑用户的dialog -->
      <el-dialog :close-on-press-escape="false"
                 :close-on-click-modal="false"
                 :title="editTitle"
                 :visible.sync="editorDialogShow"
                 width="500px">
        <el-form>
          <el-form-item label="ID" :label-width="formLabelWidth">
            <el-input v-model="form.id" ></el-input>
          </el-form-item>
          <el-form-item label="学号" :label-width="formLabelWidth">
            <el-input v-model="form.number"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.passwd" ></el-input>
          </el-form-item>
          <el-form-item label="学院" :label-width="formLabelWidth">
            <el-input v-model="form.college" ></el-input>
          </el-form-item>
          <el-form-item label="部门" :label-width="formLabelWidth">
            <el-input v-model="form.department" ></el-input>
          </el-form-item>
          <el-form-item label="班级" :label-width="formLabelWidth">
            <el-input v-model="form.class" ></el-input>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>


        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="onEditorClose">取 消</el-button>
          <el-button type="primary" @click="postUser">{{editorCommitText}}</el-button>
        </div>
      </el-dialog>


      <el-dialog
              :close-on-press-escape="false"
              :close-on-click-modal="false"
              title="删除提示"
              :visible.sync="deleteDialogShow"
              width="400px">
        <span>你确定要删除: {{deleteUserName}} 这个用户吗？</span>
        <span slot="footer" class="dialog-footer">
                    <el-button size="mini" type="danger" @click="deleteDialogShow = false">取 消</el-button>
                    <el-button size="mini" type="primary" @click="doDeleteItem">确 定</el-button>
                </span>
      </el-dialog>


    </div>

  </div>




</template>

<script>
  import * as api from "../../api/api";

  export default {
    name: "stuList",
    data(){
      return{
        formLabelWidth:'120px',
        loading: false,
        editorCommitText:'修改用户信息',
        editorDialogShow:false,
        editTitle:'编辑用户信息',
        userList:[],
        //查询信息
        search: {
          department: '',
          class: '',
          name:'',
          job:'',
          company:'',
        },
        //分页
        //分页信息
        pageNavigation: {
          currentPage: 0,
          totalCount: 0,
          pageSize: 5,
        },
        form:{
          id:'',
          number:'',
          name:'',
          passwd:'',
          college:'',
          department:'',
          phone:'',
          class:''
        },

        deleteDialogShow: false,
        deleteUserName: '',
        targetDeleteUserId: '',


      }
    },
    methods:{
      postUser(){
        if (this.form.id === ''){
          this.showWarning('id不能为空。');
          return ;
        }
        if (this.form.number === ''){
          this.showWarning('学号不能为空。');
          return ;
        }
        if (this.form.passwd === ''){
          this.showWarning('密码不能为空。');
          return ;
        }
        if (this.form.college === ''){
          this.showWarning('学院不能为空。');
          return ;
        }
        if (this.form.department === ''){
          this.showWarning('部门不能为空。');
          return ;
        }
        if (this.form.class === ''){
          this.showWarning('班级不能为空。');
          return ;
        }
        if (this.form.phone === ''){
          this.showWarning('联系方式不能为空。');
          return ;
        }
        //提交结果
        //提示结果
        // 刷新列表
        if (this.form.id === '') {
          api.addUsers(this.form).then(result => {
            this.editorDialogShow = false;
            console.log(this.form);
            if (result.code === api.success_code){
              this.$message({
                message:'添加成功',
                center:true,
                type:"success"
              });
              //刷新列表
              this.listUsers();
              //重置数据
              this.resetForm();
            } else {
              this.showWarning(result.message);
            }
          });
        } else {
          api.updateUserInfo(this.form.id,this.form).then(result =>{
            if (result.code === api.success_code){
              this.$message.success(result.message);
              this.editorDialogShow = false;
              this.listUsers();
              this.resetForm();
            }else {
              this.$message.error(result.message);
            }
          });
        }

      },
      showWarning(msg) {
        this.$message({
          message: msg,
          type: 'warning',
          center: true
        })
      },

      doDeleteItem() {
        //去删除用户
        api.deleteUserById(this.targetDeleteUserId).then(result => {
          if (result.code === api.success_code) {
            this.deleteDialogShow = false;
            //处理结果
            this.$message.success(result.message);
            this.listUsers();
          } else {
            this.$message.error(result.message);
          }
        })
      },
      onPageChange(page) {
        this.pageNavigation.currentPage = page;
        this.listUsers()
      },
      showAddUser() {
        this.editTitle = '添加用户';
        this.editorCommitText = '添 加';
        this.editorDialogShow = true;
      },
      doSearch(){
        api.doUserSearch(this.search.department, this.search.class,this.search.name,this.search.job,this.search.company).then(result => {
          this.handleUserListResult(result);
        });
      },
      cleanSearch() {
        this.search.department = '';
        this.search.class = '';
        this.search.name = '';
        this.search.job = '';
        this.search.company = '';

        this.listUsers();
      },
      //获取用户列表
      listUsers() {
        api.listUsers(this.pageNavigation.currentPage, this.pageNavigation.pageSize).then(result => {
          this.handleUserListResult(result);
          console.log(result);
        });
        // this.loading = true;
      },
      handleUserListResult(result) {
        if (result.code === api.success_code) {
          this.userList = result.data.content;
          this.pageNavigation.currentPage = result.data.number + 1;
          this.pageNavigation.totalCount = result.data.totalElements;
          this.pageNavigation.pageSize = result.data.size;
        } else {
          this.$message.error(result.message);
        }
        //console.log(this.pageNavigation);
        this.loading = false;
      },
      onEditorClose(){
        this.editorDialogShow = false;
        this.resetForm();
      },
      resetForm(){
        this.form.id = '';
        this.form.name = '';
        this.form.passwd = '';
        this.form.college = '';
        this.form.department = '';
        this.form.phone = '';
        this.form.number='';
        this.form.class=''
      },
      //添加、修改
      edit(item){
        this.form.number = item.number;
        this.form.name = item.name;
        this.form.passwd = item.passwd;
        this.form.college = item.college;
        this.form.department = item.department;
        this.form.phone = item.phone;
        this.form.class=item.class;
        this.form.id=item.id

        this.editorDialogShow = true;
        this.editorCommitText = '修改用户信息';
        this.editTitle = '编辑用户信息';

      },
      deleteItem(item) {
        this.targetDeleteUserId = item.id;
        this.deleteUserName = item.name;
        this.deleteDialogShow = true;
      },
    }
  }
</script>

<style scoped>
.bigbox{
  margin: 20px;
}
</style>
