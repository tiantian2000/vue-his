<!-- 后台首页 -->
<template>
  <div>
    <div class="notice">
      <el-alert
              :title=this.nowDate|dateFormat
              type="success"
              :closable="false">
      </el-alert>
      <el-alert
              :title="`当前住院人数${this.patientCount.sum}人,今日入院${this.patientCount.in}人,出院${this.patientCount.out}人`"
              type="warning"
              show-icon>
      </el-alert>
    </div>
    <el-row >
      <el-col :span="13">
        <el-card class="box-card" >
          <div slot="header" class="clearfix">
            <el-badge :value=this.messageRecords.length :max="1" class="item">
              <el-tag type="success" >系统通知</el-tag>
            </el-badge>
            <el-button style="float: right; padding: 3px 0" type="text"  icon="el-icon-bell" @click="more">更多</el-button>
          </div>

          <div v-for="(o,index) in this.showMessage" :key="index" class="text item">
            <el-alert
                    :title=o.title
                    type="info"
                    :close-text=o.operDate|dateFormat
                    :description=o.content
                    show-icon>
            </el-alert>
          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-badge  class="item">
              <el-tag type="success">床位信息</el-tag>
            </el-badge>
          </div>
          <div class="index-top">
            <div class="element1">
              <div class="child1">
                <div class="number">床位{{this.bedCount.sum}}</div>
              </div>
            </div>
            <div class="element1">
              <div class="child1">
                <div class="number">占用{{this.bedCount.used}}</div>
              </div>
            </div>
            <div class="element1">
              <div class="child1">
                <div>空闲<span class="number">{{this.bedCount.unUsed}}</span></div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="11">
        <el-card class="box-card">
          <div class="echarts">
            <div :style="{height:'375px'}" ref="myEchart"></div>
          </div>
        </el-card>
      </el-col>



    </el-row>



  </div>


</template>

<script>
   // 引入echarts
  import echarts from 'echarts'
  //导入第三方js,这里是处理日期时间格式
  import {host} from '../../static/js/common'
  //导入第三方js,这里是处理日期时间格式
  import {makeDate} from '../../static/js/dateformat.js'

  export default {
    data(){
        return {
            bedCount: {},
            patientCount: {
                sum: 0,
                in: 0,
                out: 0
            },
            nowDate: new Date(),
            messageRecords: [],
            showMessage: [],
            result: [],
            nameList: [],
            data: [],
            seriesData:[
                {name:1,value:0},{name:2,value:0},{name:3,value:0},{name:4,value:0},{name:5,value:0},
                {name:6,value:0},{name:7,value:0},{name:8,value:0},{name:9,value:0},{name:10,value:0},
                {name:11,value:0},{name:12,value:0},
            ],
            legendData: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            selected: {}
        }
    },
    mounted(){
        this.query();
        setInterval(()=>{
            this.nowDate = new Date()
        },1000)
        this.drawPie();
    },
    methods:{
        query(){
            this.$ajax.get(`${host}/index/getBedCount`)
                .then(res=>{
                    this.bedCount = res.data;
                    console.log(this.bedCount)
                })
            this.$ajax.get(`${host}/index/getPatientCount`)
                .then(res=>{
                    this.patientCount = res.data;
                    console.log(this.patientCount)
                })
            this.$ajax.get(`${host}/index/getMessage`)
                .then(res=>{
                    this.messageRecords = res.data;
                    this.messageRecords.length>1?this.showMessage = this.messageRecords.slice(0,1)
                                                  :this.showMessage = this.messageRecords

                })
        },
        more(){
            this.$router.push('/main/message');
        },
       /* beforeDestroy() {
            if (!this.chart) {
                return;
            }
            this.chart.dispose();
            this.chart = null;
        },*/
      /*  chinaConfigure() {
            console.log(this.userJson)
            let myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置
            window.onresize = myChart.resize;

            myChart.setOption({ // 进行相关配置
                backgroundColor: '#02AFDB',
                /!*title: {
                    text: '全国地图大数据',
                    subtext: '',
                    x:'center'
                },*!/
                tooltip : {
                    trigger: 'item'
                },

                //左侧小导航图标
                visualMap: {
                    show : true,
                    x: 'left',
                    y: 'center',
                    splitList: [
                        {start: 500, end:600},{start: 400, end: 500},
                        {start: 300, end: 400},{start: 200, end: 300},
                        {start: 100, end: 200},{start: 0, end: 100},
                    ],
                    color: ['#5475f5', '#9feaa5', '#85daef','#74e2ca', '#e6ac53', '#9fb5ea']
                },
                series: [{
                    name: '数据',
                    type: 'map',
                    mapType: 'china',
                    roam: true,
                    label: {
                        normal: {
                            show: true  //省份名称
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    data: [{
                            "name": "北京",
                            "value": 599
                        }, {
                            "name": "上海",
                            "value": 142
                        }, {
                            "name": "黑龙江",
                            "value": 44
                        }, {
                            "name": "深圳",
                            "value": 92
                        }, {
                            "name": "湖北",
                            "value": 810
                        }, {
                            "name": "四川",
                            "value": 453
                        }]
                    }
                ]
            })
        },*/

        drawPie(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(this.$refs.myEchart);
            this.drawPieChart(myChart);
            myChart.showLoading();// 加载动画
            this.$ajax.get(`${host}/statistic/intHospitalMonth`).then(res=>{
                console.log(res)
                let result = res.data
                result.forEach((item,index)=>{
                    this.seriesData.some(function(i){
                        if(i.name === item.month){
                            i.value = item.num
                        }
                    })
                });
                this.seriesData.forEach((item,index)=>{
                    item.name = item.name + '月'
                    this.selected[item.name] = item.value>0
                })
                console.log(this.seriesData)
                console.log(this.selected)
                myChart.hideLoading();
                // 填入数据
                myChart.setOption({
                    legend: {
                        data: this.legendData,
                        selected: this.selected
                    },
                    series : [
                        {
                            data: this.seriesData,

                        }
                    ]
                })
            });
        },
        drawPieChart(myChart){
            //this.data = this.genData(12)
            let option = {
                title : {
                    text: `${new Date().getFullYear()}住院人数统计`,
                    textStyle: {
                        fontSize: 18,
                        fontWeight: 'bolder',
                        color: '#6495ed'          // 主标题文字颜色
                    },

                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    right: 10,
                    top: 20,
                    bottom: 20,
                   /* data: this.data.legendData,
                    selected: this.data.selected*/
                },
                series : [
                    {

                        name: '人数',
                        type: 'pie',
                        radius : '55%',
                        center: ['40%', '50%'],
                        /*data: this.data.seriesData,*/
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            myChart.setOption(option);
        },
        /*genData(count) {
            let nameList = [
                '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
            var legendData = [];
            var seriesData = [];
            var selected = {};
            for (var i = 0; i < nameList.length; i++) {
                var name = nameList[i]
                legendData.push(name);
                seriesData.push({
                    name: name,
                    value: Math.round(Math.random() * 10)
                });
                selected[name] =  i<13;
            }
            console.log(legendData)
            console.log(seriesData)
            console.log(selected)
            return {
                legendData: legendData,
                seriesData: seriesData,
                selected: selected
            };
        },*/


    },
    filters:{
      dateFormat:function(date) {
         return makeDate(date);
      },
    }


  }
</script>

<style>
  .notice {
    padding: 5px;
  }
  .index-top{
    padding: 2% 0;
    display: flex;
    justify-content: space-around;
  }
  .index-top .element1{
    position: relative;
    width: 105px;
    height: 105px;
    background-color: #409EFF;
    border-radius: 50%;
    border: 2px solid #eee;
    font-size: 14px;
    box-shadow: 2px 2px 1px 1px #DCDFE6;
  }

  .el-card__body {
   padding: 10px;
  }

   /*.index-top .child1{
    width: 100px;
    height: 150px;
    border-radius: 50%;
    background-color: #F56C6C;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #eee;
  }*/

  .index-top .child1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);    /* 50%为自身尺寸的一半 */
    color: #fff;
  }


</style>
