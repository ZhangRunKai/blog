<template>
    <div>

        <div class="m-content">

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>

                <el-form-item label="摘要" prop="description">
                    <el-input type="textarea" v-model="ruleForm.description"></el-input>
                </el-form-item>

                <el-form-item label="内容" prop="content">
                    <mavon-editor  ref=md @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="ruleForm.content"></mavon-editor>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>

        </div>



    </div>
</template>

<script>
    export default {
        name: "BlogEdit.vue",
        data() {
            return {
                ruleForm: {
                    blogId: '',
                    title: '',
                    description: '',
                    content: '',
                    flag:false,
                    userId:''
                },
                rules: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' },
                        { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
                    ],
                    description: [
                        { required: true, message: '请输入摘要', trigger: 'blur' }
                    ],
                    content: [
                        { trequired: true, message: '请输入内容', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {

            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this
                        if(_this.ruleForm.flag){
                            this.$axios.post('/blog/update', this.ruleForm, {
                            }).then(res => {
                                console.log(res)
                                _this.$alert('操作成功', '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$router.push("/blog")
                                    }
                                });

                            })
                            this.$router.push("/blog")
                        }
                        else{
                            this.$axios.post('/blog/save', this.ruleForm, {
                            }).then(res => {
                                console.log(res)
                                _this.$alert('操作成功', '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$router.push("/blog")
                                    }
                                });

                            })
                            this.$router.push("/blog")
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            // 绑定@imgAdd event
            $imgAdd(pos, $file){
                // 第一步.将图片上传到服务器.
                var formdata = new FormData();
                formdata.append('image', $file);
                axios({
                    url: 'server url',
                    method: 'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then((url) => {
                    // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                    // $vm.$img2Url 详情见本页末尾
                    $vm.$img2Url(pos, url);
                })}
        },
        created() {
            const blogId = this.$route.params.blogId
            console.log(blogId)
            const _this = this
            if(blogId) {
                this.$axios.get('/blog/findBlogId?blogId=' + blogId).then(res => {
                    const blog = res.data.data
                    _this.ruleForm.blogId = blog.blogId
                    _this.ruleForm.title = blog.title
                    _this.ruleForm.description = blog.description
                    _this.ruleForm.content = blog.content
                    _this.ruleForm.userId = blog.userId
                    _this.ruleForm.flag=true
                })
            }

        }
    }
</script>

<style scoped>
    .m-content {
        text-align: center;
    }
</style>