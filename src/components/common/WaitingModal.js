import React from 'react'

import { useAppContext } from '../../store/AppProvider'
import './waiting.css'
function WaitingModal({ open }) {


    return (

            <div className='loader absolute h-screen w-screen flex flex-col backdrop-blur-sm	 items-center justify-center'>
                <div className='bg-[#19334b]  shadow rounded-md w-1/4 h-1/4 overflow-hidden'>
                <svg
                    viewBox="0 0 2 1"
                    preserveAspectRatio="none">
                    <defs>
                        <path id="w"
                            d="
      m0 1v-.5 
      q.5.5 1 0
      t1 0 1 0 1 0
      v.5z" />
                    </defs>
                    <g>
                        <use href="#w" y=".0" fill="#2d55aa" />
                        <use href="#w" y=".1" fill="#3461c1" />
                        <use href="#w" y=".2" fill="#4579e2" />
                    </g>
                </svg>
                </div>
                <p className='text-white'>starting soon...</p>
            </div>
    )
}

export default WaitingModal