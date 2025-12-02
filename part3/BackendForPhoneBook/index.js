require('dotenv').config()
const express = require('express')
const Person = require('./models/person')

const app = express()

const password = process.argv[2]

var morgan = require('morgan')

app.use(morgan('tiny'))
app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": "1"
  },
  {
    "name": "Ada Lovelace",
    "number": "234234234",
    "id": "2"
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": "3"
  },
  {
    "name": "Mary Poppendieck",
    "number": "1231-123123",
    "id": "4"
  }
]

app.get('/info', (request, response) => {
  response.send('<p> Phonebook has info for ' + persons.length + ' people.</p><br> ' + new Date().toLocaleString())
})

// GET all persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// POST a new person
app.post('/api/persons', (request, response) => {
  
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  if (persons.find(p => p.name === body.name)) {
    return response.status(400).json ({ error: 'name must be unique' }) 
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person
  .save()
  .then(savedPerson => {
    console.log(savedPerson)
    response.json(savedPerson)
  })
})

// GET a person by id
app.get('/api/persons/:id', (request, response) => {
  Person
  .findById(request.params.id)
  .then(person => {
    response.json(person)
  })
})

// DELETE a person by id
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})