/*$('#dialog').on('click',function(){
    dialog.init({
      container: $('body'),
      title: "弹窗标题",
      html: $(this)[0].innerHTML,
      btns: [{
        text: '确定', 
        style: {'background':'#0b6f2b'},
        onClick: (ev) => {
          ev.on('close')
        }
      },{
        text: '取消', 
        style: {'background':'#666'}
      }]
    })
  })*/

import './dialog.less'
import styleHelper from '../util/style';
const dialog = {
  id: new Date().getTime(),
  themeClass: 'brage',
  defaultProps: {
    container: $('body'), // 加载的容器
    style: {},
    title: '标题', // 标题
    content: null, // htmldom
    btns: [{
      text: '确定', 
      style: {},
      onClick: () => {
        console.log('确定')
      }
    },{
      text: '取消',
      style: {},
      onClick: () => {
        console.log('取消')
      }
    }]
  },
  eventsContainer: {},
  // init -> 初始化
  init: (options) => {
    dialog.createStructs(options ? options : dialog.defaultProps)
    return dialog
  },
  // 生成结构
  createStructs: (opts) => {

    opts.container.append("<div class='dialog' id=" + dialog.id + "><div class='dialog-wrapper'><div class='mask'></div><div class='main fadeInDown'>" + dialog.inject(opts) + "</div></div></div>")

    // 事件绑定
    dialog.onEvents(opts)
  },
  /*on: (events,cb) => {
    switch (typeof events) {
      case 'string' : dialog.eventsContainer[events] = cb; break;
      case 'object' : Array.isArray(events) && events.forEach(item => {
        dialog.eventsContainer[item] = cb;
      }); break;
    }
    return dialog
  },*/
  // inject 注入内容
  inject: (opts) => {
    // dialog header
    // dialog main
    // dialog btns

    const header = opts.title && opts.title.length > 0 
                  ? "<div class='header'>" + opts.title + "<span class='close'></span></div>"
                  : ""
    const main = "<div class='body'>" + opts.html + "</div>";
    const btns = []
    opts.btns && opts.btns.forEach(item => {
      btns.push("<span class='btn' style=" + styleHelper(item.style) + ">" + item.text + "</span>")
    })

    const footer = "<div class='footer'>" + btns.join('') + "</div>"
    return header + main + footer
  },

  // 绑定事件
  onEvents: (opts) => {
    // 1、移除  2、选中
    ['close'].forEach(item => {
      switch(item) {
        case 'close' : return $('#'+dialog.id).find('.header').on('click','.close',function(e){
          e.stopPropagation();
          dialog.on('close');
        });
       
      }
    })

    opts.btns && opts.btns.forEach(item => {
      $('#' + dialog.id).off('click').on('click','.footer .btn',function() {
        const event = opts.btns[$(this).index()].onClick;
        event ? event(dialog) : dialog.on('close');
      })
    })
  },

  // 对外的接口
  on: (events) => {
    ['close'].forEach(item => {
      switch(item){
        case 'close': return (function(){
          $('#'+dialog.id).find('.main').addClass('fadeOutUp')
          setTimeout(()=>{$('#'+dialog.id).remove()},600)
        })();
      }  
    })
  },
}

export default dialog