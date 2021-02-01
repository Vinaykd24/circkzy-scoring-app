import React, { useState } from "react";
import { Modal, Form, Radio } from "semantic-ui-react";

export const SelectionModalPage = ({
  playerList,
  title,
  handleEvent,
  isOpen,
  player,
}) => {
  const [open, setOpen] = React.useState({ isOpen });

  return (
    <Modal
      size="mini"
      open={open}
      dimmer="blurring"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <div className="changeBowler">
          {Object.entries(playerList).map(([key, value], i) => (
            <Form.Field key={i}>
              <Radio
                className="b"
                key={i}
                label={value["name"]}
                disabled={player["id"] === value["id"]}
                onChange={() => handleEvent(value)}
              />
            </Form.Field>
          ))}
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default SelectionModalPage;
