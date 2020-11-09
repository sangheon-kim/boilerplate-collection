import React from 'react'

interface ICounter {
  number: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
}

const Counter:React.FC<ICounter> = ({number, onIncrease, onDecrease}) => {
  return (
    <div>
      <h1>{number}</h1>
      <div>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>+1</button>
      </div>
    </div>
  )
}

export default Counter;