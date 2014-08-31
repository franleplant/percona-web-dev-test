# Test documentation.

This documentation is provided as part of the test being completed.


## Prerequisites

- Node.js
- Gulp, Bower, Karma, [Protractor](https://github.com/angular/protractor/blob/master/docs/tutorial.md#setup)
- Install Bower dependencies


For the last two:


```sh
cd /path/to/project/root
npm install -g gulp bower karma protractor
#let protractor install its dependencies
webdriver-manager update

cd client
bower install
```


## Run

```sh
cd /path/to/project/root
npm start
```

## Test

### Unit Tests


```sh
cd /path/to/project/root
cd client
gulp test
```

### Integration Tests (E2E)

Integration tests are done with Protractor.

```sh
cd /path/to/project/root
# start the app
npm start &
# start protractor server
webdriver-manager start
# run the tests
protractor integration-tests/protractor.conf.js
```


## Develop

Gulp task that I have used during the development process.
To run the tasks make sure to be inside the **client** directory.

- `gulp index`: inject all javascript source files into the index.html (vendor files are not included)


## Notes

### Resources

In another iteration of this project it will be nice to use `$http` instead of `$resource` 
to get the data from the server so we can implement more control over the parameters needed
for the server calls and more control over the errors that slack or missing parameters will 
generate.

Also it will be desirable to include in the app code a Message Center to display any message to the user (error or status),
and and loader indicator to correctly indicate the user that an ajax call is being processed.

### Directives

I had an issue creating `perconaChart` directive that prevented it from rendering in the site.
I spent almost an hour debugging it and at the end I found out that for some unknown reason this
`angular` version is not rendering element directives and the rest types of directives work fine.
So I ended up using attribute directive.



### Linting

With more time I will probably use a linting tool to lift the code quality.

### Css

With more time and withing a bigger process I definitively use a preprocessor such as Sass or Less.
I personally prefer Less due to its easy integration with the Node.js environment.

Also I will put more thought into the architecture and organization of the Css code.




> Next: original Test basis docs

Percona AngularJS Developer Test
================================

Percona Cloud Tools uses [AngularJS](http://angularjs.org/) for the front end web app (https://cloud.percona.com).

This repo contains a small REST API that uses [Node.js](http://nodejs.org/) to run a local server
with a few sample routes.  Using this API, create an angular.js app that lets the user...

* select one or more charts to show
* select an aggregate function (mix, avg, or max) for each chart (applied to the series data for each day)
* select a single day to show without aggregation
* change the chart style from line to bar

Those are only the basic user requirements.  You can do more if time permits.  The technical requirements
are not specified because that's part of the test: to see what and how you implement as technical solutions
for these user requirements.  We grade results based on:

* Effective use of AngularJS (e.g. directives)
* Overall functionality and usability (including reliability, efficiency, etc.)
* Code design (including style, organization, testing, etc.)
* UX/UI design (no fancy graphics required though)

This task should take about 10 hours or less for an expert JS/AngularJS developer.  You will be paid for you time.

The rest of this readme helps you get set up and running.  Since this is a test, we can't give you answers,
but if some part of the task, this readme, the sample code or data, etc. is not clear, then please email daniel@percona.com.

1. Install Node.js
------------------

As an expert JavaScript developer, we trust that you are already familar with (and probably already running) Node.js.  If not, go to http://nodejs.org to learn how to install it.

2. Set up the application
-------------------------

Run to install dependencies:

```sh
$ npm install
```

3. Start the server
-------------------

Run to start the server:

```sh
$ node app/server.js
Listening on port 3000...
```

4. Test the API
---------------

Browse to http://localhost:3000/charts.  You should get a sample JSON response.

All REST routes are GET (no POST, PUT, etc are implemented). Run the following curl commands from the shell:

`$ curl -X GET http://localhost:3000/charts`
Returns a list of available charts

`$ curl -X GET http://localhost:3000/charts/3`
Returns info about the specific chart id

`$ curl -X GET http://localhost:3000/charts/3/data`
Returns an array of series for each day (if data is available)

`$ curl -X GET http://localhost:3000/charts/3/data/2013-02-01`
Returns an array of data for the specific date

5. Observations
---------------

Only the first days of each month contains data (01 to 07). The data for each month is the same. Don't worry, it's just some sample data for testing purposes.

6. When you're done
-------------------

When you're done, please tarball your app and email it to daniel@percona.com including anything you
would like us to know or to look at specifically.  Thanks in advance for your time and work!
