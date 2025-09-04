import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ searchWord, handleSearchInputChange }) => {
  return(
    <>
      <p>filter shown with</p>  <input value={searchWord} onChange={handleSearchInputChange} />          
    </>
  )
}

const PersonForm = ({ formSubmitHandler, nameInputChangeHandler, numberInputChangeHandler, nameInputValue, numberInputValue }) => {
  return(
    <>
      <form onSubmit={formSubmitHandler}>
        <div>
          name: <input value={nameInputValue} onChange={nameInputChangeHandler} />
          number: <input value={numberInputValue} onChange={numberInputChangeHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Persons = ({ persons }) => {
  return (
    <>
      {
        persons.map((p) => { return <p key={p.name}>{p.name} {p.number}</p> })
      }
    </>
  )
}

const App = () => {
 const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchWord, setSearchWord] = useState('')
  
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (formEvent) => {
    formEvent.preventDefault();
    let found = persons.find((p) => p.name === newName)
    if(!found) {
      setPersons(persons.concat({name: newName, number: newPhoneNumber}))
      setNewName('')    
      setNewPhoneNumber('')
    } else alert(`${newName} is already added to phonebook`)
  }

  const handleNameInputChange = (inputChangeEvent) => {
    setNewName(inputChangeEvent.target.value)
  }

  const handleNumberInputChange = (inputChangeEvent) => {
    setNewPhoneNumber(inputChangeEvent.target.value)
  }

  const handleSearchInputChange = (inputChangeEvent) => {
    setSearchWord(inputChangeEvent.target.value)
  }

  const filteredPersons = searchWord.length === 0 ? persons : persons.filter((p) => p.name.toUpperCase().includes(searchWord.trim().toUpperCase(), 0))

  return (
    <>
      <h2>Phonebook</h2>
      
      <Filter searchWord={searchWord} handleSearchInputChange={handleSearchInputChange} />
      
      <h3>Add a new</h3>

      <PersonForm 
        formSubmitHandler={addPerson} 
        nameInputChangeHandler={handleNameInputChange} 
        numberInputChangeHandler={handleNumberInputChange} 
        nameInputValue={newName} 
        numberInputValue={newPhoneNumber} 
      />

      <h2>Numbers</h2>
      
      <Persons persons={filteredPersons}/>      
    </>
  )

}

export default App