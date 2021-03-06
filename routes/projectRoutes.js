const express = require("express");
const router = express.Router();
const db = require("../data/dbConfig");

router.get("/", (req, res) => {
  db("projects")
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  db("projects")
    .where({ id: req.params.id })
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.status(400).json({ message: "need name/description" });
  }
  db.insert(req.body)
    .into("projects")
    .then(ids => {
      res.status(200).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.status(400).json({ message: "need name/description" });
  }
  db("projects")
    .where({ id: req.params.id })
    .update({
      name: req.body.name,
      description: req.body.description,
      completed: req.body.completed
    })
    .then(ids => {
      res.status(200).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  db("projects")
    .where({ id: req.params.id })
    .delete()
    .then(ids => {
      res.status(200).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
