const express = require('express');
const bodyParser = require('body-parser');
//const pool = require('./config/db_pool')
require('dotenv').config()

const taskController = require('./controller/task.controller')



const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/forms', (req, res) => {
    taskController.getForms().then(data => res.json(data));
});

app.get('/api/form/:id', (req, res) => {
    console.log('+++++++++++++',req.params.id);
    taskController.getForm(req.params.id).then(data => res.json(data));
})

app.get("*", (req, res) =>
  res
    .status(404)
    .json({ message: "Route does not exist", app: "Express-Routes" })
);

app.post('/api/form', (req, res) => {   
    taskController.createForm(req.body).then(data => res.json(data));
});

// app.put('/api/forms', (req, res) => {
//     taskController.updateTask(req.body.task).then(data => res.json(data));
// });

// app.delete('/api/task/:id', (req, res) => {
//     taskController.deleteTask(req.params.id).then(data => res.json(data));
// });

app.get('/', (req, res) => {
    res.send(`<h1>API Works !!!</h1>`)
});

//const client = pool.connect();


app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})