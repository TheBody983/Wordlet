import React from 'react'
import Spinner from './Spinner'
import './TxDetails.css'

export default function TxDetails() {
  
  return (
    <div className="tx__wrapper">
      <div className="tx__loader">
        <Spinner />
      </div>
      <div className="tx__content">
        <p>Test</p>
      </div>
    </div>
  )
}