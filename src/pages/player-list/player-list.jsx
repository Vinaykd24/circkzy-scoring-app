import React from 'react';
import { List } from 'semantic-ui-react';

const PlayerListPage = ({ playerList, handleDelete }) => {
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
                onClick={() => handleDelete(player.id)}
              />
            </List.Content>
            <List.Icon name="user circle" />
            <List.Content>
              <List.Header>{player.playerName}</List.Header>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </>
  );
};

export default PlayerListPage;
