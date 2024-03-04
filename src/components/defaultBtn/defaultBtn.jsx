import React from 'react'
import "./DefaultBtn.css"
const DefaultBtn = (props) => {
  return (
    <div >
        <button className='defaultBtn' style={{
          backgroundColor: props.backgroundColor
        }}>
          {props.text}
        </button>
    </div>
  )
}

export default DefaultBtn