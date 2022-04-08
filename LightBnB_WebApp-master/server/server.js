const { Pool, Client } = require('pg')
const client = new Client({ 
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'lightbnb',
  port: 5432
});
  // client.connect() client.query('SELECT NOW()', (err, res) => { console.log(err, res) client.end() }) 

// the following assumes that you named your connection variable `pool`

client.query('SELECT title from properties LIMIT 10', (err, res) => {
  console.log("HELLLO")
  console.log(err, res)
  client.end()
})
// client.query(`SELECT title FROM properties LIMIT 10;`).then(response => {console.log("response", response)})

const database = require('./database');
const apiRoutes = require('./apiRoutes');
const userRoutes = require('./userRoutes');

const path = require('path');

const express = require('express');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const app = express();

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// /api/endpoints
const apiRouter = express.Router();
apiRoutes(apiRouter, database);
app.use('/api', apiRouter);

// /user/endpoints
const userRouter = express.Router();
userRoutes(userRouter, database);
app.use('/users', userRouter);

app.use(express.static(path.join(__dirname, '../public')));

app.get("/test", (req, res) => {
  res.send("🤗");
});

const port = process.env.PORT || 3000; 
app.listen(port, (err) => console.log(err || `listening on port ${port} 😎`));