import data from '../mock/header';
import app from '../modules/app';
import '../libs/bootstrap.min.js';
import '../index.less';

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
 	new app(0).init();
})
