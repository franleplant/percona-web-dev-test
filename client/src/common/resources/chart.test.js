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
        it('should call getUser with username', inject(function (Chart) {
            $httpBackend.expectGET('/charts/1')
                .respond({
                username: 'test'
            });

            var result = chartResource.get({id: "1" });

            $httpBackend.flush();

            expect('test').toEqual('test');
        }));

    });
});