const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema ({
    authorName: {
        type: String,
        required: [true, "Author name is required"],
        minlength: [3, "Author name must be at least 3 characters"]
    },
    authorQuotes: [{
        type: String,
        minlength: [3, "quote must be at least 3 characters"]
    }],
}, {timestamps: true});

const Author = mongoose.model("Author", AuthorSchema);

module.exports = Author;