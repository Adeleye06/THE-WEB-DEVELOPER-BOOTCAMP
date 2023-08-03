//this is not the schema for the data
//it is just for validation of the data that goes into the database 
const Joi = require('joi');


module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
      title: Joi.string().required(),
      price: Joi.number().required().min(0),
      image: Joi.string().required(),
      location: Joi.string().required(),
      description: Joi.string().required(),
    }).required(),
  });

