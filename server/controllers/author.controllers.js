const Author = require("../models/author.model");

module.exports.index = (req, res) => {
  Author.find().sort('authorName')
    .then(authors => res.json({ authors : authors }))
    .catch(err => res.status(400).json(err));
};

module.exports.find = (req, res) => {
	Author.findOne({ _id: req.params.id })
		.then(author => res.json({ author : author }))
		.catch(err => res.status(400).json(err));
};

module.exports.create = (req, res) => {
  Author.create(req.body)
    .then(newAuthor => res.json({ author : newAuthor }))
    .catch(err => res.status(400).json(err));
};

module.exports.update = (req, res) => {
  Author.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
    .then(updatedAuthor => res.json({ author : updatedAuthor }))
    .catch(err => res.status(400).json(err));
};

module.exports.destroy = (req, res) => {
  Author.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result : result }))
    .catch(err => res.status(400).json(err));
};