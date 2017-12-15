// var firebase = require("firebase");

// // Leave out Storage
// //require("firebase/storage");

// // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyAvcpURPx5O22GQJHiJUc8yT32PaXLS19U",
//     authDomain: "webcrawl-ae6ad.firebaseapp.com",
//     databaseURL: "https://webcrawl-ae6ad.firebaseio.com",
//     projectId: "webcrawl-ae6ad",
//     storageBucket: "webcrawl-ae6ad.appspot.com",
//     messagingSenderId: "494351860955"
//   };
//   firebase.initializeApp(config);

var express = require('express');
var app = express();
var url = 'http://dcard.tw/_api/posts/';
var commentUrl = 'http://dcard.tw/_api/posts/'
var date;
var data = [];
var postData = [];
var commentData = [];
var request = require('request');
var c = 0;

for (var i = 227908491-300000; i > 227908491-303000; i--){
	request(url+i, function(err, res, body){//request post

		if (body) {//prevent default
			var post = JSON.parse(body);
			c++;
			console.log(c,post.likeCount, post.createdAt)
			if (parseInt(post.likeCount) > 10000){
				data[post.id]= post;
			}
		}
	});
}



app.get('/', function (req, res) {
	// res.send(data);
	res.render('index.ejs', {post: data});
});

app.get('/:id', function(req, res){
	console.log('req', req.params.id);
	request(commentUrl+JSON.stringify(req.params.id)+'/comments', function(err, res, body){//request comments
		if (body) {//prevent default
			commentData = JSON.parse(body);
		}
	});
	res.render('article.ejs', {postData: data[req.params.id], commentData: commentData});
	console.log(postData, commentData);
});

app.listen(5000, function () {
  console.log('app listening on port 5000!');
});
