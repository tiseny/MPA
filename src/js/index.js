import '../css/index.less';
import data from '../mock/header';
import article from '../modules/article';

const template = require('../libs/art-template');

$(function() {
  // $.ajax({
  //   url: 'http://g.cn',
  //   dataType:'json'
  // }).done((data, status, xhr) => {
  //   var html = template('tpl', data);
  //   $('#row').html(html);   
  // }) 
  // 生成
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
  })

})
