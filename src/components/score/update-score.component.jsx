import React, { useContext, useState } from 'react';
import {
  Button,
  Modal,
  Label,
  Radio,
  Form,
  Icon,
  Dropdown,
  Select,
} from 'semantic-ui-react';

import { useHistory } from 'react-router-dom';

import { MatchContext } from '../../providers/match/match.provider';
import {
  CHANGE_BOWLER,
  CHANGE_STRIKER,
  SET_BYES,
  SET_BYE_PLUS_RUNS,
  SET_DOT_BALL,
  SET_FOUR_RUNS,
  SET_LBYE_PLUS_RUNS,
  SET_LEG_BYES,
  SET_NO_BALL,
  SET_ONE_RUN,
  SET_SIX_RUNS,
  SET_THREE_RUNS,
  SET_TWO_RUNS,
  SET_WIDE_BALL,
  SET_WIDE_PLUS_RUNS,
  SET_NO_PLUS_RUNS,
  WICKET_FALLEN,
  NEW_BATSMAN,
} from '../../providers/match/match.actions';

const ScoreReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, open: true, dimmer: action.dimmer };
    case 'CLOSE_MODAL':
      return { open: false, openSecond: false };
    case 'OPEN_BATSMAN_MODAL':
      return { ...state, openSecond: true };
    case 'OUT_BATSMAN':
      return { ...state, outBatsman: action.playerId };
    case 'SAVE_BATSMAN':
      return { ...state, newBatsman: action.playerId };
    default:
      throw new Error();
  }
};

const UpdateScoreComponent = ({ isFirstInn }) => {
  let history = useHistory();
  const { rootState, rootDispatch } = useContext(MatchContext);
  const battingTeam = isFirstInn
    ? rootState.inn1.battingTeam
    : rootState.inn2.battingTeam;
  const bowlingTeam = isFirstInn
    ? rootState.inn1.bowlingTeam
    : rootState.inn2.bowlingTeam;
  // const { battingTeam, bowlingTeam, totalOvers } = rootState.inn1;
  const { striker, nonStriker, currentBowler } = rootState.currentStats;
  const [state, dispatch] = React.useReducer(ScoreReducer, {
    open: false,
    dimmer: undefined,
    openSecond: false,
    outBatsman: null,
  });
  const [formData, setFormData] = useState({
    outBatsmanId: null,
    howOut: null,
    nextBatsmanId: null,
  });
  const options = [
    { key: 2, text: 'Total 2', value: 2 },
    { key: 3, text: 'Total 3', value: 3 },
    { key: 4, text: 'Total 4', value: 4 },
    { key: 5, text: 'Total 5', value: 5 },
    { key: 6, text: 'Total 6', value: 6 },
    { key: 7, text: 'Total 7', value: 7 },
  ];

  const wkt_options = [
    { key: 1, text: 'Caught Behind', value: 'Caught Behind' },
    { key: 2, text: 'Caught and Bowled', value: 'Caught and Bowled' },
    { key: 3, text: 'Caught', value: 'Caught' },
    { key: 4, text: 'Bowled', value: 'Bowled' },
    { key: 5, text: 'Run Out', value: 'Run Out' },
    { key: 6, text: 'Hit Wicket', value: 'Hit Wicket' },
    { key: 7, text: 'Time Out', value: 'Time Out' },
  ];

  const current_batsmen = [
    { key: 1, text: battingTeam[striker]['playerName'], value: striker },
    { key: 2, text: battingTeam[nonStriker]['playerName'], value: nonStriker },
  ];

  const { open, dimmer, openSecond, outBatsman } = state;

  const changeStriker = () => {
    rootDispatch({ type: CHANGE_STRIKER });
  };

  const updateRuns = (type) => {
    rootDispatch({ type, player: battingTeam[striker] });
  };

  const widePlusRuns = (event, { value }) => {
    rootDispatch({ type: SET_WIDE_PLUS_RUNS, extras: value });
  };
  const noBallPlusRuns = (event, { value }) => {
    rootDispatch({ type: SET_NO_PLUS_RUNS, extras: value });
  };
  const byesPlusRuns = (event, { value }) => {
    rootDispatch({ type: SET_BYE_PLUS_RUNS, extras: value });
  };

  const lByesPlusRuns = (event, { value }) => {
    rootDispatch({ type: SET_LBYE_PLUS_RUNS, extras: value });
  };

  const selectBowler = (bowler) => {
    rootDispatch({ type: CHANGE_BOWLER, bowler: bowler.id });
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const wicketFallen = (batsManId, isStrikerOut) => {
    rootDispatch({ type: WICKET_FALLEN });
  };

  const convertObjToArray = (obj) => {
    let toArray = Object.values(obj);
    toArray = toArray.filter(
      (pl) => striker !== pl.id && nonStriker !== pl.id && !pl.isOut
    );
    toArray = [...toArray].map((player, i) => {
      return { key: i, text: player.playerName, value: player.id };
    });

    return toArray;
  };

  const setOutBatsman = (event, { value }) => {
    setFormData({ ...formData, outBatsmanId: value });
  };
  const setHowOut = (event, { value }) => {
    setFormData({ ...formData, howOut: value });
  };
  const setNextBatsman = (event, { value }) => {
    setFormData({ ...formData, nextBatsmanId: value });
  };
  const handleSubmit = () => {
    console.log(formData);
    rootDispatch({ type: NEW_BATSMAN, data: formData });
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const endOfInn = () => {
    history.push({
      pathname: '/currentStats',
      state: { isFirstInn: false },
    });
  };
  return (
    <>
      <div className="flex flex-column items-center justify-center tc">
        <div className="ma3">
          <Button.Group size="small">
            <Button size="huge" onClick={() => updateRuns(SET_DOT_BALL)}>
              0
            </Button>
            <Button
              size="huge"
              onClick={() =>
                rootDispatch({
                  type: SET_ONE_RUN,
                  player: battingTeam[striker],
                })
              }
            >
              1
            </Button>
            <Button
              size="huge"
              onClick={() =>
                rootDispatch({
                  type: SET_TWO_RUNS,
                  player: battingTeam[striker],
                })
              }
            >
              2
            </Button>
            <Button
              size="huge"
              onClick={() =>
                rootDispatch({
                  type: SET_THREE_RUNS,
                  player: battingTeam[striker],
                })
              }
            >
              3
            </Button>
            <Button
              size="huge"
              onClick={() =>
                rootDispatch({
                  type: SET_FOUR_RUNS,
                  player: battingTeam[striker],
                })
              }
            >
              4
            </Button>
            <Button
              size="huge"
              onClick={() =>
                rootDispatch({
                  type: SET_SIX_RUNS,
                  player: battingTeam[striker],
                })
              }
            >
              6
            </Button>
          </Button.Group>
        </div>
        <div className="mh3 w-100">
          <Button.Group size="small">
            <Button
              size="huge"
              onClick={() => dispatch({ type: 'OPEN_BATSMAN_MODAL' })}
            >
              W
            </Button>
            <Button
              size="huge"
              onClick={() =>
                rootDispatch({
                  type: SET_WIDE_BALL,
                  bowler: bowlingTeam[currentBowler],
                })
              }
            >
              WB
            </Button>
            <Button
              size="huge"
              onClick={() =>
                rootDispatch({
                  type: SET_NO_BALL,
                  bowler: bowlingTeam[currentBowler],
                })
              }
            >
              NB
            </Button>
            <Button
              size="huge"
              onClick={() =>
                rootDispatch({
                  type: SET_BYES,
                  bowler: bowlingTeam[currentBowler],
                })
              }
            >
              B
            </Button>
            <Button
              size="huge"
              onClick={() =>
                rootDispatch({
                  type: SET_LEG_BYES,
                  bowler: bowlingTeam[currentBowler],
                })
              }
            >
              LB
            </Button>
            <Button icon size="huge" onClick={changeStriker}>
              <Icon name="refresh" />
            </Button>
          </Button.Group>
        </div>
        <div className="mh3 w-100">
          <Dropdown
            placeholder="WB+"
            compact
            selection
            options={options}
            value=""
            onChange={widePlusRuns}
            className="ma2"
          />
          <Dropdown
            placeholder="NB+"
            compact
            selection
            options={options}
            value=""
            onChange={noBallPlusRuns}
            className="ma2"
          />
          <Dropdown
            placeholder="B+"
            compact
            selection
            options={options}
            value=""
            onChange={byesPlusRuns}
            className="ma2"
          />
          <Dropdown
            placeholder="LB+"
            compact
            selection
            options={options}
            value=""
            onChange={lByesPlusRuns}
            className="ma2"
          />
        </div>
        <Button size="big" disabled={!isFirstInn} onClick={endOfInn}>
          End of Inn
        </Button>
      </div>
      {/* Select Next Batsman Modal */}
      <Modal dimmer={dimmer} open={openSecond}>
        <Modal.Header>Select Next Batsman</Modal.Header>
        <Modal.Content>
          <div>
            <Form onSubmit={handleSubmit}>
              <Form.Group widths="equal">
                <Form.Field
                  control={Select}
                  options={current_batsmen}
                  label={{
                    children: 'Select out batsman',
                    htmlFor: 'form-select-control-gender',
                  }}
                  placeholder="Select out batsman"
                  onChange={setOutBatsman}
                />
                <Form.Field
                  control={Select}
                  options={wkt_options}
                  label={{
                    children: 'How Out?',
                    htmlFor: 'form-select-control-gender',
                  }}
                  placeholder="How Out?"
                  onChange={setHowOut}
                />
                <Form.Field
                  control={Select}
                  options={convertObjToArray(battingTeam)}
                  label={{
                    children: 'Select Next Batsman?',
                    htmlFor: 'form-select-control-gender',
                  }}
                  placeholder="How Out?"
                  onChange={setNextBatsman}
                />
              </Form.Group>
              <Button type="submit"> Confirm Details</Button>
            </Form>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default UpdateScoreComponent;
