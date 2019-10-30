// const express = require("express");
// // const users = require("./data/db");
// // const cors = require("cors");

// const postsRouter = require("./posts/post-router");


// const server = express(); // creates a server
// // server.use(cors());
// // middleware
// server.use(express.json()); // teaches express how to read JSON
// // needed for the POST and PUT to work
// server.use("/api/posts", postsRouter);
// server.get("/", (req, res) =>{
//     //  res.send("API up and running!")
//     });
// // request/route handlers
// // listen for requests in a particular port on localhost
// const port = 6000; // localhost:6000
// server.listen(port, () => console.log('\n=== API on port 6000 ===\n'));

const express = require("express");

// 1
const postsRouter = require("./posts/post-router");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("API up and running!");
});

// 2
 server.use("/api/posts", postsRouter);


// listen for requests in a particular port on localhost
const port = 6000; // localhost:6000
server.listen(port, () => console.log('\n=== API on port 6000 ===\n'));
