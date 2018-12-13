<!-- 博客文章 -->
<!-- 博客文章 -->
<template>
    <div class="note-editor">
        <div >
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/main/user'}">员工信息</el-breadcrumb-item>
                <el-breadcrumb-item>新增</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="logform">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="编号" prop="staffCode">
                    <el-input v-model="form.staffCode"  ></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="staffName">
                    <el-input v-model="form.staffName"  ></el-input>
                </el-form-item>
                <el-form-item label="拼音" prop="spellCode">
                    <el-input v-model="form.spellCode"  ></el-input>
                </el-form-item>
                 <el-form-item label="角色" prop="role">
                    <el-select v-model="form.role" >
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
                    staffCode: '',
                    staffName: '',
                    role:'1',
                    spellCode: ''
                },
                //下拉框选项
                options: [
                    {
                        value: '1',
                        label: '医生'
                    }, {
                        value: '2',
                        label: '护士'
                    }
                    , {
                        value: '3',
                        label: '操作员'
                    }
                    , {
                        value: '4',
                        label: '管理员'
                    }
                ],
                rules: {
                    staffCode:[{required: true, message: '请输入编号', trigger: 'blur'}] ,
                    staffName:[{required: true, message: '请输入姓名', trigger: 'blur'}] ,
                    spellCode:[{required: true, message: '请输入拼音', trigger: 'blur'}] ,
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
                        this.$ajax.post(`${host}/staff/add`,
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
