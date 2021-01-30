import React, { useContext } from "react";
import { MatchContext } from "../../providers/match/match.provider";
const TestComponent = () => {
  const rootContext = useContext(MatchContext);
  return (
    <div>
      <h1>{rootContext.rootState.count}</h1>
      <button onClick={() => rootContext.rootDispatch({ type: "decrement" })}>
        -
      </button>
      <button onClick={() => rootContext.rootDispatch({ type: "increment" })}>
        +
      </button>
    </div>
  );
};

export default TestComponent;
