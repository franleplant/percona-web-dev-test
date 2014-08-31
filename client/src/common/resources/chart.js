angular.module('percona.resources.chart', [
	'ngResource'
])

/**
	Chart resource
*/
.factory('Chart', function ($resource) {
	return $resource('/charts/:id');
})


/**
	ChartData resource
*/
.factory('ChartData', function ($resource) {
	return $resource('/charts/:id/data/:date');
});