var express = require('express');
var app = express();
var request = require('request');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var cookieParser = require('cookie-parser');
var _ = require('underscore');
var index = 0;
var sort;

app.use(cookieParser());
app.use(urlencodedBodyParser);
app.set('view_engine', 'ejs');
app.use(express.static('public'));

//check for stored sort preference
function checkSort (req) {
	if (req.cookies.sort) {
		sort = req.cookies.sort;
	} else {
		sort = 'submit-time';
	}
}

//logic to grab json data
function grabData (url, callback) {
	//send xhr to simulated backend
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.send();
	xhr.onreadystatechange = processRequest;

	function processRequest(e) {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var response = JSON.parse(xhr.responseText);

			//sort with stored preference, defaults to submit-time
			if (sort === 'words') {
				response = _.sortBy(response, 'words').reverse();
			} else if (sort === 'submit-time') {
				response = _.sortBy(response, 'publish_at').reverse();
			}
			//decide what to do with response data
			callback(response);
		}
	}

	setTimeout(function() {
		xhr.abort();
	}, 1000);
}

//prepopulate root page with articles.json
app.get('/', function (req, res) {
	checkSort(req);

	grabData('http://localhost:3000/data/articles.json', function (response){
		
		grabData('http://localhost:3000/data/more-articles.json', function (moreResponse){
			var sumArticles = response.length + moreResponse.length;

			//render view using json data
			res.render('index.html.ejs', {number: sumArticles, articles: response}); 
		});
	});	

});

//front-end will make request to this route to grab more-articles.json
app.get('/loadmorearticles', function (req, res) {
	checkSort(req);

	grabData('http://localhost:3000/data/more-articles.json', function (response) {
		if (index <= response.length) {
			//send data to client-side in groups of 10
			response = response.splice(index, 10);
			//'art' variable used in table.html.ejs
			res.send({art: response});

			index += 10; 	        	
		}
	});
});

//front-end will store sort cookie
app.post('/sort', function (req, res) {
	res.redirect('/');
})

//two solutions:
//figure out how to check and abort existing xhr
//sort without hitting a new route (or adding to xhr)

app.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});

//running server
app.listen(process.env.PORT || 3000)