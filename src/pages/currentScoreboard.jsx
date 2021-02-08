import React, { useContext } from 'react';
import { MatchContext } from '../providers/match/match.provider';

const CurrentScoreboard = () => {
  const { rootState } = useContext(MatchContext);

  // console.log(rootState);
  const {
    battingTeam,
    bowlingTeam,
    totalRuns,
    totalWickets,
    totalExtras,
    totalOvers,
    currentPartnership,
  } = rootState.inn1;
  const {
    striker,
    nonStriker,
    currentBowler,
    currentOver,
  } = rootState.currentStats;
  // const currentPartnerShip = () => {
  //   const partnershipRuns =
  //     battingTeam[striker].runs + battingTeam[nonStriker].runs;
  //   const partnershipBallsPlayed =
  //     battingTeam[striker].ballsPlayed + battingTeam[nonStriker].ballsPlayed;
  //   return `${partnershipRuns}(${partnershipBallsPlayed})`;
  // };

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
          {/* <code>{currentPartnerShip()}</code> */}
          <code>
            {currentPartnership['runs']}({currentPartnership['balls']})
          </code>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="outline pa3 tc mt2">
          <p>Ball-by-Ball</p>
          {currentOver !== undefined
            ? currentOver.map((ball, i) => (
                <span
                  className={
                    'ba br-100 dib h2 pt1 w2 mr1 ' +
                    (ball === 'W' ? 'bg-red' : '')
                  }
                  key={i}
                >
                  {ball}
                </span>
              ))
            : ''}
        </div>
      </div>
    </>
  );
};

export default CurrentScoreboard;
