#!/usr/bin/env/ node

var play = require('google-play-search');
play.fetch(process.argv.slice(2), function(err, gameData) {
  console.log(gameData);
});
