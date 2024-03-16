import React, { useState } from "react";
import Header from "../../components/header/header";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { submitTeleop } from "../../api/server";
import Counter from "../../components/counter/counter";
import Dropdown from "../../components/dropdown/dropdown";
import TextInput from "../../components/textInput/textInput";
import SubmitButton from "../../components/submitBtn/submitBtn";
import "./ts.css";

const CHOICEYESNOBLANK = ["-", "Yes", "No"];
const DEFAULT_STATE = {
  notesScoredInSpeaker: 0,
  notesScoredInAmp: 0,
  trap: "",
  guyThrewTheRing: "",
  generalComments: "",
  robotSpeed: "-",
  didTheyDoDefense: "-",
  climbRating: "-",
  climbComments: "",
  didRobotClimbWithAnother: "", // New state key
  attemptedShotsInSpeaker: 0,
  attemptedShotsInAmp: 0,
};

const TeleopScoutForm = ({ username }) => {
  const { teamNumber } = useParams();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({ ...DEFAULT_STATE });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    const isFormIncomplete = Object.values(formState).some(
      (value) => value === "" || value === undefined
    );

    const requiredFields = { ...formState };
    delete requiredFields.climbComments;
    delete requiredFields.generalComments;

    const isFormIncompleteExceptComments = Object.values(requiredFields).some(
      (value) => value === "" || value === undefined
    );

    if (isFormIncompleteExceptComments) {
      toast.error("Form is not filled out completely");
      return;
    }

    try {
      const response = await submitTeleop(teamNumber, {
        ...formState,
        username,
      });
      if (response.ok) {
        toast.success("TeleopScout form submitted successfully");
        setFormState({ ...DEFAULT_STATE });
        navigate("/");
      } else {
        toast.error("TeleopScout form submission failed");
        setFormSubmitted(false);
      }
    } catch (error) {
      toast.error("Internal Server Error");
      setFormSubmitted(false);
      console.error(error);
    }
  };

  const handleClimbRatingChange = (value) => {
    if (value === "No Climb") {
      // Clear climbComments only if "No Climb" is selected
      setFormState((prevState) => ({
        ...prevState,
        climbRating: value,
        climbComments: "",
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        climbRating: value,
      }));
    }
  };

  return (
    <div>
      <Header toWhere="/" headerText="Teleop" />
      <form onSubmit={handleSubmit} className="teleopScout">
        <Counter
          label="Notes Scored in Speaker"
          name="notesScoredInSpeaker"
          value={formState.notesScoredInSpeaker}
          onChange={(name, value) =>
            setFormState({ ...formState, [name]: value })
          }
        />
        <Counter
          label="Notes Attempted in Speaker"
          name="attemptedShotsInSpeaker"
          value={formState.attemptedShotsInSpeaker}
          onChange={(name, value) =>
            setFormState({ ...formState, [name]: value })
          }
        />
        <Counter
          label="Notes Scored in Amp"
          name="notesScoredInAmp"
          value={formState.notesScoredInAmp}
          onChange={(name, value) =>
            setFormState({ ...formState, [name]: value })
          }
        />
        <Counter
          label="Notes Attempted in Amp"
          name="attemptedShotsInAmp"
          value={formState.attemptedShotsInAmp}
          onChange={(name, value) =>
            setFormState({ ...formState, [name]: value })
          }
        />
        <Dropdown
          label="Scored in Trap?"
          options={CHOICEYESNOBLANK}
          onSelect={(value) => setFormState({ ...formState, trap: value })}
          defaultOption={formState.trap}
        />
        <Dropdown
          label="Human Player Scored Microphone?"
          options={CHOICEYESNOBLANK}
          onSelect={(value) =>
            setFormState({ ...formState, guyThrewTheRing: value })
          }
          defaultOption={formState.guyThrewTheRing}
        />
        <Dropdown
          label="Did the robot climb with another robot?" // New label
          options={CHOICEYESNOBLANK} // Updated options
          onSelect={
            (value) =>
              setFormState({ ...formState, didRobotClimbWithAnother: value }) // New state key
          }
          defaultOption={formState.didRobotClimbWithAnother} // Updated default option
        />
        <Dropdown
          label="Robot Speed"
          options={["-", "Slow", "Medium", "Fast"]}
          onSelect={(value) =>
            setFormState({ ...formState, robotSpeed: value })
          }
          defaultOption={formState.robotSpeed}
        />
        <Dropdown
          label="Climb Rating"
          options={["-", "No Climb", "1", "2", "3", "4", "5"]}
          onSelect={handleClimbRatingChange}
          defaultOption={formState.climbRating}
        />
        <TextInput
          label="Climb Comments"
          name="climbComments"
          value={formState.climbComments}
          onChange={(e) =>
            setFormState({ ...formState, climbComments: e.target.value })
          }
        />
        <Dropdown
          label="Did they play defense?"
          options={CHOICEYESNOBLANK}
          onSelect={(value) =>
            setFormState({ ...formState, didTheyDoDefense: value })
          }
          defaultOption={formState.didTheyDoDefense}
        />
        <TextInput
          label="Comments"
          name="generalComments"
          value={formState.generalComments}
          onChange={(e) =>
            setFormState({ ...formState, generalComments: e.target.value })
          }
        />
        <SubmitButton label={formSubmitted ? "Submitting..." : "Submit"} />
      </form>
    </div>
  );
};

export default TeleopScoutForm;
