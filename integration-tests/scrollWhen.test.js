describe('scrollWhen directive', function() {

    beforeEach(function() {
        browser.get('/');
    });


    it('should scroll into view a newly showed chart', function() {

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