const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World! What a beautiful day today')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`This is so useful ! Waw`)
})
