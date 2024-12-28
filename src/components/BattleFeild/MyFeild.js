import { useAppContext } from '../../store/AppProvider'
import { Cell, Board, AttackPosition } from '../grids/grids';
import { allShips } from '../../utils/ships';


function MyFiedld() {
    const { myShips, myGrids  } = useAppContext();

    return (
        <div className='md:w-11/12 flex items-center justify-center w-full'>
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
                        myShips.map(({ shipPointer,grids, position, axis }) =>{
                                return allShips[shipPointer].getShip({
                                col: position % 10,
                                row: Math.floor(position / 10),
                                axis
                            })})
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

export default MyFiedld