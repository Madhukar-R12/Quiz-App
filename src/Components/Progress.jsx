const Progress = ({
  numQuestions,
  index,
  points,
  MaximumPossiblePoints,
  answer,
}) => {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + (answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {MaximumPossiblePoints}
      </p>
    </header>
  )
}

export default Progress
