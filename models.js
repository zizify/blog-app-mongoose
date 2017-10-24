'use strict';

const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  created: {type: Date, default: Date.now},
  author: {
    firstName: String,
    lastName: String
  }
});

blogSchema.virtual('authorString').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();});

blogSchema.methods.apiRepr = function() {

  return {
    id: this._id,
    title: this.title,
    created: {type: Date, default: Date.now},
    author: this.authorString
  };
};

const Blog = mongoose.model('Blog', blogSchema);

module.exports = {Blog};