<template>
	<div ref="myChat" :style="chartStyle"  @click="emitData()">	
	</div>
	
	<!-- <div :id="" :style=""  @click="emitData()">	
	</div> --> 
	
</template>

<script>
	import Sortable from 'sortablejs';
	import draggable from "vuedraggable";
	import Bus from '../../router/bus.js';
	export default{
		name:'histogram-comp-stereo',
		//接受三个参数，id，style(width,height)，option
		props: {
			data: {
				required: true,
				type: Object,
				default: function() {
					return {
						style:{
							width:'800px',
							height:'600px',
						},
						color: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'],
						title: {
							text: '3D柱图',
							x: 'center'
						},
						tooltip: {},
						xAxis3D: {
							type: 'category',
							data: [  "苹果","橘子","梨", "香蕉","芒果","木瓜"],
							axisLine:{
								lineStyle:{
									color:'yellow',
									width:2
								}
							},
						},
						yAxis3D: {
							type: 'category',
							data: [''],
							axisLine:{
								lineStyle:{
									color:'#8085e9',
									width:2
								}
							},
						},
						zAxis3D: {
							type: 'value',
							axisLine:{
								lineStyle:{
									color:'#8085e9',
									width:2
								}
							},
						},
						grid3D: {
							boxWidth: 200,
							boxDepth: 20,
							axisPointer: {
								show: false
							},
							light: {
								main: {
									intensity: 1.2
								},
								ambient: {
									intensity: 0.3
								}
							},
							viewControl: {
								alpha: 10, //控制场景平移旋转
								beta: 20,
								minAlpha: 10,
								maxAlpha: 10,
								minBeta: 20,
								maxBeta: 20
							}
						},
						series: [{
							type: 'bar3D',
							name:'1',
							barSize: 15,
							data: [
								[2, 0, 42000],
								[4, 0, 20000],
								
							],
							stack: 'stack',
							shading: 'lambert',
							emphasis: {
								label: {
									show: true
								}
							}
						}, {
							type: 'bar3D',
							name:'2',
							barSize: 15,
							data: [
								[1, 0, 24000],
								[3, 0, 60000],
							   
							],
							// stack: 'stack',
							shading: 'lambert',
							emphasis: {
								label: {
									show: true
								}
							}
						},{
							type: 'bar3D',
							name:'3',
							barSize: 15,
							data: [
								[5, 0, 30000],
								[0, 0, 36000],
							],
							stack: 'stack',
							shading: 'lambert',
							emphasis: {
								label: {
									show: true
								}
							}
						}]
					}
				}
			}
		},
		data() {
			return {
			}
		},
		computed: {
			chartStyle() {
				return {
					height:this.data.style.height,
					width:this.data.style.width
				}
				
			}
		},
		mounted(){
			 this.drawECharts()
		},
		methods: {
			drawECharts(){
				 var myChart = this.$echarts.init(this.$refs.myChat)
				var option = this.data;
                // 执行渲染图形和数据的操作
                if (option && typeof option === "object") {
                    myChart.setOption(option, true)
                }
            },
			emitData() {
				Bus.$emit('emitEditor', this.data);
			},
        },
		watch: {
			data:{
				handler:function(newValue, oldValue) {
					this.drawECharts();
				},
				deep:true
			}			
		},	
	}
</script>

<style scoped="scoped">
	.myecharts{
		width: 800px;
		height: 600px;
	}
</style>
