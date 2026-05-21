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
const PORT = process.env.PORT || 3000

// =======================
// MIDDLEWARE
// =======================
app.use(express.json())
app.use(express.static('public'))

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

// =======================
// START SERVER
// =======================
async function start() {
    try {
      await client.connect()
      console.log('Database verbonden')
  
      app.listen(PORT, () => {
        console.log(`Server draait op http://localhost:${PORT}`)
      })
    } catch (err) {
      console.error('Database fout:', err)
      process.exit(1)
    }
  }
  
start()