export const addPlayerToList = (playerList, player) => {
  return [...playerList, { ...player }];
};

export const removePlayerFromList = (playerList, playerId) => {
  return playerList.filter((player) => player.id !== playerId);
};

export const removeObj = (list, objKey) => {
  delete list[objKey];
  return list;
};

export const addMatchDetailsToDb = (matchDetails) => {
  return {
    ...matchDetails,
    venue: matchDetails.venue,
    homeTeamName: matchDetails.homeTeamName,
    awayTeamName: matchDetails.awayTeamName,
    tournametName: matchDetails.tournametName,
    tossWonBy: matchDetails.tossWonBy,
    electedTo: matchDetails.electedTo,
    teamBatingFirst: matchDetails.teamBatingFirst,
  };
};

export const addPlayerObj = (state, player) => {
  console.log([...state, { ...player }]);
};

export const updateCurrentStats = (stats, battingList, bowlingList) => {
  return {
    ...stats,
    striker: battingList[stats.striker],
    nonStriker: battingList[stats.nonStriker],
    currentBowler: bowlingList[stats.currentBowler],
  };
};

export const convertArrayToObject = (array) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item["id"]]: item,
    };
  }, initialValue);
};
