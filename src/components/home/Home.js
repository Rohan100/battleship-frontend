import React, { useState } from 'react'
import './home.css'
import { useAppContext } from '../../store/AppProvider';
import { ACTION_SELECT_OPTIONS } from '../../store/action';
function Setup() {
    const {dispatch}= useAppContext()
    const [name,setName] =  useState()
    const handleSubmit = (e,mode)=>{
        console.log(mode)
        e.preventDefault();
        dispatch({type:ACTION_SELECT_OPTIONS,payload:{mode}})
        
    }
    return (
        <div className='setup-container'>
            <div className='name-container'>
                <div className='game-name'>
                    <p className='game-name'> BATTLESHIPS</p>
                    <p>BATTLESHIPS</p>
                </div>
                {/* <input value={name} onChange={e => setName(e.target.value)}  placeholder='Enter Name ...' className='input-name'  type='text'/> */}
                <button onClick={(e) => handleSubmit(e,'computer')} className='start-btn'>COMPUTE</button>
                <button onClick={(e) => handleSubmit(e,'online')} className='start-btn'>ONLINE</button>
                
            </div>
        </div>
    )
}

export default Setup