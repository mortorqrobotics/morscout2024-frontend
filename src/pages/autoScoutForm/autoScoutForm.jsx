import { useState, useEffect } from "react";
import SubmitButton from "../../components/submitBtn/submitBtn";
import Header from "../../components/header/header";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { submitAutoScout } from "../../api/server"; // Assuming you have a function for auto scouting
import Counter from "../../components/counter/counter";
import Dropdown from "../../components/dropdown/dropdown";

const CHOICEYESNO = ["Yes", "No"];
const DEFAULT_STATE = {
  speakerCounter: 0,
  ampCounter: 0,
  leftTheStation: "Yes"
};

const AutoScoutForm = ({ username }) => {
  const { teamNumber } = useParams();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({ ...DEFAULT_STATE });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
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
        const response = await submitAutoScout(teamNumber, {
          ...formState,
          username,
        });
        if (response.ok) {
          toast.success("Auto Scout form submitted successfully");
          setFormState({ ...DEFAULT_STATE });
          navigate(`/matchscout-team-form/${teamNumber}/teleop`);
        } else {
          toast.error("Auto Scout form submission failed");
        }
      } catch (error) {
        toast.error("Internal Server Error");
        console.error(error);
      } finally {
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
          label="Speaker Counter"
          name="speakerCounter"
          value={formState.speakerCounter}
          onChange={(name, value) =>
            setFormState({ ...formState, [name]: value })
          }
        />

        <Counter
          label="Amp Counter"
          name="ampCounter"
          value={formState.ampCounter}
          onChange={(name, value) =>
            setFormState({ ...formState, [name]: value })
          }
        />

        <Dropdown
          label="Robot left the station?"
          options={CHOICEYESNO}
          onSelect={(value) =>
            setFormState({ ...formState, leftTheStation: value })
          }
          defaultOption={formState.leftTheStation}
        />

        <SubmitButton label={formSubmitted ? "Submitting..." : "Submit"} />
      </form>
    </div>
  );
};

export default AutoScoutForm;
