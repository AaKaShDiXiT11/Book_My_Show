require("dotenv").config();


const express= require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
//data based
const database= require("./data base/database");

//models
const BookModel = require("./data base/book");
const AuthorModel = require ("./data base/author");
const PublicationModel = require ("./data base/publication")

 //initialise express
const booky = express();

booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());



mongoose.connect(process.env.MONGO_URL,
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log("Connection Established"));


/*
 Route        /
 Description  Get all books
 Access       public
 parameter    none
 Methods      Get
*/

booky.get("/",async (req,res) => {
const getAllBook = await BookModel.find();

  return res.json(getAllBook);
});

/*
 Route        /is
 Description  Get specific books on ISBN
 Access       public
 parameter    isbn
 Methods      Get
*/

booky.get("/is/:isbn",async (req,res) => {

const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});

//null !0 =1 ,!1=0
  if(!getSpecificBook) {
    return res.json({error: `No Book found for the ISBN of ${req.params.isbn}`});
  }

  return res.json({book: getSpecificBook});
});

/*
 Route        /c
 Description  Get specific books on catagory
 Access       public
 parameter    catagory
 Methods      Get
*/

booky.get("/c/:category", async (req,res) => {
  const getSpecificBook = await BookModel.findOne({category: req.params.category});

  if(!getSpecificBook) {
    return res.json({error: `No book found for the catagory of ${req.params.category}`});
  }

  return res.json({book: getSpecificBook});
});

/*
 Route        /author
 Description  Get all authors
 Access       public
 parameter    none
 Methods      Get
*/

booky.get("/author", async (req,res) => {
  const getAllAuthors = await AuthorModel.find();
  return res.json(getAllAuthors);
});

/*
 Route        /author/book
 Description  Get all  AUTHORS based on book
 Access       public
 parameter    isbn
 Methods      Get
*/

booky.get("/author/book/:isbn", (req,res) => {
  const getSpecificAuthor = database.author.filter(
    (author) => author.book.includes(req.params.isbn)
  );

  if(getSpecificAuthor.length === 0){
    return res.json({
      error:`No author found for the book of ${req.params.isbn}`
    });
  }
 return res.json({authors: getSpecificAuthor});
});



/*
Route            /author/book
Description      Get all authors based on books
Access           PUBLIC
Parameter        isbn
Methods          GET
*/

booky.get("/publications",async (req,res) => {
  const getAllPublications = await PublicationModel.find();
  return res.json(getAllPublications);
})

//post

/*
Rout              /book/new
Description       add new Books
Access            PUBLIC
Parameter         none
Methods           post
*/

booky.post("/book/new", async (req,res) =>{
  const {newBook } = req.body;
  const addNewBook = BookModel.create(newBook);
  return res.json({
    books: addNewBook,
    message: "Book was added !!!!"
  });
});

/*
Rout              /author/new
Description       add new authors
Access            PUBLIC
Parameter         none
Methods           post
*/

booky.post("/author/new", async (req,res) =>{
  const {newAuthor } = req.body;
  const addNewAuthor = AuthorModel.create(newAuthor);
  return res.json(
    {
      author: addNewAuthor,
      message: "Author was added !!!"
    }
  );
});

/*
Rout              /publication/new
Description       add new publication
Access            PUBLIC
Parameter         none
Methods           post
*/
booky.post("/publication/new", (req,res) => {
  const newPublication = req.body;
  database.publication.push(newPublication);
  return res.json(database.publication);
});
/*****PUT*******/

/*
Route            /publication/update/book
Description      update or add new publication
Access           PUBLIC
Parameter        isbn
Methods          put
*/

booky.put("/book/update/:isbn",async (req,res) => {
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn
    },
    {
      title: req.body.bookTitle
    },
    {
      new: true
    }
  );
  return res.json({
    books:updatedBook
  });
});

/*****update new author*******/

/*
Route            /publication/update/book
Description      update or add new publication
Access           PUBLIC
Parameter        isbn
Methods          put
*/

booky.put("/book/author/update/:isbn", async(req,res)=> {
  //update Database
const updatedBook = await BookModel.findOneAndUpdate(
  {
    ISBN: req.params.isbn
  },
  {
    $addToSet: {
      authors: req.body.newAuthor
    }
  },
  {
    new: true
  }
);
//Update authoer database

const updatedAuthor = await AuthorModel.findOneAndUpdate(
  {
    id: req.body.newAuthor
  },
  {
    $addToSet: {
      books: req.params.isbn
    }
  },
  {
    new: true
  }
);
return res.json({
  books:updatedBook,
  authors: updatedAuthor,
  message:"new Author was added"
});
});












/*
Route            /publication/update/book
Description      update or add new publication
Access           PUBLIC
Parameter        isbn
Methods          put
*/
booky.put("/publication/update/book/:isbn", (req,res) => {
  //update the publication database
  database.publication.forEach((pub) => {
    if(pub.id === req.body.pubId){
      return pub.book.push(req.params.isbn);
    }
  });
  //upadate the book data based
  database.book.forEach((book)=>{
    if(book.ISBN === req.params.isbn) {
      book.publication =req.body.pubId;
      return;
    }
  });

  return res.json(
    {
      books: database.books,
      publications: database.publication,
      massage:"successfully updated the publication"
    }
  );
});

/*****DELETE******/
/*
Rout              /book/delete
Description       delete a Books
Access            PUBLIC
Parameter        isbn
Methods           Delete
*/

booky.delete("/book/delete/:isbn", async (req,res) => {
  //whichever book that dosenot matches with the isbn , just send it to an updateBookDatabase
  //and rest will be filtered out
const updatedBookDatabase = await BookModel.findOneAndDelete(
  {
    ISBN: req.params.isbn
  }
);

return res.json({
  books:updatedBookDatabase
})
});
/*
Rout              /book/delete/author
Description       delete an author from a book and vice versa
Access            PUBLIC
Parameter        isbn,authorId
Methods           Delete
*/

booky.delete("/book/delete/author/:isbn/:authorId", (req,res) => {
  //Update book database
  database.book.forEach((book)=>{
    if(book.ISBN === req.params.isbn) {
      const newAuthorList= book.author.filter(
        (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
      );
      book.author = newAuthorList;
      return;
    }
  });

  // update the author database
  database.author.forEach((eachAuthor) => {
    if(eachAuthor.id ===parseInt(req.params.authorId)){
      const newBookList = eachAuthor.book.filter(
        (book) => book !== req.params.isbn
      );
      eachAuthor.books = newBookList;
      return;
    }
  });
  return res.json({
    book: database.book,
    author: database.author,
    message: "Author was delete!!!!"
  });
});


booky.listen(3000,()=> {
  console.log("server is up and running" );
});
