const mongoose = require("mongoose");

const BookSchema = mongoose.Schema(
  {
    ISBN:Number,
  title:String,
  pubdate:Number,
  language:[String],
  numpage:Number,
  author:[Number],
  category:[String],
  publication:[Number],
  }
);

const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;
