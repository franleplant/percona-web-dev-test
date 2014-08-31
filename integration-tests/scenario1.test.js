describe('Percona Developer Test', function() {

    beforeEach(function() {
        browser.get('/');
    });


    describe('Basics', function () {
        it('should have a title', function() {

            expect(browser.getTitle()).toEqual('Percona Developer Test');
        });       
    });


    describe('Charts default view', function () {
        it('should display the first chart and hide the others by default', function() {

           
            expect(   element.all(by.css('[percona-chart]')).first().isDisplayed()   ).toBeTruthy();
            expect(   element.all(by.css('[percona-chart]')).get(1).isDisplayed()   ).toBeFalsy();
            expect(   element.all(by.css('[percona-chart]')).get(2).isDisplayed()   ).toBeFalsy();
        });     

        it('should have the first checkbox checked and the rest unchecked to match the Charts being showed', function() {

            element.all(by.css('.controls > span > input'))
                .first()
                .getAttribute('checked')
                .then(function (checked) {
                    
                    expect(checked).toBeTruthy();
            });

            element.all(by.css('.controls > span > input'))
                .get(1)
                .getAttribute('checked')
                .then(function (checked) {
                    
                    expect(checked).toBeFalsy();
            });

            element.all(by.css('.controls > span > input'))
                .get(2)
                .getAttribute('checked')
                .then(function (checked) {
                    
                    expect(checked).toBeFalsy();
            });
        });    
    });


    it('should display / hide the first chart when the first control checkbox is checked / unchecked', function() {

        var checkbox = element.all(by.css('.controls > span > input')).first();
        var chart = element.all(by.css('[percona-chart]')).first();

        
        checkbox.click()
            .then(function () {
                expect(   chart.isDisplayed()   ).toBeFalsy();
            })
            .then(function () {
                return checkbox.click();
            })
            .then(function () {
                expect(   chart.isDisplayed()   ).toBeTruthy();
            })           
    });  

});