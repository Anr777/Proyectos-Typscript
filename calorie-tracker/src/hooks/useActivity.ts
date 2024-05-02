import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";


export function useActivity() {

  const context = useContext(ActivityContext);
  if ( !context ) throw new Error('Add provider a main');

  return context;

}