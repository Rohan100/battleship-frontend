import { useAppContext } from '../../store/AppProvider'
import { Cell, Board, AttackPosition } from '../grids/grids';
import { allShips } from '../../utils/ships';
import { useSocketContext } from '../../store/SocketProvider';
import { useEffect, useRef, useState } from 'react';
import TimerCmp from '../common/Timer';


function MyFiedldOnline() {
    const { myShips } = useAppContext();
    const { myGrids, attack } = useSocketContext();
    const [time, setTime] = useState(300);
    const timerRef = useRef()
    useEffect(() => {

        if (attack) {
            timerRef.current = setInterval(() => {
                if(time > 0)
                setTime(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timerRef.current)
        }
    }, [attack,time])
    return (
        <div className='md:w-11/12 flex flex-col items-center justify-center w-full'>
            <TimerCmp time={time}/>
            <div style={{ position: 'relative' }}>
                <Board isbackground={false}>
                    {Array.from(Array(100).keys())
                        .map(i => <Cell
                            key={i}
                            llegal
                        />)}
                </Board>
                <Board isbackground={true}>
                    {
                        myShips.map(({ shipPointer, position, axis }) => {
                            return allShips[shipPointer].getShip({
                                col: position % 10,
                                row: Math.floor(position / 10),
                                axis
                            })
                        })
                    }
                </Board>
                <Board isbackground={true}>
                    {myGrids
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

export default MyFiedldOnline