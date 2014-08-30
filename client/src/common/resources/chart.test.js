describe('Chart', function () {
    var chartResource, $httpBackend;

    //inject module containing functionality to test
    beforeEach(angular.mock.module('percona.resources.chart'));

    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            chartResource = $injector.get('Chart');
        })
    });


    describe('get', function () {
        it('should return a chart object', inject(function () {
            $httpBackend.expectGET('/charts/1')
                .respond({
                    "id": 1,
                    "name": "mysql",
                    "description":
                    "MySQL Load"
                });

            var result = chartResource.get({id: "1"});

            $httpBackend.flush();

            expect(result.id).toEqual(1);
        }));
    });


    describe('query', function () {

        it('should return an array of charts', inject(function () {
            $httpBackend.expectGET('/charts')
                .respond([{
                    id:1,
                    name:'mysql'
                }, {
                    id:2,
                    name:'cpu'
                }, {
                    id:3,
                    name:'disk-sda01'
                }]);


            var result = chartResource.query();

            $httpBackend.flush();

            expect(result[0].id).toEqual(1);
        }));
    });

});





describe('ChartData', function () {
    var chartDataResource, $httpBackend;

    //inject module containing functionality to test
    beforeEach(angular.mock.module('percona.resources.chart'));

    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            chartDataResource = $injector.get('ChartData');
        })
    });



    describe('get', function () {

        it('should return an object representing the data for the id and date parameters', inject(function () {
            $httpBackend.expectGET('/charts/1/data/2014-07-01')
                .respond({
                    "date":'2014-07-01',
                    'data': [31, 263, 159, 22, 270]
                });

            var result = chartDataResource.get({id: '1', date: '2014-07-01'});

            $httpBackend.flush();

            expect(result.date).toEqual('2014-07-01');
        }));
    });


    describe('query', function () {
        it('should return an array of data corresponding to the id parameter', inject(function () {
            $httpBackend.expectGET('/charts/1/data')
                .respond([
                    {"date":'2014-07-01', 'data': [31, 263, 159, 22, 270]},
                    {"date":'2014-07-02', 'data': [14, 260, 158, 12, 276]},
                    {"date":'2014-07-03', 'data': [24, 265, 164, 19, 269]},
                    {"date":'2014-07-04', 'data': [23, 269, 168, 19, 276]},
                    {"date":'2014-07-05', 'data': [25, 272, 168, 17, 279]},
                    {"date":'2014-07-06', 'data': [ 5, 259, 160,  3, 283]},
                    {"date":'2014-07-07', 'data': [ 5, 257, 159,  4, 288]}
            ]);

            var result = chartDataResource.query({id: "1"});

            $httpBackend.flush();

            expect(result[0].date).toEqual('2014-07-01');
        }));
    });

});