import { useState } from 'react'

function randInt(min, max) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    throw new TypeError("min/max must be finite numbers");
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  if (max < min) throw new RangeError("max must be >= min");
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const doVoting = () => {
    const copy = [...votes]
    copy[selected] += 1  
    setVotes(copy)
  }

  const getIndexOfMaximumVotes = () => {
      let maxVoteCount = -1;
      let maxVotesIndex = -1;
      votes.forEach((x, i) => {
        if(x > maxVoteCount) {
          maxVoteCount = x;
          maxVotesIndex = i;
        }
      });
      return maxVotesIndex;
  }

  return (
    <div>      
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]} <br/>
      <button onClick={() => doVoting()}>vote</button>
      <button onClick={() => setSelected(randInt(0, anecdotes.length - 1))}>next anecdote</button>      

      <h2>Anecdote with most votes</h2>
      {anecdotes[getIndexOfMaximumVotes()]} <br/>
      <p>has {votes[getIndexOfMaximumVotes()]} votes</p>
    </div>
  )
}

export default App