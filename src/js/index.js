import '../css/index.less';
console.log($('body'));
console.log('index.js');

import data from '../mock/header';
const template = require('../libs/art-template');

$(function() {
  $.ajax({
    url: 'http://g.cn',
    dataType:'json'
  }).done((data, status, xhr) => {
    var html = template('tpl', data);
    $('#row').html(html);   
  })  
})
