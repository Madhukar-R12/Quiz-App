import React from 'react'

const FinishedScreen = ({
  points,
  MaximumPossiblePoints,
  highscore,
  dispatch,
}) => {
  const percentage = (points / MaximumPossiblePoints) * 100
  return (
    <>
      <p className="result">
        You Scored <strong>{points}</strong> Out of
        {MaximumPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'Restart' })}
      >
        {' '}
        Reset
      </button>
    </>
  )
}

export default FinishedScreen
