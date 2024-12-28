import React from 'react'
import Modal from 'react-modal'
import { useAppContext } from '../../store/AppProvider'
import { ACTION_RESTART } from '../../store/action'
import { useSocketContext } from '../../store/SocketProvider'
import {ShipWheel,Swords} from 'lucide-react'
function WinnerModal({ winner }) {
  const { dispatch, mode } = useAppContext()
  const { socket, restartSocket } = useSocketContext()
  const restart = () => {
    socket.disconnect();
    restartSocket();
    dispatch({ type: ACTION_RESTART })
  }
  const handleLoad = () => {
    console.log("jldloading")
  }
  return (
    <Modal style={
      {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgb(18 59 99)',
          border: '0px',
          
        },
        overlay: {
          background: 'transparent'
        }
      }
    } isOpen={winner && true}>
      <div>
      <Swords className='w-16 h-16 text-white m-auto' />
        <h1 className='text-3xl text-center mb-2 text-white stroke-black'>{
          mode == 'computer' ?
          winner == 'coputer' ? "computer won" : "You won"
          : winner?.winner === socket?.id ? "You won" : "Opponent Won" 
        }</h1>
        <h5 className='text-center text-gray-300'>{winner?.reason && `By ${winner?.reason}`}</h5>
        <button onClick={restart} className='start-btn'>
          Restart
        </button>
      </div>
    </Modal>
  )
}

export default WinnerModal