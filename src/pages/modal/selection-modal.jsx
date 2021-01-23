import React from 'react';
import { Modal, Form, Radio } from 'semantic-ui-react';

export const SelectionModalPage = ({
  bowlerDetails,
  currentBowler,
  updateBowler,
}) => {
  const exampleReducer = (state, action) => {
    switch (action.type) {
      case 'close':
        return { open: false };
      case 'open':
        return { open: true, size: action.size, dimmer: action.dimmer };
      default:
        throw new Error('Unsupported action...');
    }
  };

  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size, dimmer } = state;

  const openModal = () => {
    dispatch({ type: 'open', size: 'mini', dimmer: 'blurring' });
  };
  return (
    <Modal
      size={size}
      open={open}
      dimmer={dimmer}
      onClose={() => dispatch({ type: 'close' })}
    >
      <Modal.Header>Delete Your Account</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to delete your account</p>
        <div className="changeBowler">
          {Object.entries(bowlerDetails).map(([key, value], i) => (
            <Form.Field key={i}>
              <Radio
                className="b"
                key={i}
                label={value['name']}
                disabled={currentBowler['id'] === value['id']}
                onChange={() => updateBowler(value)}
              />
            </Form.Field>
          ))}
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default SelectionModalPage;
