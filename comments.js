// Create web server

// Import modules
const express = require('express');
const router = express.Router();
const path = require('path');
const comments = require('../lib/comments');

// Get comments
router.get('/', (req, res) => {
    res.json(comments.getComments());
});

// Create new comment
router.post('/', (req, res) => {
    const { error } = comments.validateComment(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const comment = {
        name: req.body.name,
        text: req.body.text
    };

    comments.createComment(comment);
    res.send(comment);
});

// Delete comment
router.delete('/:id', (req, res) => {
    const comment = comments.getComment(req.params.id);
    if (!comment) {
        res.status(404).send('The comment with the given ID was not found.');
        return;
    }

    comments.deleteComment(req.params.id);
    res.send(comment);
});

// Update comment
router.put('/:id', (req, res) => {
    const comment = comments.getComment(req.params.id);
    if (!comment) {
        res.status(404).send('The comment with the given ID was not found.');
        return;
    }

    const { error } = comments.validateComment(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    comment.name = req.body.name;
    comment.text = req.body.text;
    res.send(comment);
});

// Export router
module.exports = router;
