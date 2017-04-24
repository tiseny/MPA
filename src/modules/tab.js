/*tab.init({
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
  })*/

import './tab.less'

const tab = {
  themeClass: 'brage',
  defaultProps: {
    container: $('body'), // 加载的容器
    active: 0, // 默认选中第一版
    data: [{
      title: 'tab1-标题', // tab1 - 标题
      content: '内容1'
    },{
      title: 'tab2-标题', // tab2 - 标题
      content: '内容2'
    },]
  },
  eventsContainer: {},
  // init -> 初始化
  init: (options) => {
    tab.createStructs(options ? options : tab.defaultProps)
    return tab
  },
  // 生成结构
  createStructs: (opts) => {
    opts.container.append("<div class='tab'>" + tab.inject(opts.active,opts.data) + "</tab>")

    // 事件绑定
    tab.onEvents(opts)
  },
  on: (events,cb) => {
    switch (typeof events) {
      case 'string' : tab.eventsContainer[events] = cb; break;
      case 'object' : Array.isArray(events) && events.forEach(item => {
        tab.eventsContainer[item] = cb;
      }); break;
    }
    return tab
  },
  // inject 注入内容
  inject: (active,data) => {
    // tab head 内容 
    // tab content 内容
    let head = "", content = ""
    Array.isArray(data) && data.forEach((item,index) => {
      head += "<li class=" + (index == active ? "active" : "") + ">" +item.title+ "<span class='close'></span></li>";
      if (index == active) {
        content = item.content
      } 
    })

    const tab_head = "<div class='head'><ul>" + head + "</ul></div>"
    const tab_content = "<div class='content'>" + content + "</div>"

    return tab_head + tab_content
  },
  // 刷新 tab
  refresh: (opts) => {
    opts.data.length > 0 ? opts.container.find('.tab').html(tab.inject(opts.active,opts.data)) : opts.container.remove();
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
          tab.refresh(opts)
          tab.eventsContainer[item](item,opts)
        });
        case 'select' : return opts.container.on('click','li:not(.active)',function(e){
          // 设置头部选中
          $(this).addClass('active').siblings().removeClass('active')
          // 设置切换的内容
          opts.container.find('.content').text(opts.data[$(this).index()].content)
          tab.eventsContainer[item](item,opts)
        });
        case 'exSkin' : return opts.container.on('dblclick','.content',function(){
          opts.container.find('.tab').toggleClass(tab.themeClass);
          tab.eventsContainer[item](item,opts)
        });
      }
    })
  }
}

export default tab