// app/routes.js

var Todo            = require('../app/models/todo');

module.exports = function(app) {
    
    app.get('/', function(req, res) {
        res.send({
            message: 'Api started and is working perfectly',
            status: 'Running...',
        });
    });

    // =====================================
    // CRUD REST API =======================
    // =====================================

    // create
    app.post('/reminder', function(req, res) {
        var newTodo = new Todo();
        newTodo.todoFor = req.body.newName;
        newTodo.heading = req.body.newTitle;
        newTodo.mainContent = req.body.newBody;
        newTodo.save(function(err) {
            if(err) {
                res.send({status: 1});
            } else {
                res.send({status: 0});
            }
        });
    });

    // read
    app.get('/reminders', function(req, res){
        Todo.find({}, function(err, data) {
            if(err)
                throw err;
            res.send(data);
        });
    });

    app.get('/reminder/:id', function(req, res){
        Todo.findOne({'_id' : req.params.id}, function(err, data) {
            if(err)
                throw err;
            res.send(data);
        });
    });

    // update
    app.put('/reminder/:id', function(req, res) {
        Todo.findByIdAndUpdate(req.params.id, {heading: req.body.updatedTitle, mainContent: req.body.updatedBody}, function(err){
            if (err) {
                res.send({status: 1});
            } else {
                res.send({status: 0});
            }
        });
    });

    // delete
    app.delete('/reminder/:id', function(req, res) {
        Todo.findByIdAndRemove(req.params.id, function(err) {  
            if (err) {
                res.send({status: 1});
            } else {
                res.send({status: 0});
            }
        });
    });

};
