import "./pitButton.css"

const PitButton = (props) => {
  return (
    <div>
        <button className='pitButton'>
            {props.text}
        </button>
    </div>
  )
}

export default PitButton