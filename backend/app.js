const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();
const path = require('path');

mongoose.connect("mongodb+srv://mike:Mum1sn1ttrukgSD7@meanapp-qbtdl.mongodb.net/node-angular?retryWrites=true")
  .then(() => {
    console.log("Connected to database!")
  })
  .catch(() => {
    console.log("Connection failed :(")
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

//user: mike, password: Mum1sn1ttrukgSD7
app.post("/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/posts',(req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        posts: documents
      });
    });
});

app.delete('/posts/:id', (req, res, next) => {
  console.log(req.params.id)
  res.status(200).json({message: "post deleted my dude!"});
});

app.use(express.static(path.join(__dirname + "/../dist/MeanApp")));
app.use("/static", express.static(path.join(__dirname + "/../static")));

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname, '/../dist/MeanApp/index.html'));
});

module.exports = app;
