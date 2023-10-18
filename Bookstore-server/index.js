const express = require("express");
const app = express();
const port = process.env.port || 5000;
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

// defining Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: { type: [String], required: true },
  price: { type: Number, required: true },
  isbn: { type: String, required: true },
  language: { type: String, required: false },
  num_pages: { type: Number, required: false },
  publisher: { type: String, required: true },
  imageURL: { type: String, required: false },
  category: { type: String, required: true },
  bookDescription: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
const Book = mongoose.model("Book", bookSchema);

dotenv.config();

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//MongoDB config code

// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const uri =
//   "mongodb+srv://mern-bookstore-server:73wayAE1teu8tshm@cluster0.nna9dbf.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

const isAuthenticated = (req, res, next) => {
  try {
    const user = jwt.verify(req.headers.token, process.env.JWT_SECRET_KEY);
    req.user = user;
  } catch (error) {
    return res.json({ status: 401, message: "Please login first" });
  }
  next();
};

app.get("/authenticate", isAuthenticated, (req, res) => {
  res.send({ status: 202, message: "user authenticated" });
});

app.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      let passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const jwtToken = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
          expiresIn: "2h",
        });
        return res.send({
          status: 200,
          message: "User logged in successfully",
          name: user.name,
          jwtToken,
        });
      }
    }
    res.send({ status: 401, message: "Incorrect credentials" });
  } catch (error) {
    next(new Error("Something went wrong! Please try after some time."));
  }
});

app.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        status: 403,
        message: "User already exists with the provided email",
      });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: encryptedPassword,
    });
    const jwtToken = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "12h",
    });
    res.send({
      status: 200,
      message: "User created successfully",
      name,
      jwtToken,
    });
  } catch (error) {
    next(
      new Error("Something went wrong! Please try after some time." + error)
    );
  }
});

//Insert a book to the MongoDB - POST method
app.post("/upload-book", isAuthenticated, async (req, res) => {
  const data = req.body;
  console.log(data)
  // Insert the book document into the collection
  const result = await Book.create(data);
  res.json({status: 201, message:"book added!"});
});

//get all books from the MongoDB - GET method
// app.get("/all-books", async(req, res) => {
//     const books = Book.find();
//     const result = await books.toArray();
//     res.send(result);
// })

//update a book data in the MongoDB - UPDATE(PATCH) method
app.patch("/book/:id", isAuthenticated, async (req, res) => {
  const id = req.params.id;
  const updateBookData = req.body;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };

  const updateDoc = {
    $set: {
      ...updateBookData,
    },
  };
  //update
  const result = await Book.updateOne(filter, updateDoc, options);
  res.send(result);
});

//delete a book data in the MongoDB - DELETE method
app.delete("/book/:id", isAuthenticated, async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const result = await Book.deleteOne(filter);
  res.send(result);
});

//find by category
app.get("/all-books", async (req, res) => {
  let search = req.query.search;

  let query = {};

  let data = null
  if (search){
    data = await Book.find({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        {
          authors: {
            $elemMatch: {
              $regex: new RegExp(search, 'i'),
            },
          },
        },
        { category: { $regex: search, $options: 'i' } },
      ],
    });
  }
  else{
    data = await Book.find(query);

  }
  // console.log(data)
  // const result = await data.toArray();
  res.json(data);
});

//Get single book data
app.get("/book/:id", async (req, res) => {
  const id = req.params.id;

  const result = await Book.findById(id);
  res.send(result);
});


// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(port, () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("connection failed", err));
});
