//module definition
angular.module('percona.directives.chart', [
	'percona.directives.chart.agg_functions',
	'percona.directives.chart.helpers',
	'percona.resources.chart'
])

.controller('ChartDirectiveCtrl', function ($scope, $attrs, $q, Chart, ChartData, agg_functions, normalize_chart_data, normalize_chart_data_by_date ) {

	/* 
		Chart related config parameters 
	*/
	this.config = {
		chart_types: ["LineChart", "BarChart"],
		selected_agg_function: 'avg',
		single_day_flag: false,
		/* Initialize single_day date selector	*/
		date: new Date(2014, 7, 1)
	};


	/*
		Placeholder for Chart Data ready to be rendered
	*/
	this.chart = {
		type: this.config.chart_types[0],
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
		get_chart_data

				summary:
						Get the chart temporal data series and
						Get the description from the Chart entity service
	*/
	var self = this;

	function get_chart_data () {
		

		var chart_data_promise = ChartData.query({id: $attrs.chartid}).$promise;
		var chart_meta_promise = Chart.get({id: $attrs.chartid}).$promise;


		/*
			Wait for all the sever calls to return
		*/
		$q.all([

			chart_data_promise,
			chart_meta_promise

		]).then(function (res) {
				var chart_data_raw = res[0];
				var chart_meta_raw = res[1];

				/* Save raw data */
	        	self.chart.data_raw = chart_data_raw;

	        	/* Save chart description as title and as xAxis label */
				self.chart.options.vAxis.title = self.chart.description = chart_meta_raw.description;

	        	/* render graph with default agg_function*/
	        	self.normalize_chart_data(  self.config.selected_agg_function  );
		});
	}





	/*
		normalize_chart_data

			summary:
				Expose normalized data with the selected aggregated function
	*/
	this.normalize_chart_data = function (agg_function_key) {
		this.chart.data = normalize_chart_data(  this.chart.data_raw , agg_functions[agg_function_key]  );
		return this.chart.data;
	}


	/*
		update_axis

			summary:
				Update axis labels.
				When changing from LineChart to BarChart axis are interchanged
				so we need to do the same for the axis labels.
				And also the axis are different when running on single Day mode
	*/
	this.update_axis = function (chart_type, single_day_flag) {
		/* Usefull aliases */
		var line_type = this.config.chart_types[0];
		var bar_type = this.config.chart_types[1];
		var description = this.chart.description;

		if ( chart_type === line_type ) {
			this.chart.options.vAxis.title = description;
			this.chart.options.hAxis.title = single_day_flag ? 'Time' : 'Date' ;

		} else if (chart_type === bar_type) { 
			this.chart.options.vAxis.title = single_day_flag ? 'Time' : 'Date' ;
			this.chart.options.hAxis.title = description;			
		}		
	}


	



	/*******
		Single Day functionality
	*******/

	/*
		fetch_single_day

			summary:
				fetch single day data, normalize it, and store it in chart.data.
	*/
	this.fetch_single_day = function (single_day_flag) {
		var self = this;
		var chart_type = this.chart.type;

		/* Only fectch single day data if the user checks single_day mode */
		if (single_day_flag) {
			ChartData.get({id: '1', date: $scope.date}).$promise.then(function (res) {

				self.chart.data_raw = res;
				self.chart.data = normalize_chart_data_by_date(res);
				self.update_axis(chart_type, single_day_flag);
			});	
		}
	}


	/*
		single_day_off

			summary: When turning off single_day mode, then re init the multi day mode

	*/
	this.single_day_off = function (single_day_flag) {
		if ( !single_day_flag) {
        	/* render graph with default agg_function */
        	get_chart_data();
		}
	}


	//kickstart the directive
	get_chart_data();
});

