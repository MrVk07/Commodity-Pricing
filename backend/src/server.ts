import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

const app = express()

dotenv.config()

const port = process.env['PORT'] || 5000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', (_req, res) => {
    res.send("hello world");
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})