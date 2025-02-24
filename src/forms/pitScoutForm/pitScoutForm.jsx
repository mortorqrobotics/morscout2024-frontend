import { useState } from "react";
import TextInput from "../../components/textInput/textInput";
import SubmitButton from "../../components/submitBtn/submitBtn";
import Header from "../../components/header/header";
import Dropdown from "../../components/dropdown/dropdown";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { submitPitscout } from "../../api/server";
import "./pitScoutForm.css";

// Constants for dropdown options
const CHOICEYESNO = ["-", "Yes", "No"]; // Simple yes/no choices with blank default
const SCORINGPOSITIONS = ["-", "Amp", "Speaker", "Both"]; // Scoring position options for 2024 game

// Default state for the form - all fields start empty
const DEFAULT_STATE = {
  robotWeight: "",           // Weight of the robot in pounds
  frameSize: "",            // Physical dimensions of the robot frame
  drivetrain: "",           // Type of drive system (swerve, tank, etc.)
  auto: "",                 // Whether robot has autonomous capabilities
  scoringPositionAuto: "",  // Where robot can score during autonomous
  autoNotesScored: "",      // Details about autonomous scoring sequences
  scoringPosition: "",      // Where robot can score during teleop
  estimatedCycleTime: "",   // Time to complete one scoring cycle
  pickupFromFloor: "",      // Where robot can pickup game pieces
  climb: "",               // Whether robot can climb
  trap: "",                // Whether robot can score in trap
  buddyClimb: "",          // Whether robot can assist others in climbing
  climbTime: "",           // Time needed to complete a climb
  shootFrom: "",           // Positions robot can shoot from
  additionalComments: "",   // Any other relevant information
};

const PitScoutForm = ({ username }) => {
  // Get teamNumber from URL parameters
  const { teamNumber } = useParams();
  const navigate = useNavigate();

  // Main form state - combines default state with team number
  const [formState, setFormState] = useState({ ...DEFAULT_STATE, teamNumber });
  // Track whether form is currently being submitted
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle changes in text input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  // Handle changes in dropdown selections
  const handleDropdownSelect = (selectedValue, name) => {
    setFormState(prevState => ({
      ...prevState,
      [name]: selectedValue,
    }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true); // Disable submit button while processing

    // Check if required fields are filled
    // Note: additionalComments is optional, so it's excluded from validation
    const isFormIncomplete = Object.entries(formState)
      .filter(([key, value]) => key !== "additionalComments" || value !== "")
      .some(([key, value]) => value === "");

    // Show error if required fields are empty
    if (isFormIncomplete) {
      toast.error("Form is not filled out completely");
      return;
    }

    try {
      // Submit form data to server
      const response = await submitPitscout(teamNumber, {
        ...formState,
        username, // Include username with submission
      });

      if (response.ok) {
        // On success: show message, reset form, and navigate home
        toast.success("Pit form submitted successfully");
        setFormState({ ...DEFAULT_STATE, teamNumber });
        navigate("/");
      } else {
        // On API error: show error and re-enable submit button
        toast.error("Pit form submission failed");
        setFormSubmitted(false);
      }
    } catch (error) {
      // On network/server error: show error and re-enable submit button
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
