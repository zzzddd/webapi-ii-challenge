const express = require("express");

const Posts = require("../data/db");
const router = express.Router();
// When the client makes a POST request to /api/posts:
router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    Posts.insert(req.body)
      .then(post => res.status(201).json(req.body))
      .catch(err =>
        res.status(500).json({
          error: "There was an error while saving the post to the database."
        })
      );
  }
});
// When the client makes a POST request to /api/posts/:id/comments:
router.post("/:id/comments", (req, res) => {
  const commentObj = { ...req.body, post_id: req.params.id };

  Posts.findById(req.params.id)
    .then(post => {
      if (!post[0]) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err =>
      res.status(500).json({
        error: "There was an error while saving the comment to the database."
      })
    );

  if (!req.body.text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  } else {
    Posts.insertComment(commentObj)
      .then(comment => {
        res.status(201).json(commentObj);
      })
      .catch(err =>
        res.status(500).json({
          error: "There was an error while saving the comment to the database."
        })
      );
  }
});

// When the client makes a GET request to /api/posts:
router.get("/", (req, res) => {
  Posts.find()
    .then(posts => res.status(200).json(posts))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." })
    );
});


// When the client makes a GET request to /api/posts/:id:
router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      if (post[0]) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." })
    );
});


// When the client makes a GET request to /api/posts/:id/comments:
router.get("/:id/comments", (req, res) => {
  Posts.findPostComments(req.params.id)
    .then(post => {
      if (post[0]) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message:
            "The post with the specified ID either does not exist or currently has no comments associated with it."
        });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." })
    );
});


// When the client makes a DELETE request to /api/posts/:id:
router.delete("/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(req.params.id);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The post could not be removed." })
    );
});

// When the client makes a PUT request to /api/posts/:id:

router.put("/:id", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    Posts.update(req.params.id, req.body)
      .then(post => {
        if (post) {
          res.status(200).json({ ...req.body, id: req.params.id });
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        }
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: "The post information could not be modified." })
      );
  }
});

module.exports = router;
