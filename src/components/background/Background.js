import React from 'react'
import './background.css'
function Background() {
    console.log("here")
    return (
        <div className='back-container'>
            <div className="waterHere">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <svg className='wsvg'>
                <defs>
                    <filter id="crumple-effect">
                        <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="10" result="turbulence" ></feTurbulence>
                        <animate attributeName="baseFrequency" values="115;159" keyTimes="0;1" dur="3s" repeatCount="indefinite" />
                    
                    <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="20">
                        <animate attributeName="scale" values="475;199;475" keyTimes="0;0.5;1" dur="7s" repeatCount="indefinite" />
                    </feDisplacementMap>
                </filter>
            </defs>
        </svg >
    </div>
  )
}

export default Background