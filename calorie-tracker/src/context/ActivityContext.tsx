import { Dispatch, PropsWithChildren, createContext, useReducer } from "react";
import { ActivityActions, ActivityState, activityReducer, initialState } from "../reducers/activity-reducer";

type ActivityContextProps = {
  state: ActivityState;
  dispatch: Dispatch<ActivityActions>
}

export const ActivityContext = createContext<ActivityContextProps>( null! );

export function ActivityProvider( { children }: PropsWithChildren ) {

  const [ state, dispatch ] = useReducer( activityReducer, initialState );


  return (
    <ActivityContext.Provider value={ {
      state,
      dispatch,
    } }>
      { children }
    </ActivityContext.Provider>
  )
}