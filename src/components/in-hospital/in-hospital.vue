<!-- 更新日志 -->
<template>
    <div class="adminLog">
        <div >
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>住院信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div >
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true" >
                    <el-form-item>
                        <el-input v-model="form.cardNo" class="query-input" placeholder="就诊卡号" ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form.name" class="query-input" placeholder="姓名" ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form.bedNo" class="query-input-bed" placeholder="床位号" ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="form.inSource" class="query-input" >
                            <el-option
                                    v-for="item in inSourceOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-select v-model="form.deptCode" class="query-input" >
                            <el-option
                                    v-for="item in deptOptions"
                                    :key="item.deptCode"
                                    :label="item.deptName"
                                    :value="item.deptCode">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-select v-model="form.inState" class="query-input" >
                            <el-option
                                    v-for="item in inStateOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="query">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="add">登记</el-button>
                    </el-form-item>

                </el-form>
            </el-col>
        </div>
        <el-table ref="multipleTable" :data="pageInfo.list" stripe border
                  tooltip-effect="dark"
                  v-loading="loading"
                  element-loading-text="拼命加载中"
                  @selection-change="handleSelectionChange"
                  style="width:100%">
            <el-table-column
                    type="selection"
                    width="50">
            </el-table-column>
            <el-table-column
                    label="就诊卡号"
                    prop="cardNo"
                    width="110"
            >
            </el-table-column>
            <el-table-column
                    label="姓名"
                    prop="name"
                    width="80">
            </el-table-column>
            <el-table-column
                    label="性别"
                    width="70"
            >
                <template scope="scope">
                    <el-tag>{{ scope.row.sexCode=='0'?'男':'女' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    label="床位"
                    prop="bed.bedNo"
            >
            </el-table-column>
            <el-table-column
                    label="科室"
                    prop="deptName"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    label="预交金额"
                    prop="prepayCost"
            >
            </el-table-column>
            <el-table-column
                    label="入院来源"
                    width="80"
            >
                <template scope="scope">
                    <el-tag type="danger">{{ scope.row.inSource|formatInSource}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    label="入院日期"
                    prop="inDate"
                    :formatter="dateFormat"

            >
            </el-table-column>
            <el-table-column
                    label="状态"
                    sortable
            >
                <template scope="scope">
                    <el-tag type="danger">{{ scope.row.inState|formatInState}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button
                            size="small"
                            type="success"
                    >编辑</el-button>
                    <el-button
                            size="small"
                            type="danger"
                            @click="handleDel(scope.row.id)"
                    >删除</el-button>
                </template>
            </el-table-column>

        </el-table>
        <!--工具条-->
        <div class="pagebar">
            <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    layout="total,prev, pager, next"
                    :page-size="pageInfo.pageSize"
                    :total="pageInfo.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {host} from '../../static/js/common'
    //导入第三方js,这里是处理日期时间格式
    import {makeSimpleDate} from '../../static/js/dateformat.js' //注意路径*/
    export default {
        data() {
            return {
                form:{
                    cardNo: '',
                    name: '',
                    inSource: '',
                    bedNo:'',
                    deptCode: '',
                    inState: ''
                },
                //需要显示的列表数据
                pageInfo:{},
                //当前页码
                currPage:1,
                //总页数
                total:0,
                //显示是否加载中提示
                loading:false,
                //多选时的选项
                multipleSelection:[],
                //下拉框选项
                inSourceOptions: [
                    {
                        value: '',
                        label: '--请选择来源--'
                    }, {
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
                inStateOptions: [
                    {
                        value: '',
                        label: '--请选择状态--'
                    }, {
                        value: '0',
                        label: '住院登记'
                    }, {
                        value: '1',
                        label: '病房接诊'
                    }
                    , {
                        value: '2',
                        label: '出院登记'
                    }
                    , {
                        value: '3',
                        label: '出院结算'
                    }, {
                        value: '4',
                        label: '无费退院'
                    }
                ],
                deptOptions: [
                    {
                        deptCode: '',
                        deptName: '--请选择科室--'
                    }
                ]
            }
        },
        mounted:function(){
            this.queryDepts()
            this.query();
        },
        methods: {
            add(){
                this.$router.push('/main/inHospitalAdd');
            },
            query(){
                //this.currPage = 1; //重置当前页
                this.loading = true;
                this.$ajax.post(`${host}/inHospital/list/${this.currPage}`,
                    this.form)
                    .then(res=>{
                        this.pageInfo = res.data;
                        console.log(this.pageInfo)
                        this.loading = false;
                    })
            },
            handleCurrentChange(val) {
                this.currPage = val;
                this.query();
            },
            handleDel(id){
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {

                })

            },
            handleSelectionChange(val){
                this.multipleSelection = val;
                //console.log(val);
            },
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return makeSimpleDate(date);
            },
            //取科室信息
            queryDepts(){
                this.$ajax.get(`${host}/dept/listAll`).then(res=>{
                    this.deptOptions = this.deptOptions.concat(res.data)
                })
            },
        },
        filters:{
            formatInSource: function(inSource){
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
            formatInState: function(inState){
                let res = ''
                switch(inState){
                    case '0':
                        res = '住院登记'
                        break;
                    case '1':
                        res = '病房接诊'
                        break;
                    case '2':
                        res = '出院登记'
                        break;
                    case '3':
                        res = '出院结算'
                        break;
                    case '4':
                        res = '无费退院'
                        break;
                }
                return res
            }
        }



    }
</script>


<style>
    .adminLog{
        padding:5px;
    }


    .toolbar {
        background: #f2f2f2;
        padding: 15px;
        border:1px solid #dfe6ec;
        /*margin: 10px 0px;*/

    }

    .query-input {
        width: 80px;
    }

    .query-input-bed {
        width: 60px;
    }

    .pagebar{
        background: #f2f2f2;
        margin-top:5px;
        padding:10px;
        border:1px solid #dfe6ec;
    }


</style>
