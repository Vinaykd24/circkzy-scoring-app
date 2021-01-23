const INITIAL_STATE = {
  playerList: null,
};

const matchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_PLAYERLIST':
      return {
        ...state,
        playerList: action.payload,
      };
    default:
      return state;
  }
};

export default matchReducer;
