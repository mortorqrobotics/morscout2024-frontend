import { useState } from "react";
import TextInput from "../../components/textInput/textInput";
import SubmitButton from "../../components/submitBtn/submitBtn";
import Header from "../../components/header/header";
import Dropdown from "../../components/dropdown/dropdown";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { submitPitscout } from "../../api/server";
import "./pitScoutForm.css";

const CHOICEYESNO = ["-", "Yes", "No"]; // Blank added for default
const SCORINGPOSITIONS = ["-", "Amp", "Speaker", "Both"]; // Blank added for default

const DEFAULT_STATE = {
  robotWeight: "",
  frameSize: "",
  drivetrain: "",
  auto: "",
  scoringPositionAuto: "",
  autoNotesScored: "",
  scoringPosition: "",
  estimatedCycleTime: "",
  pickupFromFloor: "",
  climb: "",
  trap: "",
  buddyClimb: "", // New field added for buddy climb
  climbTime: "", // New field added for climb time
  shootFrom: "", // New field added for where the robot can shoot from
  additionalComments: "", // New field added for additional comments
};

const PitScoutForm = ({ username }) => {
  const { teamNumber } = useParams();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({ ...DEFAULT_STATE, teamNumber });
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

    // Exclude additionalComments field if it's empty
    const isFormIncomplete = Object.entries(formState)
      .filter(([key, value]) => key !== "additionalComments" || value !== "")
      .some(([key, value]) => value === "");

    if (isFormIncomplete) {
      toast.error("Form is not filled out completely");
      return;
    }

    try {
      const response = await submitPitscout(teamNumber, {
        ...formState,
        username,
      });
      if (response.ok) {
        toast.success("Pit form submitted successfully");
        setFormState({ ...DEFAULT_STATE, teamNumber });
        navigate("/");
      } else {
        toast.error("Pit form submission failed");
        setFormSubmitted(false);
      }
    } catch (error) {
      toast.error("Internal Server Error");
      setFormSubmitted(false);
      console.log(error);
    }
  };

  return (
    <div className="pit">
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
        <TextInput
          label="Robot Weight (lbs)"
          name="robotWeight"
          value={formState.robotWeight}
          onChange={handleChange}
        />

        <TextInput
          label="Frame Size (length x width in inches)"
          name="frameSize"
          value={formState.frameSize}
          onChange={handleChange}
        />

        <Dropdown
          label="Drivetrain"
          options={[
            "-",
            "Swerve Drive",
            "Westcoast/Tank drive",
            "Omni",
            "Mecanum",
          ]}
          onSelect={(value) => handleDropdownSelect(value, "drivetrain")}
          defaultOption={formState.drivetrain}
        />

        <Dropdown
          label="Can do auto?"
          options={CHOICEYESNO}
          onSelect={(value) => handleDropdownSelect(value, "auto")}
          defaultOption={formState.auto}
        />

        <Dropdown
          label="Scoring position in auto?"
          options={SCORINGPOSITIONS}
          onSelect={(value) =>
            handleDropdownSelect(value, "scoringPositionAuto")
          }
          defaultOption={formState.scoringPositionAuto}
        />

        <TextInput
          label="Possible auto sequences (how many can they score - list all please!)"
          name="autoNotesScored"
          value={formState.autoNotesScored}
          onChange={handleChange}
        />

        <Dropdown
          label="Scoring position in teleop?"
          options={SCORINGPOSITIONS}
          onSelect={(value) => handleDropdownSelect(value, "scoringPosition")}
          defaultOption={formState.scoringPosition}
        />
        <TextInput
          label="Where can the robot shoot from? Ex: at the subwoofer, by the stage"
          name="shootFrom"
          value={formState.shootFrom}
          onChange={handleChange}
        />
        <TextInput
          label="Estimated Cycle Time (human player station to shooting)? (s)"
          name="estimatedCycleTime"
          value={formState.estimatedCycleTime}
          onChange={handleChange}
        />

        <TextInput
          label="Where can note be picked up?"
          name="pickupFromFloor"
          value={formState.pickupFromFloor}
          onChange={handleChange}
        />

        <Dropdown
          label="Can climb?"
          options={CHOICEYESNO}
          onSelect={(value) => handleDropdownSelect(value, "climb")}
          defaultOption={formState.climb}
        />

        <TextInput
          label="Climb Time (s)"
          name="climbTime"
          value={formState.climbTime}
          onChange={handleChange}
        />

        <Dropdown
          label="Can buddy climb?"
          options={CHOICEYESNO}
          onSelect={(value) => handleDropdownSelect(value, "buddyClimb")}
          defaultOption={formState.buddyClimb}
        />

        <Dropdown
          label="Can do trap?"
          options={CHOICEYESNO}
          onSelect={(value) => handleDropdownSelect(value, "trap")}
          defaultOption={formState.trap}
        />

        <TextInput
          label="Additional Comments"
          name="additionalComments"
          value={formState.additionalComments}
          onChange={handleChange}
          optional={true} // Optional field
        />
        <SubmitButton label={formSubmitted ? "Submitting..." : "Submit"} />
      </form>
    </div>
  );
};

export default PitScoutForm;
