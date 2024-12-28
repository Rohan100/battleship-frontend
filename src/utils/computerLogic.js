import { getIlligalGrids, X_AXIS,Y_AXIS } from "./playerHelper";

const getAxis = () => Math.random() < 0.5 ? X_AXIS : Y_AXIS

export const getComputerShip = () =>{
    let shipsLens = [5,4,3,3,2]
    let shipsGrids = [];
    let ships = [];
    for(let i = 0;i<5;i++){
        let validShip = [];
        let illigalGrids = []
        let temp = getAxis();
        

           illigalGrids = getIlligalGrids(shipsGrids,shipsLens[i],temp)
           for(let validIndex = 0;validIndex<100;validIndex++){
            if(!illigalGrids.includes(validIndex))
                validShip.push(validIndex)
           }
           let currentShipPosition = validShip[Math.floor(Math.random() * validShip.length)]
           let incrementBy = temp == Y_AXIS ? 10 : 1;
           let grids = []
           for(let shipGrid = currentShipPosition;shipGrid < currentShipPosition + shipsLens[i] * incrementBy;shipGrid+=incrementBy){
            shipsGrids.push(shipGrid);
            grids.push(shipGrid);
           }
           ships.push({
                shipPointer : i,
                position : currentShipPosition,
                axis : temp,
                grids
           })
        
    }
    return ships
}
const arrayNotIncludes = (grids,position) =>{
    for(let grid of grids){
        if(grid.position == position ) return false;
    }
    return true;
}
export const computerAttack = (attackedGrids,prevHit) =>{
        if(prevHit !== -1){
            if(prevHit + 10 < 100 && arrayNotIncludes(attackedGrids,prevHit + 10) )
                return prevHit + 10
            else if(prevHit - 10 > 0 && arrayNotIncludes(attackedGrids,prevHit - 10))
                return prevHit - 10
            else if(prevHit - 10 >= 0 && arrayNotIncludes(attackedGrids,prevHit - 10))
                return prevHit - 10
            else if(prevHit + 1 < 100 && arrayNotIncludes(attackedGrids,prevHit + 1))
                return prevHit + 1
            else if(prevHit - 1 >= 0 && arrayNotIncludes(attackedGrids,prevHit - 1))
                return prevHit - 1
            }
        
                let possibleHit = [];
                for(let i = 0;i<100;i++){
                    if(arrayNotIncludes(attackedGrids,i)) possibleHit.push(i)
                }
                return possibleHit[Math.floor(Math.random() * possibleHit.length)]
            
}   

console.log(getComputerShip())