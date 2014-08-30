var express = require('express'), 
    charts = require('./routes/routes.js');

var app = express();
 
app.get('/charts', charts.findAll);
app.get('/charts/:id', charts.findById);
app.get('/charts/:id/data', charts.getChartData);
app.get('/charts/:id/data/:date', charts.getChartDataForDate);


//Static file server
app.use(express.static('./client/src'));
//Enable directory listing
app.use(express.directory('./client/src'));

app.listen(3000);
console.log('Listening on port 3000...');
