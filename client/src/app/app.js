angular.module('percona', [
  'ngRoute',
  'percona.charts'
])

.config(function ($routeProvider) {
	//default location
	$routeProvider.otherwise({redirectTo: '/charts'});
});