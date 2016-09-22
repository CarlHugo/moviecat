
	/*创建正在热映模块*/

	(function(angular){
		'use strict';

		var module=angular.module('moviecat.movie_list', ['ngRoute','moviecat.services.http']);

	//配置模块的路由
	module.config(['$routeProvider', function($routeProvider) {
		//1 在路由的配置中加上分页参数
		//2 在控制器中提取参数
			$routeProvider.when('/:category/:page', {
				templateUrl: 'movie_list/view.html',
				controller: 'MovieListController'
			});
	}]);

	/*控制器*/
	module.controller('MovieListController', [
		'$scope',
		'$route',
		'$routeParams',
		'HttpService',
		function($scope,$route,$routeParams,HttpService) {
			//控制器的编写 分为两步 设计暴露的数据 设计暴露的行为

			/*分页*/
			var count=8;    //每一页的条数
			var page=parseInt($routeParams.page);    //当前第几页
			var start=(page-1)*count;    //当前页从哪一条记录开始

			$scope.subjects=[];
			$scope.message='';
			$scope.title='';
			$scope.totalCount=0;
			$scope.totalPages=0;
			$scope.currentPage=page;

			HttpService.jsonp('http://api.douban.com/v2/movie/'+$routeParams.category,
				{start:start,count:count},
				function(data){
				console.log(data);
                $scope.title=data.title;
				$scope.subjects=data.subjects;
				//使用第三方库
				$scope.totalCount=data.total;
                $scope.totalPages=Math.ceil($scope.totalCount/count);
				$scope.$apply();
				//$apply让指定的表达式重新同步
			});


			/*var doubanApiAddress='http://api.douban.com/v2/movie/in_theaters';
			//测试$http服务 promise
			//在angular中使用jsonp的方式做跨域请求
			//必须给当前的地址加上一个参数 callback=JSONP_CALLBACK
			$http.jsonp(doubanApiAddress+'?callback=JSONP_CALLBACK')
				.then(function(res){
				//此处的代码在异步请求完成之后再执行的（需要等一段时间）
				if(res.status==200){
					console.log('200');
					$scope.subjects=res.data.subjects;
				}else{
					$scope.message='获取数据错误';
				}

			},function(err){
                $scope.message='请求错误';
				console.log('请求失败');
				console.log(err);
			});*/

			//暴露行为 改变页码 上一页/下一页
			$scope.goPage=function(page){
				//查过来的是第几页我就跳第几页 更新当前路由的page值
				//一定要做一个合法校验
				if(page>=1&&page<=$scope.totalPages){
					$route.updateParams({page:page});
				}

			};


	}]);


})(angular);
