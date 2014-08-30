angular.module('percona.charts', [
	'ngRoute',
	'googlechart',
	'percona.resources.chart',
	'percona.directives.chart'
])

.config(function ($routeProvider) {
	$routeProvider
		.when('/charts', {
	        templateUrl: 'app/charts/charts.tpl.html',
	        controller: 'ChartOverallCtrl'
	    });
})


.controller('ChartOverallCtrl', function ($scope) {
	$scope.chartid = 1;
	console.log('hi')
});

