angular.module('percona.directives.scrollwhen', [

])

/*
	scrollWhen

		summary:
		 	simple attribute directive to scroll into view the applied element
		 	when an expression is true
*/
.directive('scrollWhen', function ($timeout) {
	function link($scope, element, attrs) {

		$scope.$watch( attrs.scrollWhen, function (new_value, old_value){
			
			if (new_value) {

				/* 
					Need to add some delay in order for this to work.
				*/
				$timeout(function () {
					element[0].scrollIntoView(false);
				}, 100);
			}
		})
	}

	return {
   		restrict: 'A',
   		link: link,
		scope: false
	};
})