import { createContext, useContext, useState } from "react";
const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState()
  const [opponentdestroyedShips, setOpponentDestroyedShips] = useState([])
  const [opponentGrids, setOpponentGrids] = useState([])
  const [myGrids, setMyGrids] = useState([]);
  const [waiting,setWaiting] = useState(true)
  const [attack,setAttack] = useState(false)
  const restartSocket = () => {
    setSocket();
    setOpponentDestroyedShips([]);
    setMyGrids([]);
    setOpponentGrids([]);
    setWaiting(true);
    setAttack(false)
  }
  return <SocketContext.Provider
    value={{
      socket, setSocket,
      opponentGrids, setOpponentGrids,
      opponentdestroyedShips, setOpponentDestroyedShips,
      myGrids, setMyGrids,restartSocket,waiting,setWaiting,attack,setAttack
    }}>
    {children}
  </SocketContext.Provider>
}