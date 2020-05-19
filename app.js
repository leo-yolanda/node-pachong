const request = require('superagent');
const cheerio = require('cheerio');
const { join } = require('path');
const Koa = require('koa');
const url = 'https://588ku.com/';

const app = new Koa;


//异步操作
app.use(async ctx => {
    // ctx.body = '啊啊啊';
    const arr = [];
    await new Promise((reslove) => {
        request
            .post(url)
            .end((err, res) => {
                //获取res对象中的text  网页中的dom元素
                const data = res.text;
                // console.log(data);
                //获取网页的dom结构 类似ajax对象 操作速度比原生还快8倍左右
                const $ = cheerio.load(data);
                $('.center-hover-p').each((i, v) => {
                    // console.log(i);

                    const $v = $(v)
                    const obj = {
                        img: $v.find('img').prop('src'),
                        title: $v.find('div.entb-hover-btm span').text().trim(), //trim去除字符串前后空格
                        // num: Number.parseInt($v.find('a.item-txt').text().splice(5)),
                        // src: join(url, $v.find('a.cimg').prop('href'))
                        /*
                          注意
                          url + $v.find('a.cimg').prop('href')
                          结果是
                          https://www.shiguangkey.com//couser/1234

                          这种拼接方法会使得 couser 前面会多出一个/ 
                          而且出于各种不同的操作系统会出现不同的报错或者不理想的情况

                          建议使用join拼接
                        */
                    }
                    arr.push(obj);
                    // console.log(arr);
                })
                reslove(arr)
            })
    })
    ctx.body = arr
})



app.listen(3000, () => {
    console.log('服务器已启动');
})