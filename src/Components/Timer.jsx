import React, { useEffect } from 'react'

const Timer = ({ secondsRemaining, dispatch }) => {
  const minute = Math.floor(secondsRemaining / 60)
  const seconds = secondsRemaining % 60
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: 'tick' })
      }, 1000)
      return () => clearInterval(id)
    },
    [dispatch]
  )
  return (
    <div className="timer">
      {minute < 10 && '0'}
      {minute} : {seconds < 10 && '0'}
      {seconds}
    </div>
  )
}

export default Timer
