describe('percona.charts.helpers', function () {
    var chartResource, $httpBackend;

    //inject module containing functionality to test
    beforeEach(angular.mock.module('percona.charts.helpers'));
    beforeEach(angular.mock.module('percona.charts.agg_functions'));


    describe('NormalizeChartData', function () {
        it('should return a normalized data object', inject(function (NormalizeChartData, avg) {
            var raw_data = [
                    {"date":'2014-07-01', 'data': [31, 263, 159, 22, 270]},
                    {"date":'2014-07-02', 'data': [14, 260, 158, 12, 276]},
                    {"date":'2014-07-03', 'data': [24, 265, 164, 19, 269]}
            ];


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
                "rows": [
                    {
                        "c": [
                            //v stands for value
                            { "v": raw_data[0].date }, 
                            { "v": avg(  raw_data[0].data  ) }
                        ]
                    }, {
                        "c": [
                            //v stands for value
                            { "v": raw_data[1].date }, 
                            { "v": avg(  raw_data[1].data  ) }
                        ]
                    }, {
                        "c": [
                            //v stands for value
                            { "v": raw_data[2].date }, 
                            { "v": avg(  raw_data[2].data  ) }
                        ]
                    }
                ]
            };

            

            expect(  NormalizeChartData(raw_data, avg)  ).toEqual(  normalized_data  );
        }));
    });


    describe('NormalizeChartDataByDate', function () {
        it('should return a normalized data object', inject(function (NormalizeChartDataByDate) {
            var raw_data = {"date":'2014-07-01', 'data': [31, 263, 159]};


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
                "rows": [
                    {
                        "c": [
                            { "v": 0 },
                            { "v": raw_data.data[0] }
                        ]
                    }, {
                        "c": [
                            { "v": 1 },
                            { "v": raw_data.data[1] }
                        ]
                    }, {
                        "c": [
                            { "v": 2 },
                            { "v": raw_data.data[2] }
                        ]
                    }
                ]
            };

            

            expect(  NormalizeChartDataByDate(raw_data)  ).toEqual(  normalized_data  );
        }));
    });
});