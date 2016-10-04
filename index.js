'use strict';

//------------------------------------------------------------------------------
// Requires
//------------------------------------------------------------------------------

const api = require('./lib/api-client');

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

const NutshellApiClient = function(args) {
  const self = this;
  let options = {
    method   : 'POST',
    path     : '/api/v1/json',
    username : args.username,
    password : args.password
  };

  this.nutshellPromise = new Promise((resolve, reject) => {
    api.newNutshell(options, function (err, nutshell) {
      if (err) {
        return reject(err);
      }
      resolve(nutshell);
    });
  })


  this.find = function (entity, args, cb) {
    let findArgs = { entity };
    if (args.qty) {
      findArgs.qty = args.qty;
    }
    if (args.orderBy) {
      findArgs.orderBy = args.orderBy;
    }
    if (args.orderDirection) {
      findArgs.orderDirection = args.orderDirection;
    }
    if (args.filter) {
      findArgs.filter = args.filter;
    }
    if (args.query) {
      findArgs.query = args.query;
    }
    self.nutshellPromise.then(nutshell => nutshell.find(findArgs, function (err, results) {
      if (err) {
        console.error(err);
        return cb(err);
      }
      cb(null, results);
    }));
  };

  this.get = function(entity, entityId, cb) {
    self.nutshellPromise.then(nutshell => {
      nutshell.get(entity, entityId, cb);
    }).catch(err => console.log('nutshell unavailable', err));
  };
};

module.exports = NutshellApiClient;
