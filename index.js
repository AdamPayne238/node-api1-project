// implement your API here
//import express from 'express'
const express = require('express');

const db = require('./data/db.js');

const server = express(); // creates a server

//middleware
server.use(express.json()); //needed for POST and PUT to work


//REQUEST ROUTE HANDLERS

// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.  

server.post('/api/users', (req, res) => {
    const user = req.body;
    // const id = req.params.id ???? maybe??
  
    console.log('User Info', user);
  
    db.insert(user)
      .then(info => {
        res.status(200).json(info);
      })
      .catch(err => {
        console.log('error', err);
        res.status(500).json({ error: 'failed to add user to db' });
      });
  });

// | GET    | /api/users     | Returns an array of all the user objects contained in the database.       

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log('error', err);
            res.status(500).json({ error: 'failed to get users from db'});
        });
});          

// | GET    | /api/users/:id | Returns the user object with the specified `id`.   
                         
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id)
        .then(userid => {
            res.status(200).json(userid);
        })
        .catch(err => {
            console.log('error', err);
            res.status(500).json({ error: 'failed to get users id from db'});
        });
}); 

// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.       

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
    .then(count => {
      res.status(200).json({ message: `users with id ${id} deleted` });
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).json({ error: 'failed to delete the user from the db' });
    });
})

// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**. 

server.put('/api/users/:id', (req, res) => {
    const id = req.body;

    db.update(id)
    .then(adds => {
      res.status(200).json({ message: `user id ${id} was updated sucessfully` });
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).json({ error: `failed to update user id ${id}` });
    });
})

//listen for connections (requests) in a particular port on local host
const port = 7000; // localhost:7000
server.listen(port, () => console.log('\n=== API on port 7000 ===\n'));

