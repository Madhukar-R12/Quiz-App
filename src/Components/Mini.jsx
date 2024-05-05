import React, { children } from 'react'

const Mini = ({ children }) => {
  return (
    <div>
      <main className="main">{children}</main>
    </div>
  )
}

export default Mini
