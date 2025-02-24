import "./submitBtn.css"

const SubmitButton = ({ label }) => {
  return (
    <div className="submit-btn">
      <button className='submit-btn-content' type="submit">{label}</button>
    </div>
  );
};

export default SubmitButton;
