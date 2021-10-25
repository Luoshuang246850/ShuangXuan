<template>
    <div class="header-part clearfix">
        <!--显示内容-->
        <div class="header-left-box float-left">
            <div class="header-logo">双选会管理中心</div>
        </div>
        <div class="header-right-box float-right">
            <div class="header-user-info clearfix">
                <div class="header-user-avatar float-left">
                    <img style="object-fit: cover"
                         src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201603%2F28%2F20160328144226_5PVUu.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636701511&t=8ed18f92df0aad79f45972d2511d4d9f">
                </div>
                <div class="header-user-username float-left">
                    <el-dropdown @command="handlerCommand">
                      <span class="el-dropdown-link">
                        {{userName}} <i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="userInfo">用户信息</el-dropdown-item>
                            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import * as api from '../api/api';

    export default {
        data() {
            return {
                userName: '',
                
            }
        },
        methods: {
            handlerCommand(command) {
                if (command === 'userInfo') {
                    this.$router.push({
                        path: '/settings/info'
                    })
                } else if (command === 'logout') {
                    api.doLogout().then(result => {
                        if (result.code === api.success_code) {
                            //跳转到登录页面
                            this.$router.push({
                                path: '/login'
                            })
                        } else {
                            this.$message.error(result.message);
                        }
                    });
                }
            }
        },
        mounted() {
            this.userName = window.localStorage.getItem('userName');
            
        }
    }
</script>
<style>

    .header-user-info {
        margin-right: 30px;
    }

    .header-user-username .el-dropdown-link {
        font-size: 14px;
        cursor: pointer;
        font-weight: 600;
        color: #fff;
        margin-left: 10px;
    }

    .header-user-avatar img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        vertical-align: middle;
    }

    .header-logo {
        color: #fff;
        font-size: 20px;
        font-weight: 600;
    }
</style>
