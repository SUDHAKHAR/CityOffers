(function() {
 
  'use strict';
  var express = require('express');
  var router = express.Router();
  var mongojs = require('mongojs');
  var db =mongojs('mongodb://sudhakar:umasan57@ds047792.mongolab.com:47792/cityoffers', ['logins']); 
 var db1 =mongojs('mongodb://sudhakar:umasan57@ds047792.mongolab.com:47792/cityoffers', ['merchantlogins']); 
 
  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index');
  });
 
  router.get('/api/logins', function(req, res) {
	  
    db.logins.find(function(err, data) {
      res.json(data);
    });
  });
 router.get('/api/merchantlogins', function(req, res) {
	  
    db1.merchantlogins.find(function(err, data) {
      res.json(data);
    });
  });
 
 
  router.post('/api/logins', function(req, res) {
	  
	  console.log("This is index.js is index.js save");
    db.logins.insert(req.body, function(err, data) {
      res.json(data);
	  console.log("This is in index.js server");
    });
 
  });
  router.post('/api/merchantlogins', function(req, res) {
	  
	  console.log("This is index.js Merchantlogins is index.js save");
    db1.merchantlogins.insert(req.body, function(err, data) {
      res.json(data);
	  console.log("This is in merchant logins index.js server");
    });
 
  });
  router.put('/api/logins', function(req, res) {
 
    db.logins.update({
      _id: mongojs.ObjectId(req.body._id)
    }, {
      isCompleted: req.body.isCompleted,
      login: req.body.login
    }, {}, function(err, data) {
      res.json(data);
    });
 
  });
 
  router.delete('/api/logins/:_id', function(req, res) {
    db.logins.remove({
      _id: mongojs.ObjectId(req.params._id)
    }, '', function(err, data) {
      res.json(data);
    });
 
  });
 
  module.exports = router;
 
}());
