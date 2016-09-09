/**
 *  tab -> 
 */

import './dialog.less'



const dialog = {
  themeClass: 'brage',
  defaultProps: {
    container: $('body'), // 加载的容器
    style: {},
    title: '标题', // 标题
    content: null, // htmldom
    footer: [{
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
    opts.container.append("<div class='dialog'><div class='mask'></div><div class='main'>" + dialog.inject(opts) + "</div></tab>")

    // 事件绑定
    dialog.onEvents(opts)
  },
  on: (events,cb) => {
    switch (typeof events) {
      case 'string' : dialog.eventsContainer[events] = cb; break;
      case 'object' : Array.isArray(events) && events.forEach(item => {
        dialog.eventsContainer[item] = cb;
      }); break;
    }
    return dialog
  },
  // inject 注入内容
  inject: (opts) => {
    // dialog header
    // dialog main
    // dialog footer

    const header = opts.title && opts.title.length > 0 
                  ? "<div class='header'>" + opts.title + "<span class='close'></span></div>"
                  : ""
    const main = "<div class='main'>" + opts.html.html() + "<div>";

    return 
  },
  // 刷新 tab
  refresh: (opts) => {
    opts.data.length > 0 ? opts.container.find('.tab').html(dialog.inject(opts.active,opts.data)) : opts.container.remove();
  },
  // 绑定事件
  onEvents: (opts) => {
    // 1、移除  2、选中
    ['remove','select','exSkin'].forEach(item => {
      switch(item) {
        case 'remove' : return opts.container.on('click','.head .close',function(e){
          e.stopPropagation();
          const index = $(this).closest('li').index()
          opts.data.splice(index,1)
          dialog.refresh(opts)
          dialog.eventsContainer[item](item,opts)
        });
        case 'select' : return opts.container.on('click','li:not(.active)',function(e){
          // 设置头部选中
          $(this).addClass('active').siblings().removeClass('active')
          // 设置切换的内容
          opts.container.find('.content').text(opts.data[$(this).index()].content)
          dialog.eventsContainer[item](item,opts)
        });
        case 'exSkin' : return opts.container.on('dblclick','.content',function(){
          opts.container.find('.tab').toggleClass(dialog.themeClass);
          dialog.eventsContainer[item](item,opts)
        });
      }
    })
  }
}

export default tab