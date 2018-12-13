<!-- 博客文章 -->
<!-- 博客文章 -->
<template>
    <div class="note-editor">
        <div >
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/main/bed'}">床位信息</el-breadcrumb-item>
                <el-breadcrumb-item>新增</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="logform">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="床位号" prop="bedNo">
                    <el-input v-model="form.bedNo"  ></el-input>
                </el-form-item>
                <el-form-item label="床位费/天" prop="cost">
                    <el-input  v-model="form.cost"  ></el-input>
                </el-form-item>
                 <el-form-item label="状态" prop="type">
                    <el-select v-model="form.state" >
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item >
                <el-form-item style="text-align: center;margin-top:10px">
                    <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>
<script>
    import {host} from '../../static/js/common'
    export default {
        data(){
            return {
                form:{
                    //床位号
                    bedNo: '',
                    //床位状态
                    state:'0',
                    //床位费
                    cost: '',
                },
                //下拉框选项
                options: [
                    {
                        value: '0',
                        label: '空床'
                    },
                    {
                        value: '1',
                        label: '已占用'
                    }
                ],
                rules: {
                    bedNo:[{required: true, message: '请输入床位号', trigger: 'blur'}] ,
                    cost:[{required: true, message: '请输入床位费', trigger: 'blur'},
                        { pattern: /^[1-9]\d*$/, message: '请输入正确的床位费' }] ,
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
                        this.$ajax.post(`${host}/bed/add`,
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
