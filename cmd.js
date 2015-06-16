#!/usr/bin/env/ node

var play = require('./index.js');
play.fetch(process.argv.slice(2), function(err, gameData) {
  console.log(gameData);
});
