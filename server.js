// =======================
// IMPORTS
// =======================
require('dotenv').config()
 
const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
 
// =======================
// APP
// =======================
const app = express()
const PORT = process.env.PORT || 4000

app.set('view engine', 'ejs')

// =======================
// MIDDLEWARE
// =======================
app.use(express.json())
app.use(express.static('public'))
 
// =======================
// ROUTES
// =======================
 
app.get('/', (req, res) => {
  res.render('start')
})

app.get('/boeren-van-amstel', (req, res) => {
  res.render('index')
})

app.get('/onboarding', (req, res) => {
  res.render('onboarding');
});

app.get('/polders', (req, res) => {
  res.render('polders');
});

// =======================
// DATABASE
// =======================
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
 
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})
 
let db = null
 
// =======================
// START SERVER
// =======================
async function start() {
  try {
    await client.connect()
    db = client.db(process.env.DB_NAME)
    console.log('Database verbonden')
  } catch (err) {
    console.warn('Database niet beschikbaar, server draait zonder database:', err.message)
  }

  app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`)
  })
}

start()