angular.module('percona.resources.chart', [
	'ngResource'
])

.factory('Chart', function ($resource) {

	return $resource('/charts/:id', 
		//default id is null, for the query method
		{id: ''}
	);
})

.factory('ChartData', function ($resource) {
	return $resource('/charts/:id/data/:date', 
		//default date is null, for the query method
		{date: ''}
	);
});