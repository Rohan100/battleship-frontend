import React, { useEffect, useState } from 'react'
import { allShips } from '../../utils/ships';
import { Board, Cell } from '../grids/grids'
import { getIlligalGrids, X_AXIS, Y_AXIS } from '../../utils/playerHelper';
import { useAppContext } from '../../store/AppProvider';
import { ACTION_ADD_SHIP, ACTION_READY } from '../../store/action';
import WinnerModal from '../common/WinnerModal';
import { io, Socket } from 'socket.io-client';
import { useSocketContext } from '../../store/SocketProvider';

function Setup() {
  const [illegal, setIllegal] = useState([]);
  const {  myShips , dispatch } = useAppContext();
  const [axis, setAxis] = useState('x');
  const [shipGrids, setShipGrids] = useState([])
  const [shipPointer, setShipPointer] = useState(0);
  const [highlight, setHeighligh] = useState([])

  const handleCellClick = (i) => {
    if (shipPointer < 5)
      if (!illegal.includes(i)) {
        let shipLen = allShips[shipPointer].len;
        let temp = axis == Y_AXIS ? 10 : 1;
        let grids = []
        for (let j = 0; j < shipLen; j++) {
          grids.push(j * temp + i)
        }
        dispatch({ type: ACTION_ADD_SHIP, payload: { shipPointer, position: i, axis, grids } })
        setShipGrids(prev => [...prev, ...grids])
        setShipPointer(prev => prev + 1)
      }
  }

  useEffect(() => {

    if (shipPointer < 5)
      setIllegal(getIlligalGrids(shipGrids, allShips[shipPointer].len, axis))
    else dispatch({ type: ACTION_READY })
  }, [shipPointer, axis])

  const handleMouseMove = (position) => {
    let temp = axis == Y_AXIS ? 10 : 1;
    let heighlights = [];
    if (shipPointer == 5) return;
    if (illegal.includes(position)) {
      setHeighligh([]);
      return
    }
    for (let i = 0; i < allShips[shipPointer].len; i++) {
      heighlights.push(i * temp + position);
    }

    if (heighlights.includes(position)) setHeighligh(heighlights);

  }

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <button className='text-2xl border border-black hover:shadow bg-gray-700 text-white  rounded p-2 m-2 uppercase' onClick={() => setAxis(prev => prev == X_AXIS ? Y_AXIS : X_AXIS)} >Change Axis {axis}</button>
      <div style={{ position: 'relative' }}>
        <Board isbackground={false}>
          {Array.from(Array(100).keys())
            .map(i => <Cell
              key={i}
              llegal={!illegal.includes(i)}
              onClick={() => handleCellClick(i)}
              onMouseEnter={() => handleMouseMove(i)}
              highlight={highlight.includes(i)}
            />)}
        </Board>
        <Board isbackground={true}>
          {
            myShips.map(({ shipPointer, position, axis }) =>
              allShips[shipPointer].getShip({
                col: position % 10,
                row: Math.floor(position / 10),
                axis,
              }))
          }
        </Board>
      </div>
    </div>

  )
}

export default Setup