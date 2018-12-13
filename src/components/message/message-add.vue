<!-- 博客文章 -->
<!-- 博客文章 -->
<template>
    <div class="note-editor">
        <div >
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/main/message'}">消息通知</el-breadcrumb-item>
                <el-breadcrumb-item>新增</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="logform">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title"  ></el-input>
                </el-form-item>
                <el-form-item label=内容 prop="content">
                    <el-input
                            type="textarea"
                            :rows="5"
                            placeholder="请输入内容"
                            v-model="form.content">
                    </el-input>
                </el-form-item>

                <el-form-item style="text-align: center;margin-top:10px">
                    <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>
<script>
    import {mapState} from 'vuex'
    import {loadUser} from '../../static/js/cache'
    import {host} from '../../static/js/common'
    export default {
        data(){
            return {
                form:{
                    //床位号
                    title: '',
                    //床位状态
                    content:'',
                    operCode: ''
                },
                rules: {
                    title:[{required: true, message: '请输入标题', trigger: 'blur'}] ,
                    content:[{required: true, message: '请输入内容', trigger: 'blur'}]

                }

            }
        },
        mounted:function(){
            //this.fetchData(this.$route.query.id);
        },
        methods:{
            onSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.form.operCode = this.user.staffName
                        this.$ajax.post(`${host}/message/add`,
                        this.form).then(response => {
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },

        },
        computed: {
            ...mapState(['user']),
        }



    }
</script>

<style>

    .note-editor{
        padding-top:10px;
    }

    .ql-container .ql-editor {
        min-height: 22em;
        padding-bottom: 1em;
        max-height: 22em;
    }

    .logform{
        margin-top:20px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

</style>



<!--<template>
  <div class="note-editor">
    <p>{{title}}</p>
    <div v-html="content">

    </div>
  </div>

  </template>
  <script>
    export default {
      data(){
          return {
            title:'',
            content:''
          }
      },
      mounted:function(){
        this.fetchData();
      },
      methods:{
          fetchData(){
              console.log("fetch");
              this.$ajax.get('/articleGet',{params:{id:0}}).then(response=>{
                  this.title = response.data.article.title;
                  this.content = response.data.article.content;

              })
          }
      }

    }
  </script>

<style>

  .note-editor{
    padding-top:20px;
  }

  .ql-container .ql-editor {
    min-height: 22em;
    padding-bottom: 1em;
    max-height: 22em;
  }

  .logform{
    margin-top:20px;
  }

</style>-->
