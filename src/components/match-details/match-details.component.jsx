import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Input, Form } from 'semantic-ui-react';
import { MatchContext } from '../../providers/match/match.provider';

const MatchDetails = () => {
  const { addMatchDetails } = useContext(MatchContext);

  const [state, setstate] = useState({
    homeTeamName: '',
    awayTeamName: '',
    venue: '',
    tournametName: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    addMatchDetails(state);
    setstate({
      homeTeamName: '',
      awayTeamName: '',
      venue: '',
      tournametName: '',
    });
    <Redirect to="/addPlayers" />;
  };

  return (
    <>
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
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
};

export default MatchDetails;
