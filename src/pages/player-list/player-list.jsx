import React from "react";
import { Divider, List } from "semantic-ui-react";

const PlayerListPage = ({
  playerList,
  handleDelete,
  isHomeTeam,
  playerListClone,
}) => {
  return (
    <>
      <List animated divided verticalAlign="middle">
        {playerList.map((player) => (
          <List.Item key={player.id}>
            <List.Content floated="right">
              <List.Icon
                link
                name="delete"
                size="small"
                verticalAlign="middle"
                onClick={() => handleDelete(player.id, isHomeTeam)}
              />
            </List.Content>
            <List.Icon name="user circle" />
            <List.Content>
              <List.Header>{player.playerName}</List.Header>
            </List.Content>
          </List.Item>
        ))}
      </List>
      <Divider />
      <List animated divided verticalAlign="middle">
        {playerListClone !== null || playerListClone !== undefined
          ? Object.keys(playerListClone).map((keyName) => (
              <List.Item key={playerListClone[keyName]["id"]}>
                <List.Content floated="right">
                  <List.Icon
                    link
                    name="delete"
                    size="small"
                    verticalAlign="middle"
                    onClick={() => handleDelete(keyName, isHomeTeam)}
                  />
                </List.Content>
                <List.Icon name="user circle" />
                <List.Content>
                  <List.Header>
                    {playerListClone[keyName]["playerName"]}
                  </List.Header>
                </List.Content>
              </List.Item>
            ))
          : ""}
      </List>
    </>
  );
};

export default PlayerListPage;
