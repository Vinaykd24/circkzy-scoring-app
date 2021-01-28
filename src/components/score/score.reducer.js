export const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};

export const matchReducer = (state, action) => {
  switch (action.type) {
    case "ONE_RUN":
      return { ...state, totalRuns: state.totalRuns + 1 };
    case "TWO_RUNS":
      return { ...state, totalRuns: state.totalRuns + 2 };
    case "THREE_RUNS":
      return { ...state, totalRuns: state.totalRuns + 3 };
    case "FOUR_RUNS":
      return { ...state, totalRuns: state.totalRuns + 4 };
    case "SIX_RUNS":
      return { ...state, totalRuns: state.totalRuns + 6 };
    case "WIDE":
      return {
        ...state,
        totalRuns: state.totalRuns + 1,
        totalExtras: state.totalExtras + 1,
      };
    case "NO_BALL":
      return {
        ...state,
        totalRuns: state.totalRuns + 1,
        totalExtras: state.totalExtras + 1,
      };
    case "LEG_BYE":
      return {
        ...state,
        totalRuns: state.totalRuns + 1,
        totalExtras: state.totalExtras + 1,
      };
    case "BYE":
      return {
        ...state,
        totalRuns: state.totalRuns + 1,
        totalExtras: state.totalExtras + 1,
      };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};
