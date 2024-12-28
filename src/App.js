import './App.css';
import { io, Socket } from 'socket.io-client';
import Home from './components/home/Home';
import Background from './components/background/Background';
import Setup from './components/setup/Setup';
import { AppContextProvider, useAppContext } from './store/AppProvider';
import OpponentFeild from './components/BattleFeild/OpponentFeild';
import BattleFeild from './components/BattleFeild';
import WinnerModal from './components/common/WinnerModal';
import { useEffect, useState } from 'react';
import { useSocketContext } from './store/SocketProvider';
import PlayWithCompute from './PlayWithCompute';
import PlayOnline from './PlayOnline';
const SOCKET_SERVER_URL = 'http://localhost:5000';

function App() {
  const { isReady, winner, mode,myShips } = useAppContext();
  console.log(mode)
  let [roomId, setRomeId] = useState();
  // console.log(winner)
  const { setSocket, socket } = useSocketContext()


  return (
    <div className="App" >
      {
        mode ? 
          mode === 'computer' ?
          <PlayWithCompute/> : <PlayOnline/> 
        : <Home/>
      }

    </div>
  );
}

export default App;
