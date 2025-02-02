import { useState, useEffect } from "react";
import Header from "../../components/header/header";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { submitMatchScout } from "../../api/server";
import Counter from "../../components/counter/counter";
import Dropdown from "../../components/dropdown/dropdown";
import TextBox from "../../components/textBox/textBox";
import SubmitButton from "../../components/submitBtn/submitBtn";
import "./matchScout.css";
import ScoringCounter from '../../components/scoringCounter/scoringCounter';

const CHOICEYESNOBLANK = ["-", "Yes", "No"];
const SCORING_LEVELS = ["-", "L1", "L2", "L3", "L4"];

const DEFAULT_STATE = {
  // Auto
  autoL1Scores: 0,
  autoL2Scores: 0,
  autoL3Scores: 0,
  autoL4Scores: 0,
  autoL1Attempts: 0,
  autoL2Attempts: 0,
  autoL3Attempts: 0,
  autoL4Attempts: 0,
  leftStartingZone: "",
  
  // Teleop
  teleopL1Scores: 0,
  teleopL2Scores: 0,
  teleopL3Scores: 0,
  teleopL4Scores: 0,
  teleopL1Attempts: 0,
  teleopL2Attempts: 0,
  teleopL3Attempts: 0,
  teleopL4Attempts: 0,
  scoredInNet: "",
  
  // Climb
  climbLevel: "-",
  climbSuccess: "",
  climbAttemptTime: "",
  climbComments: "",
  
  // General
  robotSpeed: "-",
  defenseRating: "-",
  generalComments: "",
};

const MatchScoutForm = ({ username }) => {
  const { teamNumber, matchNumber } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ ...DEFAULT_STATE });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to submit? You won't be able to come back to this page.");
    if (!confirmed) return;
    
    setFormSubmitted(true);

    const requiredFields = { ...formState };
    delete requiredFields.climbComments;
    delete requiredFields.generalComments;

    const isFormIncompleteExceptComments = Object.values(requiredFields).some(
      (value) => value === "" || value === undefined
    );

    if (isFormIncompleteExceptComments) {
      toast.error("Form is not filled out completely");
      setFormSubmitted(false);
      return;
    }

    try {
      const response = await submitMatchScout(teamNumber, {
        ...formState,
        username,
        matchNumber,
      });
      if (response.ok) {
        toast.success("Match Scout form submitted successfully");
        setFormState({ ...DEFAULT_STATE });
        navigate("/");
      } else {
        toast.error("Match Scout form submission failed");
        setFormSubmitted(false);
      }
    } catch (error) {
      toast.error("Internal Server Error");
      setFormSubmitted(false);
      console.error(error);
    }
  };

  const handleNotesScored = (name, value) => {
    const level = name.match(/L\d/)[0];
    const phase = name.includes('auto') ? 'auto' : 'teleop';
    
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
      [`${phase}${level}Attempts`]: Math.max(value, prevState[`${phase}${level}Attempts`])
    }));
  };

  return (
    <div>
      <Header
        toWhere="/matchscout-team-choice"
        headerText={
          <>
            <span style={{ color: "#FFFFFF" }}>Match Scout</span>
          </>
        }
      />
      <form onSubmit={handleSubmit} className="matchScout">
        {/* Auto Scoring Section */}
        <div className="scout-section">
          <h2>Auto Period - Scoring</h2>
          {SCORING_LEVELS.slice(1).map((level) => (
            <div key={`auto${level}`} className="scoring-subsection">
              <h3>{level}</h3>
              <ScoringCounter
                scoredValue={formState[`auto${level}Scores`]}
                attemptedValue={formState[`auto${level}Attempts`]}
                onScoredChange={(value) => handleNotesScored(`auto${level}Scores`, value)}
                onAttemptedChange={(value) => 
                  setFormState(prevState => ({
                    ...prevState,
                    [`auto${level}Attempts`]: Math.max(value, prevState[`auto${level}Scores`])
                  }))
                }
              />
            </div>
          ))}
          <Dropdown
            label="Left Starting Zone?"
            options={CHOICEYESNOBLANK}
            onSelect={(value) => setFormState({ ...formState, leftStartingZone: value })}
            defaultOption={formState.leftStartingZone}
          />
        </div>

        {/* Teleop Scoring Section */}
        <div className="scout-section">
          <h2>Teleop Period - Scoring</h2>
          {SCORING_LEVELS.slice(1).map((level) => (
            <div key={`teleop${level}`} className="scoring-subsection">
              <h3>{level}</h3>
              <ScoringCounter
                scoredValue={formState[`teleop${level}Scores`]}
                attemptedValue={formState[`teleop${level}Attempts`]}
                onScoredChange={(value) => handleNotesScored(`teleop${level}Scores`, value)}
                onAttemptedChange={(value) => 
                  setFormState(prevState => ({
                    ...prevState,
                    [`teleop${level}Attempts`]: Math.max(value, prevState[`teleop${level}Scores`])
                  }))
                }
              />
            </div>
          ))}
          <Dropdown
            label="Scored in Net?"
            options={CHOICEYESNOBLANK}
            onSelect={(value) => setFormState({ ...formState, scoredInNet: value })}
            defaultOption={formState.scoredInNet}
          />
        </div>

        {/* Climb Section */}
        <div className="scout-section">
          <h2>Climb</h2>
          <div className="climb-section">
            <Dropdown
              label="Climb Level Attempted"
              options={SCORING_LEVELS}
              onSelect={(value) => setFormState({ ...formState, climbLevel: value })}
              defaultOption={formState.climbLevel}
            />
            <Dropdown
              label="Successful Climb?"
              options={CHOICEYESNOBLANK}
              onSelect={(value) => setFormState({ ...formState, climbSuccess: value })}
              defaultOption={formState.climbSuccess}
            />
            <Dropdown
              label="When did they attempt to climb?"
              options={["-", "Early (>30s)", "Mid (15-30s)", "Late (<15s)"]}
              onSelect={(value) => setFormState({ ...formState, climbAttemptTime: value })}
              defaultOption={formState.climbAttemptTime}
            />
            <TextBox
              label="Climb Comments"
              name="climbComments"
              value={formState.climbComments}
              onChange={(e) => setFormState({ ...formState, climbComments: e.target.value })}
            />
          </div>
        </div>

        {/* Robot Performance Section */}
        <div className="scout-section">
          <h2>Robot Performance</h2>
          <Dropdown
            label="Robot Speed"
            options={["-", "Slow", "Medium", "Fast"]}
            onSelect={(value) => setFormState({ ...formState, robotSpeed: value })}
            defaultOption={formState.robotSpeed}
          />
          <Dropdown
            label="Defense Rating"
            options={["-", "No Defense", "1", "2", "3", "4", "5"]}
            onSelect={(value) => setFormState({ ...formState, defenseRating: value })}
            defaultOption={formState.defenseRating}
          />
          <TextBox
            label="General Comments"
            name="generalComments"
            value={formState.generalComments}
            onChange={(e) => setFormState({ ...formState, generalComments: e.target.value })}
          />
        </div>

        <SubmitButton label={formSubmitted ? "Submitting..." : "Submit"} />
      </form>
    </div>
  );
};

export default MatchScoutForm; 