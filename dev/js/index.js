
'use strict';
require('../js/module/a.js'); 


require('../js/libs/jquery.backgroundvideo.min'); //视频背景
require('../js/libs/smoothscroll'); //滚动条平滑
require('../css/public.less');
require('../css/index.less');

// 引进 mockjs，模拟真实数据
import data from '../mock/header';
const template = require('../js/libs/art-template');

$(function(){
    //视频背景
   /* const videobackground = new $.backgroundVideo($('body'), {
      "align": "centerXY",
      "width": 1280,
      "height": 720,
      "path": "video/",
      "filename": "video",
      "types": ["mp4","webm"]
    });*/
    console.log(212121)
    $.ajax({
      url: 'http://g.cn',
      dataType:'json'
    }).done((data, status, xhr) => {
      var html = template('tpl', data);
      $('#row').html(html);   
    })

})

