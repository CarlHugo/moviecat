/**
 * Created by Carl_Hugo on 2016/9/21.
 */

'use strict';
(function(angular){
	//由于默认angular提供的异步请求对象不支持自定义回调函数名
	//angular随机分配的回调名称不被豆瓣支持
	var http=angular.module('moviecat.services.http',[]);
	http.service('HttpService',['$document','$window',function($document,$window){
		console.log($document);
		 url: http://api.douban.com/asdf  -> <script> -> html就可以自动执行
		this.jsonp=function(url,data,callback){

			//1 挂载回调函数
			var fnSuffix=Math.random().toString().replace('.','');
			var cbFuncName='my_json_cb_'+fnSuffix;
			//将函数挂载在全局环境的方式不推荐  使用cbs.my_json_cb_
			$window[cbFuncName]=callback;

			//2 将data转化成url字符串的形式
			// {id:1,name:'zhangsan'} =>id=1&name=zhangsan
			var querystring=url.indexOf('?')==-1?'?':'&';
			for(var key in data){
				querystring+=key+'='+data[key]+'&';
				//            id=          1   &
			}
			//querystring=?id=1&name=zhangsan&
			//3 处理url地址中的回调参数
			//url+=callback=sdfsfdg

			querystring+='callback='+cbFuncName;
			//querystring=?id=1&name=zhangsan&cb=my_json_cb_0231241
			//4 创建一个script的标签
			var scriptElement=$document[0].createElement('script');
			scriptElement.src=url+querystring;
			// 此时还不能将其append到页面上

			//5 将script标签放到页面中
			$document[0].body.appendChild(scriptElement);
			//append过后页面会自动对这个地址发送请求，请求完成以后自动执行脚本

		};

		console.log($window);
	}]);
})(angular);
