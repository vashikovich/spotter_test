import { createContext, useReducer, PropsWithChildren } from "react";
import { Coordinate, Job } from "../types";

const initialState: MainState = {
  step: "JOB_SELECTION",
  routingQuery: null,
};

function mainReducer(state: MainState, action: MainAction): MainState {
  switch (action.type) {
    case "GO_TO_JOB_SELECTION":
      return {
        ...state,
        step: "JOB_SELECTION",
        routingQuery: null,
      };
    case "GO_TO_ROUTING_DETAILS":
      return {
        ...state,
        step: "ROUTING_DETAILS",
        routingQuery: action.payload,
      };
    default:
      return state;
  }
}

export const MainContext = createContext<{
  state: MainState;
  dispatch: React.Dispatch<MainAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const MainProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <MainContext.Provider value={{ state, dispatch }}>
      {children}
    </MainContext.Provider>
  );
};

export interface RoutingQuery {
  job: Job;
  currentLoc: Coordinate;
  usedHrs: number;
}

export type Step = "JOB_SELECTION" | "ROUTING_DETAILS";

export interface MainState {
  step: Step;
  routingQuery: RoutingQuery | null;
}

export type MainAction =
  | { type: "GO_TO_JOB_SELECTION" }
  | {
      type: "GO_TO_ROUTING_DETAILS";
      payload: RoutingQuery;
    };
