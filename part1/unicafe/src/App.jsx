import { useState } from 'react'

const Button = ({name, onClick}) => {
  return (
      <button onClick={onClick}>{name}</button> 
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if(good == 0 && neutral == 0 && bad == 0)
      return (<p>No feedback given</p>)   
  return (
    <table>      
      <tbody>
      <StatisticLine text={"good"} value={good}/>
      <StatisticLine text={"neutral"} value={neutral}/>
      <StatisticLine text={"bad"} value={bad}/>
      <StatisticLine text={"all"} value={good + neutral + bad}/>
      <StatisticLine text={"average"} value={(good + bad * -1) / 2}/>
      <StatisticLine text={"positive"} value={good / (good + neutral + bad) * 100}/>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)  
  return (
    <div>
      <h1>Give feedback</h1>
      
      <Button name={"good"} onClick={() => setGood(good + 1)} />
      <Button name={"neutral"} onClick={() => setNeutral(neutral + 1)} />
      <Button name={"bad"} onClick={() => setBad(bad + 1)} />
      
      <h1>Statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App