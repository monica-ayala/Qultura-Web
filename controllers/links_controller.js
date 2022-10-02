const path = require("path");
const filesystem = require('fs');
const Link = require("../models/links");
//const { response } = require("express");

exports.get_links = (request, response, next) => {
    Link.fetchAll()
      .then((rows, fieldData) => {
        response.status(200).json({
          links: rows[0]
        });
    }).catch(err => console.log(err));
};