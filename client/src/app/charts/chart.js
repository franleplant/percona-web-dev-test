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


.controller('ChartCtrl', function ($scope, Chart, ChartData, normalize_chart_data, agg_functions, normalize_chart_data_by_date ) {

	var raw_chart_data,
		ctrl = this;

	


	/* 
		Chart related config parameters 
	*/
	ctrl.config = {
		chart_types: ["LineChart", "BarChart"],
		selected_agg_function: 'avg',
		single_day_flag: false
	};

	/*
		Initialize single_day date selector
	*/
	ctrl.date = new Date(2014, 1, 1);


	/*
		Expose normalized data with the selected aggregated function
	*/
	ctrl.normalize_chart_data = function () {
		$scope.chart.data = normalize_chart_data(  raw_chart_data, agg_functions[ctrl.config.selected_agg_function]  )
	}



	/*
		Placeholder for the Chart Data ready to be rendered
	*/
	$scope.chart = {
		type: ctrl.config.chart_types[0],
		options: {
			legend: 'none',
    		fill: 20,
    		displayExactValues: true,
    		vAxis: {
				title: "",
    		},
			hAxis: {
				title: "Date"
			}
		}
	};

	



	/*
		Single Day functionality
	*/
	ctrl.fetch_single_day = function () {
		ChartData.get({id: '1', date: $scope.date}).$promise.then(function (res) {
			$scope.chart.data = normalize_chart_data_by_date(res);
		})
	}


	ctrl.single_day_off = function () {
		if (!ctrl.config.single_day_flag) {
			ctrl.normalize_chart_data();
		}
	}


	/*
		Actively watch for the type of chart being displayed so we can
		name the axis properly.

		Why?
		Because BarCharts are horizontally rendered and LineCharts
		are vertically rendered
	*/
	ctrl.update_chart_type = function () {
		if ($scope.chart.type === ctrl.config.chart_types[0] ) {
			/* If the new value === 'LineChart' */
			$scope.chart.options.vAxis.title = $scope.chart.description;
			$scope.chart.options.hAxis.title = 'Date';

		} else if ($scope.chart.type === ctrl.config.chart_types[1]) { 
			/* if new_value === 'BarChart' */
			$scope.chart.options.vAxis.title = 'Date';
			$scope.chart.options.hAxis.title = $scope.chart.description;			
		}		
	}








	/*
		Get the chart temporal data series
	*/
	ChartData.query({id: '1'}).$promise.then(function(res) {
			/* Save raw data */
        	raw_chart_data = res;

        	/* render graph */
        	ctrl.normalize_chart_data();
        	
        });


	/*
		Get the description from the Chart entity service
	*/
	Chart.get({id: '1'}).$promise.then(function (res) {
		$scope.chart.description = res.description;
		$scope.chart.options.vAxis.title = res.description;
	});
	
	

});

