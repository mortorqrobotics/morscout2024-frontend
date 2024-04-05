import { useState } from "react";
import Header from "../../components/header/header";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { submitTeleop } from "../../api/server";
import Counter from "../../components/counter/counter";
import Dropdown from "../../components/dropdown/dropdown";
import TextInput from "../../components/textInput/textInput";
import SubmitButton from "../../components/submitBtn/submitBtn";
import "./ts.css";
import TextBox from "../../components/textBox/textBox";

const CHOICEYESNOBLANK = ["-", "Yes", "No"];
const DEFAULT_STATE = {
  notesScoredInSpeakerInTeleop: 0,
  notesScoredInAmpInTeleop: 0,
  trap: "",
  guyThrewTheRing: "",
  generalComments: "",
  robotSpeed: "-",
  climbRating: "-",
  climbComments: "",
  didRobotClimbWithAnother: "", // New state key
  attemptedShotsInSpeakerInTeleop: 0,
  attemptedShotsInAmpInTeleop: 0,
  defenseRating: "",
};

const TeleopScoutForm = ({ username }) => {
  const { teamNumber, matchNumber } = useParams();
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
        matchNumber,
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
      <h1 style={{paddingTop:"20px"}}>Teleop</h1>
      <form onSubmit={handleSubmit} className="teleopScout">
        <Counter
          label="Notes Scored in Speaker"
          name="notesScoredInSpeakerInTeleop"
          value={formState.notesScoredInSpeakerInTeleop}
          onChange={(name, value) =>
            setFormState({ ...formState, [name]: value })
          }
        />
        <Counter
          label="Notes Attempted in Speaker"
          name="attemptedShotsInSpeakerInTeleop"
          value={formState.attemptedShotsInSpeakerInTeleop}
          onChange={(name, value) =>
            setFormState({ ...formState, [name]: value })
          }
        />
        <Counter
          label="Notes Scored in Amp"
          name="notesScoredInAmpInTeleop"
          value={formState.notesScoredInAmpInTeleop}
          onChange={(name, value) =>
            setFormState({ ...formState, [name]: value })
          }
        />
        <Counter
          label="Notes Attempted in Amp"
          name="attemptedShotsInAmpInTeleop"
          value={formState.attemptedShotsInAmpInTeleop}
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
        <TextBox
          label="Climb Comments"
          name="climbComments"
          value={formState.climbComments}
          onChange={(e) =>
            setFormState({ ...formState, climbComments: e.target.value })
          }
        />
        <Dropdown
          label="Defense Rating"
          options={["-", "No Defense", "1", "2", "3", "4", "5"]}
          onSelect={(value) =>
            setFormState({ ...formState, defenseRating: value })
          }
          defaultOption={formState.defenseRating}
        />
        <TextBox
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
