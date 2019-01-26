const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const path = require('path');

const Post = require('./models/post');

const app = express();

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
  const posts = [
    {
      id: "sdadsadsa",
      title: "First serve-side post",
      content: "This is coming from the server"
    },
    {
      id: "vjnxvoisdn",
      title: "Second serve-side post",
      content: "This is coming from the server!"
    }
  ];
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
});

app.use(express.static('static'));
console.log("Set up the static folder");
module.exports = app;
