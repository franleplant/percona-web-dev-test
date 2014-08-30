describe('agg_functions', function () {
    //inject module containing functionality to test
    beforeEach(angular.mock.module('percona.charts.agg_functions'));

    describe('avg', function () {
    	it('should calculate the average of a array of numbers', inject(function (avg) {
    		expect(  avg([2,2,2,2,2,2])  ).toEqual(2);
    		expect(  avg([1,2])  ).toEqual(1.5);
    	}));

    	it('should throw and error if the array contains something else other than a number', inject(function (avg) {
    		expect(function () { avg([2,2,'dog',2,2,2]) }).toThrow();
    		expect(function () { avg([{wrong: 123}]) }).toThrow();
    	}));

    });

    describe('max', function () {
    	it('should calculate the max of a array of numbers', inject(function (max) {
    		expect(  max([2,2,2,2,2,2])  ).toEqual(2);
    		expect(  max([1,2,3, 100])  ).toEqual(100);
    		expect(  max([0.1, 0, 0.2])  ).toEqual(0.2);
    	}));

    	it('should throw and error if the array contains something else other than a number', inject(function (max) {
    		expect(function () { max([2,2,'dog',2,2,2]) }).toThrow();
    		expect(function () { max([{wrong: 123}]) }).toThrow();
    	}));

    });


    describe('min', function () {
    	it('should calculate the average of a array of numbers', inject(function (min) {
    		expect(  min([2,2,2,2,2,2])  ).toEqual(2);
    		expect(  min([1,2,3, 100])  ).toEqual(1);
    		expect(  min([0.1, 0, 0.2])  ).toEqual(0);
    	}));

    	it('should throw and error if the array contains something else other than a number', inject(function (min) {
    		expect(function () { min([2,2,'dog',2,2,2]) }).toThrow();
    		expect(function () { min([{wrong: 123}]) }).toThrow();
    	}));

    });
});