/**
 * article 
 * @type {Object}
 */
import './article.less';
import styleHelper from '../util/style';
const article = {
  themeClass: 'brage',
  defaultProps: {
    container: $('body'),
    data: {
      title: '标题',
      sections: [{
          text: '段落文字',
          style: {
            color: 'red'
          }
        },{
          text: '段落文字',
          style: {
            color: 'green'
          }
        }
      ]
    }  
  },
  eventsContainer : {}, // 事件回调容器
  // 初始化的时候，需要确认配置是否正确
  init: (options) => {
    article.createStructs(options ? options : article.defaultProps)

    return article;
  },
  on: (events,cb) => {
    switch (typeof events) {
      case 'string' : article.eventsContainer[events] = cb; break;
      case 'object' : Array.isArray(events) && events.forEach(item => {
        article.eventsContainer[item] = cb;
      }); break;
    }
    return article
  },
  // settings 组织结构
  createStructs: (opts) => {
    opts.container.append("<article>" + article.inject(opts.data) + "</article>")

    // 事件绑定
    article.onEvents(opts)

  },
  // 注入相关内容
  inject: (data = data || article.defaultProps.data) => {
    let close_btn = "<span class='close'></span>";
    let title = "<div class='title'>" + data.title + "</div>";
    let sections = ""
    Array.isArray(data.sections) && data.sections.forEach(section => {
      // json 字符串去掉 ｛｝
      
      /*let style = section.style ? JSON.stringify(section.style) : ''
      style = style.length > 0 ? style.substr(1,style.length - 2).replace(new RegExp('"',"gm"),'') : ''*/
      
      sections += "<section style=" + styleHelper(section.style) + ">" + section.text + "</section>"
    })

    return close_btn + title + sections
  },
  // 关闭按钮
  onEvents: (opts) => {
    ['remove','exSkin'].forEach(item => {
      switch(item) {
        case 'remove': return opts.container.on('click', 'article .close', function(e){
          e.stopPropagation();
          opts.container.remove();
          article.eventsContainer[item](item,opts)
        });
        case 'exSkin': return opts.container.on('dblclick', function(){
          $(this).find('article').toggleClass(article.themeClass);
          article.eventsContainer[item](item,opts)
        });
      }
    })
  }

}

export default article;