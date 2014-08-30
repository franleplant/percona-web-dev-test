angular.module('percona.charts', [
	'ngRoute',
	'googlechart',
	'percona.resources.chart',
	'percona.charts.agg_functions',
	'percona.charts.helpers'
])

.config(function ($routeProvider) {
	$routeProvider
		.when('/charts', {
	        templateUrl: 'app/charts/chart.tpl.html',
	        controller: 'ChartOverallCtrl'
	    });
})


.controller('ChartOverallCtrl', function () {

})




.controller('ChartCtrl', function ($scope, Chart, ChartData, NormalizeChartData, agg_functions ) {

	var raw_chart_data;

	//Intilizaice!

	//available graph types
	//todo: use "this" instaed of scope
	$scope.config = {
		chart_types: ["LineChart", "BarChart"],
		selected_agg_function: 'avg'
	};


	$scope.chart = {
		type: $scope.config.chart_types[0],
		options: {
			legend: 'none',
    		"fill": 20,
    		"displayExactValues": true,
    		"vAxis": {
				"title": "",
    		},
			"hAxis": {
				"title": "Date"
			}
		}
	};

	
	/*
		Initialize single_day date selector
	*/
	$scope.date = new Date(2014, 1, 1);

	/*
		Get the chart temporal data series
	*/
	ChartData.query({id: '1'}).$promise.then(function(res) {
			/* Save raw data */
        	raw_chart_data = res;

        	/* render graph */
        	$scope.normalize_chart_data();
        	
        });
	/*
		Expose normalized data with the selected aggregated function
	*/
	$scope.normalize_chart_data = function () {
		$scope.chart.data = NormalizeChartData(  raw_chart_data, agg_functions[$scope.config.selected_agg_function]  )
	}

	/*
		Actively watch for the selected aggregated function and in case of change
		re render the graph with the new data.
	*/
	$scope.$watch("config.selected_agg_function", function(new_value, old_value) {
		if(raw_chart_data) {
			$scope.normalize_chart_data();	
		}
		
	});


	/*
		Actively watch for the type of chart being displayed so we can
		name the axis properly.

		Why?
		Because BarCharts are horizontally rendered and LineCharts
		are vertically rendered
	*/
	$scope.$watch("chart.type", function(new_value, old_value) {
		if (new_value === $scope.config.chart_types[0] ) {
			/* If the new value === 'LineChart' */
			$scope.chart.options.vAxis.title = $scope.chart.description;
			$scope.chart.options.hAxis.title = 'Date';

		} else if (new_value === $scope.config.chart_types[1]) { 
			/* if new_value === 'BarChart' */
			$scope.chart.options.vAxis.title = 'Date';
			$scope.chart.options.hAxis.title = $scope.chart.description;			
		}
		
	});


	/*
		Get the description from the Chart entity service
	*/
	Chart.get({id: '1'}).$promise.then(function (res) {
		$scope.chart.description = res.description;
		$scope.chart.options.vAxis.title = res.description;
	});
	
	

});

