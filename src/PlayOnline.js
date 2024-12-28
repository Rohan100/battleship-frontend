import React, { useEffect, useState } from 'react'
import Background from './components/background/Background';
import Setup from './components/setup/Setup';
import BattleFeild from './components/BattleFeild';
import WinnerModal from './components/common/WinnerModal';
import { useAppContext } from './store/AppProvider';
import { io } from 'socket.io-client';
import { useSocketContext } from './store/SocketProvider';
import { ACTION_WINNER } from './store/action';
import WaitingModal from './components/common/WaitingModal';
const SOCKET_SERVER_URL = 'http://localhost:5000';

function PlayOnline() {
    const {isReady,winner,myShips,dispatch} = useAppContext();
    const {socket,setSocket,setOpponentDestroyedShips,
      setOpponentGrids,
      setMyGrids,waiting,setWaiting,setAttack} = useSocketContext()
    useEffect(() => {
      console.log("restart")
        const socketConnection = io(SOCKET_SERVER_URL);
        socketConnection.on('connect', () => {
          console.log('Connected with ID:', socketConnection.id);
        });
        socketConnection.on('gameStart',(data) => {
          setAttack(data.firstToPlay === socketConnection.id)
          setWaiting(false)
        })
        socketConnection.on('attack',(data)=>{
          for(let id in data){
            if(id === socketConnection.id){
              setMyGrids(data[id].playerGrids)
            }else{
              setOpponentDestroyedShips(data[id].destroyedShip)
              setOpponentGrids(data[id].playerGrids)
            }
          }
        })
        socketConnection.on('attack',(data)=>{
          setAttack(prev => !prev)
          for(let id in data){
            if(id === socketConnection.id){
              setMyGrids(data[id].playerGrids)
            }else{
              setOpponentDestroyedShips(data[id].destroyedShip)
              setOpponentGrids(data[id].playerGrids)
            }
          }
        })
        socketConnection.on('winner',(data) =>{
            dispatch({type:ACTION_WINNER,payload:data});
        })
        socketConnection.on('timeup',(data) =>{
          console.log("timeup")
          let win = socketConnection.id === data.winner ? 'opponent' : socketConnection.id
          dispatch({type:ACTION_WINNER,payload:{winner:win,reason:data.reason}});
      })
        setSocket(socketConnection)
      
        return () => {
          console.log('disconnected')
          socketConnection.disconnect()
          setSocket()
        }
      }, [])
      
      useEffect(()=>{
        if(isReady && socket){
            socket.emit('start',{ships:myShips})
        }
      },[isReady,socket])
    return (
        <>
            <Background />
            {isReady ? 
            waiting ? <WaitingModal open={waiting}/>: <BattleFeild /> 
            : <Setup />}
            <WinnerModal winner={winner} />
        </>
    )
}

export default PlayOnline