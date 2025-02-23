import "./defaultBtn.css"
const DefaultBtn = (props) => {
  return (
    <div >
        <button className='default-btn' style={{
          backgroundColor: props.backgroundColor
        }}>
          {props.text}
        </button>
    </div>
  )
}

export default DefaultBtn