angular.module('percona', [
  'ngRoute',
  'percona.charts',
  'percona.directives.chart'
])

.config(function ($routeProvider) {
	//default location
	$routeProvider.otherwise({redirectTo: '/charts'});
})

.directive('some', function () {
	return {
		resctric: 'A',
		//replace: true,
		template: 'HIIIIII'
	}
})