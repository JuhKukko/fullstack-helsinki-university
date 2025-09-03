const Course = ({course}) => {
  return (
     <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

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
      {props.parts.map((part) => { return (<Part key={part.id} partName={part.name} numberOfExercises={part.exercises}/>)}) }      
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
      <p><b>Total of {props.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises.</b></p>
    </>
  )
};

export default Course