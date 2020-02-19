import React from 'react'
import Loader from 'react-loaders'

const SpinLoader = (props) => (
  <div className={props.className ? props.className : "loader"}></div>
)
export default SpinLoader