<!-- 博客文章 -->
<!-- 博客文章 -->
<template>

    <div class="note-editor">

        <div class="logform">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span><el-tag type="danger">{{record.name}}</el-tag> 住院信息</span>
                    <span class="card-no"> <el-tag type="info">就诊卡号</el-tag><el-tag type="info">{{record.cardNo}}</el-tag>
                    </span>
                 </div>
                 <el-row :gutter="20" class="row">
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <el-tag type="success">身份证号</el-tag>
                                <el-tag type="info">{{record.idenno}}</el-tag>
                            </div>
                     </el-col>
                     <el-col :span="6">
                         <div class="grid-content bg-purple">
                             <el-tag type="success">性别</el-tag>
                             <el-tag type="info">{{record.sexCode|formatSex}}</el-tag>
                         </div>
                     </el-col>
                     <el-col :span="6">
                         <div class="grid-content bg-purple">
                             <el-tag type="success">入院来源</el-tag>
                             <el-tag type="info">{{record.inSource|formatInSource}}</el-tag>
                         </div>
                     </el-col>
                     <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <el-tag type="success">科室</el-tag>
                                <el-tag type="info">{{record.deptName}}</el-tag>
                            </div>
                        </el-col>
                </el-row>
                <el-row :gutter="20"  class="row">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-tag type="success">床位号</el-tag>
                            <el-tag type="info" >{{record.bed.bedNo}}</el-tag>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-tag type="success">床位费/天</el-tag>
                            <el-tag type="info">{{record.bed.cost}}元</el-tag>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-tag type="success">入院日期</el-tag>
                            <el-tag type="info" >{{record.inDate|dateFormat}}</el-tag>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-tag type="success">出院日期</el-tag>
                            <el-tag type="info" >{{record.outDate|dateFormat}}</el-tag>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20"  class="row">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-tag type="success">住宿天数</el-tag>
                            <el-tag type="info">{{record.day}}天</el-tag>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-tag type="success">住宿费</el-tag>
                            <el-tag type="info">{{record.cost}}元</el-tag>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-tag type="success">药品及其它费用</el-tag>
                            <el-tag type="info">{{record.totCost-record.cost}}元</el-tag>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-tag type="success">费用总金额</el-tag>
                            <el-tag type="warning">{{record.totCost}}元</el-tag>
                        </div>
                    </el-col>

                </el-row>
                <el-row :gutter="20" >
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-tag type="success">预交金额</el-tag>
                            <el-tag type="info">{{record.prepayCost}}元</el-tag>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-tag type="success">补交金额</el-tag>
                            <el-tag type="info">{{record.totCost-record.prepayCost>0?record.totCost-record.prepayCost:0}}元</el-tag>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-tag type="success">退还金额</el-tag>
                            <el-tag type="info">{{record.prepayCost-record.totCost>0?record.prepayCost-record.totCost:0}}元</el-tag>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-tag type="success">结算类别</el-tag>
                            <el-tag type="info">{{record.paykindCode|formatPaykindCode}}</el-tag>
                        </div>
                    </el-col>
                </el-row>
             </el-card>

        </div>

    </div>

</template>
<script>
    import {host} from '../../static/js/common'
    //导入第三方js,这里是处理日期时间格式
    import {makeSimpleDate,dateDiff} from '../../static/js/dateformat.js' //注意路径*/
    export default {
        data(){
            return {
                record:{

                }
            }
        },
        mounted:function(){
            this.fetchData(this.$route.query.id);
        },
        methods: {
            fetchData: function (id) {
                this.$ajax.post(`${host}/leaveHospital/get/${id}`).then(res => {
                    console.log(res.data)
                    this.record = res.data;
                    let day = dateDiff(makeSimpleDate(this.record.outDate), makeSimpleDate(this.record.inDate));
                    this.record.day = day
                    this.record.cost = day * this.record.bed.cost
                })
            }
        },
        filters:{
            dateFormat(date) {
               return makeSimpleDate(date);
            },
            formatPaykindCode(paykindCode){
                let res = ''
                switch(paykindCode){
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
            formatPaykindCode(paykindCode){
                let res = ''
                switch(paykindCode){
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
            }
        }
    }
</script>

<style>

    .card-no {
        padding-left: 10px;
    }

    .row {
        margin-bottom: 20px;
    }


</style>



