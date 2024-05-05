import React from 'react'

const Options = ({ questions, dispatch, answer }) => {
  console.log(answer)
  const hasAnswered = answer !== null
  return (
    <div className="options">
      {questions.options.map((item, index) => (
        <button
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            hasAnswered
              ? index === questions.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
          key={item}
          disabled={hasAnswered}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

export default Options
