angular.module('percona.charts', [
	'ngRoute',
	'googlechart',
	'percona.resources.chart',
	'percona.directives.chart',
	'percona.directives.scrollwhen'
])

.config(function ($routeProvider) {
	$routeProvider
		.when('/charts', {
	        templateUrl: 'app/charts/charts.tpl.html',
	        controller: 'ChartOverallCtrl',
	        resolve: {
	        	charts: function (Chart) {
		        	return Chart.query();
		        }
	        }
	    });
})


.controller('ChartOverallCtrl', function ($scope, charts) {
	/*
		Basic chart data loading to display
	*/
	$scope.charts = charts;

	$scope.charts[0].display = true;
});

