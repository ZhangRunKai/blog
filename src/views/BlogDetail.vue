<template>
    <div class="m-container">
        <div class="mblog">
            <h1>{{ blog.title }}</h1>
            <br/>
            <el-link icon="el-icon-edit" v-if="ownBlog"><router-link :to="{name: 'BlogEdit', params: {blogId: blog.blogId}}">编辑</router-link></el-link>
            <el-divider></el-divider>
            <div class="content markdown-body" v-html="blog.content"></div>
        </div>
    </div>
</template>
<script>
    import 'github-markdown-css/github-markdown.css' // 然后添加样式markdown-body
    export default {
        name: "BlogDetail",
        data() {
            return {
                blog: {
                    userId: null,
                    title: "",
                    description: "",
                    content: ""
                },
                ownBlog: false
            }
        },
        methods: {
            getBlog() {
                const blogId = this.$route.params.blogId
                const _this = this
                this.$axios.get('/blog/findBlogId?blogId=' + blogId).then((res) => {
                    console.log(res)
                    console.log(res.data.data)
                    _this.blog = res.data.data
                    var MarkdownIt = require('markdown-it'),
                        md = new MarkdownIt();
                    var result = md.render(_this.blog.content);
                    _this.blog.content = result
                    // 判断是否是自己的文章，能否编辑
                    console.log("userId:"+_this.blog.userId)
                    console.log("blogId:"+_this.$store.getters.getUser.userId)
                    _this.ownBlog =  (_this.blog.userId === _this.$store.getters.getUser.userId)
                });
            }
        },
        created() {
            this.getBlog()
        }
    }
</script>