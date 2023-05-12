import React from 'react'
import "./Button.css"

// text: string
// action: function that is called when button is pressed
export const Button = ({text, action}) => {
  return (
    <button className="button-container" onClick={() => action()}>
      {text}
    </button>
  )
}
