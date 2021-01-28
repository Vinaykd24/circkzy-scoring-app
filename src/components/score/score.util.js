export const getBatsman = (playerId, ObjList) => {
  Object.keys(ObjList).map((player) => {
    return ObjList[playerId];
  });
};
