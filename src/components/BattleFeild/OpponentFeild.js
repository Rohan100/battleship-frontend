import React, { useEffect } from 'react'
import { useAppContext } from '../../store/AppProvider'
import { Cell, Board, AttackPosition } from '../grids/grids';
import { ACTION_ATTACK_COMPUTER_SHIP } from '../../store/action';
import { allShips } from '../../utils/ships';
import { computerAttack, getComputerShip } from '../../utils/computerLogic';
import { ACTION_ATTACK_SHIP,ACTION_ADD_COMPUTER_SHIP } from '../../store/action';
function OpponentFeild() {
    const { opponentShips, opponentGrids, prevHit,myAttack,opponentAttack,myGrids , dispatch } = useAppContext();
    const handleCellClick = (position) => {
        if(myAttack)
            dispatch({ type: ACTION_ATTACK_COMPUTER_SHIP, payload: position })
    }

    useEffect(()=>{
        dispatch({type:ACTION_ADD_COMPUTER_SHIP,payload:getComputerShip()})
    },[])

    useEffect(()=>{
        console.log("human attack")
        if(opponentAttack)
            dispatch({type:ACTION_ATTACK_SHIP,payload:computerAttack(myGrids,prevHit)})
    },[opponentGrids])

    return (
        <div className='md:w-11/12 flex items-center justify-center'>
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
                        opponentShips.map(({ shipPointer,grids, position, axis }) =>{
                                if(grids.length == 0 )
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

export default OpponentFeild