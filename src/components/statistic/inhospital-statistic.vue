<template>
    <div class="statistic">
        <el-tabs type="border-card" >
            <el-tab-pane label="月住院数">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <el-select v-model="year" placeholder="请选择" @change="getValue">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div id="main" class="charts"  ref="charts"></div>
                </el-card>

            </el-tab-pane>
            <el-tab-pane label="年住院数">
                <div  class="charts"  ref="yearCharts"></div>
            </el-tab-pane>

        </el-tabs>

    </div>
</template>
<script>
    // 引入echarts
    import echarts from 'echarts'
    //导入第三方js,这里是处理日期时间格式
    import {host} from '../../static/js/common'
    export default {
        data(){
            return {
                year: '',
                options: [],
                //统计结果
                result:[],
                //类别
                month:[],
                //数量
                num:[],
                resultYear: [],
                monthYear: [],
                numYear: []
            }

        },
        mounted:function(){
            let date = new Date().getFullYear();
            this.year = date
            for(let i=0;i<5;i++){
                this.options.push({
                    value: this.year-i,
                    label: this.year-i
                })
            }
            this.drawLine()
            this.drawYear()
        },
        methods: {
            getValue(val){
                this.year = val
                this.drawLine()
            },
            drawLine(){
                this.month = []
                this.num = []
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(this.$refs.charts)
                this.drawChart(myChart);
                myChart.showLoading();// 加载动画
                this.$ajax.get(`${host}/statistic/intHospitalYearMonth/${this.year}`).then(res=>{
                    this.result = res.data;
                    this.result.forEach((item,index)=>{
                        //console.log(item.type);
                        this.month.push(item.month+'月');
                        this.num.push(item.num);
                    });

                    myChart.hideLoading();
                    // 填入数据
                    myChart.setOption({
                        xAxis: {
                            data: this.month
                        },
                        series: [{
                            name: '人数',
                            data: this.num
                        }]
                    });

                });
            },
            drawChart(myChart) {

                //指定图表配置项和数据
                var option = {
                    //标题
                    title : {
                        text : `${this.year}年住院人数统计`,
                        left : 150,//距离左边的像素值
                        borderColor : '#ff4b2d',
                        borderWidth : 1

                    },
                    color: ['#3398DB'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    //工具箱
                    toolbox:{
                        show:true,
                        feature:{
                            saveAsImage:{
                                show:true
                            },
                            dataView:{
                                show:true
                            },
                            restore:{
                                show:true
                            },
                            dataZoom:{
                                show:true
                            },
                            magicType:{
                                type:['bar','line']
                            }
                        }
                    },
                    //图例
                    legend:{
                        data:['人数']
                    },
                    //x轴
                    xAxis : {
                        type : 'category',
                        data : [],
                        axisLabel:{
                            interval:0,//全部显示x轴
                            rotate:-30//-30度倾斜显示
                        },
                        axisTick: {
                            alignWithLabel: true
                        }
                    },
                    //y轴
                    yAxis : {
                        type : 'value'
                    },
                    //数据
                    series : {
                        name : '数量',
                        type : 'bar',//柱状图
                        data : []
                    },
                };
                myChart.setOption(option);
            },

            drawYear(){
                this.month = []
                this.num = []
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(this.$refs.yearCharts)
                this.drawChart(myChart);
                myChart.showLoading();// 加载动画
                this.$ajax.get(`${host}/statistic/intHospitaYear`).then(res=>{
                    this.resultYear = res.data;
                    this.resultYear.forEach((item,index)=>{
                        //console.log(item.type);
                        this.monthYear.push(item.year+'年');
                        this.numYear.push(item.num);
                    });

                    myChart.hideLoading();
                    // 填入数据
                    myChart.setOption({
                        xAxis: {
                            data: this.monthYear
                        },
                        series: [{
                            name: '人数',
                            data: this.numYear
                        }]
                    });

                });
            },
            drawChart(myChart) {

                //指定图表配置项和数据
                var option = {
                    //标题
                    title : {
                        text : '各年住院人数统计',
                        left : 150,//距离左边的像素值
                        borderColor : '#ff4b2d',
                        borderWidth : 1

                    },
                    color: ['#3398DB'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    //工具箱
                    toolbox:{
                        show:true,
                        feature:{
                            saveAsImage:{
                                show:true
                            },
                            dataView:{
                                show:true
                            },
                            restore:{
                                show:true
                            },
                            dataZoom:{
                                show:true
                            },
                            magicType:{
                                type:['bar','line']
                            }
                        }
                    },
                    //图例
                    legend:{
                        data:['人数']
                    },
                    //x轴
                    xAxis : {
                        type : 'category',
                        data : [],
                        axisLabel:{
                            interval:0,//全部显示x轴
                            rotate:-30//-30度倾斜显示
                        },
                        axisTick: {
                            alignWithLabel: true
                        }
                    },
                    //y轴
                    yAxis : {
                        type : 'value'
                    },
                    //数据
                    series : {
                        name : '数量',
                        type : 'bar',//柱状图
                        data : []
                    },
                };
                myChart.setOption(option);
            }
        }




    }
</script>

<style>
.statistic {
    padding: 10px;
}

.statistic .charts {
    margin-top: 30px;
    width:800px;
    height:500px;
}

</style>

