import React from 'react';
import { Button, Input, Form } from 'semantic-ui-react';

const AddPlayerFormPage = ({
  handleHomeTeamSubmit,
  homePlayer,
  addPlayerName,
  playerList,
  teamCategory,
  isHomeTeam,
}) => {
  return (
    <Form onSubmit={(e) => handleHomeTeamSubmit(e, isHomeTeam, teamCategory)}>
      <h2>Add Home Team Players</h2>
      <Form.Field>
        <label>First Name</label>
        <Input
          placeholder="First Name"
          name="homeTeam"
          value={homePlayer}
          onChange={(e) => addPlayerName(e.target.value, isHomeTeam)}
        />
      </Form.Field>
      <Button type="submit" disabled={playerList[teamCategory].length >= 10}>
        Submit
      </Button>
    </Form>
  );
};

export default AddPlayerFormPage;
