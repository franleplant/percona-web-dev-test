angular.module('percona.directives.chart.agg_functions', [

])

.constant('COMPARATOR_CONSTANT', 10000000)

.factory('avg', function () {
	return function avg(array) {
		var avg;
		
		array.forEach(function (e, index) {
			
			//Type safe
			if (typeof e !== 'number') {
				throw new Error('percona.charts.agg_functions.avg: the input array must contain only numbers');
			}


			if (index === 0) {
				avg = e;
			} else {
				avg = (avg + e)/2;
			}
			
		});

		return avg;
	};
})

.factory('max', function (COMPARATOR_CONSTANT) {
	return function max(array) {
  		var max = -COMPARATOR_CONSTANT;
		array.forEach(function (e) {

			//Type safe
			if (typeof e !== 'number') {
				throw new Error('percona.charts.agg_functions.avg: the input array must contain only numbers');
			}


			if(e > max) {
				max = e;
			}
		});

		return max;
	};
})

.factory('min', function (COMPARATOR_CONSTANT) {
	return function min(array) {
		var min = COMPARATOR_CONSTANT;
		array.forEach(function (e) {

			//Type safe
			if (typeof e !== 'number') {
				throw new Error('percona.charts.agg_functions.avg: the input array must contain only numbers');
			}

			if(e < min) {
				min = e;
			}
		});

		return min;
	};
})

.factory('agg_functions', function (avg, max, min) {
	return {
		avg: avg,
		max: max,
		min: min
	}
});

