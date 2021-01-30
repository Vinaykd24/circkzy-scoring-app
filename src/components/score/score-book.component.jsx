import React, { useContext, useState, useReducer } from "react";
import { Button, Modal, Label, Radio, Form, Icon } from "semantic-ui-react";
import { matchReducer, reducer } from "./score.reducer";

import { MatchContext } from "../../providers/match/match.provider";

const ScoreBoardPage = () => {
  const initialScoreBoardState = {
    totalRuns: 0,
    totalWickets: 0,
    totalExtras: 0,
  };
  const { rootState } = useContext(MatchContext);
  const { battingTeam, bowlingTeam } = rootState.inn1;
  const { striker, nonStriker, currentBowler } = rootState.currentStats;
  const [scoreBoardState, dispatch] = useReducer(
    matchReducer,
    initialScoreBoardState
  );
  const { totalRuns, totalWickets, totalExtras } = scoreBoardState;
  const currentPartnerShip = () => {
    const partnershipRuns = striker.runs + nonStriker.runs;
    const partnershipBallsPlayed = striker.ballsPlayed + nonStriker.ballsPlayed;
    return `${partnershipRuns}(${partnershipBallsPlayed})`;
  };

  const Counter = () => {
    const initialState = { count: 0 };
    const [state, dispatch] = useReducer(reducer, initialState);
    // const [state, dispatch] = useReducer(reducer, { count: initialCount });
    return (
      <>
        Count: {state.count}
        <button onClick={() => dispatch({ type: "decrement" })}>-</button>
        <button onClick={() => dispatch({ type: "increment" })}>+</button>
      </>
    );
  };
  return (
    <>
      <div className="flex justify-center pa3">
        <div className="outline w-50 pa3 mr2 tc">
          <div className="f1">
            {totalRuns}/{totalWickets}
          </div>
          <span className="f5 mt3 dib">Extras: {totalExtras}</span>
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
            <Button size="huge" onClick={() => dispatch({ type: "ONE_RUN" })}>
              1
            </Button>
            <Button size="huge" onClick={() => dispatch({ type: "TWO_RUNS" })}>
              2
            </Button>
            <Button
              size="huge"
              onClick={() => dispatch({ type: "THREE_RUNS" })}
            >
              3
            </Button>
            <Button size="huge" onClick={() => dispatch({ type: "FOUR_RUNS" })}>
              4
            </Button>
            <Button size="huge" onClick={() => dispatch({ type: "SIX_RUNS" })}>
              6
            </Button>
            <Counter />
          </Button.Group>
        </div>
        <div className="mh3 w-100">
          <Button.Group size="small">
            <Button size="huge">W</Button>
            <Button size="huge">WB</Button>
            <Button size="huge">NB</Button>
            <Button size="huge">B</Button>
            <Button size="huge">LB</Button>
            <Button icon size="huge">
              <Icon name="refresh" />
            </Button>
          </Button.Group>
        </div>
      </div>
    </>
  );
};

export default ScoreBoardPage;
