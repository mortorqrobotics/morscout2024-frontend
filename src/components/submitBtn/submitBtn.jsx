// SubmitButton.jsx
import "./submitBtn.css"

const SubmitButton = ({ label }) => {
  return (
    <div className="submit-btn">
      <button className='submitBtn' type="submit">{label}</button>
    </div>
  );
};

export default SubmitButton;
