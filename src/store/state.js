import { ACTION_ADD_COMPUTER_SHIP, ACTION_ADD_SHIP, ACTION_ATTACK_COMPUTER_SHIP, ACTION_ATTACK_SHIP, ACTION_READY, ACTION_RESTART, ACTION_SELECT_OPTIONS, ACTION_WINNER } from "./action"

export const initialState = {
    isReady : false,
    myShips: [],
    opponentShips: [],
    myGrids: [],
    opponentGrids: [],
    myAttack:true,
    opponentAttack:false,
    prevHit : -1,
    winner : undefined,
    mode : null
}
export const reducerFunc = (state = initialState, action = { type: null, payload: null }) => {
    switch (action.type) {
        case ACTION_ADD_SHIP:
            return { ...state, myShips: [...state.myShips, action.payload] }
        case ACTION_ADD_COMPUTER_SHIP:
            return {...state,opponentShips : action.payload}
        case ACTION_ATTACK_SHIP:
           
            let hit = false;
            let prevHit = state.prevHit;
            if(state.myGrids.includes(action.payload)) break;
            const newShip = state.myShips.map(element => {
                if(element.grids.includes(action.payload)){
                    hit = true;
                    prevHit = action.payload;
                    let newGrids = element.grids.filter(i => i!==action.payload);
                    return{
                        ...element,
                        grids : newGrids
                    }
                }
                else return element
            });
            
            return {...state,myGrids:[...state.myGrids,{position:action.payload,hit}],myShips:newShip,prevHit,myAttack:true,opponentAttack:false}
           
            case ACTION_ATTACK_COMPUTER_SHIP:
           
            let hit_com = false;
            let ceckIfAlredy = state.opponentGrids.find(i => i.position === action.payload)
            if(ceckIfAlredy) return state
            const com_newShip = state.opponentShips.map(element => {
                if(element.grids.includes(action.payload)){
                    hit_com = true;
                    let newGrids = element.grids.filter(i => i!==action.payload);
                    return{
                        ...element,
                        grids : newGrids
                    }
                }
                else return element
            });

           
            return {...state,opponentGrids:[...state.opponentGrids,{position:action.payload,hit:hit_com}],opponentShips:com_newShip,myAttack:false,opponentAttack:true}
        case ACTION_WINNER:
            return {...state,winner:action.payload}
        case ACTION_READY:
            return {...state,isReady:true}
        case ACTION_SELECT_OPTIONS:
            return {...state,mode: action.payload.mode}
        case ACTION_RESTART:
            return initialState
        default:
            return state;
    }
}