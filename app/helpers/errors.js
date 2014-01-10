'use strict';

var errors = require('errors');

module.exports = function () {
  
  global.BadRequestError = errors.create({
    name: 'BadRequest',
    code: 400
  });

  global.UnauthorizedError = errors.create({
    name: 'Unauthorized',
    code: 401
  });

  global.ForbiddenError = errors.create({
    name: 'Forbidden',
    code: 403,
    defaultMessage: 'You don\'t have permission to access'
  });

  global.NotFoundError = errors.create({
    name: 'NotFound',
    code: 404
  });

};