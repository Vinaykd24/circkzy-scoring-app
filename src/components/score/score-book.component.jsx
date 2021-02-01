import React, { useContext, useState, useReducer, useEffect } from "react";
import { Button, Modal, Label, Radio, Form, Icon } from "semantic-ui-react";
import { matchReducer, reducer } from "./score.reducer";

import { MatchContext } from "../../providers/match/match.provider";
import {
  CHANGE_STRIKER,
  SET_BYES,
  SET_DOT_BALL,
  SET_FOUR_RUNS,
  SET_LEG_BYES,
  SET_NO_BALL,
  SET_ONE_RUN,
  SET_SIX_RUNS,
  SET_THREE_RUNS,
  SET_TWO_RUNS,
  SET_WIDE_BALL,
} from "../../providers/match/match.actions";
// import SelectionModalPage from "../../pages/modal/selection-modal";

const exampleReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return { open: true, dimmer: action.dimmer };
    case "CLOSE_MODAL":
      return { open: false };
    default:
      throw new Error();
  }
};

const ScoreBoardPage = () => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
  });
  const { open, dimmer } = state;

  const initialScoreBoardState = {
    totalRuns: 0,
    totalWickets: 0,
    totalExtras: 0,
  };
  const { rootState, rootDispatch } = useContext(MatchContext);
  // console.log(rootState);
  const {
    battingTeam,
    bowlingTeam,
    totalRuns,
    totalWickets,
    totalExtras,
    totalOvers,
  } = rootState.inn1;
  const { striker, nonStriker, currentBowler } = rootState.currentStats;
  // const [scoreBoardState, dispatch] = useReducer(
  //   matchReducer,
  //   initialScoreBoardState
  // );
  // const { totalRuns, totalWickets, totalExtras } = scoreBoardState;
  const currentPartnerShip = () => {
    const partnershipRuns =
      battingTeam[striker].runs + battingTeam[nonStriker].runs;
    const partnershipBallsPlayed =
      battingTeam[striker].ballsPlayed + battingTeam[nonStriker].ballsPlayed;
    return `${partnershipRuns}(${partnershipBallsPlayed})`;
  };

  const changeStriker = () => {
    rootDispatch({ type: CHANGE_STRIKER });
  };

  const checkAndChange = () => {
    if (totalOvers % 1 === 0 && totalOvers !== 0) {
      dispatch({ type: "OPEN_MODAL" });
      rootDispatch({ type: CHANGE_STRIKER });
    }
  };
  const updateRuns = (type) => {
    rootDispatch({ type, player: battingTeam[striker] });
  };

  const selectBatsman = (batsman) => {
    console.log("Select batsman logic goes here!", batsman);
    dispatch({ type: "CLOSE_MODAL" });
  };

  useEffect(() => checkAndChange(), [rootState.inn1.totalOvers]);

  return (
    <>
      <div className="flex justify-center pa3">
        <div className="outline w-50 pa3 mr2 tc">
          <div className="f1">
            {totalRuns}/{totalWickets}
          </div>
          <span className="f5 mt3 dib mr3">Overs: {totalOvers}/20</span>
          <span className="f5 mt3 dib">Extras: {totalExtras.total}</span>
        </div>
      </div>
      <div className="flex justify-center pa3">
        <div className="outline w-25 pa3 mr2">
          <code>{battingTeam[striker].playerName}</code>
          <p>
            <code>
              {battingTeam[striker].runs}({battingTeam[striker].ballsPlayed})
            </code>
          </p>
        </div>
        <div className="outline w-25 pa3 mr2">
          <code>{battingTeam[nonStriker].playerName}</code>
          <p>
            <code>
              {battingTeam[nonStriker].runs}(
              {battingTeam[nonStriker].ballsPlayed})
            </code>
          </p>
        </div>
        <div className="outline w-25 pa3 mr2">
          <code>{bowlingTeam[currentBowler].playerName}</code>
          <p>
            <code>
              {bowlingTeam[currentBowler].overs}(
              {bowlingTeam[currentBowler].wkts})
            </code>
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="outline pa3 tc">
          <p>Current Partnership:</p>
          <code>{currentPartnerShip()}</code>
        </div>
      </div>
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
            <Button size="huge">W</Button>
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
      </div>
      <Modal
        dimmer={dimmer}
        open={open}
        onClose={() => dispatch({ type: "CLOSE_MODAL" })}
      >
        <Modal.Header>Use Google's location service?</Modal.Header>
        <Modal.Content>
          <div>
            {Object.entries(battingTeam).map(([key, value], i) => (
              <Form.Field key={i}>
                <Radio
                  className="b"
                  key={i}
                  label={value["playerName"]}
                  disabled={striker === value["id"]}
                  onChange={() => selectBatsman(value)}
                />
              </Form.Field>
            ))}
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
            Disagree
          </Button>
          <Button positive onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
            Agree
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ScoreBoardPage;
