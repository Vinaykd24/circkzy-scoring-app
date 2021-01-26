import React, { useState, useContext } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Button, Input, Form } from "semantic-ui-react";
import { MatchContext } from "../../providers/match/match.provider";

const MatchDetails = () => {
  const { addMatchDetails } = useContext(MatchContext);
  let history = useHistory();

  const [state, setstate] = useState({
    homeTeamName: "",
    awayTeamName: "",
    venue: "",
    tournametName: "",
    tossWonBy: "",
    electedTo: "",
    teamBatingFirst: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    addMatchDetails(state);
    setstate({
      homeTeamName: "",
      awayTeamName: "",
      venue: "",
      tournametName: "",
      tossWonBy: "",
      electedTo: "",
      teamBatingFirst: "",
    });
    history.push("/addPlayers");
  };

  return (
    <div className="pa3">
      <h3>Add Match Details</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Tournamet Name</label>
          <Input
            placeholder="Tournamet Name"
            name="tourName"
            value={state.tournametName}
            onChange={(e) =>
              setstate({ ...state, tournametName: e.target.value })
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Venue Name</label>
          <Input
            placeholder="Venue Name"
            name="venue"
            value={state.venue}
            onChange={(e) => setstate({ ...state, venue: e.target.value })}
          />
        </Form.Field>
        <Form.Field>
          <label>Home Team</label>
          <Input
            placeholder="Home Team Name"
            name="homeTeamName"
            value={state.homeTeamName}
            onChange={(e) =>
              setstate({ ...state, homeTeamName: e.target.value })
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Away Team</label>
          <Input
            placeholder="Away Team Name"
            name="awayTeamName"
            value={state.awayTeamName}
            onChange={(e) =>
              setstate({ ...state, awayTeamName: e.target.value })
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Toss Won By</label>
          <select
            className="ui selection dropdown mr3"
            placeholder="Toss Won By"
            value={state.tossWonBy}
            onChange={(e) => setstate({ ...state, tossWonBy: e.target.value })}
          >
            <option key="homeTeamName" value={state.homeTeamName}>
              {state.homeTeamName}
            </option>
            <option key="awayTeamName" value={state.awayTeamName}>
              {state.awayTeamName}
            </option>
          </select>
        </Form.Field>
        <Form.Field>
          <label>Elected To</label>
          <select
            className="ui selection dropdown mr3"
            placeholder="Elected To"
            value={state.electedTo}
            onChange={(e) => setstate({ ...state, electedTo: e.target.value })}
          >
            <option key="bat" value="BAT">
              BAT
            </option>
            <option key="bowl" value="BOWL">
              BOWL
            </option>
          </select>
        </Form.Field>
        <Form.Field>
          <label>Team Batting First</label>
          <select
            className="ui selection dropdown mr3"
            placeholder="Toss Won By"
            value={state.tossWonBy}
            onChange={(e) =>
              setstate({ ...state, teamBatingFirst: e.target.value })
            }
          >
            <option key="key01" value={state.homeTeamName}>
              {state.homeTeamName}
            </option>
            <option key="key02" value={state.awayTeamName}>
              {state.awayTeamName}
            </option>
          </select>
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default MatchDetails;
