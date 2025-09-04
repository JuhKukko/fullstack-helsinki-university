import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

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

const Persons = ({ persons, deleteBtnClickHandler }) => {
  return (
    <>
      {
        persons.map((p) => { return <p key={p.name}>{p.name} {p.number} <button onClick={() => deleteBtnClickHandler(p)}>delete person</button></p> })
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
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })      
  }, [])

  const addPerson = (formEvent) => {
    formEvent.preventDefault();
    const foundPerson = persons.find((p) => p.name === newName)    
    const newPerson = { name: newName, number: newPhoneNumber }
    if(!foundPerson) {      
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })            
    } else {
       if(window.confirm(`${foundPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
        personService.update(foundPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === foundPerson.id ? returnedPerson : p))
          })
       }
    }
    setNewName('')    
    setNewPhoneNumber('')
  }

  const deletePerson = (person) => {
      if(window.confirm(`Delete ${person.name}?`)) {
        personService.remove(person.id)
          .then(() => {
            setPersons(persons.filter(p => p.id !== person.id))
          })
          .catch((err) => {
            alert(`Person ${person.name} was already deleted from server`)
          })
      }
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
      
      <Persons persons={filteredPersons} deleteBtnClickHandler={deletePerson}/>      
    </>
  )

}

export default App