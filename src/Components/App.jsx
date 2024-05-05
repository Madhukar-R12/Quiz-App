import { useEffect, useReducer } from 'react'
import React from 'react'
import Header from './Header'
import Mini from './Mini'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'
import Questions from './Questions'
import NextButton from './NextButton'
import Progress from './Progress.jsx'
import FinishedScreen from './FinishedScreen'
import Footer from './Footer.jsx'
import Timer from './Timer.jsx'
let initialstate = {
  questions: [],
  status: 'Loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
}
let SECS_PER_QUESTION = 30
function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      }
    case 'dataError':
      return {
        ...state,
        status: 'error',
      }
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      }
    case 'newAnswer':
      const question = state.questions.at(state.index)
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload == question.correctOption
            ? state.points + question.points
            : state.points,
      }
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null }
    case 'Finished':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      }
    case 'Restart':
      return {
        ...initialstate,
        questions: state.questions,
        status: 'ready',
      }
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      }
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialstate)
  let numQuestions = questions.length
  let MaximumPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  )
  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataError', payload: err }))
  }, [])
  return (
    <div className="app">
      <Header />
      <Mini>
        {status == 'Loading' && <Loader />}
        {status == 'error' && <Error />}
        {status == 'ready' && (
          <StartScreen dispatch={dispatch} numQuestions={numQuestions} />
        )}
        {status == 'active' && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              points={points}
              MaximumPossiblePoints={MaximumPossiblePoints}
              answer={answer}
            />
            <Questions
              dispatch={dispatch}
              answer={answer}
              questions={questions[index]}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status == 'finished' && (
          <FinishedScreen
            points={points}
            MaximumPossiblePoints={MaximumPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Mini>
    </div>
  )
}

export default App
