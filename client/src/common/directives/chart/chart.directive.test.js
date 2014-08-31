describe('perconaChart directive', function() {
    var $compile, $rootScope, $httpBackend

    /* Load the module, which contains the directive */
    beforeEach(angular.mock.module('percona.directives.chart'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_){
    	$httpBackend = _$httpBackend_;
      	$compile = _$compile_;
      	$rootScope = _$rootScope_;
    }));


    it('Replaces the element with the appropriate content', function() {

    	var fake_template = 'Im a Fake Template';

    	/* dummy empty server responses */
    	$httpBackend.whenGET('common/directives/chart/chart.tpl.html').respond(fake_template);
        $httpBackend.whenGET('/charts/1').respond({});
        $httpBackend.whenGET('/charts/1/data').respond([]);


        var element = $compile('<div percona-chart chartid="1"></div>')($rootScope);

        $httpBackend.flush();
        /* fire all the watches, so the scope expression {{1 + 1}} will be evaluated */
        $rootScope.$digest();
        /* Check that the compiled element contains the templated content */
        expect(element.html()).toContain(fake_template);
    });
});