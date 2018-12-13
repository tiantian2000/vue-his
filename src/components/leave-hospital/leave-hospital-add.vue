<!-- 博客文章 -->
<!-- 博客文章 -->
<template>

    <div class="note-editor">

        <div class="logform">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>入院信息</span>
                 </div>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <el-tag type="info">姓名</el-tag>
                                <el-tag type="info">{{record.name}}</el-tag>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <el-tag type="info">就诊卡号</el-tag>
                                <el-tag type="info">{{record.cardNo}}</el-tag>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <el-tag type="info">床位号</el-tag>
                                <el-tag type="info">{{record.bed.bedNo}}</el-tag>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <el-tag type="info">科室</el-tag>
                                <el-tag type="info">{{record.deptName}}</el-tag>
                            </div>
                        </el-col>

                    </el-row>

             </el-card>
            <el-form ref="form" :model="form" :rules="rules" label-width="130px">
                <el-form-item label="入院日期" >
                    <el-tag type="info" >{{record.inDate|dateFormat}}</el-tag>
                </el-form-item>
                <el-form-item label="出院日期" prop="inDate">
                    <el-date-picker
                            v-model="form.endDate"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                            :clearable=false
                            v-if="isSubmit"
                            >
                    </el-date-picker>
                    <el-tag type="info" v-if="!isSubmit">{{form.endDate|dateFormat}}</el-tag>
                </el-form-item>
                <el-row>
                <el-col :span="4" :offset="1">
                    <el-tag type="info">床位费/天</el-tag>
                    <el-tag type="info">{{record.bed.cost}}元</el-tag>
                </el-col>
                <el-col :span="4">
                    <el-tag type="info">住宿天数</el-tag>
                    <el-tag type="info">{{record.day}}天</el-tag>
                </el-col>
                <el-col :span="4">
                    <el-tag type="info">住宿费合计</el-tag>
                    <el-tag type="info">{{record.cost}}元</el-tag>
                </el-col>
                </el-row>
                <el-row :gutter="20" class="other">
                    <el-col :span="8" >
                        <el-form-item label="药品及其它费用" prop="other"  >
                            <el-input v-model="form.other"  v-if="isSubmit"></el-input>
                            <el-tag type="info" v-if="!isSubmit">{{form.other}}</el-tag>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="结算类别">
                            <el-select v-model="form.paykindCode" v-if="isSubmit">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <el-tag type="info" v-if="!isSubmit">{{form.paykindCode|formatPaykindCode}}</el-tag>
                        </el-form-item >
                    </el-col>
                </el-row>

            <el-row >
                <el-col :span="4" :offset="1">
                    <el-tag type="success">费用总金额</el-tag>
                    <el-tag type="danger">{{countTotal}}元</el-tag>
                </el-col>
            </el-row>
            <el-row class="total-cost">
                <el-col :offset="1">
                    <el-col :span="4">
                        <el-tag type="info">预交金额</el-tag>
                        <el-tag type="warning">{{record.prepayCost}}元</el-tag>
                    </el-col>
                    <el-col :span="4">
                        <el-tag type="info">需补交金额</el-tag>
                        <el-tag type="warning">{{record.totCost-record.prepayCost>0?record.totCost-record.prepayCost:0}}</el-tag>
                    </el-col>
                    <el-col :span="4">
                        <el-tag type="info">退还预交金额</el-tag>
                        <el-tag type="warning">{{record.prepayCost-record.totCost>0?record.prepayCost-record.totCost:0}}</el-tag>
                    </el-col>
                </el-col>
            </el-row>
            <el-row class="total-fee" v-if="isSubmit">
                <el-col :span="24">
                    <el-button type="primary" @click="onSubmit('form')">结算</el-button>
                </el-col>
            </el-row>

            </el-form>
        </div>

    </div>

</template>
<script>
    import {mapState} from 'vuex'
    import {loadUser} from '../../static/js/cache'
    import {host} from '../../static/js/common'
    //导入第三方js,这里是处理日期时间格式
    import {makeSimpleDate,dateDiff} from '../../static/js/dateformat.js' //注意路径*/
    export default {
        data(){
            return {
                isSubmit: true,
                record:{
                    bed:{

                    },
                    day: 0,
                    cost: 0,
                    totCost: 0
                },
                form:{
                    other: '0',
                    endDate: new Date(),
                    paykindCode: '1',

                },
                //下拉框选项
                options: [
                   {
                        value: '1',
                        label: '自费'
                    }, {
                        value: '2',
                        label: '保险'
                    }
                    , {
                        value: '3',
                        label: '公费在职'
                    }
                    , {
                        value: '4',
                        label: '公费退休'
                    }
                    , {
                        value: '5',
                        label: '公费高干'
                    }
                ],
                rules: {
                     other:[
                         { pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/, message: '请输入正确的费用' }] ,
                }

            }
        },
        mounted:function(){
            this.fetchData(this.$route.query.id);
        },
        methods:{
            fetchData:function(id){
                this.$ajax.post(`${host}/leaveHospital/get/${id}`).then(res=>{
                    console.log(res.data)
                    this.record = res.data;
                    let day = dateDiff(makeSimpleDate(this.form.endDate),makeSimpleDate(this.record.inDate));
                    this.record.day = day
                    this.record.cost = day * this.record.bed.cost


                })
            },
            onSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.form.operCode = this.user.staffName
                        this.form.inpatientNo = this.record.patientNo
                        this.form.pactCode  = this.record.pactCode
                        this.form.prepayCost = this.record.prepayCost
                        this.form.totCost = this.record.totCost
                        this.form.supplyCost  = this.record.totCost-this.record.prepayCost>0?this.record.totCost-this.record.prepayCost:0
                        this.form.returnCost =  this.record.prepayCost-this.record.totCost>0?this.record.prepayCost-this.record.totCost:0
                        this.form.beginDate = this.record.inDate
                        this.form.balanceType = 'o'
                        this.form.name = this.record.name
                        this.form.cardNo = this.record.cardNo
                        this.form.bed = this.record.bed
                         console.log(this.form)
                        this.$ajax.post(`${host}/leaveHospital/leave`,
                        this.form).then(res => {
                            this.isSubmit = false
                            this.$notify({
                                title: '结算成功',
                                message: '已完成出院登记',
                                offset: 150
                            });
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            }

        },
        filters:{
            dateFormat:function(date) {
               return makeSimpleDate(date);
            },
            formatPaykindCode: function(inSource){
                let res = ''
                switch(inSource){
                    case '1':
                        res = '自费'
                        break;
                    case '2':
                        res = '保险'
                        break;
                    case '3':
                        res = '公费在职'
                        break;
                    case '4':
                        res = '公费退休'
                        break;
                    case '5':
                        res = '公费高干'
                        break;
                }
                return res
            },
        },
        computed: {
            ...mapState(['user']),
            countTotal: function () {
                let day = dateDiff(makeSimpleDate(this.form.endDate),makeSimpleDate(this.record.inDate));
                let cost = day * this.record.bed.cost
                this.$set(this.record,'day',day)
                this.$set(this.record,'cost',cost)
                console.log(this.record.day,this.record.cost,this.form.other)

                let totCost = 0
                if(this.form.other.length != 0){
                    totCost =  Number.parseFloat(this.form.other)  + this.record.cost
                }else{
                    totCost = this.record.cost
                }
                console.log(totCost)
                this.record.totCost = totCost
                return totCost
            },
            endDate(){
               return makeSimpleDate(this.form.endDate)
            }
        }
    }
</script>

<style>

    .ql-container .ql-editor {
        min-height: 22em;
        padding-bottom: 1em;
        max-height: 22em;
    }

    .logform{
        /*margin-top:20px;*/
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

    .total-cost {
        margin-top: 20px;
    }

    .total-fee {
        margin-top: 20px;
        text-align: center;
    }

    .other {
        margin-top: 20px;
    }

</style>



