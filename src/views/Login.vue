<template>
    <div class="login">
        <div>
        <img class="login" src="../assets/logo.png"/>
        </div>
        <div>
        <el-form :model="user" :rules="rules" ref="user" label-width="50px" class="demo-ruleForm">
            <el-form-item label="账号" prop="account">
                <el-input v-model="user.userAccount"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="user.userPassword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('user')">登陆</el-button>
                <el-button @click="resetForm('user')">重置</el-button>
                <el-button @click="Register()">注册</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>

<script>
    name: "Login"
    export default {
        data() {
            return {
                user: {
                    userName : '',
                    userAccount : '',
                    userPassword : '',
                    roleId : ''
                },
                rules: {
                    userAccount: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                    ],
                    userPassword: [
                        { required:true, message : '请输入密码', trigger:'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this
                        this.$axios.post('/user/login', this.user).then(res => {
                            const Authorization = res.headers['authorization']
                            console.log("Authorization="+Authorization)
                            const userInfo = res.data.data
                            console.log("服务器发来"+res.data)
                            console.log(res)
                            // 把数据共享出去
                            _this.$store.commit("SET_AUTH", Authorization)
                            _this.$store.commit("SET_USERINFO", userInfo)

                            _this.$router.push("/")
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(user) {
                this.$refs[user].resetForm();
            },
            Register(){
                this.$router.push("/register")
            }
        }
    }
</script>

<style scoped>

    .login{
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
    }
    .demo-ruleForm{
        border-radius: 4px;
        width: 40%;
        margin-top: 5%;
        margin-left: 30%;
    }
</style>