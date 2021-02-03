import React, { useContext, useState, useReducer, useEffect } from "react";
import {
  Button,
  Modal,
  Label,
  Radio,
  Form,
  Icon,
  Dropdown,
} from "semantic-ui-react";

import { MatchContext } from "../../providers/match/match.provider";
import {
  CHANGE_BOWLER,
  CHANGE_STRIKER,
} from "../../providers/match/match.actions";
import CurrentScoreboard from "../../pages/currentScoreboard";
import UpdateScoreComponent from "./update-score.component";

const exampleReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return { ...state, open: true, dimmer: action.dimmer };
    case "CLOSE_MODAL":
      return { open: false };
    case "OPEN_BATSMAN_MODAL":
      return { ...state, openSecond: true };
    case "SAVE_BATSMAN":
      return { ...state, outBatsman: action.playerId };
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

  const { rootState, rootDispatch } = useContext(MatchContext);
  const { battingTeam, bowlingTeam, totalOvers } = rootState.inn1;
  const { striker, nonStriker, currentBowler } = rootState.currentStats;

  const checkAndChange = () => {
    if (totalOvers % 1 === 0 && totalOvers !== 0) {
      dispatch({ type: "OPEN_MODAL" });
      rootDispatch({ type: CHANGE_STRIKER });
    }
  };

  const selectBowler = (bowler) => {
    console.log("Select bowler logic goes here!", bowler);
    rootDispatch({ type: CHANGE_BOWLER, bowler: bowler.id });
    dispatch({ type: "CLOSE_MODAL" });
  };

  useEffect(() => checkAndChange(), [rootState.inn1.totalOvers]);

  return (
    <>
      <CurrentScoreboard />
      <UpdateScoreComponent />
      <Modal
        dimmer={dimmer}
        open={open}
        onClose={() => dispatch({ type: "CLOSE_MODAL" })}
      >
        <Modal.Header>Change Bowler</Modal.Header>
        <Modal.Content>
          <div>
            {Object.entries(bowlingTeam).map(([key, value], i) => (
              <Form.Field key={i}>
                <Radio
                  className="b"
                  key={i}
                  label={value["playerName"]}
                  disabled={currentBowler === value["id"]}
                  onChange={() => selectBowler(value)}
                />
              </Form.Field>
            ))}
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ScoreBoardPage;
