<template>
    <div id="header">
        <el-timeline>
            <el-button type="primary" @click="trunToBlogEdit" round>新建</el-button>
            <el-timeline-item :timestamp="blog.created" placement="top" v-for="blog in blogs">
                <el-card>
                    <h4>
                        <router-link :to="{name: 'BlogDetail', params: {blogId: blog.blogId}}">
                            {{blog.title}}
                        </router-link>
                    </h4>
                    <p>{{blog.description}}</p>
                </el-card>
            </el-timeline-item>

        </el-timeline>

        <el-pagination class="mpage"
                       align="center"
                       background
                       layout="prev, pager, next"
                       :current-page="currentPage"
                       :page-size="pageSize"
                       :total="total"
                       @current-change=page>
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "Blogs.vue",
        data() {
            return {
                blogs: {},
                currentPage: 1,
                total: 0,
                pageSize: 5

            }
        },
        methods: {
            handleCommand(command) {
                this.$message('click on item ' + command);
            },
            trunToBlogEdit(){
                this.$router.push("/blogEdit")
            },
            page(currentPage) {
                const _this = this
                const userId=this.$store.getters.getUser.userId
                _this.$axios.get("/blog/findAllByUserId?userId="+userId+"&currentPage="+currentPage).then(res => {
                    console.log(res)
                    _this.blogs = res.data.data.data
                    _this.currentPage = res.data.data.currentPage
                    _this.total = res.data.data.total
                    console.log(":::"+res.data.message)
                })
            }
        },
        created() {
            if(this.$store.getters.getUser.userId){
                this.page(1)
            }
            else{
                this.$message({
                    message: '请先登陆',
                    type: 'warning'
                });
                this.$router.push("/login")
            }
        }
    }
</script>
<style scoped>
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .header {
        margin-left: 30vw;
    }
</style>