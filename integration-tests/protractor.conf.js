exports.config = {
    allScriptsTimeout: 11000,

    seleniumAddress: 'http://localhost:4444/wd/hub',

    specs: [ './*.test.js' ],

    capabilities: {
      'browserName': 'chrome'
    },



    baseUrl: 'http://localhost:3000/index.html#',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};