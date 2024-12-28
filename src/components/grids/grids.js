import styled,{keyframes} from 'styled-components'

export const Cell = styled.div`
    border: 1px solid black;
    height: 100%;
    width: 100%;
    transition: all 0.3s ease 0s;
    background : ${({ highlight }) => highlight ? 'rgba(255,255,255,0.4)' : ''};
    cursor : ${({ llegal }) => llegal ? 'pointer' : 'not-allowed'};
`

export const Ship = styled.div`
    display: flex;
    height: 100%;
    grid-area:${({ col, row, axis, len }) => axis === 'x' ? `${row + 1} / ${col + 1} / span 1 / span ${len} `
        : `${row + 1} / ${col + 1} / span ${len} / span 1 `
    };
`

export const Board = styled.div`
    display: grid;
    margin:0px auto;
    grid-template: repeat(10, 3rem) / repeat(10, 3rem);
    text-align: center;
    gap: 3px;
    position :${({isbackground}) => isbackground ? 'absolute' : 'relative'};
    z-index : ${({isbackground}) => isbackground ? '-1' : '1' };
    top:0;
    @media (max-width: 768px) {
        grid-template: repeat(10, 2rem) / repeat(10, 2rem);
    }
`

export const AttackPosition = styled.div`
   &{ display : flex;
    justify-content:center;
    align-items : center;
    position : relative;
    
    grid-area :${({col,row}) => `${row + 1} / ${col + 1} / span 1 / span 1` } ;
   }
    &:after{
        content: "";
        position : absolute;
        width : 40%;
        z-index:1;
        height : 40%;
        border-radius : 50%;
        background-color : ${({hit}) => hit ? 'darkred' : 'darkblue' }
    }
`