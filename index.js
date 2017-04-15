'use strict';
const JSONAPISerializer = require('jsonapi-serializer').Serializer;

function jsonapify(data, model, selfUrl) {
  return new JSONAPISerializer(model.name, data, {
    topLevelLinks: {
      self: selfUrl
    },
    attributes: Object.keys(model.attributes).filter(function(attribute) {
      return !model.attributes[attribute].primaryKey;
    })
  });
}

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    hook.result = jsonapify(hook.result.data, hook.service.Model, hook.path);
    return Promise.resolve(hook);
  };
};