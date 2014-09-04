var Blowfish = require('blowfish');


module.exports = function (req, res, next) {
  'use strict';
  var bf = new Blowfish('82b80c01e8b0a609a460162b99614135'),
  date = new Date(),
  randomString = 'GW' + date.getTime(),
  newCookieValue = bf.encrypt(randomString);

  if( req.method != 'GET' &&
    req.method != 'OPTIONS' &&
    req.method != 'HEAD'){
    if(req.cookies.CoolSunglasses){
      if(bf.decrypt(req.cookies.CoolSunglasses) === req.session.CoolSunglasses){
        next();
      }else{
        res.status(403);
        res.send('Invalid Token');
      }
    }else{
      req.session.CoolSunglasses = randomString;
      res.cookie('CoolSunglasses',newCookieValue, { maxAge: 900000, httpOnly: true });
      next();
    }
  }else{
    next();
  }
};
