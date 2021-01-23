import React from 'react';

export const TableGridPage = ({
  currentBowler,
  batsmenDetails,
  handleClick,
}) => {
  return (
    <div className="flex">
      <table className="collapse ma3 w-50">
        <tbody>
          <tr className="striped--light-gray">
            <th className="tl" onClick={() => handleClick()}>
              Clicke me
            </th>
            <th>Runs</th>
            <th>Balls</th>
            <th>4s</th>
            <th>6s</th>
          </tr>
          <tr className="striped--light-gray">
            <td>{batsmenDetails['bat1']['name']}</td>
            <td className="tc">{batsmenDetails['bat1']['runs']}</td>
            <td className="tc">{batsmenDetails['bat1']['ballsPlayed']}</td>
            <td className="tc">{batsmenDetails['bat1']['fours']}</td>
            <td className="tc">{batsmenDetails['bat1']['sixes']}</td>
          </tr>
          <tr className="striped--light-gray">
            <td>{batsmenDetails['bat2']['name']}</td>
            <td className="tc">{batsmenDetails['bat2']['runs']}</td>
            <td className="tc">{batsmenDetails['bat2']['ballsPlayed']}</td>
            <td className="tc">{batsmenDetails['bat2']['fours']}</td>
            <td className="tc">{batsmenDetails['bat2']['sixes']}</td>
          </tr>
        </tbody>
      </table>
      <table className="collapse ma3 w-50">
        <tbody>
          <tr className="striped--light-gray">
            <th className="tl">Name</th>
            <th>Ovrs</th>
            <th>M</th>
            <th>RG</th>
            <th>W</th>
          </tr>
          <tr className="striped--light-gray">
            <td>{currentBowler['name']}</td>
            <td className="tc">{currentBowler['overs']}</td>
            <td className="tc">{currentBowler['maidens']}</td>
            <td className="tc">{currentBowler['runsGiven']}</td>
            <td className="tc">{currentBowler['wickets']}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableGridPage;
