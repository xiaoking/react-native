/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Note: This is a fork of the fb-specific transform.js
 */
'use strict';

var babel = require('babel-core');

function transform(srcTxt, filename, options) {
  var result = babel.transform(srcTxt, {
    retainLines: true,
    compact: true,
    comments: false,
    filename: filename,
    whitelist: [
      'es6.arrowFunctions',
      'es6.blockScoping',
      'es6.classes',
      'es6.destructuring',
      'es6.parameters',
      'es6.properties.computed',
      'es6.properties.shorthand',
      'es6.spread',
      'es6.templateLiterals',
      'es7.asyncFunctions',
      'es7.trailingFunctionCommas',
      'es7.objectRestSpread',
      'flow',
      'react',
      'regenerator',
    ],
    sourceFileName: filename,
    sourceMaps: false,
    extra: options || {},
  });

  return {
    code: result.code,
  };
}

module.exports = function(data, callback) {
  var result;
  try {
    result = transform(
      data.sourceCode,
      data.filename
    );
  } catch (e) {
    callback(e);
    return;
  }

  callback(null, result);
};

// export for use in jest
module.exports.transform = transform;
