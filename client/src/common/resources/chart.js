angular.module('percona.resources.chart', [
	'ngResource'
])

//TODO: add on error and a message center (simple wrapper for console.log or alert) and test them

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