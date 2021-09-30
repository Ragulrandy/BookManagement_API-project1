require("dotenv").config()

const express = require("express");

const database = require("./database/database");

const booky = express();

const bodyParser = require("body-parser");

//models
const BookModel = require("./database/book");
const AuthorModel= require("./database/author");
const PublicationModel = require("./database/publication");


// mongoose
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log("connection is working"));

booky.use(bodyParser.urlencoded({
  extended: true
}));

booky.use(bodyParser.json());




//api for whole books list
booky.get("/",async (req, res) => {
const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
});

//api for specific books
booky.get("/book/specific/:isbn",async (req, res) => {
  const specificBooks = await BookModel.findOne({ISBN: req.params.isbn});

  if (!specificBooks) {
    return res.json({
      error: `no book is found: ${req.params.isbn}`
    })
  };

  return res.json(specificBooks);
});

//api for books based on category
booky.get("/book/category/:cat", async (req, res) => {
  const getCategory = await BookModel.findOne({category: req.params.cat});



  if (!getCategory) {
    return res.json({error: `no book is found based on this category: ${req.params.cat}`});
  };

  return res.json(getCategory);

});


//api for books based on language
booky.get("/l/:language",async (req, res) => {
  const getlanguage = await BookModel.findone({language: req.params.language});

  if (!getlanguage) {
    return res.json({error: `no book is found based on this language:${req.params.language}`});
  };

 return res.json(getlanguage);

 });

                            /**********post method************/

//api for add new books
booky.post("/book/new", async (req, res) => {
  const {newBook} = req.body;
  const addNewBook = BookModel.create(newBook);
  return res.json({
  data:addNewBook,
  message:"!!!book was added!!!"
});
});


            /************************put method**********************/

            booky.put("/update/author/:isbn", async (req, res) => {
              const updateAuthor = await BookModel.findOneAndUpdate(
                {ISBN: req.params.isbn},
                {
                $addToSet:{
                  author: req.body.newAuthor
                  }
                },
                {new: true}
              );

              const updatebook = await AuthorModel.findOneAndUpdate(
                {id: req.body.newAuthor},
                {
                $addToSet:{
                  books: req.params.isbn
                  }
                },
                  {new: true}
              );



              return res.json({
                book: updateAuthor,
                author:updatebook,
                message: "!!!!!successfully updated!!!!!"
              });

            });


                        /************************delete method**********************/


//api for delete whole book
  booky.delete("/books/delete/:isbn",async (req, res) => {
    const newUpatedBooks = await BookModel.findOneAndDelete(
      {
       ISBN: req.params.isbn
         }
          );

        return res.json(newUpatedBooks);
            });



  //api for delete author from book and delete book from author

  //delete author from book
  booky.delete("/book/update/author/:isbn/:authorid",async (req, res) => {
     const newUpdatedAuthor = await BookModel.findOneAndUpdate(
     {ISBN: req.params.isbn},
     {
       $pull:{
           author:  req.params.authorid
       }

     },
     {new: true}

    );

  const newUpdatedBook = await AuthorModel.findOneAndUpdate(
  {id: req.params.authorid},
  {
    $pull:{
        books: req.params.isbn
    }

  },
  {new: true}

 );



    res.json({
    book:  newUpdatedAuthor,
    author: newUpdatedBook
    });

  });





  ///////////////////////////////             AUTHORS               ///////////////////////////////////


//api for authors
booky.get("/authors",async (req, res) => {
 const getAllAuthors = await AuthorModel.find();
  return res.json(getAllAuthors);
});



//api for specific authors
booky.get("/authors/:id",async (req, res) => {
  const getSpecificAuthors = await AuthorModel.findOne(
    {id: req.params.id}
  );


  if (!getSpecificAuthors) {
    return res.json({
      data: `no author is found:${req.params.id}`
    });
  };

  return res.json(getSpecificAuthors);
});



//api for authors based on books
booky.get("/authors/book/:h",async (req, res) => {
  const books = await AuthorModel.find({
    books: req.params.h
  });

  if (!books) {
    return res.json({
      error: `no book is found based on this author:${req.params.h}`
    })
  };

  return res.json(books);

});

                       /******post method********/

booky.post("/author/new",async (req,res) =>{
  const {newAuthor} = req.body
  const addAuthor = await AuthorModel.create(newAuthor)

  res.json({
    data:addAuthor,
    message:"!!!!!author added!!!!!!!!!"
  });
});



            /*****************delte method*****************/

//api for delete whole author
    booky.delete("/author/delete/:id",async (req, res) => {
       const newUpatedAuthor = await AuthorModel.findOneAndDelete(
          {
             id: req.params.id
               }
               );
            return res.json(newUpatedAuthor);
                  });




                  /*******************************publication*******************************************/


               /**********getmethod***********/
//api for publication
booky.get("/pub", async (req, res) => {
  const getAllPublication = await  PublicationModel.find();
  return res.json(getAllPublication);
});

//api for specific publication
booky.get("/pub/:id",async (req, res) => {
  const pub = await PublicationModel.findOne(
    {
      id: req.params.id
    }
  );

  if (!pub) {
    return res.json({
      data: `no publication is found:${req.params.id}`
    });
  };

  return res.json(pub);

});

//api for publication based on books
booky.get("/pub/book/:p",async (req, res) => {
  const getSpecificPub = await PublicationModel.findOne(
    {
      books: req.params.p
    }
  );


  if (!getSpecificPub) {
    return res.json({
      error: `no book is found based on this author:${req.params.p}`
    })
  };

  return res.json(getSpecificPub);

});

           /*********************post method******************/
//api for add new pub

booky.post("/pub/new",async (req,res) => {
 const {newPub} = req.body;
  const updateNewPub = await PublicationModel.create(newPub);
  res.json({
    data: updateNewPub,
    message:"!!!!!!pub added!!!!!!!!!"
  });
});

                 /*****************delte method*****************/


//api for delete pub
booky.delete("/pub/delete/:id",async (req,res) => {
  const updatedPub = await PublicationModel.findOneAndDelete(
    {
      id: req.params.id
    }
  );
  res.json(updatedPub);
});




booky.listen(3000, () => {
  console.log("server is up and running");
});
