angular.module('percona.directives.chart')


.directive('perconaChart', function () {

	function link(scope, element, attrs) { /* noop */}

	/*
		Issue that I had: could make any directive work when restricted to 'E' (element) format.
		It might be a bug of this Angular version
	*/
	return {
		restric: 'A',
		templateUrl: 'common/directives/chart/chart.tpl.html',
		controller: 'ChartDirectiveCtrl',
		controllerAs: 'ctrl',
		scope: {},
		link: link
	}
});