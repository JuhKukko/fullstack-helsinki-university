const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born {bornYear()}</p>
    </div>
  )
}

const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'Filosofian tohtori',
  greet: function() {
    console.log('hello, my name is', this.name)
  },
  doAddition: function(a, b) {
    console.log(a + b)
  },
}

arto.greet()  // tulostuu hello, my name is Arto Hellas

arto.growOlder = function() {
  this.age += 1
}

console.log(arto.age)   // tulostuu 35
arto.growOlder()
console.log(arto.age)   // tulostuu 36

const Header = (props) => {  
  console.log(props)
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
};

const Content = (props) => {
  return (
    <>    
      <Part partName={props.parts[0].name} numberOfExercises={props.parts[0].exercises}/>
      <Part partName={props.parts[1].name} numberOfExercises={props.parts[1].exercises}/>
      <Part partName={props.parts[2].name} numberOfExercises={props.parts[2].exercises}/>    
    </>
  )
};

const Part = (props) => {
  return (
    <>
      <p>{props.partName} {props.numberOfExercises}</p>
    </>
  )
};

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </>
  )
};

const App = () => {
 const nimi = 'Pekka'
 const ika = 10

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>

      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={nimi} age={ika} /> 
    </div>
  )
}

export default App