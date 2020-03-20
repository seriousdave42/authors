const AuthorController = require("../controllers/author.controllers");

module.exports = app => {
  app.get("/api/authors/", AuthorController.index);
  app.post("/api/author", AuthorController.create);
  app.get("/api/author/:id", AuthorController.find);
  app.put("/api/author/:id", AuthorController.update);
  app.delete("/api/author/:id", AuthorController.destroy);
};