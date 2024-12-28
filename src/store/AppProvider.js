import { useReducer, createContext, useContext, useEffect } from "react";
import { initialState, reducerFunc } from "./state";
import { ACTION_WINNER } from './action'
const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [
    { isReady,
      myShips,
      opponentShips,
      myGrids,
      opponentGrids,
      myAttack,
      opponentAttack,
      prevHit,
      winner,mode }, dispatch] = useReducer(reducerFunc, initialState);

  useEffect(() => {
    console.log("ship chenge")
    if (myShips.length === 5 && opponentShips.length === 5) {
      if (myShips.every(i => i.grids.length === 0))
        dispatch({ type: ACTION_WINNER, payload: 'computer' })
      else if (opponentShips.every(i => i.grids.length === 0))
        dispatch({ type: ACTION_WINNER, payload: 'user' })
    }
  }, [myShips, opponentShips])
  return <AppContext.Provider value={{
    isReady,
    myShips,
    opponentShips,
    myGrids,
    opponentGrids,
    myAttack,
    opponentAttack,
    prevHit,
    winner,
    mode
    , dispatch
  }}>
    {children}
  </AppContext.Provider>
}