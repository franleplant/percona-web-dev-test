angular.module('percona.charts.helpers', [
])


/**
	NormalizeChartData

		summary:
				Helper function to transform chart data that comes from the server into
				a chart suitable data format
*/
.factory('NormalizeChartData', function () {

	var i, len;


	/*
		Tiny col "constructor" helper
	*/
	function col_factory(date, data) {
		return {
			"c": [
                //v stands for value
                { "v": date }, 
                { "v": data }
            ]
		};
	}

	return function (raw_chart_data, agg_function) {
		var normalized_data = { 
			//Headers               
            "cols": [{
                    "id": "date",
                    "label": "Date",
                    "type": "string"
                },{
                    "id": "value",
                    "label": "Value",
                    "type": "number"                    
            }],

            //actual data
            "rows": []
        };

        for (i = 0, len = raw_chart_data.length; i < len; i ++) {
			normalized_data.rows.push(
				col_factory(
					raw_chart_data[i].date, 
					agg_function(raw_chart_data[i].data)
				)
			);
		}


		return normalized_data;
	};
})


/**
	NormalizeChartDataByDate

			summary:
					Modified helper specialized into transforming single date single data serie

*/
.factory('NormalizeChartDataByDate', function () {

	var i, len;


	/*
		Tiny col "constructor" helper
	*/
	function col_factory(index, data) {
		return {
			"c": [
                //v stands for value
                { "v": index},
                { "v": data }
            ]
		};
	}

	return function (raw_chart_obj) {
		var normalized_data = { 
			//Headers               
            "cols": [{
                    "id": "dependant_axis",
                    "label": "dependant_axis",
                    "type": "number"                    
            }, {
                    "id": "value",
                    "label": "Value",
                    "type": "number"                    
            }],

            //actual data
            "rows": []
        };

        var raw_chart_data = raw_chart_obj.data;

        for (i = 0, len = raw_chart_data.length; i < len; i ++) {
			normalized_data.rows.push(
				col_factory( i, raw_chart_data[i]	)
			);
		}


		return normalized_data;
	};
});