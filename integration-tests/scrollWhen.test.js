describe('scrollWhen directive', function() {

    beforeEach(function() {
        browser.get('/');
    });


    describe('Default Behavior', function () {
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

        var checkbox2 = element.all(by.css('.controls > span > input')).get(1);
        var checkbox3 = element.all(by.css('.controls > span > input')).get(2);
        var chart3 = element.all(by.css('[percona-chart]')).get(2);

        /* show the second chart */
        checkbox2.click()
            .then(function () {
                /* show the third chart */
                return checkbox3.click();
            })
            .then(function () {
                return chart3.element(by.css('input[value="min"]')).click();
            })
            .then(function () {
                /* 
                    If the trivial expectation is reached, it means that char3 was clickable
                    which means that chart3 was successfully scrolled into view.
                */
                expect( true ).toBeTruthy();
            }); 
    });  

});