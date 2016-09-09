import '../css/index.less';
import data from '../mock/header';
import article from '../modules/article';
import tab from '../modules/tab';

const template = require('../libs/art-template');

$(function() {
  // $.ajax({
  //   url: 'http://g.cn',
  //   dataType:'json'
  // }).done((data, status, xhr) => {
  //   var html = template('tpl', data);
  //   $('#row').html(html);   
  // }) 
  // 文章
  article.init({
    container: $('#article'),
    data:{
      title:'你好呀，李银河！',
      sections: [{
          text: '段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字'
        },{
          text: '段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字'
        }
      ]
    }
  }).on('remove',function(){
    alert('remove');
  }).on('exSkin',function(){
    alert('exSkin');
  })

  // tab
  tab.init({
    container: $('#tab'),
    active: 0,
    data: [{
      title: 'tab-标题一',
      content: '段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字'
    },{
      title: 'tab-标题二',
      content: '段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字段落文字'
    }]
  }).on(['remove','exSkin','select'],function(item, opts){
    alert(item)
  })
})
