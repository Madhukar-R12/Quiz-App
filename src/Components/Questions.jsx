import Options from './Options'

const Questions = ({ questions, dispatch, answer }) => {
  console.log(questions)
  return (
    <div>
      <h4>{questions.question}</h4>
      <Options dispatch={dispatch} answer={answer} questions={questions} />
    </div>
  )
}

export default Questions
