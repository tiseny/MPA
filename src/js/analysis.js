import data from '../mock/header';
import '../libs/bootstrap.min.js';
import '../libs/bootstrap-datetimepicker'; 
import '../libs/bootstrap-table'; 
import app from '../modules/app';
import '../analysis.less';
import { DEFAULT_DATETIMEPICKER_OPTION } from '../constants/datetimepicker';
import '../modules/canvas';
const echarts = require('echarts');
const template = require('../libs/art-template');

$(function() {
  // $.ajax({
  //   dataType:'json'
  // }).done((data, status, xhr) => {
  //   var html = template('tpl', data);
  //   $('#row').html(html);   
  // }) 
  // 文章
 
 let data = {
 	startDate: '',
 	endDate: '',
 	type: '水位',
 	sub_type: '所有数据',
 	status: '单井',
 	points: []
 }

 	let page = {
 		init: function() {
 			new app(2).init();
 			page.echarts();
 			page.datetimepicker();
 			page.table();
 			page.events();
 		},
 		echarts : function() {
 			let myCharts = echarts.init(document.getElementById('chart-view-wrap'))

			/*function randomData() {
		    now = new Date(+now + oneDay);
		    value = value + Math.random() * 21 - 10;
		    return {
	        name: now.toString(),
	        value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            Math.round(value)
	        ]
		    }
			}

			var data = [];
			var now = +new Date(1997, 9, 3);
			var oneDay = 24 * 3600 * 1000;
			var value = Math.random() * 1000;
			for (var i = 0; i < 1000; i++) {
			   data.push(randomData());
			}*/
			var data = [120, 132, 101, 134, 90, 230, 210];
			let option = {
		    tooltip : {
		      trigger: 'axis',
		      formatter: '{a}：<br/> {b}：{c}cm'
		    },
		    legend: {
		       data:['水位'],
		       formatter: ''
		    },
		    grid: {
		      left: '60',
		      right: '4%',
		      bottom: '3%',
		      containLabel: true
		    },
		    xAxis: {
		        type: 'category',
		        splitLine: {
		            show: false
		        },
		        data : ['周一','周二','周三','周四','周五','周六','周日']
		    },
		    yAxis:  {
		        type : 'value',
		        name: '水位(cm)',
		        nameLocation: 'middle',
		        nameGap: 50
		    },
		    series: [{
		        name: '水位',
		        type: 'line',
		        areaStyle: {normal: {}},
		        data: data
		    }]
			}; 
			myCharts.setOption(option)
			/*setInterval(function () {
		    for (var i = 0; i < 5; i++) {
	        data.shift();
	        data.push(randomData());
		    }
		    myCharts.setOption({
	        series: [{
	          data: data
	        }]
		    });
			}, 1000);*/
 		},
 		datetimepicker: function() {
 			$('.datetimepicker').datetimepicker({
		    format: DEFAULT_DATETIMEPICKER_OPTION.format,
		    minView : DEFAULT_DATETIMEPICKER_OPTION.minview,
		    language: DEFAULT_DATETIMEPICKER_OPTION.language,
		    autoclose: DEFAULT_DATETIMEPICKER_OPTION.autoclose
			});
 		},
 		table: function() {
 			let table = $('#table').bootstrapTable({
				striped: true,
				hover: true,
				pagination: true,
		    columns: [{
		        field: 'id',
		        title: '编号'
		    }, {
		        field: 'name',
		        title: '名称'
		    }, {
		        field: 'position',
		        title: '水位(cm)'
		    }],
		    data: [{
		        id: '100008',
		        name: '监测站点1',
		        position: '11'
		    }, {
		        id: '100009',
		        name: '监测站点2',
		        position: '17'
		    }]
			})
 		},
 		events: function() {
 			$('#view-tabs').on('click','li', function(){
				$(this).addClass('active').siblings().removeClass('active')
				let index = $(this).index();
				$('#inner-wrap').find('.view-item').eq(index).css('visibility','visible').siblings().css('visibility','hidden');
			})

			$('#point-list').on('click','li',function() {
				let index = $(this).index()
				if($(this).hasClass('select')) {
					$(this).removeClass('select')
					data.points.splice(data.points.indexOf(index),1)
				} else {
					$(this).addClass('select')
					data.points.push(index)
				}
				if (data.status == '单井') {
					$(this).siblings().removeClass('select')
				}
			})

			$('#group-btn').on('click', '.btn',function() {
				$(this).addClass('btn-primary').siblings().removeClass('btn-primary').addClass('btn-default');
				$('#point-list').find('li').removeClass('select')

				data.status = $(this).index() == 0 ? '单井' : '组井' 
				data.points = []
			})
 		}
 	}

 	page.init();

})

