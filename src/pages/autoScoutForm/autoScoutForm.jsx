import { useState, useEffect } from "react";
import SubmitButton from "../../components/submitBtn/submitBtn";
import Header from "../../components/header/header";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { submitAutoScout } from "../../api/server"; // Assuming you have a function for auto scouting
import Counter from "../../components/counter/counter";
import Dropdown from "../../components/dropdown/dropdown";

const CHOICEYESNOBLANK = ["", "Yes", "No"]; // Added blank for default
const DEFAULT_STATE = {
  notesScoredInSpeaker: 0,
  notesScoredInAmp: 0,
  leftRobotStartingZone: "",
  attemptedShotsInSpeaker: 0,
  attemptedShotsInAmp: 0,
};

const AutoScoutForm = ({ username }) => {
  const { teamNumber } = useParams();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({ ...DEFAULT_STATE });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to submit? You won't be able to come back to this page.");
    if (confirmed) {
      setFormSubmitted(true);
    }
  };

  useEffect(() => {
    const submitForm = async () => {
      const isFormIncomplete = Object.values(formState).some(
        (value) => value === "" || value === undefined
      );

      if (isFormIncomplete) {
        toast.error("Form is not filled out completely");
        setFormSubmitted(false);
        return;
      }

      try {
        submitAutoScout(teamNumber, {
          ...formState,
          username,
        });
        toast.success("Auto Scout form submitted successfully");
        setFormState({ ...DEFAULT_STATE });
        navigate(`/matchscout-team-form/${teamNumber}/teleop`);
      } catch (error) {
        toast.error("Auto Scout form submission failed");
        console.error(error);
        setFormSubmitted(false);
      }
    };

    if (formSubmitted) {
      submitForm();
    }
  }, [formSubmitted, formState, navigate, teamNumber, username]);

  return (
    <div>
      <Header
        toWhere={`/matchscout-team-choice`}
        headerText={
          <>
            <span style={{ color: "#FFFFFF" }}>Auto Scout</span>
          </>
        }
      />
      <form onSubmit={handleSubmit} className="autoScout">
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
          label="Robot left Robot Starting Zone?"
          options={CHOICEYESNOBLANK}
          onSelect={(value) =>
            setFormState({ ...formState, leftRobotStartingZone: value })
          }
          defaultOption={formState.leftRobotStartingZone}
        />

        <SubmitButton label={formSubmitted ? "Submitting..." : "Submit"} />
      </form>
    </div>
  );
};

export default AutoScoutForm;
