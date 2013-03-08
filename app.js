var express = require('express'),
	app = express(),
	argv = require('optimist').argv,
	http = require('http'),
	server = http.createServer(app);
	
var _ = require('underscore'),
	Deferred = require('deferred'),
	Async = require('async');
	
var cons = require('consolidate'),
	swig = require('swig'),
	mongo = require('mongoskin');
	
	
swig.init({
    root: __dirname + '/views',
    allowErrors: true
});
	
app.configure(function () {

	//app.use(express.favicon(__dirname + '/public/favicon.ico', {maxAge: 86400000}));
    app.use(express.static(__dirname + '/public'));

	app.use(express.compress());
	app.use(express.bodyParser());
	app.use(express.cookieParser());
				
	app.engine('.html.twig', cons.swig);
	app.set('view engine', 'html.twig');
	app.set('views', __dirname + '/views');
    app.set("view options", { layout: false });

});
	
app.get('/', function (req, res) {

	res.render('index');
	
});
	
app.get('/status', function (req, res) {
	
	var pjson = require('./package.json');
	
	return res.send({
		status: 'running',
		environment: app.get('site'),
		version: pjson.version
	});
	
});
	
var portscanner = require('portscanner'),
	port_range = [5000, 5010];

portscanner.findAPortNotInUse(port_range[0], port_range[1], 'localhost', function (error, _port) {

	var port = argv.port || process.env.PORT || _port;

	server.listen(port, function () {
		console.log('Listening on Port ' + port);
	});

});