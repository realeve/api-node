'use strict';

// had enabled by egg
// exports.static = true;

exports.cors = {
    enable: true,
    package: 'egg-cors',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true
};

exports.validate = {
    enable: true,
    package: 'egg-validate',
};