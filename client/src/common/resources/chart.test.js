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