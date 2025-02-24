import "./pitButton.css"

const PitButton = (props) => {
  return (
    <div>
        <button className='pit-button'>
            {props.text}
        </button>
    </div>
  )
}

export default PitButton