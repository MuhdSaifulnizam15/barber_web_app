import React from 'react'

const Container = ({ children, className }) => {
  const classNames = `${className ? className : ''}`

  return <div className={classNames}>{children}</div>
}

export default Container
