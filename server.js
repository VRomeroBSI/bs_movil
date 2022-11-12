const express = require('express');
const bodyParser = require('body-parser');
const formController = require('./controller/form.controller');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/swagger/swagger.css"), 'utf8');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));


app.get('/api/forms', (req, res) => {
    formController.getForms().then(data => res.json(data));
});

app.get('/api/form/:idCompany', (req, res) => {
    formController.getForm(req.params.id).then(data => res.json(data));
})

app.get('/api/forms/company/:id', (req, res) =>{
    formController.getFormsCompany(req.params.id).then(data => res.json(data));
})


app.post('/api/form', (req, res) => {   
    formController.createForm(req.body).then(data => res.json(data));
});


app.get('/api/form/company/:id/nameform/:nameform', (req, res) =>{
    formController.getFormByIdCompany(req.params.id, req.params.nameform).then(data => res.json(data));
});

app.post('/api/answers',(req, res)=>{
    formController.createAnswer(req.body).then(data => res.json(data));
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

// app.get("*", (req, res) =>
//   res
//     .status(404)
//     .json({ message: "Route does not exist", app: "Express-Routes" })
// );

//const client = pool.connect();


app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})