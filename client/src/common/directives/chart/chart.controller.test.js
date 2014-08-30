describe('percona.directives.charts DirectiveController', function () {
    var $scope, ctrl;

    //inject module containing functionality to test
    beforeEach(angular.mock.module('percona.directives.chart'));
    beforeEach(angular.mock.module('percona.directives.chart.agg_functions'));
    beforeEach(angular.mock.module('percona.directives.chart.helpers'));

    beforeEach(inject(function($rootScope, $controller, $q, Chart, ChartData, normalize_chart_data, normalize_chart_data_by_date ) {
        var locals = {
            $scope: $rootScope.$new(),
            $q: $q,
            $attrs: {chartId: 1},
            Chart: Chart,
            ChartData: ChartData,
            agg_functions: { avg: function () { return 1; }},
            normalize_chart_data: normalize_chart_data,
            normalize_chart_data_by_date: normalize_chart_data_by_date
        };

        ctrl = $controller('ChartDirectiveCtrl', locals);
    }));


    describe('ChartDirectiveCtrl', function () {

        describe('normalize_chart_data method', function () {
            it('should fill context.chart.data with the proper ChartData', function () {
                var context = {
                    chart: {
                        data_raw:[
                            {"date":'2014-07-01', 'data': [31, 263, 159, 22, 270]},
                            {"date":'2014-07-02', 'data': [14, 260, 158, 12, 276]},
                            {"date":'2014-07-03', 'data': [24, 265, 164, 19, 269]}
                        ]
                    }
                };
                var result = ctrl.normalize_chart_data.call(context, 'avg');


                expect( result.cols.length ).toBeGreaterThan(0);
                expect( result.rows.length ).toEqual(3);
                expect( result ).toEqual( context.chart.data);
            });

        });


        describe('update_axis method', function () {
            it('should update context.chart.options.{vAxis | hAxis}.title with the proper axis Label', function () {

                var context = {
                    config: {
                        chart_types: ["LineChart", "BarChart"]
                    },
                    chart: {
                        description: 'right',
                        options: {
                            vAxis: {title: 'wrong'},
                            hAxis: {title: 'wrong'}
                        }
                    }
                };

                //Run the method LineChart
                ctrl.update_axis.call(context, 'LineChart', false);


                expect( context.chart.options.vAxis.title ).toBe('right');
                expect( context.chart.options.hAxis.title ).toBe('Date');


                //Run the method with BarChart
                ctrl.update_axis.call(context, 'BarChart', false);


                expect( context.chart.options.vAxis.title ).toBe('Date');
                expect( context.chart.options.hAxis.title ).toBe('right');


                //Run the method Line Chart again with single_day_flag = true
                ctrl.update_axis.call(context, 'LineChart', true);


                expect( context.chart.options.vAxis.title ).toBe('right');
                expect( context.chart.options.hAxis.title ).toBe('Time');


                //Run the method with BarChart
                ctrl.update_axis.call(context, 'BarChart', true);


                expect( context.chart.options.vAxis.title ).toBe('Time');
                expect( context.chart.options.hAxis.title ).toBe('right');
            });

        });
    });
});