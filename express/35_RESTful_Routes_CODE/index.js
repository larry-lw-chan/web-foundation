// Library requires
const { v4: uuid } = require('uuid'); //For generating ID's
const path = require('path');

// Express specific requires
const express = require('express');
const methodOverride = require('method-override');
const app = express();

// Express Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Setting up Express Middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method')); // Override methods Eg. ?_method=DELETE

// Our fake database:
const comments = require(path.join(__dirname, './comments.js' ));

// Read All Comments
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
});

// Render a new form
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

// Process post request and redirects to index
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({id: uuid(), username, comment, });
    res.redirect('/comments');
});

// Comments Detail Page (show)
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    let comment = comments.find((comment) => comment.id === id);
    res.render('comments/show', {comment})
});

// Comments Edit Form
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    let comment = comments.find((c) => c.id === id);
    res.render('comments/edit', {comment})
});


// Process comment edit and redirect to show page
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    let record = comments.find((elem) => elem.id === id);

    // Get Comment from request body
    let {comment} = req.body;
    // Update comment
    record.comment = comment;
    // Redirect to show resource
    res.redirect(`/comments/${id}`);
});

// Delete Comment
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    let record = comments.pop(((elem) => elem.id === id)); 
    console.log(record);

    // Redirect to show resource
    res.redirect(`/comments/`);    
});

// Weird Taco Example
app.get('/tacos', (req, res) => {
    console.log(req.body);
    res.send('GET /tacos response');
});

app.post('/tacos', (req, res) => {
    const {meat, qty} = req.body
    res.send(`POST /tacos response is: ${meat}= ${qty}`);
});

app.listen(3000, (data) => {
    console.log('Local Host 3000 Running');
})