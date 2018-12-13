<!-- 博客文章 -->
<!-- 博客文章 -->
<template>

    <div class="note-editor">

        <el-steps :active="active"  align-center finish-status="success">
            <el-step title="登记"   icon="el-icon-edit"></el-step>
            <el-step title="预交费" icon="el-icon-bell"></el-step>
            <el-step title="完成"   icon="el-icon-circle-check-outline"></el-step>
        </el-steps>

        <div class="logform" v-if="active===0">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="就诊卡号" prop="cardNo">
                    <el-input v-model="form.cardNo"  @blur="getPatientinfo"></el-input>
                </el-form-item>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="姓名" prop="name">
                             <el-input v-model="form.name"  ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="拼音" prop="spellCode">
                            <el-input v-model="form.spellCode"  ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="身份证号" prop="idenno">
                            <el-input v-model="form.idenno"  ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="性别">
                            <el-radio v-model="form.sexCode" label="0">男</el-radio>
                            <el-radio v-model="form.sexCode" label="1">女</el-radio>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="家庭地址" prop="home">
                            <el-input v-model="form.home"  ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话" prop="homeTel">
                            <el-input v-model="form.homeTel"  ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="入院来源" prop="inSource">
                            <el-select v-model="form.inSource" >
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="入院日期" prop="inDate">
                            <el-date-picker
                                    v-model="form.inDate"
                                    align="right"
                                    type="date"
                                    placeholder="选择日期"
                                    :picker-options="pickerOptions1">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="科室" prop="deptCode">
                            <el-select v-model="form.deptName" @change="getDeptValue">
                                <el-option
                                        v-for="item in deptOptions"
                                        :key="item.deptCode"
                                        :label="item.deptName"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="床位" prop="bedNo">
                            <el-select v-model="form.bedNo" @change="getBedValue">
                                <el-option
                                        v-for="item in bedOptions"
                                        :key="item.id"
                                        :label="item.bedNo"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="合同单位" prop="pactName">
                            <el-input v-model="form.pactName"  ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同代码" prop="pactCode">
                            <el-input v-model="form.pactCode"  ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item style="text-align: center;margin-top:10px">
                    <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="logform" v-if="active===1">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>登记信息</span>
                </div>
                <el-row :gutter="20" class="row">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-tag type="info">姓名</el-tag>
                            <el-tag type="info">{{form.name}}</el-tag>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-tag type="info">就诊卡号</el-tag>
                            <el-tag type="info">{{form.cardNo}}</el-tag>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-tag type="info">床位号</el-tag>
                            <el-tag type="info">{{form.bed.bedNo}}</el-tag>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-tag type="info">床位费/天</el-tag>
                            <el-tag type="info">{{form.bed.cost}}</el-tag>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-tag type="info">身份证号</el-tag>
                            <el-tag type="info">{{form.idenno}}</el-tag>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-tag type="info">性别</el-tag>
                            <el-tag type="info">{{form.sexCode|formatSex}}</el-tag>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-tag type="info">科室</el-tag>
                            <el-tag type="info">{{form.deptName}}</el-tag>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-tag type="info">入院来源</el-tag>
                            <el-tag type="info">{{form.inSource|formatInSource}}</el-tag>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
            <el-form ref="form" :model="form" :rules="rules" label-width="130px">
                <el-row >
                    <el-col :span="8" >
                        <el-form-item label="预交金" prop="prepayCost"  style="text-align: center;margin-top:10px">
                                <el-input type="number" v-model="form.prepayCost"  ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item style="text-align: center;margin-top:10px">
                    <el-button type="primary" @click="onSubmitPay('form')">下一步</el-button>
                    <el-button type="primary" @click="next">跳过</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="finish" v-if="active===2">
            <el-alert
                    title="住院登记完成"
                    type="success"
                    show-icon>
            </el-alert>
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
                active: 0,
                form:{
                    inpatientNo: '',
                    cardNo: '',
                    name: '',
                    idenno: '',
                    spellCode: '',
                    sexCode: '0',
                    inDate: new Date(),
                    workName: '',
                    home: '',
                    homeTel: '',
                    deptCode: '',
                    deptName: '',
                    prepayCost: '',
                    bed: {
                        id: '',
                        bedNo: '',
                        cost: ''
                    },
                    inSource: '1',
                    pactCode:'',
                    pactName:'',
                    operCode: '',
                    inState: '0',
                    prepayState: '0',
                },
                deptOptions:[],
                bedOptions:[],
                //下拉框选项
                options: [
                    {
                        value: '1',
                        label: '门诊'
                    }, {
                        value: '2',
                        label: '急诊'
                    }
                    , {
                        value: '3',
                        label: '转科'
                    }
                    , {
                        value: '4',
                        label: '转院'
                    }
                ],
                rules: {
                    cardNo:[{required: true,min: 10, max: 10, message: '请输入10位就诊卡号', trigger: 'blur'}] ,
                    name:[{required: true, message: '请输入姓名', trigger: 'blur'}] ,
                    idenno:[
                        {required: true, message: '请输入身份证号', trigger: 'blur'},
                        { pattern: /^[1-9]\d{7}((0[1-9])|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, message: '请输入正确的身份证号' }
                        ] ,
                    pactName:[{required: true, message: '请输入合同单位名称', trigger: 'blur'}] ,
                    pactCode:[{required: true, message: '请输入合同单位编码', trigger: 'blur'}] ,
                    deptCode:[{required: true, message: '请选择科室', trigger: 'blur'}] ,
                    bedNo:[{required: true, message: '请选择床位', trigger: 'blur'}] ,
                    prepayCost:[{required: true, message: '请输入预交金额', trigger: 'blur'}] ,
                }

            }
        },
        mounted:function(){
            this.queryDepts()
            this.queryBed()
        },
        methods:{
            next(){
              this.active++
            },
            //取科室信息
            queryDepts(){
              this.$ajax.get(`${host}/dept/listAll`).then(res=>{
                  this.deptOptions = res.data
              })
            },
            queryBed(){
                this.$ajax.get(`${host}/bed/listByState?state=0`).then(res=>{
                    this.bedOptions = res.data
                    console.log(this.bedOptions)
                })
            },
            getDeptValue(value){
                console.log(value)
                this.form.deptCode = value.deptCode
                this.form.deptName = value.deptName
                //console.log(this.form.deptCode,this.form.deptName)
            },
            getBedValue(value){
                //console.log(value)
                this.form.bedNo = value.bedNo
                this.form.bed.id = value.id
                this.form.bed.bedNo = value.bedNo
                this.form.bed.cost = value.cost
                console.log(this.form.bed)
            },
            onSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.form.operCode = this.user.staffName
                        this.$ajax.post(`${host}/inHospital/add`,
                        this.form).then(res => {
                            console.log(res)
                            this.form.inpatientNo = res.data
                            this.active++
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            onSubmitPay(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.form.operCode = this.user.staffName
                        this.$ajax.post(`${host}/finIpbIprepay/add`,
                            this.form).then(response => {
                            this.active++
                            console.log(this.active)
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            getPatientinfo(){
                this.$ajax.get(`${host}/patientinfo/get/${this.form.cardNo}`).then(res => {
                    console.log(res.data)
                    this.form.idenno = res.data.idenno
                    this.form.name = res.data.name
                    this.form.spellCode = res.data.spellCode
                    res.data.sexCode?this.form.sexCode = res.data.sexCode:'0'
                    this.form.home = res.data.home
                    this.form.homeTel = res.data.homeTel
                    console.log(this.form)
                });
            },

        },
        computed: {
            ...mapState(['user'])
        },
        filters:{
            formatInSource(inSource){
                let res = ''
                switch(inSource){
                    case '1':
                        res = '门诊'
                        break;
                    case '2':
                        res = '急诊'
                        break;
                    case '3':
                        res = '转科'
                        break;
                    case '4':
                        res = '转院'
                        break;
                }
                return res
            },
            formatSex(sexCode){
                return sexCode=='0'?'男':'女'
            },
        }




    }
</script>

<style>

    .finish {
        padding: 20px;
        margin: 20px;
    }

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

    .box-card {
        margin: 10px;
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

    .row {
        margin-bottom: 20px;
    }

</style>


