
const Mock = require("mockjs");

const data = Mock.mock('http://g.cn',{
  'list|1-10': [{
    'id|+1': 1,
    'title|10': 'q',
    'details|10': 'weq'
  }]
})

export default data