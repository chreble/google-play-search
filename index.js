var util = require('util');
var _request = require('request');
var parser = require('whacko');
var config = require('./config');
var htmlToText = require('html-to-text');

exports.fetch = function(playId, lang, callback) {
  if(!callback) {
    callback = lang;
    lang = 'en';
  }
  var url = util.format(config.url, playId, lang);
  parse(playId, url, config, callback);
};

exports.request = function(url, callback) {
  _request(url, callback);
};

var parse = function(playId, url, config, callback) {
  var result = {
    url: url,
    pkgName: playId[0]
  };

  var mainSelector = config.mainSelector;
  var selectors = config.selectors;
  exports.request(url, function(error, response, body) {
    if(error) return callback(error);

    var $ = parser.load(body);
    selectors.forEach(function(selector) {
      var el = mainSelector + ' ' + selector.selector;
      var match = $(el), val;
      // handle selectors that are returning multiple elements
      if (match.length > 1) {
        val = [];
        for (m in match) {
          if (typeof match[m].attribs !== 'undefined') {
            var v = match[m].attribs[selector.attr];
            if (selector.replacer) {
              v = v.replace(selector.replacer[0], selector.replacer[1]);
            }
            val.push(v);
          }
        }
      } else {
        val = selector.attr
          ? match.attr(selector.attr)
          : match.text().trim();
        // post replacement
        if (selector.replacer) {
           val = val.replace(selector.replacer[0], selector.replacer[1]);
        }
        // convert output (explicitly) to text?
        if (selector.text === true) {
          val = htmlToText.fromString(val);
        }
      }
      result[selector.property] = val;
    });
    callback(null, result);
  });
};
