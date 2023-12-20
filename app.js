var express = require('express');
const { get } = require('http');
var app = express()
var bodyParser = require('body-parser')
var session = require('express-session')
var cookieParser = require('cookie-parser')

app.use(session({secret : 'todotopsecret'}))
app.use(cookieParser())
app.use(bodyParser())
app.use(function (req, res, next) {
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})
//- les routes 
app.get('/todo', function (req, res) {
    res.render('matodopage.ejs', {todolist : req.session.todolist});
})
.post('/todo/ajouter', function (req, res) { 
    if (req.body.newtodo != '') {
    req.session.todolist.push(req.body.newtodo) 
    }
    res.redirect('/todo')
})
.get('/todo/supprimer/:id', function (req, res) {

    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1)        
    }
    res.redirect('/todo')
})

.use(function (req, res, next) {
    res.redirect('/todo')
    // res.send(404, 'Page introuvable !')    
    })
app.listen(8080, ()=>{
    console.log('listen to a port 8080');
})