import React, { useContext } from 'react';
import { Button, Modal } from 'semantic-ui-react';

import { MatchContext } from '../providers/match/match.provider';

const CurrentScoreboard = ({ isFirstInn }) => {
  const [open, setOpen] = React.useState(false);
  const { rootState } = useContext(MatchContext);

  console.log(isFirstInn);
  const currentInn = isFirstInn ? 'inn1' : 'inn2';
  const { isFirstInnCompleted, target } = rootState;
  const totalRunsInn1 = rootState.inn1.totalRuns;
  const totalWicketsInn1 = rootState.inn1.totalWickets;
  const totalExtrasInn1 = rootState.inn1.totalExtras;
  const totalOversInn1 = rootState.inn1.totalOvers;
  const totalRunsInn2 = rootState.inn2.totalRuns;
  const totalWicketsInn2 = rootState.inn2.totalWickets;
  const totalExtrasInn2 = rootState.inn2.totalExtras;
  const totalOversInn2 = rootState.inn2.totalOvers;
  const { currentPartnership } = rootState[currentInn];
  const {
    striker,
    nonStriker,
    currentBowler,
    currentOver,
  } = rootState.currentStats;

  const {
    homeTeamName,
    awayTeamName,
    tournametName,
    teamBatingFirst,
    teamBatingSecond,
  } = rootState.matchDetails;

  const batTeam = isFirstInn
    ? rootState.inn1.battingTeam
    : rootState.inn2.battingTeam;
  const bowlTeam = isFirstInn
    ? rootState.inn1.bowlingTeam
    : rootState.inn2.bowlingTeam;

  React.useEffect(() => {
    if (isFirstInnCompleted) {
      if (totalRunsInn2 > target) {
        setOpen(true);
      } else if (totalWicketsInn2 === 10) {
        setOpen(true);
      }
    }
  }, [isFirstInnCompleted, totalRunsInn2, target, totalWicketsInn2]);
  // const currentPartnerShip = () => {
  //   const partnershipRuns =
  //     battingTeam[striker].runs + battingTeam[nonStriker].runs;
  //   const partnershipBallsPlayed =
  //     battingTeam[striker].ballsPlayed + battingTeam[nonStriker].ballsPlayed;
  //   return `${partnershipRuns}(${partnershipBallsPlayed})`;
  // };

  return (
    <>
      <div className="flex justify-center pa2">
        <div className="outline pa3 tc ttu">
          <div className="f1">{homeTeamName}</div>
          <div className="f5 pa2">VS</div>
          <div className="f1">{awayTeamName}</div>
        </div>
      </div>
      <div className="flex justify-between pa3">
        <div className="outline w-40 pa3 tc">
          <div className="f3 mb4 ttu">{teamBatingFirst}</div>
          <div className="f1">
            {totalRunsInn1}/{totalWicketsInn1}
          </div>
          <span className="f5 mt3 dib mr3">Overs: {totalOversInn1}/20</span>
          <span className="f5 mt3 dib">Extras: {totalExtrasInn1.total}</span>
        </div>
        <div className="outline w-40 pa3 tc">
          <div className="f3 mb4 ttu">{teamBatingSecond}</div>
          <div className="f1">
            {totalRunsInn2}/{totalWicketsInn2}
          </div>
          <span className="f5 mt3 dib mr3">Overs: {totalOversInn2}/20</span>
          <span className="f5 mt3 dib">Extras: {totalExtrasInn2.total}</span>
        </div>
      </div>
      <div className="flex justify-center pa2">
        <div className="outline w-50 pa3 mr2">
          <table className="collapse w-100 ba br2 b--black-10 pv2 ph3">
            <tbody>
              <tr className="striped--light-gray">
                <th className="pv2 ph3 tl f6 fw6 ttu">Name</th>
                <th className="pv2 ph3 tl f6 fw6 ttu">R</th>
                <th className="pv2 ph3 tl f6 fw6 ttu">B</th>
                <th className="pv2 ph3 tl f6 fw6 ttu">4s</th>
                <th className="pv2 ph3 tl f6 fw6 ttu">6s</th>
              </tr>
              <tr className="striped--light-gray">
                <td className="pv2 ph3 tl f6 fw6 ttu">
                  <code>{batTeam[striker].playerName}</code>
                </td>
                <td className="pv2 ph3 tl f6 fw6 ttu">
                  <code>{batTeam[striker].runs}</code>
                </td>
                <td className="pv2 ph3 tl f6 fw6 ttu">
                  <code>{batTeam[striker].ballsPlayed}</code>
                </td>
                <td className="pv2 ph3 tl f6 fw6 ttu">
                  <code>{batTeam[striker].fours}</code>
                </td>
                <td className="pv2 ph3 tl f6 fw6 ttu">
                  <code>{batTeam[striker].sixes}</code>
                </td>
              </tr>
              <tr className="striped--light-gray">
                <td className="pv2 ph3 tl f6 ttu">
                  <code>{batTeam[nonStriker].playerName}</code>
                </td>
                <td className="pv2 ph3 tl f6 ttu">
                  <code>{batTeam[nonStriker].runs}</code>
                </td>
                <td className="pv2 ph3 tl f6 ttu">
                  <code>{batTeam[nonStriker].ballsPlayed}</code>
                </td>
                <td className="pv2 ph3 tl f6 ttu">
                  <code>{batTeam[nonStriker].fours}</code>
                </td>
                <td className="pv2 ph3 tl f6 ttu">
                  <code>{batTeam[nonStriker].sixes}</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="outline w-50 pa3 mr2">
          <table className="collapse w-100 ba br2 b--black-10 pv2 ph3">
            <tbody>
              <tr className="striped--light-gray">
                <th className="pv2 ph3 tl f6 fw6 ttu">Name</th>
                <th className="pv2 ph3 tl f6 fw6 ttu">O</th>
                <th className="pv2 ph3 tl f6 fw6 ttu">M</th>
                <th className="pv2 ph3 tl f6 fw6 ttu">RG</th>
                <th className="pv2 ph3 tl f6 fw6 ttu">W</th>
              </tr>
              <tr className="striped--light-gray">
                <td className="pv2 ph3 tl f6 fw6 ttu">
                  <code>{bowlTeam[currentBowler].playerName}</code>
                </td>
                <td className="pv2 ph3 tl f6 fw6 ttu">
                  <code>{bowlTeam[currentBowler].overs}</code>
                </td>
                <td className="pv2 ph3 tl f6 fw6 ttu">
                  <code>{bowlTeam[currentBowler].maidens}</code>
                </td>
                <td className="pv2 ph3 tl f6 fw6 ttu">
                  <code>{bowlTeam[currentBowler].runsGiven}</code>
                </td>
                <td className="pv2 ph3 tl f6 fw6 ttu">
                  <code>{bowlTeam[currentBowler].wkts}</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center pa2">
        <div className="outline pa3 tc">
          <p>Current Partnership:</p>
          {/* <code>{currentPartnerShip()}</code> */}
          <code>
            {currentPartnership['runs']}({currentPartnership['balls']})
          </code>
        </div>
      </div>
      <div className="flex justify-center pa2">
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
      <Modal open={open}>
        <Modal.Header>Thank you!</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            Your subscription has been confirmed
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>OK</Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default CurrentScoreboard;
