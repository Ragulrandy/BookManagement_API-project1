const books =  [
{
  ISBN:4545,
title:"who are you my husband",
pubdate:"25-09-2000",
language:["tamil","english"],
numpage:200,
author:[1,2],
category:["thrilling","fiction","ganster"],
publication:[1],
},
{
  ISBN:2828,
title:"deep sea",
pubdate:"25-01-2000",
language:["french"],
numpage:200,
author:[2],
category:["education"],
publication:[2],
},
];

const authors = [
  {
    id:1,
    name:"robert",
    books:["who are you my husband"],
  },
  {
    id:2,
    name:"sunny john",
    books:["who are you my husband","deep sea"],
  }
];

const publication = [
  {
  id:1,
  name:"crack heads",
  books:"who are you my husband",
 },
   {
   id:"2",
   name:"jacky",
   books:[]
 },

];


module.exports = {books,authors,publication};
