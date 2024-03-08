const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World! What a beautiful day today')
})

app.get('/students', function (req, res) {
  res.send([{ name: "Théo BURDINAT", school: "EPF"}, { name: "Manon VEDIE", school: "EPF"}, { name: "Juliette TORT", school: "EPF"}, { name: "Martin BOYTCHEV", school: "EPF"}, { name: "Thibaut MORIN", school: "EPF"}, { name: "Arthur BUONANNO", school: "EPF"}, { name: "Gaspard TIRFOIN", school: "EPF"}, { name: "Arnaud CARTON", school: "EPF"}, { name: "Abelle CHARLEMAGNE", school: "EPF"}, { name: "Anne-Zoé KASSIDONIS", school: "EPF"}])
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  })