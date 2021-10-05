const fs = require('fs')
const express = require('express')
const animals = require('./animals.json')

const PORT = 3001
const app = express()

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// api routes
app.get('/api/animals', (req, res) => {
  res.json(animals)
})

app.post('/api/animals', (req, res) => {
  console.log(req.method + ' route hit!')

  if (req.body.type && req.body.name) {
    const newAnimal = {
      type: req.body.type,
      name: req.body.name,
      id: Math.random()
    }
    
    // read the json file
    fs.readFile('./animals.json', 'utf-8', (err, data) => {
      if (err) throw err
      // parse the contents into JSON
      const parsedData = JSON.parse(data)
      // push newAnimal into JSON
      parsedData.push(newAnimal)
      // stringify our data
      const dataToSave = JSON.stringify(parsedData)
      // rewrite file
      fs.writeFile('./animals.json', dataToSave, err => {
        if (err) throw err
        res.status(200).send('All good!')
      })
    })
  } else {
    res.status(400).send('You did not send suffient data')
  }

})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})