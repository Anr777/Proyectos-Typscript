import { Activity } from "../types";

export type ActivityActions =
  { type: 'save-activity', payload: { newActivity: Activity } } |
  { type: 'set-activeId', payload: { id: Activity[ 'id' ] } } |
  { type: 'remove-activity', payload: { id: Activity['id'] }} |
  { type: 'restar-app' }


export type ActivityState = {
  activities: Activity[];
  activeId: Activity[ 'id' ];
}

const localStorageActivities = () : Activity[] => {
  const activities = localStorage.getItem('activities')
  return activities ? JSON.parse(activities) : [];
}

export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: '',
}


export function activityReducer( state: ActivityState = initialState, action: ActivityActions ) {

  switch ( action.type ) {

    case 'save-activity':

      let updateActivities: Activity[] = [];
      if ( state.activeId ) {
        updateActivities = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : activity );
      } else {
        updateActivities = [ ...state.activities, action.payload.newActivity ]
      }
      return {
        ...state,
        activities: updateActivities,
        activeId: '',
      }

    case 'set-activeId':


      return {
        ...state,
        activeId: action.payload.id,
      }

    case 'remove-activity':


      return {
        ...state,
        activities: state.activities.filter( activity => activity.id !== action.payload.id)
      }

    case 'restar-app':

      return {
        activities: [],
        activeId: ''
      }

    default:
      return state;

  }

}