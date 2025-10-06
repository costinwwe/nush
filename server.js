const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db,
  dbConnectionString = process.env.DB_STRING,
  dbName = '',
  collection

  MongoClient.connect(dbConnectionString)
  .then(client => {
    console.log(`Connected to the ${dbName} database`)
    db = client.db(dbName)
    collection = db.collection('')
})
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.render('index.ejs')
  })
  app.get('/', (req, res) => {
    collection.find().toArray()
    .then (results => {
      res.render('index.ejs')
      console.log(results)
    })
  })
app.listen(process.env.PORT || PORT, () => {
    console.log(`Go catch the server at PORT ${process.env.PORT || PORT}`);
  })
