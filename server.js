// =======================
// IMPORTS
// =======================
require('dotenv').config()

const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const session = require('express-session')
const bcrypt = require('bcrypt')
 
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
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

// =======================
// BESCHERMDE ROUTES HELPER
// =======================
function isIngelogd(req, res, next) {
  if (req.session.gebruiker) {
    next()
  } else {
    res.redirect('/login')
  }
}
 
// =======================
// GET ROUTES
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

app.get('/profiel', isIngelogd, (req, res) => {
  res.render('profiel', { gebruiker: req.session.gebruiker })
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/registreren', (req, res) => {
  res.render('registreren')
})

app.get('/uitloggen', (req, res) => {
  req.session.destroy()
  res.redirect('/login')
})

// =======================
// POST ROUTES
// =======================

// login
app.post('/login', async (req, res) => {
  const { email, wachtwoord } = req.body
  const gebruiker = await db.collection('gebruikers').findOne({ email })

  if (!gebruiker || !(await bcrypt.compare(wachtwoord, gebruiker.wachtwoord))) {
    return res.render('login', { fout: 'Ongeldig e-mailadres of wachtwoord' })
  }

  req.session.gebruiker = { id: gebruiker._id, naam: gebruiker.naam, email: gebruiker.email }
  res.redirect('/profiel')
})

app.post('/registreren', async (req, res) => {
  const { naam, email, wachtwoord } = req.body
  const bestaatAl = await db.collection('gebruikers').findOne({ email })

  if (bestaatAl) {
    return res.render('registreren', { fout: 'Dit e-mailadres is al in gebruik' })
  }

  const hash = await bcrypt.hash(wachtwoord, 10)
  const result = await db.collection('gebruikers').insertOne({ naam, email, wachtwoord: hash })

  // Sessie aanmaken zodat gebruiker direct ingelogd is
  req.session.gebruiker = { id: result.insertedId, naam, email }
  res.redirect('/profiel')
})

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
    console.log('Verbinden met:', uri.replace(/:([^@]+)@/, ':***@'))  // ← hier
    await client.connect()
    db = client.db(process.env.DB_NAME)
    console.log('Database verbonden')
  } catch (err) {
    console.error('Database verbinding mislukt:', err.message)
    process.exit(1)
  }

  app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`)
  })
}

start()

 