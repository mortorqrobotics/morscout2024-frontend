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

const CHOICEYESNO = ["Yes", "No"];
const DEFAULT_STATE = {
  speakerCounter: 0,
  ampCounter: 0,
  trap: "Yes",
  guyThrewTheRing: "Yes",
  generalComments: "",
  robotSpeed: "Slow",
  didTheyDoDefense: "No",
  climbRating: "No Climb",
  climbComments: ""
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

    // Optional: Remove climbComments and generalComments from required fields check
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
    setFormState({ ...formState, climbRating: value });
    if (value === "No Climb") {
      setFormState({ ...formState, climbComments: "" });
    }
  };

  return (
    <div>
      <Header
        toWhere={`/matchscout-team-form/${teamNumber}/auto`}
        headerText={
          <>
            <span style={{ color: "#FFFFFF" }}>Teleop</span>
          </>
        }
      />
      <form onSubmit={handleSubmit} className="teleopScout">
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
          label="Trap?"
          options={CHOICEYESNO}
          onSelect={(value) => setFormState({ ...formState, trap: value })}
          defaultOption={formState.trap}
        />
        <Dropdown
          label="Human Player Attempted To Shoot :"
          options={CHOICEYESNO}
          onSelect={(value) =>
            setFormState({ ...formState, guyThrewTheRing: value })
          }
          defaultOption={formState.guyThrewTheRing}
        />

        <Dropdown
          label="Robot Speed"
          options={["Slow", "Medium", "Fast"]}
          onSelect={(value) =>
            setFormState({ ...formState, robotSpeed: value })
          }
          defaultOption={formState.robotSpeed}
        />
        <Dropdown
          label="Climb Rating"
          options={["No Climb", "1", "2", "3", "4", "5"]}
          onSelect={handleClimbRatingChange}
          defaultOption={formState.climbRating}
        />
        {formState.climbRating !== "No Climb" && (
          <TextInput
            label="Climb Comments"
            name="climbComments"
            value={formState.climbComments}
            onChange={(e) =>
              setFormState({ ...formState, climbComments: e.target.value })
            }
          />
        )}

        <Dropdown
          label="Did they do defense?"
          options={CHOICEYESNO}
          onSelect={(value) =>
            setFormState({ ...formState, didTheyDoDefense: value })
          }
          defaultOption={formState.didTheyDoDefense}
        />
        {/* Make General Comments field optional */}
        <TextInput
          label="General Comments"
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
