import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../../store/AppProvider'
import { Cell, Board, AttackPosition } from '../grids/grids';
import { ACTION_ATTACK_COMPUTER_SHIP } from '../../store/action';
import { allShips } from '../../utils/ships';
import { computerAttack, getComputerShip } from '../../utils/computerLogic';
import { ACTION_ATTACK_SHIP,ACTION_ADD_COMPUTER_SHIP } from '../../store/action';
import { useSocketContext } from '../../store/SocketProvider';
import TimerCmp from '../common/Timer';
function OpponentFeildOnline() {
    const {opponentdestroyedShips,opponentGrids,attack} = useSocketContext()
    const [time,setTime] = useState(300)
    const {socket} = useSocketContext()
    const timerRef = useRef()
    useEffect(()=>{
        if(socket)
        socket.on('attack',data => console.log(data))
    },[socket])
    useEffect(() => {

        if (!attack) {
            timerRef.current = setInterval(() => {
                if(time > 0)
                setTime(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timerRef.current)
        }
    }, [attack,time])
    const handleCellClick = (position) => {
        if(attack)
            if(socket){
            socket.emit('playerMove',{move:position})
    }
    }
    
    return (
        <div className='md:w-11/12 flex flex-col items-center justify-center'>
            <TimerCmp time={time}/>
            <div style={{ position: 'relative' }}>
                <Board isbackground={false}>
                    {Array.from(Array(100).keys())
                        .map(i => <Cell
                            key={i}
                            llegal
                            onClick={() => handleCellClick(i)}
                        />)}
                </Board>
                <Board isbackground={true}>
                    {
                        opponentdestroyedShips.map(({ shipPointer, position, axis }) =>{
                                return allShips[shipPointer].getShip({
                                col: position % 10,
                                row: Math.floor(position / 10),
                                axis
                            })})
                    }
                </Board>
                <Board isbackground={true}>
                    {opponentGrids
                        .map((v, i) => <AttackPosition
                            key={i}
                            col={v.position % 10}
                            row={Math.floor(v.position / 10)}
                            hit={v.hit}
                        />)}
                </Board>
            </div>
        </div>
    )
}

export default OpponentFeildOnline