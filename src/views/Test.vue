<template>
    <button @click="tryTest">测试</button>
</template>

<script>
    export default {
        name: "Test",
        methods:{
            tryTest(){
                this.$axios.post("http://localhost:8081/space_war/blog/findAllByUserId",
                    {
                        userId:1
                    },
                    {
                        headers:{
                            'auth':'12321',
                            'Content-Type':'application/x-www-form-urlencoded'
                        }
                    }
                ).then((res)=>{
                    console.log(res)
                })
            }
        }
    }
</script>

<style scoped>

</style>