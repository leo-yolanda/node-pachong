##node爬虫
####一. 以`node`搭建服务 
####二. 使用`superagent` 客户端请求代理模块

######使用实例
 ```js
var request = require('superagent')

request
  .post('/api/pet') //请求的地址
  .send({ name: 'Manny', species: 'cat' }) //以post发送一个json数据体
  .set('X-API-Key', 'foobar')
  .set('Accept', 'application/json')
  .then(res => {
     alert('yay got ' + JSON.stringify(res.body));
  });
 ```

####三. 使用`cheerio` 在服务器操作DOM 类似于使用jq操作DOM元素
######使用实例
```js
var cheerio = require('cheerio'),
    $ = cheerio.load('<h2 class = "title">Hello world</h2>');

$('h2.title').text('Hello there!');
$('h2').addClass('welcome');

$.html();
//=> <h2 class = "title welcome">Hello there!</h2>
```



*扩展*  fs-extra 继承fs模块 是fs的扩展模块  性能比fs模块好