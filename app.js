var express = require('express');
var app = express();
var request = require('request');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

app.use(urlencodedBodyParser);
app.set('view_engine', 'ejs');
app.use(express.static('public'));

//root page
app.get('/', function (req, res) {
	//send xhr to simulated backend
	xhr.open('GET', 'http://localhost:3000/data/articles.json', true);
	xhr.send();
	xhr.onreadystatechange = processRequest;

	function processRequest(e) {
		if (xhr.readyState == 4 && xhr.status == 200) {
	        var response = JSON.parse(xhr.responseText);

	        //render view using json data
	        res.render('index.html.ejs', {number: 10, articles: response}); //CHANGE NUM
    	}
	}
});

// app.put('/', function(req, res) {

// 	res.render('index.html.ejs', {articles: more-articles});
// });

//make request from server-side, append one by one (but have to duplicate template)
//make request from client-side, pass in as "more-articles" (hidden template on index.html)
//keep the javascript for the template in a separate file, pull it in using "require"


//load more button
//make call to more-articles
//two sorts
//change the number on "unpublished articles"

//refactor and add comments
//css
//break down into partials

app.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});

//running server
app.listen(process.env.PORT || 3000)