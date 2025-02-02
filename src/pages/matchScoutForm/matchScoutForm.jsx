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
const DEFAULT_STATE = {
  // Auto
  notesScoredInSpeaker: 0,
  notesScoredInAmp: 0,
  leftRobotStartingZone: "",
  attemptedShotsInSpeaker: 0,
  attemptedShotsInAmp: 0,
  
  // Teleop
  notesScoredInSpeakerInTeleop: 0,
  notesScoredInAmpInTeleop: 0,
  attemptedShotsInSpeakerInTeleop: 0,
  attemptedShotsInAmpInTeleop: 0,
  trap: "",
  guyThrewTheRing: "",
  robotSpeed: "-",
  climbRating: "-",
  climbComments: "",
  didRobotClimbWithAnother: "",
  defenseRating: "",
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

  const handleClimbRatingChange = (value) => {
    if (value === "No Climb") {
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

  const handleNotesScored = (name, value) => {
    // Update both scored and attempted counts
    if (name === "notesScoredInSpeaker") {
      setFormState(prevState => ({
        ...prevState,
        [name]: value,
        attemptedShotsInSpeaker: Math.max(value, prevState.attemptedShotsInSpeaker)
      }));
    } else if (name === "notesScoredInAmp") {
      setFormState(prevState => ({
        ...prevState,
        [name]: value,
        attemptedShotsInAmp: Math.max(value, prevState.attemptedShotsInAmp)
      }));
    } else if (name === "notesScoredInSpeakerInTeleop") {
      setFormState(prevState => ({
        ...prevState,
        [name]: value,
        attemptedShotsInSpeakerInTeleop: Math.max(value, prevState.attemptedShotsInSpeakerInTeleop)
      }));
    } else if (name === "notesScoredInAmpInTeleop") {
      setFormState(prevState => ({
        ...prevState,
        [name]: value,
        attemptedShotsInAmpInTeleop: Math.max(value, prevState.attemptedShotsInAmpInTeleop)
      }));
    }
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
        {/* Scoring Section - Auto */}
        <div className="scout-section">
          <h2>Auto Period - Scoring</h2>
          <div className="scoring-group">
            <div className="scoring-subsection">
              <h3>Speaker</h3>
              <ScoringCounter
                scoredValue={formState.notesScoredInSpeaker}
                attemptedValue={formState.attemptedShotsInSpeaker}
                onScoredChange={(value) => handleNotesScored("notesScoredInSpeaker", value)}
                onAttemptedChange={(value) => 
                  setFormState(prevState => ({
                    ...prevState,
                    attemptedShotsInSpeaker: Math.max(value, prevState.notesScoredInSpeaker)
                  }))
                }
              />
            </div>
            <div className="scoring-subsection">
              <h3>Amp</h3>
              <ScoringCounter
                scoredValue={formState.notesScoredInAmp}
                attemptedValue={formState.attemptedShotsInAmp}
                onScoredChange={(value) => handleNotesScored("notesScoredInAmp", value)}
                onAttemptedChange={(value) => 
                  setFormState(prevState => ({
                    ...prevState,
                    attemptedShotsInAmp: Math.max(value, prevState.notesScoredInAmp)
                  }))
                }
              />
            </div>
          </div>
          <Dropdown
            label="Robot left Starting Zone?"
            options={CHOICEYESNOBLANK}
            onSelect={(value) =>
              setFormState({ ...formState, leftRobotStartingZone: value })
            }
            defaultOption={formState.leftRobotStartingZone}
          />
        </div>

        {/* Scoring Section - Teleop */}
        <div className="scout-section">
          <h2>Teleop Period - Scoring</h2>
          <div className="scoring-group">
            <div className="scoring-subsection">
              <h3>Speaker</h3>
              <ScoringCounter
                scoredValue={formState.notesScoredInSpeakerInTeleop}
                attemptedValue={formState.attemptedShotsInSpeakerInTeleop}
                onScoredChange={(value) => handleNotesScored("notesScoredInSpeakerInTeleop", value)}
                onAttemptedChange={(value) => 
                  setFormState(prevState => ({
                    ...prevState,
                    attemptedShotsInSpeakerInTeleop: Math.max(value, prevState.notesScoredInSpeakerInTeleop)
                  }))
                }
              />
            </div>
            <div className="scoring-subsection">
              <h3>Amp</h3>
              <ScoringCounter
                scoredValue={formState.notesScoredInAmpInTeleop}
                attemptedValue={formState.attemptedShotsInAmpInTeleop}
                onScoredChange={(value) => handleNotesScored("notesScoredInAmpInTeleop", value)}
                onAttemptedChange={(value) => 
                  setFormState(prevState => ({
                    ...prevState,
                    attemptedShotsInAmpInTeleop: Math.max(value, prevState.notesScoredInAmpInTeleop)
                  }))
                }
              />
            </div>
          </div>
        </div>

        {/* End Game Section */}
        <div className="scout-section">
          <h2>End Game</h2>
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
          <div className="climb-section">
            <Dropdown
              label="Climb Rating"
              options={["-", "No Climb", "1", "2", "3", "4", "5"]}
              onSelect={handleClimbRatingChange}
              defaultOption={formState.climbRating}
            />
            <Dropdown
              label="Climbed with another robot?"
              options={CHOICEYESNOBLANK}
              onSelect={(value) =>
                setFormState({ ...formState, didRobotClimbWithAnother: value })
              }
              defaultOption={formState.didRobotClimbWithAnother}
            />
            <TextBox
              label="Climb Comments"
              name="climbComments"
              value={formState.climbComments}
              onChange={(e) =>
                setFormState({ ...formState, climbComments: e.target.value })
              }
            />
          </div>
        </div>

        {/* Robot Performance Section */}
        <div className="scout-section">
          <h2>Robot Performance</h2>
          <Dropdown
            label="Robot Speed"
            options={["-", "Slow", "Medium", "Fast"]}
            onSelect={(value) =>
              setFormState({ ...formState, robotSpeed: value })
            }
            defaultOption={formState.robotSpeed}
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
            label="General Comments"
            name="generalComments"
            value={formState.generalComments}
            onChange={(e) =>
              setFormState({ ...formState, generalComments: e.target.value })
            }
          />
        </div>

        <SubmitButton label={formSubmitted ? "Submitting..." : "Submit"} />
      </form>
    </div>
  );
};

export default MatchScoutForm; 