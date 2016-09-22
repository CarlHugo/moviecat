
/*(function(angular){
	angular.module('moviecat.directives.auto_focus',[])
		.directive('autoFocus',['$location',function($location){

			var path=$location.path();
			console.log(path);
			return{
				restrict:'A',
				link:function($scope,iElm,iAttrs,controller){
					//console.log(iElm);
					//console.log(iAttrs);
					var aLink=iElm.children().attr('href');

					var type=aLink.replace(/(#\/.+?)\/\d+/,'$1');
					console.log(path);
					console.log(aLink);
					console.log(type);
					if(aLink.startsWith(type)){
						//访问的是当前连接
						iElm.addClass('active');
					}

					iElm.on('click',function(){

						iElm.parent().children().removeClass('active');
						iElm.addClass('active');
						window.iele=iElm;
					});

				}
			};

		}]);

})(angular);*/

(function(angular) {
	angular.module('moviecat.directives.auto_focus', [])
		.directive('autoFocus', ['$location', function($location) {
			// Runs during compile
			var path = $location.path(); // /coming_soon/1
			return {
				restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
				link: function($scope, iElm, iAttrs, controller) {
					var aLink = iElm.children().attr('href');
					var type = aLink.replace(/#(\/.+?)\/\d+/,'$1'); // /coming_soon
					if(path.startsWith(type)){
						// 访问的是当前链接
						iElm.addClass('active');
					}
					iElm.on('click', function() {
						iElm.parent().children().removeClass('active');
						iElm.addClass('active');
					});
				}
			};
		}]);
})(angular);
