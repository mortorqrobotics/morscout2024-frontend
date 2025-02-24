import { useState, useEffect } from "react";
import Header from "../../components/header/header";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { submitMatchScout, toggleMatchButtonStatus } from "../../api/server";
import Counter from "../../components/counter/counter";
import Dropdown from "../../components/dropdown/dropdown";
import TextBox from "../../components/textBox/textBox";
import SubmitButton from "../../components/submitBtn/submitBtn";
import "./matchScout.css";
import ScoringCounter from '../../components/scoringCounter/scoringCounter';
import Checkbox from "../../components/checkbox/checkbox";

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
  autoProcessorAlgaeScores: 0,
  autoProcessorAlgaeAttempts: 0,
  autoNetAlgaeScores: 0,
  autoNetAlgaeAttempts: 0,
  leftStartingZone: "No",
  
  // Teleop
  teleopL1Scores: 0,
  teleopL2Scores: 0,
  teleopL3Scores: 0,
  teleopL4Scores: 0,
  teleopL1Attempts: 0,
  teleopL2Attempts: 0,
  teleopL3Attempts: 0,
  teleopL4Attempts: 0,
  teleopProcessorAlgaeScores: 0,
  teleopProcessorAlgaeAttempts: 0,
  teleopNetAlgaeScores: 0,
  teleopNetAlgaeAttempts: 0,


  // Climb
  climbLevel: "None",
  climbSuccess: "No",
  climbAttemptTime: "None",
  climbComments: "",
  
  // General
  robotSpeed: "None",
    // defenseRating: "-",
  generalComments: "",
};

const orderFormData = (data) => {
  // Create ordered sections based on DEFAULT_STATE structure
  const orderedData = {
    // Match Info
    matchNumber: data.matchNumber,
    
    // Auto
    autoL1Scores: data.autoL1Scores,
    autoL2Scores: data.autoL2Scores,
    autoL3Scores: data.autoL3Scores,
    autoL4Scores: data.autoL4Scores,
    autoL1Attempts: data.autoL1Attempts,
    autoL2Attempts: data.autoL2Attempts,
    autoL3Attempts: data.autoL3Attempts,
    autoL4Attempts: data.autoL4Attempts,
    autoProcessorAlgaeScores: data.autoProcessorAlgaeScores,
    autoProcessorAlgaeAttempts: data.autoProcessorAlgaeAttempts,
    autoNetAlgaeScores: data.autoNetAlgaeScores,
    autoNetAlgaeAttempts: data.autoNetAlgaeAttempts,
    leftStartingZone: data.leftStartingZone,
    
    // Teleop
    teleopL1Scores: data.teleopL1Scores,
    teleopL2Scores: data.teleopL2Scores,
    teleopL3Scores: data.teleopL3Scores,
    teleopL4Scores: data.teleopL4Scores,
    teleopL1Attempts: data.teleopL1Attempts,
    teleopL2Attempts: data.teleopL2Attempts,
    teleopL3Attempts: data.teleopL3Attempts,
    teleopL4Attempts: data.teleopL4Attempts,
    teleopProcessorAlgaeScores: data.teleopProcessorAlgaeScores,
    teleopProcessorAlgaeAttempts: data.teleopProcessorAlgaeAttempts,
    teleopNetAlgaeScores: data.teleopNetAlgaeScores,
    teleopNetAlgaeAttempts: data.teleopNetAlgaeAttempts,

    // Climb
    climbLevel: data.climbLevel,
    climbSuccess: data.climbSuccess,
    climbAttemptTime: data.climbAttemptTime,
    climbComments: data.climbComments,
    
    // General
    robotSpeed: data.robotSpeed,
    // defenseRating: data.defenseRating,
    generalComments: data.generalComments,
  };

  return orderedData;
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

    // Track incomplete fields
    const incompleteFields = [];
    
    Object.entries(requiredFields).forEach(([key, value]) => {
      if (typeof value === 'string' && (value === "" || value === "-")) {
        incompleteFields.push(key);
      }
    });

    if (incompleteFields.length > 0) {
      toast.error(`Incomplete fields: ${incompleteFields.join(', ')}`);
      console.log('Incomplete fields:', incompleteFields);
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

  const handleSingleOptionSelect = (field, option, value) => {
    setFormState(prevState => ({
      ...prevState,
      [field]: value ? option : "None"
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
          
          {/* Auto Coral Scoring */}
          <div className="scoring-subsection">
            <h3>Coral Scoring</h3>
            {SCORING_LEVELS.slice(1).map((level) => (
              <div key={`auto${level}`} className="scoring-group">
                <div className="scoring-label-container">
                  <div className="scoring-label">{level}</div>
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
              </div>
            ))}
          </div>

          {/* Auto Algae Scoring */}
          <div className="scoring-subsection">
            <h3>Algae Scoring</h3>
            <div className="counter-group">
              <div className="scoring-label">Processor</div>
              <ScoringCounter
                scoredValue={formState.autoProcessorAlgaeScores}
                attemptedValue={formState.autoProcessorAlgaeAttempts}
                onScoredChange={(value) => 
                  setFormState(prevState => ({
                    ...prevState,
                    autoProcessorAlgaeScores: value,
                    autoProcessorAlgaeAttempts: Math.max(value, prevState.autoProcessorAlgaeAttempts)
                  }))
                }
                onAttemptedChange={(value) => 
                  setFormState(prevState => ({
                    ...prevState,
                    autoProcessorAlgaeAttempts: Math.max(value, prevState.autoProcessorAlgaeScores)
                  }))
                }
              />
            </div>
            <div className="counter-group">
              <div className="scoring-label">Net</div>
              <ScoringCounter
                scoredValue={formState.autoNetAlgaeScores}
                attemptedValue={formState.autoNetAlgaeAttempts}
                onScoredChange={(value) => 
                  setFormState(prevState => ({
                    ...prevState,
                    autoNetAlgaeScores: value,
                    autoNetAlgaeAttempts: Math.max(value, prevState.autoNetAlgaeAttempts)
                  }))
                }
                onAttemptedChange={(value) => 
                  setFormState(prevState => ({
                    ...prevState,
                    autoNetAlgaeAttempts: Math.max(value, prevState.autoNetAlgaeScores)
                  }))
                }
              />
            </div>
          </div>

          <div className="starting-zone-section">
            <Checkbox
              label="Left Starting Zone?"
              checked={formState.leftStartingZone === "Yes"}
              onChange={(checked) => 
                setFormState(prevState => ({
                  ...prevState,
                  leftStartingZone: checked ? "Yes" : "No"
                }))
              }
            />
          </div>
        </div>

        {/* Teleop Scoring Section */}
        <div className="scout-section">
          <h2>Teleop Period - Scoring</h2>
          
          {/* Teleop Coral Scoring */}
          <div className="scoring-subsection">
            <h3>Coral Scoring</h3>
            {SCORING_LEVELS.slice(1).map((level) => (
              <div key={`teleop${level}`} className="scoring-group">
                <div className="scoring-label-container">
                  <div className="scoring-label">{level}</div>
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
              </div>
            ))}
          </div>

          {/* Teleop Algae Scoring */}
          <div className="scoring-subsection">
            <h3>Algae Scoring</h3>
            <div className="counter-group">
              <div className="scoring-label">Processor</div>
              <ScoringCounter
                scoredValue={formState.teleopProcessorAlgaeScores}
                attemptedValue={formState.teleopProcessorAlgaeAttempts}
                onScoredChange={(value) => 
                  setFormState(prevState => ({
                    ...prevState,
                    teleopProcessorAlgaeScores: value,
                    teleopProcessorAlgaeAttempts: Math.max(value, prevState.teleopProcessorAlgaeAttempts)
                  }))
                }
                onAttemptedChange={(value) => 
                  setFormState(prevState => ({
                    ...prevState,
                    teleopProcessorAlgaeAttempts: Math.max(value, prevState.teleopProcessorAlgaeScores)
                  }))
                }
              />
            </div>
            <div className="counter-group">
              <div className="scoring-label">Net</div>
              <ScoringCounter
                scoredValue={formState.teleopNetAlgaeScores}
                attemptedValue={formState.teleopNetAlgaeAttempts}
                onScoredChange={(value) => 
                  setFormState(prevState => ({
                    ...prevState,
                    teleopNetAlgaeScores: value,
                    teleopNetAlgaeAttempts: Math.max(value, prevState.teleopNetAlgaeAttempts)
                  }))
                }
                onAttemptedChange={(value) => 
                  setFormState(prevState => ({
                    ...prevState,
                    teleopNetAlgaeAttempts: Math.max(value, prevState.teleopNetAlgaeScores)
                  }))
                }
              />
            </div>
          </div>
        </div>

        {/* Climb Section */}
        <div className="scout-section">
          <h2>Climb</h2>
          <div className="climb-section">
            <div className="climb-options">
              <div className="checkbox-group">
                <h3>Climb Level Attempted</h3>
                <div className="checkbox-row">
                  <Checkbox
                    label="Deep"
                    checked={formState.climbLevel === "Deep"}
                    onChange={(checked) => handleSingleOptionSelect('climbLevel', "Deep", checked)}
                  />
                  <Checkbox
                    label="Shallow"
                    checked={formState.climbLevel === "Shallow"}
                    onChange={(checked) => handleSingleOptionSelect('climbLevel', "Shallow", checked)}
                  />
                </div>
              </div>

              <div className="checkbox-group">
                <h3>Climb Success</h3>
                <div className="checkbox-row">
                  <Checkbox
                    label="Successful Climb?"
                    checked={formState.climbSuccess === "Yes"}
                    onChange={(checked) => 
                      setFormState(prevState => ({
                        ...prevState,
                        climbSuccess: checked ? "Yes" : "No"
                      }))
                    }
                  />
                </div>
              </div>

              <div className="checkbox-group">
                <h3>Climb Attempt Timing</h3>
                <div className="checkbox-row">
                  <Checkbox
                    label="Early (>30s)"
                    checked={formState.climbAttemptTime === "Early (>30s)"}
                    onChange={(checked) => handleSingleOptionSelect('climbAttemptTime', "Early (>30s)", checked)}
                  />
                  <Checkbox
                    label="Mid (15-30s)"
                    checked={formState.climbAttemptTime === "Mid (15-30s)"}
                    onChange={(checked) => handleSingleOptionSelect('climbAttemptTime', "Mid (15-30s)", checked)}
                  />
                  <Checkbox
                    label="Late (<15s)"
                    checked={formState.climbAttemptTime === "Late (<15s)"}
                    onChange={(checked) => handleSingleOptionSelect('climbAttemptTime', "Late (<15s)", checked)}
                  />
                </div>
              </div>
            </div>

            <div className="comments-section">
              <TextBox
                label="Climb Comments"
                name="climbComments"
                value={formState.climbComments}
                onChange={(e) => setFormState({ ...formState, climbComments: e.target.value })}
                placeholder="Add any additional comments about the climb..."
              />
            </div>
          </div>
        </div>

        {/* Robot Performance Section */}
        <div className="scout-section">
          <h2>Robot Performance</h2>
          <div className="checkbox-group">
            <h3>Robot Speed</h3>
            <Checkbox
              label="Slow"
              checked={formState.robotSpeed === "Slow"}
              onChange={(checked) => handleSingleOptionSelect('robotSpeed', "Slow", checked)}
            />
            <Checkbox
              label="Medium"
              checked={formState.robotSpeed === "Medium"}
              onChange={(checked) => handleSingleOptionSelect('robotSpeed', "Medium", checked)}
            />
            <Checkbox
              label="Fast"
              checked={formState.robotSpeed === "Fast"}
              onChange={(checked) => handleSingleOptionSelect('robotSpeed', "Fast", checked)}
            />
          </div>
          {/* <Dropdown
            label="Defense Rating"
            options={["-", "No Defense", "1", "2", "3", "4", "5"]}
            onSelect={(value) => setFormState({ ...formState, defenseRating: value })}
            defaultOption={formState.defenseRating}
          /> */}
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