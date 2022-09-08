const path = require("path");
const filesystem = require('fs');
//const Museo = require("../models/museo");
//const { response } = require("express");

exports.view = (request, response, next) => {
    response.render('guias');
  };