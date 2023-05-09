import React from 'react'
import "./SurveyEntry.css"

export const SurveyEntry = ({data}) => {
  return (
    <div className="entry-container">
        <p>Email: {data.email}</p>
        <p>Show Name: {data.showName}</p>
        <p>Rating: {data.rating}</p>
    </div>
  )
}
