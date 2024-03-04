import { useState } from "react";
import TextInput from "../../components/textInput/textInput";
import NumberInput from "../../components/numberInput/numberInput";
import SubmitButton from "../../components/submitBtn/submitBtn";
import Header from "../../components/header/header";
import Dropdown from "../../components/dropdown/dropdown";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { submitPitscout } from "../../api/server";
import "./pitScoutForm.css"

const DRIVETRAINS = ["Swerve Drive", "Westcoast/Tank drive", "Omni", "Mecanum"]
const CHOICEYESNO = ["Yes", "No"]
const SCORINGPOSITIONS = ["Amp", "Speaker"]
const DEFAULT_STATE =  {
  robotWeight: "",
  drivetrain: "Swerve Drive",
  estimatedCycleTime: "",
  pickupFromFloor: "Yes",
  climb: "Yes",
  trap: "Yes",
  auto: "Yes",
  frameSize: "",
  scoringPosition: "Amp"
}
const PitScoutForm = ({username}) => {
  const { teamNumber } = useParams();
  const navigate = useNavigate();


  const [formState, setFormState] = useState({...DEFAULT_STATE, teamNumber});

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDropdownSelect = (selectedValue, name) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: selectedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const isFormIncomplete = Object.values(formState).some(
      (value) => value === "" || value === undefined
    );

    if (isFormIncomplete) {
      toast.error("Form is not filled out completely");
      return;
    }

    try {
      const response = await submitPitscout(teamNumber, {...formState,  username});
      if (response.ok) {
        toast.success("Pit form submitted successfully");
        setFormState({...DEFAULT_STATE, teamNumber});
        navigate("/");
      } else {
        toast.error("Pit form submission failed");
        setFormSubmitted(false);
      }
    } catch (error) {
      toast.error("Internal Server Error");
      setFormSubmitted(false);
      console.log(error)

    }
  };

  return (
    <div>
      <Header
        toWhere={"/pit-team-choice"}
        headerText={
          <>
            <span style={{ color: "#FF7F23" }}>Pit </span>
            <span style={{ color: "#FFFFFF" }}>Scout</span>
          </>
        }
      />
      <form onSubmit={handleSubmit} className="pit-form">
        <NumberInput
          label="Robot Weight (lbs)"
          name="robotWeight"
          value={formState.robotWeight}
          onChange={handleChange}
        />

        <Dropdown
          label="Drivetrain :"
          options={DRIVETRAINS}
          onSelect={(value) => handleDropdownSelect(value, "drivetrain")}
          defaultOption={formState.drivetrain}
        />

        <NumberInput
          label="Estimated Cycle Time (s)"
          name="estimatedCycleTime"
          value={formState.estimatedCycleTime}
          onChange={handleChange}
        />

        <Dropdown
          label="Pickup from the floor :"
          options={CHOICEYESNO}
          onSelect={(value) => handleDropdownSelect(value, "pickupFromFloor")}
          defaultOption={formState.pickupFromFloor}
        />

        <Dropdown
          label="Climb :"
          options={CHOICEYESNO}
          onSelect={(value) => handleDropdownSelect(value, "climb")}
          defaultOption={formState.climb}
        />

        <Dropdown
          label="Trap :"
          options={CHOICEYESNO}
          onSelect={(value) => handleDropdownSelect(value, "trap")}
          defaultOption={formState.trap}
        />

        <Dropdown
          label="Auto :"
          options={CHOICEYESNO}
          onSelect={(value) => handleDropdownSelect(value, "auto")}
          defaultOption={formState.auto}
        />

        <TextInput
          label="Frame Size(in)"
          name="frameSize"
          value={formState.frameSize}
          onChange={handleChange}
        />

          <Dropdown
          label="Scoring Position :"
          options={SCORINGPOSITIONS}
          onSelect={(value) => handleDropdownSelect(value, "scoringPosition")}
          defaultOption={formState.scoringPosition}
        />

        <SubmitButton label={formSubmitted ? "Submitting..." : "Submit"} />
      </form>
    </div>
  );
};

export default PitScoutForm;
