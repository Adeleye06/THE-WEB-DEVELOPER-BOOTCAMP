const express = require("express");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');
const app = express();
const path = require('path');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Our fake database:
let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', {comments});
});

app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})
app.post('/comments', (req, res) => {
    const {username, comment} = req.body;
    comments.push({username, comment, id: uuid()});
    res.redirect('/comments');
})

app.get('/comments/:id', (req, res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id );
    res.render('comments/show', {comment});
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', {comment});
})
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => c.id === id);
    
    //get new text from req.body
    const newCommentText = req.body.comment;
    //update the comment with the data from req.body:
    foundComment.comment = newCommentText;
    //redirect back to index (or wherever you want)
    res.redirect('/comments');
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.get('/tacos', (req, res) => {
    res.send('GET / tacos response');
})
app.post('/tacos', (req, res) => {
    const {meat , qty} = (req.body);
    res.send(`OK, here are your ${qty} ${meat} tacos`);
})
app.listen(3000, () => {
    console.log('ON PORT 3000');
})