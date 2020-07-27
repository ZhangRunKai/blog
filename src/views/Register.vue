<template>
    <div align="center">
        <img src="../assets/logo.png"/>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item label="姓名">
                <el-input v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="账号">
                <el-input v-model="ruleForm.userAccount"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.userPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                console.log("value:"+value)
                console.log("rule"+this.ruleForm.userPassword)
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (this.checkPass !== this.ruleForm.userPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    userName:'',
                    userAccount:'',
                    userPassword: '',
                },
                checkPass: '',
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/user/register', this.ruleForm).then(res => {
                            const Authorization = res.headers['authorization']
                            console.log("Authorization="+Authorization)
                            const userInfo = res.data.data
                            console.log("服务器发来"+res.data)
                            console.log(res)
                            // 把数据共享出去
                            _this.$store.commit("SET_AUTH", Authorization)
                            _this.$store.commit("SET_USERINFO", userInfo)

                            // 获取
                            console.log(_this.$store.getters.getUser)
                            alert("成功1")
                            _this.route.status=true
                            _this.$router.push("/index")
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>