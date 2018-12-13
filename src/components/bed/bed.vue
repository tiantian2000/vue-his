<!-- 更新日志 -->
<template>
    <div class="adminLog">
        <div >
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>床位信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div >
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true" >
                    <el-form-item>
                        <el-input v-model="form.bedNo" class="in_logo" placeholder="床位号" ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="form.state" >
                            <el-option
                                    v-for="item in options"
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
                        <el-button type="primary" @click="add">新增</el-button>
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
                    label="床位号"
                    prop="bedNo"
                    sortable>
            </el-table-column>
            <el-table-column
                    label="床位费/天"
                    prop="cost"
                    sortable>
            </el-table-column>
            <el-table-column
                    label="状态"
                    width="220"
                    >
                <template scope="scope">
                    <el-tag type="danger">{{ scope.row.state=='0'?'空床':'已占用' }}</el-tag>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="200">
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
    /*import {makeDate} from '../../static/js/dateformat.js' //注意路径*/
    export default {
        data() {
            return {
                form:{
                    //床位号
                    bedNo: '',
                    //床位状态
                    state:'',
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
                options: [{
                        value: '',
                        label: '--请选择--'
                    }, {
                        value: '0',
                        label: '空床'
                    }, {
                        value: '1',
                        label: '已占用'
                    }
                ],
            }
        },
        mounted:function(){
            this.query();
        },
        methods: {
            add(){
                this.$router.push('/main/bedAdd');
            },
            query(){
                //this.currPage = 1; //重置当前页
                this.loading = true;
                this.$ajax.post(`${host}/bed/list/${this.currPage}`,
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
            }

        }



    }
</script>


<style>
    .adminLog{
        padding:5px;
    }

    .adminLog .in_logo{
        width:300px;
    }

    .toolbar {
        background: #f2f2f2;
        padding: 20px;
        border:1px solid #dfe6ec;
        margin: 10px 0px;

    }

    .pagebar{
        background: #f2f2f2;
        margin-top:5px;
        padding:10px;
        border:1px solid #dfe6ec;
    }


</style>
